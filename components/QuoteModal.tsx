"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { quoteModal as t } from "@/lib/i18n/strings";
import { isValidEmail, isValidPhone } from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteModal({
  service,
  onClose,
}: {
  service: string | null;
  onClose: () => void;
}) {
  const { locale } = useLanguage();
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ whatsapp?: string; email?: string }>({});

  // A new service was picked: start the form fresh.
  useEffect(() => {
    if (service) {
      setWhatsapp("");
      setEmail("");
      setDescription("");
      setStatus("idle");
      setErrors({});
    }
  }, [service]);

  useEffect(() => {
    if (!service) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [service, onClose]);

  if (!service) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const nextErrors: { whatsapp?: string; email?: string } = {};
    if (!isValidPhone(whatsapp)) nextErrors.whatsapp = t.phoneError[locale];
    if (!isValidEmail(email)) nextErrors.email = t.emailError[locale];
    setErrors(nextErrors);
    if (nextErrors.whatsapp || nextErrors.email) return;

    setStatus("sending");
    const trimmedDescription = description.trim();
    const projectSummary = trimmedDescription
      ? `Quote request: ${service}\n\n${trimmedDescription}`
      : `Quote request: ${service}`;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: {
            name: "",
            email,
            phone: whatsapp,
            company: "",
            projectSummary,
          },
          transcript: [],
          source: `Quote request — ${service}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok && data?.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="quote-modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
        <button
          type="button"
          className="quote-modal__close"
          aria-label={t.closeAria[locale]}
          onClick={onClose}
        >
          ×
        </button>

        {status === "sent" ? (
          <div className="form__success" role="status">
            <div className="form__success-title">{t.successTitle[locale]}</div>
            <p>{t.successBody[locale]}</p>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <h3 id="quote-modal-title" className="quote-modal__title">
              {t.title[locale]}
            </h3>
            <div>
              <label>{t.serviceLabel[locale]}</label>
              <div className="quote-modal__service">{service}</div>
            </div>
            <div>
              <label htmlFor="qm-whatsapp">{t.whatsappLabel[locale]}</label>
              <input
                id="qm-whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={t.whatsappPlaceholder[locale]}
                value={whatsapp}
                onChange={(e) => {
                  setWhatsapp(e.target.value);
                  if (errors.whatsapp) setErrors((s) => ({ ...s, whatsapp: undefined }));
                }}
                aria-invalid={errors.whatsapp ? true : undefined}
                disabled={status === "sending"}
                required
              />
              {errors.whatsapp && (
                <p className="form__error" role="alert">
                  {errors.whatsapp}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="qm-email">{t.emailLabel[locale]}</label>
              <input
                id="qm-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t.emailPlaceholder[locale]}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((s) => ({ ...s, email: undefined }));
                }}
                aria-invalid={errors.email ? true : undefined}
                disabled={status === "sending"}
                required
              />
              {errors.email && (
                <p className="form__error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="qm-description">{t.descriptionLabel[locale]}</label>
              <textarea
                id="qm-description"
                name="description"
                placeholder={t.descriptionPlaceholder[locale]}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                {t.errorMessage[locale]}
                <a href="https://wa.me/255795600348" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                .
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
