import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Start a conversation",
  description:
    "Tell us what you're building and we'll tell you how we'd make it resilient. Reach InnoStarck in Dar es Salaam, Tanzania — our AI assistant replies instantly, day or night.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact InnoStarck",
    description: "Let's engineer something that doesn't break.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="section section--paper" aria-labelledby="contact-heading">
      <div className="container contact-grid">
        <div>
          <Eyebrow variant="paper">Start a Conversation</Eyebrow>
          <h2 className="h2" id="contact-heading">
            Let&apos;s engineer something that doesn&apos;t break.
          </h2>
          <p className="contact-lede">
            Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d make it resilient —
            our AI assistant replies instantly, day or night.
          </p>

          <div className="contact-info">
            <div className="contact-info__row">
              <span className="contact-info__icon" aria-hidden="true">✉</span>
              <div>
                <div className="contact-info__label">Email</div>
                <a className="contact-info__value" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </div>
            </div>
            <div className="contact-info__row">
              <span className="contact-info__icon" aria-hidden="true">◉</span>
              <div>
                <div className="contact-info__label">Headquarters</div>
                <div className="contact-info__value">{siteConfig.location}</div>
              </div>
            </div>
            <div className="contact-info__row">
              <span className="contact-info__icon" aria-hidden="true">↗</span>
              <div>
                <div className="contact-info__label">Web</div>
                <div className="contact-info__value">www.innostarck.com</div>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
