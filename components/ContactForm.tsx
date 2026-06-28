"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: {
            name: form.name,
            email: form.email,
            phone: "",
            company: "",
            projectSummary: form.message,
          },
          transcript: [{ role: "user", content: form.message }],
          source: "Contact page form",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form" role="status">
        <div className="form__success">
          <div className="form__success-title">Message sent ✓</div>
          <p>
            Thanks for reaching out — our team will get back to you shortly. For anything urgent you
            can also message us on{" "}
            <a href="https://wa.me/255795600348" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cf-name">Name</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          placeholder="Your full name"
          required
          autoComplete="name"
          value={form.name}
          onChange={update("name")}
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label htmlFor="cf-email">Email</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          autoComplete="email"
          value={form.email}
          onChange={update("email")}
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          placeholder="What are you building?"
          required
          value={form.message}
          onChange={update("message")}
          disabled={status === "sending"}
        />
      </div>
      <button
        type="submit"
        className="btn btn--ink"
        style={{ justifyContent: "center", padding: 15 }}
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message →"}
      </button>
      {status === "error" && (
        <p className="form__error" role="alert">
          Sorry — we couldn&apos;t send that. Please email us directly at{" "}
          <a href="mailto:info@innostarck.com">info@innostarck.com</a>.
        </p>
      )}
    </form>
  );
}
