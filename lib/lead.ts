import { emptyLead, type ChatMessage, type CollectedLead } from "./types";

// Length caps to mitigate oversized / abusive payloads on the public lead API.
export const LIMITS = {
  field: 200,
  email: 254,
  phone: 40,
  summary: 4000,
  message: 4000,
  transcript: 60,
} as const;

function clamp(value: unknown, max: number): string {
  return String(value ?? "").slice(0, max).trim();
}

/** Coerce arbitrary request input into a safe, length-bounded lead object. */
export function sanitizeLead(raw: unknown): CollectedLead {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    name: clamp(r.name, LIMITS.field),
    email: clamp(r.email, LIMITS.email),
    phone: clamp(r.phone, LIMITS.phone),
    company: clamp(r.company, LIMITS.field),
    projectSummary: clamp(r.projectSummary, LIMITS.summary),
  };
}

/** Coerce arbitrary input into a safe, bounded transcript (most recent N msgs). */
export function sanitizeTranscript(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((m) => m && typeof m.content === "string" && m.content.trim() !== "")
    .slice(-LIMITS.transcript)
    .map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content).slice(0, LIMITS.message),
    }));
}

/** Build a click-to-send wa.me link with the lead pre-filled (values encoded). */
export function buildWhatsAppLink(lead: CollectedLead, number: string): string {
  const f = (v: string) => encodeURIComponent(v || "—");
  const text = [
    "New InnoStarck lead",
    `Name: ${f(lead.name)}`,
    `Email: ${f(lead.email)}`,
    `Phone: ${f(lead.phone)}`,
    `Company: ${f(lead.company)}`,
    `Need: ${f(lead.projectSummary)}`,
  ].join("%0A");
  return `https://wa.me/${encodeURIComponent(number)}?text=${text}`;
}

/** Build the plain-text email body for a captured lead. */
export function buildLeadSummary(
  lead: CollectedLead,
  transcript: ChatMessage[],
  source: string,
): string {
  const lines = [
    "New InnoStarck website lead",
    "============================",
    `Source:   ${source}`,
    `Name:     ${lead.name || "—"}`,
    `Email:    ${lead.email || "—"}`,
    `Phone:    ${lead.phone || "—"}`,
    `Company:  ${lead.company || "—"}`,
    "",
    "Project / need:",
    lead.projectSummary || "—",
  ];

  if (transcript.length) {
    lines.push("", "Full conversation:", "------------------");
    for (const m of transcript) {
      lines.push(`${m.role === "assistant" ? "Assistant" : "Visitor"}: ${m.content}`);
    }
  }
  return lines.join("\n");
}

/** A blank lead (re-exported for convenience). */
export { emptyLead };
