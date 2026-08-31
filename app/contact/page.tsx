import type { Metadata } from "next";
import ContactIntro from "@/components/ContactIntro";
import ContactForm from "@/components/ContactForm";
import { baseOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact: Start a conversation",
  description:
    "Tell us what you're building and we'll tell you how we'd make it resilient. Reach InnoStarck in Dar es Salaam, Tanzania. Our AI assistant replies instantly, day or night.",
  alternates: { canonical: "/contact" },
  openGraph: {
    ...baseOpenGraph,
    title: "Contact InnoStarck",
    description: "Let's engineer something that doesn't break.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="section section--paper" aria-labelledby="contact-heading">
      <div className="container contact-grid">
        <ContactIntro />
        <ContactForm />
      </div>
    </section>
  );
}
