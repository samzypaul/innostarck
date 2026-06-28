import Link from "next/link";
import Eyebrow from "./Eyebrow";
import { ServiceIcon, ReasonIcon } from "./icons";
import {
  services,
  principles,
  methodSteps,
  reasons,
  industries,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

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
          {services.map((s) => (
            <article className="svc" key={s.code}>
              <div className="svc__top">
                <span>{s.code}</span>
                <ServiceIcon name={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="tag-row">
                {s.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
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
              <div className="step__index">
                {step.index} / {step.phase}
              </div>
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
            <a href={`mailto:${siteConfig.email}`} className="btn btn--ghost">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
