import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { ServicesSection, ProductsSection, WhySection, CtaSection } from "@/components/sections";
import { baseOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "InnoStarck: Engineering-Grade Software, IoT & AI Company in Tanzania",
  description:
    "InnoStarck is an engineering-led technology firm in Dar es Salaam, Tanzania, building high-performance web systems, IoT, AI automation, and data analytics with zero margin for error, for clients across Africa.",
  alternates: { canonical: "/" },
  openGraph: {
    ...baseOpenGraph,
    title: "InnoStarck: Precision for Humanity",
    description:
      "Engineering-led technology firm in Dar es Salaam, Tanzania, building the technical backbone for organizations that cannot afford to fail.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProductsSection />
      <WhySection withRule />
      <CtaSection />
    </>
  );
}
