"use client";

import { useLanguage } from "@/lib/i18n/language-provider";

function UKFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 30 20" aria-hidden="true">
      <defs>
        <clipPath id="lang-flag-uk">
          <rect width="30" height="20" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#lang-flag-uk)">
        <rect width="30" height="20" fill="#00247d" />
        <path d="M0 0 L30 20 M30 0 L0 20" stroke="#fff" strokeWidth="4" />
        <path d="M0 0 L30 20 M30 0 L0 20" stroke="#cf142b" strokeWidth="1.6" />
        <path d="M15 0 V20 M0 10 H30" stroke="#fff" strokeWidth="7" />
        <path d="M15 0 V20 M0 10 H30" stroke="#cf142b" strokeWidth="2.6" />
      </g>
    </svg>
  );
}

function TanzaniaFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 30 20" aria-hidden="true">
      <defs>
        <clipPath id="lang-flag-tz">
          <rect width="30" height="20" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#lang-flag-tz)">
        <rect width="30" height="20" fill="#1eb53a" />
        <polygon points="30,0 30,20 0,20" fill="#00a3dd" />
        <line x1="0" y1="20" x2="30" y2="0" stroke="#fcd116" strokeWidth="6" />
        <line x1="0" y1="20" x2="30" y2="0" stroke="#000" strokeWidth="3.2" />
      </g>
    </svg>
  );
}

export default function LanguageSwitch() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <button
        type="button"
        className="lang-switch__btn"
        data-active={locale === "en"}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        <UKFlag />
        EN
      </button>
      <button
        type="button"
        className="lang-switch__btn"
        data-active={locale === "sw"}
        aria-pressed={locale === "sw"}
        onClick={() => setLocale("sw")}
      >
        <TanzaniaFlag />
        SW
      </button>
    </div>
  );
}
