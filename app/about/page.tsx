import type { Metadata } from "next";
import { StandardSection, WhySection, CtaSection } from "@/components/sections";
import { baseOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us: The InnoStarck Standard",
  description:
    "Engineering rigor borrowed from biomedical engineering, a field where error costs lives. Architectural resilience, security focused logic, and user centered design on every project, based in Dar es Salaam, Tanzania.",
  alternates: { canonical: "/about" },
  openGraph: {
    ...baseOpenGraph,
    title: "The InnoStarck Standard",
    description:
      "A mission critical mindset rooted in biomedical engineering discipline.",
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
