"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { contactForm as t } from "@/lib/i18n/strings";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const { locale } = useLanguage();
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
          <div className="form__success-title">{t.successTitle[locale]}</div>
          <p>
            {t.successBodyPrefix[locale]}
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
        <label htmlFor="cf-name">{t.nameLabel[locale]}</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          placeholder={t.namePlaceholder[locale]}
          required
          autoComplete="name"
          value={form.name}
          onChange={update("name")}
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label htmlFor="cf-email">{t.emailLabel[locale]}</label>
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
        <label htmlFor="cf-message">{t.messageLabel[locale]}</label>
        <textarea
          id="cf-message"
          name="message"
          placeholder={t.messagePlaceholder[locale]}
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
        {status === "sending" ? t.sending[locale] : t.send[locale]}
      </button>
      {status === "error" && (
        <p className="form__error" role="alert">
          {t.errorPrefix[locale]}
          <a href="mailto:info@innostarck.com">info@innostarck.com</a>.
        </p>
      )}
    </form>
  );
}
