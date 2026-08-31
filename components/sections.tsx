"use client";

import Image from "next/image";
import Link from "next/link";
import Eyebrow from "./Eyebrow";
import { ServiceIcon, ReasonIcon } from "./icons";
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
    <div className="section-head">
      <Eyebrow variant={variant}>{eyebrow}</Eyebrow>
      <h2 className="h2">{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

/* ---------- services ---------- */
export function ServicesSection({ variant = "home" }: { variant?: "home" | "services" }) {
  const { locale } = useLanguage();
  const eyebrow = variant === "services" ? servicesPageStrings.eyebrow : homeStrings.servicesEyebrow;
  const title = variant === "services" ? servicesPageStrings.title : homeStrings.servicesTitle;
  const intro = variant === "services" ? servicesPageStrings.intro : homeStrings.servicesIntro;

  return (
    <section className="section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-head">
          <Eyebrow>{eyebrow[locale]}</Eyebrow>
          <h2 className="h2" id="services-heading">
            {title[locale]}
          </h2>
          <p>{intro[locale]}</p>
        </div>
        <div className="svc-grid">
          {services.map((s, i) => (
            <article className={i === 0 ? "svc svc--feature" : "svc"} key={s.code}>
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
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- products ---------- */
export function ProductsSection() {
  const { locale } = useLanguage();
  return (
    <section className="section section--tight" aria-labelledby="products-heading">
      <div className="container">
        <div className="section-head">
          <Eyebrow>{productsStrings.eyebrow[locale]}</Eyebrow>
          <h2 className="h2" id="products-heading">
            {productsStrings.title[locale]}
          </h2>
        </div>
        <div className="product-grid">
          {products.map((p) => (
            <div className="product-card" key={p.code}>
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
          {principles.map((p) => (
            <div className="principle" key={p.code}>
              <span className="code">{p.code}</span>
              <h4>{p.title[locale]}</h4>
              <p>{p.body[locale]}</p>
            </div>
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
        <div className="section-head">
          <Eyebrow>{methodStrings.eyebrow[locale]}</Eyebrow>
          <h2 className="h2" id="method-heading">
            {methodStrings.title[locale]}
          </h2>
        </div>
        <div className="steps">
          {methodSteps.map((step) => (
            <div className="step" key={step.index}>
              <div className="step__badge">{step.index}</div>
              <div className="step__phase">{step.phase[locale]}</div>
              <h4>{step.title[locale]}</h4>
              <p>{step.body[locale]}</p>
            </div>
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
        <div className="section-head">
          <Eyebrow>{whyStrings.eyebrow[locale]}</Eyebrow>
          <h2 className="h2" id="why-heading">
            {whyStrings.title[locale]}
          </h2>
        </div>
        <div className="reasons">
          {reasons.map((r) => (
            <div className="reason" key={r.title.en}>
              <ReasonIcon name={r.icon} />
              <h4>{r.title[locale]}</h4>
              <p>{r.body[locale]}</p>
            </div>
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

/* ---------- CTA band ---------- */
export function CtaSection() {
  const { locale } = useLanguage();
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta-band">
          <Eyebrow>{ctaStrings.eyebrow[locale]}</Eyebrow>
          <h2 className="h2">{ctaStrings.title[locale]}</h2>
          <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 18 }}>{ctaStrings.body[locale]}</p>
          <div className="btn-row">
            <Link href="/contact" className="btn btn--primary">
              {ctaStrings.button[locale]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
