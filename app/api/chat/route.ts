import { NextResponse } from "next/server";
import { systemInstruction, WHATSAPP_CATALOGUE_URL } from "@/lib/knowledge";
import { emptyLead, type ChatApiResponse, type ChatMessage } from "@/lib/types";
import { parseKeys, parseModelText, parseProviderOrder } from "@/lib/ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

// Support one or many keys. Keys can be supplied as:
//   GOOGLE_GENERATIVE_AI_API_KEY=key1
//   GOOGLE_GENERATIVE_AI_API_KEYS=key1,key2,key3   (comma or whitespace separated)
// NOTE: rotation only raises your limit if the keys belong to DIFFERENT Google
// Cloud projects — keys in the same project share one quota.
const GEMINI_KEYS = parseKeys(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  process.env.GOOGLE_GENERATIVE_AI_API_KEYS,
);
const GROQ_KEYS = parseKeys(process.env.GROQ_API_KEY, process.env.GROQ_API_KEYS);
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

// Order providers are tried (gemini first, groq as fallback by default).
const PROVIDER_ORDER = parseProviderOrder(process.env.AI_PROVIDER_ORDER);

const KEYS_BY_PROVIDER: Record<"gemini" | "groq", string[]> = {
  gemini: GEMINI_KEYS,
  groq: GROQ_KEYS,
};

const HAS_ANY_KEY = GEMINI_KEYS.length > 0 || GROQ_KEYS.length > 0;

// Round-robin offset so load is spread across keys between requests.
let rotationOffset = 0;

// Structured-output schema so the model returns chat + extracted lead data together.
const responseSchema = {
  type: "object",
  properties: {
    reply: { type: "string" },
    collected: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        company: { type: "string" },
        projectSummary: { type: "string" },
      },
      required: ["name", "email", "phone", "company", "projectSummary"],
    },
    complete: { type: "boolean" },
    options: { type: "array", items: { type: "string" } },
    requestPhone: { type: "boolean" },
  },
  required: ["reply", "collected", "complete", "options", "requestPhone"],
} as const;

const FALLBACK_REPLY =
  `I'm having trouble reaching my AI service right now. You can still reach the InnoStarck team ` +
  `directly on WhatsApp (${WHATSAPP_CATALOGUE_URL}) or by email at info@innostarck.com — ` +
  `we'll get right back to you.`;

function fallback(reply = FALLBACK_REPLY, error?: string): ChatApiResponse {
  return { reply, collected: emptyLead, complete: false, options: [], requestPhone: false, error };
}

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

type GeminiAttempt =
  | { ok: true; text: string | undefined }
  | { ok: false; status: number; detail: string };

async function callGemini(key: string, payload: unknown): Promise<GeminiAttempt> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return { ok: false, status: res.status, detail };
  }
  const data = await res.json();
  return { ok: true, text: data?.candidates?.[0]?.content?.parts?.[0]?.text };
}

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

// Groq is OpenAI-compatible. We feed the same system instruction and ask for a
// JSON object (the instruction already describes the exact fields).
async function callGroq(key: string, messages: ChatMessage[]): Promise<GeminiAttempt> {
  const res = await fetch(GROQ_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: systemInstruction },
        ...messages.map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
      ],
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 1024,
    }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return { ok: false, status: res.status, detail };
  }
  const data = await res.json();
  return { ok: true, text: data?.choices?.[0]?.message?.content };
}

export async function POST(req: Request) {
  if (!HAS_ANY_KEY) {
    return NextResponse.json(
      fallback(
        "The assistant isn't configured yet (no AI API key). Please contact us at info@innostarck.com.",
        "no GOOGLE_GENERATIVE_AI_API_KEY(S) or GROQ_API_KEY configured",
      ),
      { status: 200 },
    );
  }

  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json(fallback("Sorry, I couldn't read that message.", "bad request body"), {
      status: 400,
    });
  }

  // Clean, valid messages shared by both providers.
  const cleanMessages: ChatMessage[] = messages.filter(
    (m) => m && typeof m.content === "string" && m.content.trim() !== "",
  );
  if (cleanMessages.length === 0) {
    cleanMessages.push({ role: "user", content: "Hello" });
  }

  // Gemini wants role "model" for the assistant and a parts[] shape.
  const contents = cleanMessages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const payload = {
    systemInstruction: { parts: [{ text: systemInstruction }] },
    contents,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema,
      temperature: 0.6,
      maxOutputTokens: 1024,
    },
    safetySettings: [],
  };

  const advance = rotationOffset++;

  // Build the ordered attempt list: each provider in PROVIDER_ORDER, each of its
  // keys round-robined. We fail over across keys AND across providers.
  const attempts: { provider: "gemini" | "groq"; key: string }[] = [];
  for (const provider of PROVIDER_ORDER) {
    const keys = KEYS_BY_PROVIDER[provider];
    const m = keys.length;
    for (let i = 0; i < m; i++) {
      attempts.push({ provider, key: keys[(advance + i) % m] });
    }
  }

  let lastError = "no provider configured";
  for (const { provider, key } of attempts) {
    try {
      const r =
        provider === "gemini" ? await callGemini(key, payload) : await callGroq(key, cleanMessages);
      if (r.ok) {
        if (r.text) return NextResponse.json(parseModelText(r.text, FALLBACK_REPLY), { status: 200 });
        lastError = `${provider} returned an empty response`;
        continue;
      }
      lastError = `${provider} ${r.status}: ${r.detail.slice(0, 160)}`;
      // 429 / 5xx / auth → fall over to the next key / provider.
    } catch (err) {
      lastError = `${provider}: ${err instanceof Error ? err.message : "unknown error"}`;
    }
  }

  return NextResponse.json(fallback(FALLBACK_REPLY, lastError), { status: 200 });
}
