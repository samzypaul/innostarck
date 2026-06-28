import { describe, it, expect } from "vitest";
import { isValidEmail, isValidPhone } from "./validation";

describe("isValidEmail", () => {
  it("accepts well-formed addresses", () => {
    expect(isValidEmail("sam@kunonu.org")).toBe(true);
    expect(isValidEmail("a.b-c+tag@sub.example.co")).toBe(true);
    expect(isValidEmail("  spaced@example.com  ")).toBe(true); // trimmed
  });

  it("rejects malformed addresses", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("nope")).toBe(false);
    expect(isValidEmail("no@domain")).toBe(false); // no TLD
    expect(isValidEmail("@example.com")).toBe(false);
    expect(isValidEmail("user@@example.com")).toBe(false);
    expect(isValidEmail("user @example.com")).toBe(false); // internal space
    expect(isValidEmail("a@b.c")).toBe(false); // TLD too short
  });

  it("rejects absurdly long input (DoS guard)", () => {
    const long = `${"a".repeat(300)}@example.com`;
    expect(isValidEmail(long)).toBe(false);
  });

  it("is type-safe against non-string input", () => {
    // @ts-expect-error intentional bad input
    expect(isValidEmail(null)).toBe(false);
    // @ts-expect-error intentional bad input
    expect(isValidEmail(undefined)).toBe(false);
    // @ts-expect-error intentional bad input
    expect(isValidEmail(12345)).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("accepts valid international and local formats", () => {
    expect(isValidPhone("+255795600348")).toBe(true);
    expect(isValidPhone("0712 345 678")).toBe(true);
    expect(isValidPhone("(255) 712-345-678")).toBe(true);
    expect(isValidPhone("+1.555.123.4567")).toBe(true);
  });

  it("rejects too-short / too-long / non-numeric", () => {
    expect(isValidPhone("")).toBe(false);
    expect(isValidPhone("12345")).toBe(false); // < 9 digits
    expect(isValidPhone("1".repeat(16))).toBe(false); // > 15 digits
    expect(isValidPhone("not-a-number")).toBe(false);
    expect(isValidPhone("+++255712345678")).toBe(false); // multiple plus
    expect(isValidPhone("0712-34A-678")).toBe(false); // letters
  });

  it("is type-safe against non-string input", () => {
    // @ts-expect-error intentional bad input
    expect(isValidPhone(null)).toBe(false);
    // @ts-expect-error intentional bad input
    expect(isValidPhone(700000000)).toBe(false);
  });
});
