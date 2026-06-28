import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  buildLeadSummary,
  buildWhatsAppLink,
  sanitizeLead,
  sanitizeTranscript,
} from "@/lib/lead";
import { isValidEmail } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.LEAD_TO_EMAIL || "samzypaul@gmail.com";
const WHATSAPP_NUMBER = process.env.WHATSAPP_TO_NUMBER || "255795600348";

async function sendEmail(subject: string, body: string, replyTo: string) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    return { sent: false, reason: "GMAIL_USER / GMAIL_APP_PASSWORD not set" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `InnoStarck Assistant <${user}>`,
    to: TO_EMAIL,
    replyTo: replyTo || undefined,
    subject,
    text: body,
  });
  return { sent: true };
}

export async function POST(req: Request) {
  let safeLead;
  let transcript;
  let source = "AI assistant chat";
  try {
    const body = await req.json();
    safeLead = sanitizeLead(body?.lead);
    transcript = sanitizeTranscript(body?.transcript);
    if (typeof body?.source === "string" && body.source.trim()) {
      source = body.source.trim().slice(0, 80);
    }
  } catch {
    return NextResponse.json({ ok: false, error: "bad request body" }, { status: 400 });
  }

  // Require at least a name/contact + something to say — blocks empty spam posts.
  if (!safeLead.projectSummary && transcript.length === 0) {
    return NextResponse.json({ ok: false, error: "empty submission" }, { status: 422 });
  }

  const summary = buildLeadSummary(safeLead, transcript, source);
  const whatsappUrl = buildWhatsAppLink(safeLead, WHATSAPP_NUMBER);
  const subject = `New InnoStarck lead${safeLead.name ? `: ${safeLead.name}` : ""} (${source})`;
  // Only use the visitor's email as Reply-To if it's actually valid.
  const replyTo = isValidEmail(safeLead.email) ? safeLead.email : "";

  // Always log server-side so a lead is never lost even if email isn't configured.
  console.log("[InnoStarck lead]\n" + summary);

  let emailed = false;
  let emailError: string | undefined;
  try {
    const result = await sendEmail(subject, summary, replyTo);
    emailed = result.sent;
    if (!result.sent) emailError = result.reason;
  } catch (err) {
    emailError = err instanceof Error ? err.message : "email send failed";
  }

  return NextResponse.json({ ok: true, emailed, emailError, whatsappUrl });
}
