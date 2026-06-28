import type { Metadata } from "next";
import { StandardSection, WhySection, CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "About Us — The InnoStarck Standard",
  description:
    "Engineering rigor borrowed from biomedical engineering — a field where error costs lives. Architectural resilience, security-first logic, and user-centric design on every project.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "The InnoStarck Standard",
    description:
      "A mission-critical mindset rooted in biomedical engineering discipline.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <StandardSection />
      <WhySection />
      <CtaSection />
    </>
  );
}
