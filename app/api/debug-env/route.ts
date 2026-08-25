import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// TEMPORARY diagnostic route — reports whether expected env vars are visible
// to the deployed SSR runtime, without ever exposing their values. Delete
// this file once the Amplify env var issue is resolved.
const EXPECTED_VARS = [
  "GOOGLE_GENERATIVE_AI_API_KEY",
  "GOOGLE_GENERATIVE_AI_API_KEYS",
  "GROQ_API_KEY",
  "GROQ_API_KEYS",
  "GMAIL_USER",
  "GMAIL_APP_PASSWORD",
  "LEAD_TO_EMAIL",
  "WHATSAPP_TO_NUMBER",
  "DEBUG_TEST",
];

export async function GET() {
  const status = Object.fromEntries(
    EXPECTED_VARS.map((name) => {
      const value = process.env[name];
      return [
        name,
        value ? { present: true, length: value.length } : { present: false },
      ];
    }),
  );
  // Names only, never values — shows whether Amplify is injecting ANY custom
  // vars into this runtime, beyond the AWS/Lambda/Next.js built-in ones.
  const allNames = Object.keys(process.env).sort();
  return NextResponse.json({ status, totalEnvVarCount: allNames.length, allNames });
}
