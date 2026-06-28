import { describe, it, expect } from "vitest";
import { parseKeys, coerceChatResponse, parseModelText, parseProviderOrder } from "./ai";

const FALLBACK = "fallback reply";

describe("parseKeys", () => {
  it("returns [] when nothing is provided", () => {
    expect(parseKeys(undefined, undefined)).toEqual([]);
    expect(parseKeys()).toEqual([]);
  });

  it("splits comma- and whitespace-separated keys", () => {
    expect(parseKeys("a,b , c")).toEqual(["a", "b", "c"]);
    expect(parseKeys("a b\nc")).toEqual(["a", "b", "c"]);
  });

  it("merges multiple sources and de-duplicates", () => {
    expect(parseKeys("a,b", "b,c")).toEqual(["a", "b", "c"]);
  });

  it("ignores empty fragments", () => {
    expect(parseKeys(",, a ,,", "")).toEqual(["a"]);
  });
});

describe("coerceChatResponse", () => {
  it("fills defaults from an empty object", () => {
    const r = coerceChatResponse({}, FALLBACK);
    expect(r).toEqual({
      reply: FALLBACK,
      collected: { name: "", email: "", phone: "", company: "", projectSummary: "" },
      complete: false,
      options: [],
      requestPhone: false,
    });
  });

  it("passes through a complete, well-formed object", () => {
    const r = coerceChatResponse(
      {
        reply: "Hi",
        collected: { name: "Sam", email: "s@x.io", phone: "1", company: "C", projectSummary: "P" },
        complete: true,
        options: ["A", "B"],
        requestPhone: true,
      },
      FALLBACK,
    );
    expect(r.reply).toBe("Hi");
    expect(r.collected.name).toBe("Sam");
    expect(r.complete).toBe(true);
    expect(r.requestPhone).toBe(true);
    expect(r.options).toEqual(["A", "B"]);
  });

  it("uses fallback when reply is missing or blank", () => {
    expect(coerceChatResponse({ reply: "   " }, FALLBACK).reply).toBe(FALLBACK);
    expect(coerceChatResponse({ reply: 123 }, FALLBACK).reply).toBe(FALLBACK);
  });

  it("caps options at 4 and drops non-strings", () => {
    const r = coerceChatResponse({ options: ["a", 1, "b", null, "c", "d", "e"] }, FALLBACK);
    expect(r.options).toEqual(["a", "b", "c", "d"]);
  });

  it("coerces truthy/falsy flags to booleans", () => {
    const r = coerceChatResponse({ complete: "yes", requestPhone: 0 }, FALLBACK);
    expect(r.complete).toBe(true);
    expect(r.requestPhone).toBe(false);
  });

  it("ignores unknown keys in collected", () => {
    const r = coerceChatResponse({ collected: { hacker: "x", name: "Ann" } }, FALLBACK);
    expect(r.collected).not.toHaveProperty("hacker");
    expect(r.collected.name).toBe("Ann");
  });
});

describe("parseModelText", () => {
  it("parses a valid JSON string", () => {
    const r = parseModelText('{"reply":"Hello","complete":true}', FALLBACK);
    expect(r.reply).toBe("Hello");
    expect(r.complete).toBe(true);
  });

  it("falls back to raw text when not JSON", () => {
    const r = parseModelText("just plain text", FALLBACK);
    expect(r.reply).toBe("just plain text");
    expect(r.complete).toBe(false);
    expect(r.options).toEqual([]);
  });

  it("uses the fallback reply for empty input", () => {
    expect(parseModelText("", FALLBACK).reply).toBe(FALLBACK);
  });
});

describe("parseProviderOrder", () => {
  it("defaults to groq then gemini", () => {
    expect(parseProviderOrder(undefined)).toEqual(["groq", "gemini"]);
    expect(parseProviderOrder("")).toEqual(["groq", "gemini"]);
  });

  it("respects a custom order and is case-insensitive", () => {
    expect(parseProviderOrder("GEMINI, groq")).toEqual(["gemini", "groq"]);
  });

  it("filters out unknown providers", () => {
    expect(parseProviderOrder("openai, groq, anthropic")).toEqual(["groq"]);
  });
});
