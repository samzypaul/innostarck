"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Eyebrow from "./Eyebrow";
import { useLanguage } from "@/lib/i18n/language-provider";
import { modern } from "@/lib/i18n/strings";

/* Fades children in once they scroll into view. */
export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal" data-seen={seen} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* Scrolling strip of capabilities. */
export function Marquee() {
  const { locale } = useLanguage();
  const items = modern.marquee[locale];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((n) => (
          <div className="marquee__group" key={n}>
            {items.map((t) => (
              <span key={t}>
                <i />
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  const shown = Number.isInteger(value) ? Math.round(n) : n.toFixed(1);
  return (
    <span ref={ref}>
      {shown}
      <em>{suffix}</em>
    </span>
  );
}

export function StatsBand() {
  const { locale } = useLanguage();
  return (
    <section className="statsband" aria-label="Key figures">
      <div className="container statsband__grid">
        {modern.stats.map((s) => (
          <Reveal key={s.label.en}>
            <div className="statsband__item">
              <div className="statsband__value">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="statsband__label">{s.label[locale]}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AboutSplit() {
  const { locale } = useLanguage();
  return (
    <section className="section" aria-labelledby="about-split-heading">
      <div className="container aboutsplit">
        <Reveal>
          <div className="aboutsplit__art">
            <Image src="/images/about-orbit.svg" alt="" width={800} height={800} />
            <span className="aboutsplit__chip aboutsplit__chip--a">Web</span>
            <span className="aboutsplit__chip aboutsplit__chip--b">Mobile</span>
            <span className="aboutsplit__chip aboutsplit__chip--c">AI</span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <Eyebrow>{modern.aboutEyebrow[locale]}</Eyebrow>
            <h2 className="h2" id="about-split-heading">
              {modern.aboutTitle[locale]}
            </h2>
            <p className="aboutsplit__body">{modern.aboutBody[locale]}</p>
            <ul className="aboutsplit__list">
              {modern.aboutPoints[locale].map((p) => (
                <li key={p}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn btn--ink">
              {modern.aboutCta[locale]} →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
