import Image from "next/image";
import Link from "next/link";
import Eyebrow from "./Eyebrow";
import { siteConfig } from "@/lib/site";

const VALUE_POINTS = [
  "Four engineering disciplines under one roof — web, IoT, AI, and data.",
  "A biomedical-engineering mindset: zero margin for error.",
  "Live software you can use today, not just a portfolio of ideas.",
  "Built in Dar es Salaam, measured against global standards.",
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="grid-bg" aria-hidden="true" />
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
            <Eyebrow>Engineering-Led Technology Firm</Eyebrow>
            <h1 className="h1" id="hero-title">
              <span>
                Precision for <span className="accent">Humanity.</span>
              </span>
              <span>Engineering-grade</span>
              <span>resilience.</span>
            </h1>
            <p className="hero__lede">
              We build the technical backbone for organizations that cannot afford to fail —
              bridging complex engineering with digital systems engineered for absolute
              reliability.
            </p>
            <div className="btn-row">
              <Link href="/services" className="btn btn--primary">
                Explore our solutions →
              </Link>
              <Link href="/contact" className="btn btn--ghost">
                Talk to our engineers
              </Link>
            </div>
            <ul className="hero__points">
              {VALUE_POINTS.map((point) => (
                <li key={point}>
                  <CheckIcon />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__visual">
            <div className="hero__photo">
              <Image
                src="/images/hero-team.jpg"
                alt="Engineers collaborating across screens on a build"
                fill
                sizes="(max-width: 980px) 100vw, 620px"
                priority
              />
            </div>
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
  return (
    <div className="monitor" aria-hidden="true">
      <div className="monitor__bar">
        <div className="monitor__dots">
          <i />
          <i />
          <i />
        </div>
        <span>SYSTEM STATUS — NOMINAL · 0 ERR</span>
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
          <div className="lbl">Uptime</div>
          <div className="val">99.99<span className="accent">%</span></div>
        </div>
        <div className="monitor__stat">
          <div className="lbl">Margin for error</div>
          <div className="val">0.00<span className="accent">°</span></div>
        </div>
        <div className="monitor__stat">
          <div className="lbl">Disciplines</div>
          <div className="val">04</div>
        </div>
        <div className="monitor__stat">
          <div className="lbl">Origin</div>
          <div className="val">Bio<span className="accent">·Eng</span></div>
        </div>
      </div>
    </div>
  );
}
