import Link from "next/link";
import Logo from "./Logo";
import OpenChatButton from "./OpenChatButton";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Logo large />
            <p className="footer__blurb">
              Precision-driven. Human-centered. Engineering the digital future for your enterprise.
            </p>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h5>Navigate</h5>
              <Link href="/services">Services</Link>
              <Link href="/about">The Standard</Link>
              <Link href="/method">Method</Link>
              <Link href="/leadership">Leadership</Link>
            </div>
            <div className="footer__col">
              <h5>Legal</h5>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
            <div className="footer__col">
              <h5>Reach</h5>
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
            <div className="t">Meet the InnoStarck AI Assistant</div>
            <div className="d">
              Your first line of contact — instant, precise answers 24/7, with a human specialist
              stepping in the moment your project needs one.
            </div>
          </div>
          <OpenChatButton className="btn btn--primary">Chat now →</OpenChatButton>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} InnoStarck. All rights reserved.</span>
          <span className="footer__motto">{siteConfig.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
