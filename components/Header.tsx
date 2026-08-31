"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import LanguageSwitch from "./LanguageSwitch";
import { mainNav, type NavId } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/language-provider";
import { nav } from "@/lib/i18n/strings";

const NAV_LABEL: Record<NavId, { en: string; sw: string }> = {
  home: nav.home,
  services: nav.services,
  about: nav.about,
  standard: nav.standard,
  method: nav.method,
  leadership: nav.leadership,
};

const NAV_DESC: Partial<Record<NavId, { en: string; sw: string }>> = {
  standard: nav.standardDesc,
  method: nav.methodDesc,
  leadership: nav.leadershipDesc,
};

export default function Header() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="header">
      <div className="header__inner">
        <Logo />

        <button
          type="button"
          className="nav__toggle"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="primary-nav"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <nav className="nav" id="primary-nav" data-open={mobileOpen} aria-label="Primary">
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.id}
                className="nav__dropdown-wrap"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <Link
                  href={item.href}
                  className="nav__link"
                  aria-current={isActive(item.href) ? "page" : undefined}
                  aria-haspopup="true"
                  aria-expanded={aboutOpen}
                  onClick={() => setMobileOpen(false)}
                >
                  {NAV_LABEL[item.id][locale]}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ transform: "translateY(1px)" }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </Link>
                <ul className="nav__dropdown" data-open={aboutOpen}>
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <Link href={child.href} onClick={() => setMobileOpen(false)}>
                        <span className="nav__dd-title">{NAV_LABEL[child.id][locale]}</span>
                        <span className="nav__dd-desc">{NAV_DESC[child.id]?.[locale]}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                className="nav__link"
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {NAV_LABEL[item.id][locale]}
              </Link>
            ),
          )}

          <LanguageSwitch />

          <Link href="/contact" className="btn btn--primary" onClick={() => setMobileOpen(false)}>
            {nav.contactCta[locale]}
          </Link>
        </nav>
      </div>
    </header>
  );
}
