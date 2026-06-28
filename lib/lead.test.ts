import { describe, it, expect } from "vitest";
import {
  LIMITS,
  sanitizeLead,
  sanitizeTranscript,
  buildWhatsAppLink,
  buildLeadSummary,
} from "./lead";
import type { CollectedLead } from "./types";

const fullLead: CollectedLead = {
  name: "Sam Mbano",
  email: "sam@kunonu.org",
  phone: "+255795600348",
  company: "Acme Pharmacy",
  projectSummary: "Inventory web system",
};

describe("sanitizeLead", () => {
  it("passes through a clean lead, trimming whitespace", () => {
    expect(sanitizeLead({ ...fullLead, name: "  Sam Mbano  " })).toEqual(fullLead);
  });

  it("defaults every missing field to empty string", () => {
    expect(sanitizeLead({})).toEqual({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectSummary: "",
    });
  });

  it("handles null / non-object input without throwing", () => {
    expect(sanitizeLead(null)).toEqual(sanitizeLead({}));
    expect(sanitizeLead(undefined)).toEqual(sanitizeLead({}));
    expect(sanitizeLead("a string")).toEqual(sanitizeLead({}));
  });

  it("coerces non-string field values to strings", () => {
    const out = sanitizeLead({ name: 42, email: true, projectSummary: { x: 1 } });
    expect(out.name).toBe("42");
    expect(out.email).toBe("true");
    expect(typeof out.projectSummary).toBe("string");
  });

  it("clamps oversized fields (abuse / DoS guard)", () => {
    const out = sanitizeLead({
      name: "n".repeat(5000),
      projectSummary: "s".repeat(99999),
    });
    expect(out.name.length).toBe(LIMITS.field);
    expect(out.projectSummary.length).toBe(LIMITS.summary);
  });
});

describe("sanitizeTranscript", () => {
  it("returns [] for non-array input", () => {
    expect(sanitizeTranscript(null)).toEqual([]);
    expect(sanitizeTranscript("nope")).toEqual([]);
    expect(sanitizeTranscript({})).toEqual([]);
  });

  it("drops entries without string content", () => {
    const out = sanitizeTranscript([
      { role: "user", content: "hello" },
      { role: "user", content: "" },
      { role: "user" },
      { role: "user", content: 123 },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0].content).toBe("hello");
  });

  it("normalizes role to user/assistant only", () => {
    const out = sanitizeTranscript([
      { role: "assistant", content: "hi" },
      { role: "system", content: "x" },
      { role: "model", content: "y" },
    ]);
    expect(out.map((m) => m.role)).toEqual(["assistant", "user", "user"]);
  });

  it("keeps only the most recent N messages", () => {
    const many = Array.from({ length: LIMITS.transcript + 20 }, (_, i) => ({
      role: "user",
      content: `m${i}`,
    }));
    const out = sanitizeTranscript(many);
    expect(out).toHaveLength(LIMITS.transcript);
    expect(out[out.length - 1].content).toBe(`m${LIMITS.transcript + 19}`);
  });

  it("clamps individual message length", () => {
    const out = sanitizeTranscript([{ role: "user", content: "x".repeat(99999) }]);
    expect(out[0].content.length).toBe(LIMITS.message);
  });
});

describe("buildWhatsAppLink", () => {
  it("URL-encodes lead values", () => {
    const url = buildWhatsAppLink(fullLead, "255795600348");
    expect(url.startsWith("https://wa.me/255795600348?text=")).toBe(true);
    expect(url).toContain("sam%40kunonu.org"); // @ encoded
    expect(url).toContain("Acme%20Pharmacy"); // space encoded
    expect(url).toContain("%0A"); // newline separators
  });

  it("substitutes an em-dash for empty fields", () => {
    const url = buildWhatsAppLink(sanitizeLead({ name: "Jane" }), "255795600348");
    expect(url).toContain("Jane");
    // empty email/phone/company/need become the encoded em-dash
    expect(url).toContain(encodeURIComponent("—"));
  });

  it("encodes the destination number defensively", () => {
    const url = buildWhatsAppLink(fullLead, "+255 795 600 348");
    expect(url).toContain("wa.me/%2B255%20795%20600%20348");
  });
});

describe("buildLeadSummary", () => {
  it("includes source and all fields", () => {
    const body = buildLeadSummary(fullLead, [], "Contact page form");
    expect(body).toMatch(/Source:\s+Contact page form/);
    expect(body).toMatch(/Name:\s+Sam Mbano/);
    expect(body).toMatch(/Email:\s+sam@kunonu\.org/);
    expect(body).toContain("Inventory web system");
  });

  it("shows em-dashes for missing fields", () => {
    const body = buildLeadSummary(sanitizeLead({}), [], "AI assistant chat");
    expect(body).toMatch(/Name:\s+—/);
    expect(body).toContain("Project / need:\n—");
  });

  it("omits the conversation block when transcript is empty", () => {
    const body = buildLeadSummary(fullLead, [], "x");
    expect(body).not.toContain("Full conversation:");
  });

  it("renders the transcript with role labels", () => {
    const body = buildLeadSummary(fullLead, [
      { role: "assistant", content: "What are you building?" },
      { role: "user", content: "A dashboard" },
    ], "AI assistant chat");
    expect(body).toContain("Full conversation:");
    expect(body).toContain("Assistant: What are you building?");
    expect(body).toContain("Visitor: A dashboard");
  });
});
