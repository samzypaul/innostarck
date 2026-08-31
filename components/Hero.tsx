"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Eyebrow from "./Eyebrow";
import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/language-provider";
import { hero as heroStrings, heroSlides as SLIDES } from "@/lib/i18n/strings";

const INTERVAL_MS = 5500;

export default function Hero() {
  const { locale } = useLanguage();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div key={s.image} className="hero__bg-slide" data-active={i === active}>
            <Image src={s.image} alt="" fill sizes="100vw" priority={i === 0} />
          </div>
        ))}
        <div className="hero__scrim" />
      </div>

      <div className="hero__coords" aria-hidden="true">
        LAT {siteConfig.coordinates.lat}
        <br />
        LNG {siteConfig.coordinates.lng}
        <br />
        DAR ES SALAAM · TZ
      </div>

      <div className="container hero__inner">
        <div className="hero__grid">
          <div className="hero__copy">
            <div key={`eyebrow-${active}`} className="hero__fade">
              <Eyebrow>{slide.eyebrow[locale]}</Eyebrow>
            </div>

            <h1 className="h1" id="hero-title">
              <span>
                Precision for <span className="accent">Humanity.</span>
              </span>
              <span>Engineering-grade</span>
              <span>resilience.</span>
            </h1>

            <p key={`lede-${active}`} className="hero__lede hero__fade">
              {slide.lede[locale]}
            </p>

            <div className="btn-row">
              <Link href="/services" className="btn btn--primary">
                {heroStrings.exploreCta[locale]}
              </Link>
              <Link href="/contact" className="btn btn--ghost">
                {heroStrings.talkCta[locale]}
              </Link>
            </div>

            <ul key={`points-${active}`} className="hero__points hero__fade">
              {slide.points[locale].map((point) => (
                <li key={point}>
                  <CheckIcon />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__visual">
            <SignalMonitor />
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SignalMonitor() {
  const { locale } = useLanguage();
  return (
    <div className="monitor" aria-hidden="true">
      <div className="monitor__bar">
        <div className="monitor__dots">
          <i />
          <i />
          <i />
        </div>
        <span>{heroStrings.systemStatus[locale]}</span>
      </div>
      <div className="monitor__screen">
        <svg viewBox="0 0 1600 170" preserveAspectRatio="none">
          <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
            <path d="M0 100 H120 L150 100 L175 58 L200 130 L228 30 L256 100 H400 L430 100 L455 58 L480 130 L508 30 L536 100 H720 L750 100 L775 58 L800 130 L828 30 L856 100 H1000" />
            <path d="M1000 100 H1120 L1150 100 L1175 58 L1200 130 L1228 30 L1256 100 H1400 L1430 100 L1455 58 L1480 130 L1508 30 L1536 100 H1600" />
          </g>
        </svg>
      </div>
      <div className="monitor__stats">
        <div className="monitor__stat">
          <div className="lbl">{heroStrings.uptime[locale]}</div>
          <div className="val">99.99<span className="accent">%</span></div>
        </div>
        <div className="monitor__stat">
          <div className="lbl">{heroStrings.marginForError[locale]}</div>
          <div className="val">0.00<span className="accent">°</span></div>
        </div>
        <div className="monitor__stat">
          <div className="lbl">{heroStrings.disciplines[locale]}</div>
          <div className="val">04</div>
        </div>
        <div className="monitor__stat">
          <div className="lbl">{heroStrings.origin[locale]}</div>
          <div className="val">Bio<span className="accent">·Eng</span></div>
        </div>
      </div>
    </div>
  );
}
