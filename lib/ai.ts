import { emptyLead, type ChatApiResponse } from "./types";

/**
 * Parse one or many API keys from any number of env-style strings.
 * Accepts comma- or whitespace-separated values and de-duplicates.
 */
export function parseKeys(...vars: (string | undefined)[]): string[] {
  return Array.from(
    new Set(
      vars
        .filter(Boolean)
        .join(",")
        .split(/[,\s]+/)
        .map((k) => k.trim())
        .filter(Boolean),
    ),
  );
}

/** Normalize a raw object (already JSON-parsed) into a ChatApiResponse. */
export function coerceChatResponse(raw: unknown, fallbackReply: string): ChatApiResponse {
  const r = (raw ?? {}) as Record<string, unknown>;
  const c = (r.collected ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    reply: typeof r.reply === "string" && r.reply.trim() ? r.reply : fallbackReply,
    // Whitelist known lead fields only — never propagate arbitrary model output.
    collected: {
      name: str(c.name),
      email: str(c.email),
      phone: str(c.phone),
      company: str(c.company),
      projectSummary: str(c.projectSummary),
    },
    complete: Boolean(r.complete),
    options: Array.isArray(r.options)
      ? r.options.filter((o): o is string => typeof o === "string").slice(0, 4)
      : [],
    requestPhone: Boolean(r.requestPhone),
  };
}

/**
 * Parse a model's text output (expected to be JSON) into a ChatApiResponse.
 * If it isn't valid JSON, the whole text becomes the reply.
 */
export function parseModelText(text: string, fallbackReply: string): ChatApiResponse {
  try {
    return coerceChatResponse(JSON.parse(text), fallbackReply);
  } catch {
    return {
      reply: text && text.trim() ? text : fallbackReply,
      collected: { ...emptyLead },
      complete: false,
      options: [],
      requestPhone: false,
    };
  }
}

/** Validate & normalize the provider failover order. */
export function parseProviderOrder(raw: string | undefined): ("gemini" | "groq")[] {
  return (raw || "groq,gemini")
    .split(/[,\s]+/)
    .map((p) => p.trim().toLowerCase())
    .filter((p): p is "gemini" | "groq" => p === "gemini" || p === "groq");
}
