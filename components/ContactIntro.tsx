"use client";

import Eyebrow from "./Eyebrow";
import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/language-provider";
import { contact as t } from "@/lib/i18n/strings";

export default function ContactIntro() {
  const { locale } = useLanguage();

  return (
    <div>
      <Eyebrow variant="paper">{t.eyebrow[locale]}</Eyebrow>
      <h2 className="h2" id="contact-heading">
        {t.title[locale]}
      </h2>
      <p className="contact-lede">{t.lede[locale]}</p>

      <div className="contact-info">
        <div className="contact-info__row">
          <span className="contact-info__icon" aria-hidden="true">✉</span>
          <div>
            <div className="contact-info__label">{t.emailLabel[locale]}</div>
            <a className="contact-info__value" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </div>
        </div>
        <div className="contact-info__row">
          <span className="contact-info__icon" aria-hidden="true">◉</span>
          <div>
            <div className="contact-info__label">{t.hqLabel[locale]}</div>
            <div className="contact-info__value">{siteConfig.location}</div>
          </div>
        </div>
        <div className="contact-info__row">
          <span className="contact-info__icon" aria-hidden="true">↗</span>
          <div>
            <div className="contact-info__label">{t.webLabel[locale]}</div>
            <div className="contact-info__value">www.innostarck.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
