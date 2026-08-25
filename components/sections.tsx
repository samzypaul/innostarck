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
export function ServicesSection({
  eyebrow = "Core Service Pillars",
  title = "Not a web agency. The high-performance hub of your digital operations.",
  intro = "Four integrated disciplines, engineered to work as one system rather than four disconnected tools.",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-head">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="h2" id="services-heading">
            {title}
          </h2>
          <p>{intro}</p>
        </div>
        <div className="svc-grid">
          {services.map((s, i) => (
            <article className={i === 0 ? "svc svc--feature" : "svc"} key={s.code}>
              <div className="svc__top">
                <span>{s.code}</span>
                <ServiceIcon name={s.icon} />
              </div>
              <div className="svc__body">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="tag-row">
                  {s.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
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
  return (
    <section className="section section--tight" aria-labelledby="products-heading">
      <div className="container">
        <div className="section-head">
          <Eyebrow>From Our Own Stack</Eyebrow>
          <h2 className="h2" id="products-heading">
            Software we&apos;ve built and use ourselves — ready for your business today.
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
                <span className="tag tag--live">● Live product</span>
                <h3>{p.name}</h3>
                <p className="product-card__tagline">{p.tagline}</p>
                <p>{p.body}</p>
                <div className="tag-row">
                  {p.tags.map((t) => (
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
                  View system →
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
  return (
    <section className="section section--paper" aria-labelledby="standard-heading">
      <div className="container split">
        <div>
          <Eyebrow variant="paper">The InnoStarck Standard</Eyebrow>
          <h2 className="h2" id="standard-heading">
            Engineering rigor, borrowed from a field where error costs lives.
          </h2>
          <p>
            Our approach is rooted in the discipline of Biomedical Engineering. In a field where
            precision is a matter of life and death, the most resilient systems are those built with
            zero margin for error.
          </p>
          <p>
            We bring that <strong>mission-critical mindset</strong> to every project — whether
            we&apos;re architecting a corporate platform or a nationwide logistics tracker.
          </p>
          <Link href="/leadership" className="btn btn--paper-ghost" style={{ marginTop: 14 }}>
            Read the founder&apos;s statement →
          </Link>
        </div>
        <div className="principles">
          {principles.map((p) => (
            <div className="principle" key={p.code}>
              <span className="code">{p.code}</span>
              <h4>{p.title}</h4>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- method ---------- */
export function MethodSection() {
  return (
    <section className="section" aria-labelledby="method-heading">
      <div className="container">
        <div className="section-head">
          <Eyebrow>The Methodology</Eyebrow>
          <h2 className="h2" id="method-heading">
            A disciplined path from idea to deployment.
          </h2>
        </div>
        <div className="steps">
          {methodSteps.map((step) => (
            <div className="step" key={step.index}>
              <div className="step__badge">{step.index}</div>
              <div className="step__phase">{step.phase}</div>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- leadership quote ---------- */
export function LeadershipSection() {
  return (
    <section className="section section--paper" aria-labelledby="leadership-heading">
      <div className="container">
        <div className="quote-card">
          <div className="quote-card__grid" aria-hidden="true" />
          <div className="quote-card__mark" aria-hidden="true">
            &ldquo;
          </div>
          <blockquote id="leadership-heading">
            Technology should be as resilient as the people it serves. My foundation in{" "}
            <em>Biomedical Engineering</em> taught me that excellence is never an accident — it&apos;s
            the result of disciplined architecture and a commitment to precision.
          </blockquote>
          <div className="quote-author">
            <div className="quote-author__avatar" aria-hidden="true">
              SM
            </div>
            <div>
              <div className="quote-author__name">Samuel Paul Mbano</div>
              <div className="quote-author__role">Managing Director, InnoStarck</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- why partner + industries ---------- */
export function WhySection({ withRule = false }: { withRule?: boolean }) {
  return (
    <section className="section section--tight" aria-labelledby="why-heading">
      <div className="container">
        {withRule && <div className="dashed-rule" aria-hidden="true" />}
        <div className="section-head">
          <Eyebrow>Why Partner With Us</Eyebrow>
          <h2 className="h2" id="why-heading">
            Three reasons clients trust us with mission-critical work.
          </h2>
        </div>
        <div className="reasons">
          {reasons.map((r) => (
            <div className="reason" key={r.title}>
              <ReasonIcon name={r.icon} />
              <h4>{r.title}</h4>
              <p>{r.body}</p>
            </div>
          ))}
        </div>

        <div className="industries">
          <span className="industries__label">Industries We Serve</span>
          <div className="industries__list">
            {industries.map((name) => (
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
export function CtaSection({
  title = "Let's engineer something that doesn't break.",
  body = "Tell us what you're building. We'll tell you how we'd make it resilient.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta-band">
          <Eyebrow>Start a Conversation</Eyebrow>
          <h2 className="h2">{title}</h2>
          <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 18 }}>{body}</p>
          <div className="btn-row">
            <Link href="/contact" className="btn btn--primary">
              Talk to our engineers →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
