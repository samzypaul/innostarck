import type { Metadata } from "next";
import { ServicesSection, MethodSection, WhySection, CtaSection } from "@/components/sections";
import { baseOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services: Web, IoT, AI & Data Analytics in Tanzania",
  description:
    "Four integrated disciplines: high-performance web systems, intelligent IoT & hardware, AI & workflow automation, and strategic data analytics, engineered to work as one system for businesses across Tanzania and East Africa.",
  alternates: { canonical: "/services" },
  openGraph: {
    ...baseOpenGraph,
    title: "InnoStarck Services: Web, IoT, AI & Data",
    description:
      "Four integrated engineering disciplines built to work as one resilient system.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesSection variant="services" />
      <MethodSection />
      <WhySection />
      <CtaSection />
    </>
  );
}
