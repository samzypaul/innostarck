"use client";

import Link from "next/link";
import Logo from "./Logo";
import OpenChatButton from "./OpenChatButton";
import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/language-provider";
import { nav, common, footer as t } from "@/lib/i18n/strings";

export default function Footer() {
  const { locale } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Logo large />
            <p className="footer__blurb">{t.blurb[locale]}</p>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h5>{t.navigate[locale]}</h5>
              <Link href="/services">{nav.services[locale]}</Link>
              <Link href="/about">{nav.standard[locale]}</Link>
              <Link href="/method">{nav.method[locale]}</Link>
              <Link href="/leadership">{nav.leadership[locale]}</Link>
            </div>
            <div className="footer__col">
              <h5>{t.products[locale]}</h5>
              <a href="https://bmssuite.online" target="_blank" rel="noopener noreferrer">
                BMS Suite ↗
              </a>
            </div>
            <div className="footer__col">
              <h5>{t.legal[locale]}</h5>
              <Link href="/privacy">{t.privacyPolicy[locale]}</Link>
              <Link href="/terms">{t.termsOfService[locale]}</Link>
            </div>
            <div className="footer__col">
              <h5>{t.reach[locale]}</h5>
              <a href="tel:+255614712348">+255 614 712 348</a>
              <Link href="/contact">{siteConfig.location}</Link>
            </div>
          </div>
        </div>

        <div className="footer__ai">
          <span className="footer__ai-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M13 2 L4 14 H11 L10 22 L20 9 H12 L13 2 Z" fill="#0A0E12" />
            </svg>
          </span>
          <div className="footer__ai-body">
            <div className="t">{t.aiTitle[locale]}</div>
            <div className="d">{t.aiBody[locale]}</div>
          </div>
          <OpenChatButton className="btn btn--primary">{t.chatNow[locale]}</OpenChatButton>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} InnoStarck. {t.rightsReserved[locale]}
          </span>
          <span className="footer__motto">{common.tagline[locale]}</span>
        </div>
      </div>
    </footer>
  );
}
