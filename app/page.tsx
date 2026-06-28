import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { ServicesSection, WhySection, CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "InnoStarck — Engineering-grade resilience for mission-critical systems",
  description:
    "InnoStarck is an engineering-led technology firm in Dar es Salaam building high-performance web systems, IoT, AI automation, and data analytics with zero margin for error.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "InnoStarck — Precision for Humanity",
    description:
      "Engineering-led technology firm building the technical backbone for organizations that cannot afford to fail.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhySection withRule />
      <CtaSection />
    </>
  );
}
