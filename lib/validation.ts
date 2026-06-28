// Pure input-validation helpers, shared by client components and API routes.

/**
 * Validates an email address with a pragmatic RFC-5322-lite check.
 * Rejects empty, malformed, or absurdly long values.
 */
export function isValidEmail(raw: string): boolean {
  if (typeof raw !== "string") return false;
  const v = raw.trim();
  if (v.length < 6 || v.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

/**
 * Validates a phone / WhatsApp number. Accepts spaces, dashes, parentheses and
 * dots, plus an optional leading "+"; requires 9–15 actual digits.
 */
export function isValidPhone(raw: string): boolean {
  if (typeof raw !== "string") return false;
  const cleaned = raw.replace(/[\s\-().]/g, "");
  return /^\+?\d{9,15}$/.test(cleaned);
}
