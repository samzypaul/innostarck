"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "./Eyebrow";
import { Tilt } from "./fx";
import { Reveal } from "./modern";
import { ServiceIcon, ReasonIcon } from "./icons";
import QuoteModal from "./QuoteModal";
import {
  services,
  principles,
  methodSteps,
  reasons,
  industries,
  products,
} from "@/lib/content";
import { useLanguage } from "@/lib/i18n/language-provider";
import {
  home as homeStrings,
  servicesPage as servicesPageStrings,
  products as productsStrings,
  standard as standardStrings,
  method as methodStrings,
  leadership as leadershipStrings,
  why as whyStrings,
  cta as ctaStrings,
  quoteModal as quoteModalStrings,
} from "@/lib/i18n/strings";

/* ---------- generic page header ---------- */
export function PageHeader({
  eyebrow,
  title,
  intro,
  variant = "accent",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  variant?: "accent" | "paper" | "muted";
}) {
  return (
    <Reveal>
    <div className="section-head">
      <Eyebrow variant={variant}>{eyebrow}</Eyebrow>
      <h2 className="h2">{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
    </Reveal>
  );
}

/* ---------- services ---------- */
export function ServicesSection({ variant = "home" }: { variant?: "home" | "services" }) {
  const { locale } = useLanguage();
  const eyebrow = variant === "services" ? servicesPageStrings.eyebrow : homeStrings.servicesEyebrow;
  const title = variant === "services" ? servicesPageStrings.title : homeStrings.servicesTitle;
  const intro = variant === "services" ? servicesPageStrings.intro : homeStrings.servicesIntro;
  const [quoteService, setQuoteService] = useState<string | null>(null);

  return (
    <section className="section" aria-labelledby="services-heading">
      <div className="container">
        <Reveal>
        <div className="section-head">
          <Eyebrow>{eyebrow[locale]}</Eyebrow>
          <h2 className="h2" id="services-heading">
            {title[locale]}
          </h2>
          <p>{intro[locale]}</p>
        </div>
        </Reveal>
        <div className="svc-grid">
          {services.map((s, i) => (
            <Reveal key={s.code} delay={(i % 2) * 100} className={i === 0 ? "span-all" : ""}>
            <Tilt className="tilt-round" max={5}>
            <article className={i === 0 ? "svc svc--feature" : "svc"}>
              <div className="svc__image">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </div>
              <div className="svc__row">
                <div className="svc__top">
                  <span>{s.code}</span>
                  <ServiceIcon name={s.icon} />
                </div>
                <div className="svc__body">
                  <h3>{s.title[locale]}</h3>
                  <p>{s.body[locale]}</p>
                  <div className="tag-row">
                    {s.tags[locale].map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    style={{ marginTop: 20 }}
                    onClick={() => setQuoteService(s.title[locale])}
                  >
                    {quoteModalStrings.getQuote[locale]}
                  </button>
                </div>
              </div>
            </article>
            </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
      <QuoteModal service={quoteService} onClose={() => setQuoteService(null)} />
    </section>
  );
}

/* ---------- products ---------- */
export function ProductsSection() {
  const { locale } = useLanguage();
  return (
    <section className="section section--tight" aria-labelledby="products-heading">
      <div className="container">
        <Reveal>
        <div className="section-head">
          <Eyebrow>{productsStrings.eyebrow[locale]}</Eyebrow>
          <h2 className="h2" id="products-heading">
            {productsStrings.title[locale]}
          </h2>
        </div>
        </Reveal>
        <div className="product-grid">
          {products.map((p) => (
            <Reveal key={p.code}>
            <Tilt className="tilt-round" max={4}>
            <div className="product-card">
              <div className="product-card__mock" aria-hidden="true">
                <div className="product-card__mock-bar">
                  <span className="product-card__mock-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="product-card__mock-url">{p.url.replace("https://", "")}</span>
                </div>
                <div className="pmock">
                  <div className="pmock__sidebar">
                    <span className="pmock__logo" />
                    <span className="pmock__nav pmock__nav--active" />
                    <span className="pmock__nav" />
                    <span className="pmock__nav" />
                    <span className="pmock__nav" />
                    <span className="pmock__nav" />
                  </div>
                  <div className="pmock__main">
                    <div className="pmock__topbar">
                      <span className="pmock__search">Search or jump to a page…</span>
                      <span className="pmock__avatar">SA</span>
                    </div>
                    <div className="pmock__body">
                      <div className="pmock__stats">
                        <div className="pmock__stat">
                          <span className="pmock__stat-icon" />
                          <div className="pmock__stat-label">Revenue</div>
                          <div className="pmock__stat-value">128,400</div>
                        </div>
                        <div className="pmock__stat">
                          <span className="pmock__stat-icon" />
                          <div className="pmock__stat-label">Net margin</div>
                          <div className="pmock__stat-value pmock__stat-value--up">42%</div>
                        </div>
                        <div className="pmock__stat">
                          <span className="pmock__stat-icon" />
                          <div className="pmock__stat-label">Liquidity</div>
                          <div className="pmock__stat-value">54,200</div>
                        </div>
                        <div className="pmock__stat">
                          <span className="pmock__stat-icon pmock__stat-icon--warn" />
                          <div className="pmock__stat-label">Low stock</div>
                          <div className="pmock__stat-value pmock__stat-value--warn">3</div>
                        </div>
                      </div>
                      <div className="pmock__chart">
                        <svg viewBox="0 0 400 110" preserveAspectRatio="none">
                          <path
                            className="pmock__chart-fill"
                            d="M0 90 L40 88 L80 92 L120 60 L160 85 L200 40 L240 70 L280 30 L320 55 L360 20 L400 45 V110 H0 Z"
                          />
                          <path
                            className="pmock__chart-line"
                            d="M0 90 L40 88 L80 92 L120 60 L160 85 L200 40 L240 70 L280 30 L320 55 L360 20 L400 45"
                            fill="none"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="product-card__body">
                <span className="tag tag--live">{productsStrings.liveProduct[locale]}</span>
                <h3>{p.name}</h3>
                <p className="product-card__tagline">{p.tagline[locale]}</p>
                <p>{p.body[locale]}</p>
                <div className="tag-row">
                  {p.tags[locale].map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  className="btn btn--ink"
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 24 }}
                >
                  {productsStrings.viewSystem[locale]}
                </a>
              </div>
            </div>
            </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- the standard ---------- */
export function StandardSection() {
  const { locale } = useLanguage();
  return (
    <section className="section section--paper" aria-labelledby="standard-heading">
      <div className="container split">
        <div>
          <Eyebrow variant="paper">{standardStrings.eyebrow[locale]}</Eyebrow>
          <h2 className="h2" id="standard-heading">
            {standardStrings.title[locale]}
          </h2>
          <p>{standardStrings.para1[locale]}</p>
          <p>
            <strong>{standardStrings.para2[locale]}</strong>
          </p>
          <Link href="/leadership" className="btn btn--paper-ghost" style={{ marginTop: 14 }}>
            {standardStrings.cta[locale]}
          </Link>
        </div>
        <div className="principles">
          {principles.map((p, i) => (
            <Reveal key={p.code} delay={i * 100}>
              <Tilt className="tilt-round">
                <div className="principle">
                  <span className="code">{p.code}</span>
                  <h4>{p.title[locale]}</h4>
                  <p>{p.body[locale]}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- method ---------- */
export function MethodSection() {
  const { locale } = useLanguage();
  return (
    <section className="section" aria-labelledby="method-heading">
      <div className="container">
        <Reveal>
        <div className="section-head">
          <Eyebrow>{methodStrings.eyebrow[locale]}</Eyebrow>
          <h2 className="h2" id="method-heading">
            {methodStrings.title[locale]}
          </h2>
        </div>
        </Reveal>
        <div className="steps">
          {methodSteps.map((step, i) => (
            <Reveal key={step.index} delay={i * 100}>
              <Tilt className="tilt-round">
                <div className="step">
                  <div className="step__badge">{step.index}</div>
                  <div className="step__phase">{step.phase[locale]}</div>
                  <h4>{step.title[locale]}</h4>
                  <p>{step.body[locale]}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- leadership quote ---------- */
export function LeadershipSection() {
  const { locale } = useLanguage();
  return (
    <section className="section section--paper" aria-labelledby="leadership-heading">
      <div className="container">
        <div className="quote-card">
          <div className="quote-card__grid" aria-hidden="true" />
          <div className="quote-card__mark" aria-hidden="true">
            &ldquo;
          </div>
          <blockquote id="leadership-heading">{leadershipStrings.quote[locale]}</blockquote>
          <div className="quote-author">
            <div className="quote-author__avatar" aria-hidden="true">
              SM
            </div>
            <div>
              <div className="quote-author__name">Samuel Paul Mbano</div>
              <div className="quote-author__role">{leadershipStrings.role[locale]}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- why partner + industries ---------- */
export function WhySection({ withRule = false }: { withRule?: boolean }) {
  const { locale } = useLanguage();
  return (
    <section className="section section--tight" aria-labelledby="why-heading">
      <div className="container">
        {withRule && <div className="dashed-rule" aria-hidden="true" />}
        <Reveal>
        <div className="section-head">
          <Eyebrow>{whyStrings.eyebrow[locale]}</Eyebrow>
          <h2 className="h2" id="why-heading">
            {whyStrings.title[locale]}
          </h2>
        </div>
        </Reveal>
        <div className="reasons">
          {reasons.map((r, i) => (
            <Reveal key={r.title.en} delay={i * 100}>
              <Tilt className="tilt-card">
                <div className="reason tilt-reset">
                  <ReasonIcon name={r.icon} />
                  <h4>{r.title[locale]}</h4>
                  <p>{r.body[locale]}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <div className="industries">
          <span className="industries__label">{whyStrings.industriesLabel[locale]}</span>
          <div className="industries__list">
            {industries[locale].map((name) => (
              <span className="pill" key={name}>
                <i className="pill__dot" aria-hidden="true" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- animated wave lines behind the CTA ---------- */
const WAVES = [
  "M-100 320C100 220 250 420 500 320S900 200 1500 300",
  "M-100 360C100 260 250 460 500 360S900 240 1500 340",
  "M-100 400C100 300 250 500 500 400S900 280 1500 380",
  "M-100 280C100 180 250 380 500 280S900 160 1500 260",
  "M-100 240C100 140 250 340 500 240S900 120 1500 220",
];
function CtaWaves() {
  return (
    <svg className="cta-waves" viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ctaw" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#18cbae" />
          <stop offset="1" stopColor="#5b6cff" />
        </linearGradient>
      </defs>
      {WAVES.map((d, i) => (
        <g key={i} className="cta-wave" style={{ animationDelay: `${-i * 1.6}s` }}>
          <path d={d} stroke="url(#ctaw)" strokeWidth="1.5" opacity={0.35 + (i % 3) * 0.12} />
          <path
            d={d}
            className="cta-pulse"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1000}
            style={{ animationDelay: `${-i * 1.9}s`, animationDuration: `${7 + i}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ---------- CTA band ---------- */
export function CtaSection() {
  const { locale } = useLanguage();
  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal>
        <div className="cta-band">
          <CtaWaves />
          <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
          <Eyebrow>{ctaStrings.eyebrow[locale]}</Eyebrow>
          <h2 className="h2">{ctaStrings.title[locale]}</h2>
          <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 18 }}>{ctaStrings.body[locale]}</p>
          <div className="btn-row">
            <Link href="/contact" className="btn btn--primary">
              {ctaStrings.button[locale]}
            </Link>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
