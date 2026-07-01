"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { emptyLead, type ChatApiResponse, type ChatMessage, type CollectedLead } from "@/lib/types";
import { siteConfig } from "@/lib/site";
import { OPEN_CHAT_EVENT } from "@/lib/chat-bus";
import { isValidPhone } from "@/lib/validation";

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsapp}`;
const TEL_URL = `tel:${siteConfig.phone}`;

const StarIcon = ({ fill }: { fill: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13 2 L4 14 H11 L10 22 L20 9 H12 L13 2 Z" fill={fill} />
  </svg>
);

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi — I'm the InnoStarck AI assistant. I can answer questions on our services, scope, and approach, and connect you with our team. What are you building?",
};

const SUGGESTIONS = ["Explore services", "Get a quote", "Talk to a human"];

// Inactivity handling: after this long with no interaction the assistant warns
// the visitor; if they don't respond within the countdown, it ends the chat and
// sends the transcript. "I'm still here" cancels and resets the timer.
const INACTIVITY_WARN_MS = 30_000;
const TERMINATE_COUNTDOWN_S = 15;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<CollectedLead>(emptyLead);
  const [options, setOptions] = useState<string[]>([]);
  const [handoff, setHandoff] = useState<{ whatsappUrl: string; emailed: boolean } | null>(null);

  // Inactivity → warning → termination flow
  const [warning, setWarning] = useState(false);
  const [countdown, setCountdown] = useState(TERMINATE_COUNTDOWN_S);
  const [terminated, setTerminated] = useState(false);

  // Inline "share your phone" flow (shown when the assistant asks for a number)
  const [requestPhone, setRequestPhone] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // "Talk to a human" flow
  const [humanMode, setHumanMode] = useState(false);
  const [showCallback, setShowCallback] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackSent, setCallbackSent] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Live refs so timers / unload handlers read the latest state without stale closures.
  const leadRef = useRef(lead);
  const messagesRef = useRef(messages);
  const sentCountRef = useRef(0); // messages already delivered to /api/lead
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const terminateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const terminatedRef = useRef(false);
  leadRef.current = lead;
  messagesRef.current = messages;
  terminatedRef.current = terminated;

  // Send the current conversation to /api/lead (email + WhatsApp). Idempotent:
  // only sends when there's a real user message AND new content since last send.
  const flushLead = useCallback((useBeacon = false) => {
    const msgs = messagesRef.current;
    const hasUserMsg = msgs.some((m) => m.role === "user");
    if (!hasUserMsg || msgs.length <= sentCountRef.current) return;
    sentCountRef.current = msgs.length;

    const payload = JSON.stringify({
      lead: leadRef.current,
      transcript: msgs,
      source: "AI assistant chat",
    });

    if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/lead", new Blob([payload], { type: "application/json" }));
      return;
    }
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.whatsappUrl) setHandoff({ whatsappUrl: d.whatsappUrl, emailed: Boolean(d.emailed) });
      })
      .catch(() => {});
  }, []);

  const clearTimers = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    if (terminateTimerRef.current) {
      clearTimeout(terminateTimerRef.current);
      terminateTimerRef.current = null;
    }
    if (warnIntervalRef.current) {
      clearInterval(warnIntervalRef.current);
      warnIntervalRef.current = null;
    }
  }, []);

  // The ONLY place a lead is sent: the AI ends the chat after inactivity.
  const terminate = useCallback(() => {
    clearTimers();
    setWarning(false);
    setTerminated(true);
    terminatedRef.current = true;
    flushLead(false);
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        content:
          "This chat has ended due to inactivity. I've shared our conversation with the InnoStarck team — they'll follow up shortly. Tap “Start new chat” to continue.",
      },
    ]);
  }, [clearTimers, flushLead]);

  const beginWarning = useCallback(() => {
    setWarning(true);
    setCountdown(TERMINATE_COUNTDOWN_S);
    warnIntervalRef.current = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    terminateTimerRef.current = setTimeout(terminate, TERMINATE_COUNTDOWN_S * 1000);
  }, [terminate]);

  // (Re)start the 30s inactivity countdown that leads to the warning.
  const startInactivityTimer = useCallback(() => {
    clearTimers();
    if (terminatedRef.current) return;
    idleTimerRef.current = setTimeout(beginWarning, INACTIVITY_WARN_MS);
  }, [clearTimers, beginWarning]);

  // "I'm still here" — cancel the warning and resume without sending.
  const keepAlive = useCallback(() => {
    setWarning(false);
    startInactivityTimer();
    inputRef.current?.focus();
  }, [startInactivityTimer]);

  function closeChat() {
    clearTimers();
    setOpen(false);
  }

  function startOver() {
    clearTimers();
    setMessages([GREETING]);
    setLead(emptyLead);
    leadRef.current = emptyLead;
    messagesRef.current = [GREETING];
    sentCountRef.current = 0;
    setOptions([]);
    setHandoff(null);
    setRequestPhone(false);
    setShowPhoneInput(false);
    setHumanMode(false);
    setWarning(false);
    setTerminated(false);
    terminatedRef.current = false;
    setInput("");
  }

  // Allow other parts of the page (e.g. footer "Chat now") to open the widget.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

  // Clean up any running timers on unmount.
  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading, handoff, humanMode, showCallback, callbackSent, options, requestPhone, showPhoneInput, phoneError, warning, countdown, terminated]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading || terminatedRef.current) return;

    // Sending a message counts as activity: cancel any pending warning/termination.
    clearTimers();
    setWarning(false);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setOptions([]);
    setRequestPhone(false);
    setShowPhoneInput(false);
    setPhoneError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data: ChatApiResponse = await res.json();

      const withReply: ChatMessage[] = [...nextMessages, { role: "assistant", content: data.reply }];
      setMessages(withReply);

      const mergedLead = mergeLead(lead, data.collected);
      setLead(mergedLead);
      leadRef.current = mergedLead;
      messagesRef.current = withReply;
      setOptions(Array.isArray(data.options) ? data.options : []);
      setRequestPhone(Boolean(data.requestPhone) && !mergedLead.phone);

      // Start the inactivity countdown; the lead is only sent if it expires.
      startInactivityTimer();
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry — something went wrong on my end. You can reach us directly at info@innostarck.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(finalLead: CollectedLead, transcript: ChatMessage[]) {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead: finalLead, transcript }),
      });
      const data = await res.json();
      if (data?.whatsappUrl) {
        setHandoff({ whatsappUrl: data.whatsappUrl, emailed: Boolean(data.emailed) });
      }
    } catch {
      /* best-effort from the client; the server also logs the lead */
    }
  }

  function openHuman() {
    setHumanMode(true);
    setShowCallback(false);
    setCallbackSent(false);
    setOptions([]);
  }

  function submitPhone(e: React.FormEvent) {
    e.preventDefault();
    const v = phoneValue.trim();
    if (!isValidPhone(v)) {
      setPhoneError("Please enter a valid phone number — 9–15 digits, e.g. +255 712 345 678.");
      return;
    }
    setPhoneError(null);
    setShowPhoneInput(false);
    setRequestPhone(false);
    setLead((l) => ({ ...l, phone: v }));
    setPhoneValue("");
    // Feed the number back into the conversation so the assistant captures it.
    void send(v);
  }

  async function submitCallback(e: React.FormEvent) {
    e.preventDefault();
    const phone = callbackPhone.trim();
    if (!phone) return;

    const finalLead = mergeLead(lead, {
      phone,
      projectSummary: lead.projectSummary || "Requested a callback — wants to talk to a human.",
    });
    setLead(finalLead);
    setCallbackSent(true);
    void submitLead(finalLead, messages);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="InnoStarck AI Assistant">
          <div className="chat-panel__head">
            <span className="chat-panel__avatar">
              <StarIcon fill="#0A0E12" />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="chat-panel__title">InnoStarck Assistant</div>
              <div className="chat-panel__status">
                <i aria-hidden="true" /> AI · REPLIES INSTANTLY
              </div>
            </div>
            <button
              type="button"
              className="chat-panel__human"
              title="Talk to a human"
              aria-label="Talk to a human"
              onClick={openHuman}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </button>
            <button
              type="button"
              className="chat-panel__close"
              aria-label="Close chat"
              onClick={closeChat}
            >
              ×
            </button>
          </div>

          <div className="chat-panel__body" ref={bodyRef}>
            {messages.map((m, i) => (
              <p
                key={i}
                className={m.role === "user" ? "chat-bubble chat-bubble--user" : "chat-bubble"}
              >
                {m.content}
              </p>
            ))}

            {loading && (
              <div className="chat-bubble chat-typing" aria-label="Assistant is typing">
                <span /> <span /> <span />
              </div>
            )}

            {options.length > 0 && !loading && !humanMode && (
              <div className="chat-chips chat-chips--options">
                {options.map((opt) => (
                  <button key={opt} type="button" className="chat-chip" onClick={() => send(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {requestPhone && !lead.phone && !humanMode && !loading && (
              <div className="chat-phone">
                {!showPhoneInput ? (
                  <button
                    type="button"
                    className="chat-phone-cta"
                    onClick={() => setShowPhoneInput(true)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                    </svg>
                    Tap to enter your phone number →
                  </button>
                ) : (
                  <form className="chat-callback" onSubmit={submitPhone}>
                    <input
                      value={phoneValue}
                      onChange={(e) => {
                        setPhoneValue(e.target.value);
                        if (phoneError) setPhoneError(null);
                      }}
                      placeholder="e.g. +255 712 345 678"
                      aria-label="Your phone or WhatsApp number"
                      aria-invalid={phoneError ? true : undefined}
                      inputMode="tel"
                      autoComplete="tel"
                      autoFocus
                    />
                    <button type="submit" className="btn btn--primary" disabled={!phoneValue.trim()}>
                      Save
                    </button>
                  </form>
                )}
                {phoneError && (
                  <p className="chat-phone__error" role="alert">
                    {phoneError}
                  </p>
                )}
              </div>
            )}

            {messages.length === 1 && !loading && !humanMode && (
              <div className="chat-chips">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    className={i === 2 ? "chat-chip chat-chip--muted" : "chat-chip"}
                    onClick={() => (i === 2 ? openHuman() : send(s))}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {humanMode && (
              <div className="chat-handoff">
                <div className="chat-handoff__title">Talk to a human</div>
                <div className="chat-handoff__note">Choose how you&apos;d like to connect with our team:</div>
                <div className="chat-human__options">
                  <a
                    className="btn btn--primary"
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reach out on WhatsApp →
                  </a>
                  <a className="btn btn--ghost" href={TEL_URL}>
                    Call us now →
                  </a>

                  {!showCallback && !callbackSent && (
                    <button type="button" className="btn btn--ghost" onClick={() => setShowCallback(true)}>
                      Leave your WhatsApp number →
                    </button>
                  )}

                  {showCallback && !callbackSent && (
                    <form className="chat-callback" onSubmit={submitCallback}>
                      <input
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        placeholder="e.g. +255 7XX XXX XXX"
                        aria-label="Your WhatsApp number"
                        inputMode="tel"
                        autoFocus
                      />
                      <button type="submit" className="btn btn--primary" disabled={!callbackPhone.trim()}>
                        Send
                      </button>
                    </form>
                  )}

                  {callbackSent && (
                    <p className="form__note" role="status">
                      ✓ Thanks — our team will reach out to you on WhatsApp shortly.
                    </p>
                  )}
                </div>
                <button type="button" className="chat-human__back" onClick={() => setHumanMode(false)}>
                  ← Back to chat
                </button>
              </div>
            )}

            {handoff && (
              <div className="chat-handoff">
                <div className="chat-handoff__title">✓ Shared with the InnoStarck team</div>
                <div className="chat-handoff__note">
                  {handoff.emailed
                    ? "We've emailed your details to a specialist. "
                    : "Your details are saved. "}
                  Continue the conversation on WhatsApp:
                </div>
                <a
                  className="btn btn--primary"
                  href={handoff.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 12 }}
                >
                  Open WhatsApp →
                </a>
              </div>
            )}

            {warning && !terminated && (
              <div className="chat-warning" role="alert">
                <div className="chat-warning__title">Are you still there?</div>
                <div className="chat-warning__note">
                  This chat will end in <strong>{countdown}s</strong> due to inactivity, and I&apos;ll
                  pass our conversation to the team.
                </div>
                <button type="button" className="btn btn--primary" onClick={keepAlive}>
                  I&apos;m still here
                </button>
              </div>
            )}

            {terminated && (
              <div className="chat-restart">
                <button type="button" className="btn btn--primary" onClick={startOver}>
                  Start new chat
                </button>
              </div>
            )}
          </div>

          <form className="chat-panel__foot" onSubmit={handleSubmit}>
            <div className="chat-input">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={terminated ? "Chat ended — start a new chat" : "Ask anything…"}
                aria-label="Type your message"
                disabled={loading || terminated}
              />
              <button
                type="submit"
                className="chat-input__send"
                aria-label="Send message"
                disabled={loading || terminated || !input.trim()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A0E12" aria-hidden="true">
                  <path d="M3 11l18-8-8 18-2-7-8-3Z" />
                </svg>
              </button>
            </div>
            <div className="chat-panel__disclaimer">AI-ASSISTED · A SPECIALIST JOINS WHEN NEEDED</div>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chat-fab"
        aria-expanded={open}
        aria-label={open ? "Close InnoStarck AI assistant" : "Open InnoStarck AI assistant"}
        onClick={() => (open ? closeChat() : setOpen(true))}
      >
        <span className="chat-fab__icon">
          <StarIcon fill="#18CBAE" />
        </span>
        Ask InnoStarck AI
      </button>
    </>
  );
}

function mergeLead(prev: CollectedLead, incoming?: Partial<CollectedLead>): CollectedLead {
  if (!incoming) return prev;
  const pick = (a: string, b?: string) => (b && b.trim() ? b.trim() : a);
  return {
    name: pick(prev.name, incoming.name),
    email: pick(prev.email, incoming.email),
    phone: pick(prev.phone, incoming.phone),
    company: pick(prev.company, incoming.company),
    projectSummary: pick(prev.projectSummary, incoming.projectSummary),
  };
}
