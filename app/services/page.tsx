import type { Metadata } from "next";
import { ServicesSection, MethodSection, WhySection, CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Services — Web, IoT, AI & Data Analytics",
  description:
    "Four integrated disciplines: high-performance web systems, intelligent IoT & hardware, AI & workflow automation, and strategic data analytics — engineered to work as one system.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "InnoStarck Services — Web, IoT, AI & Data",
    description:
      "Four integrated engineering disciplines built to work as one resilient system.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesSection
        eyebrow="Core Service Pillars"
        title="The high-performance hub of your digital operations."
        intro="Four integrated disciplines, engineered to work as one system rather than four disconnected tools. Explore how each fits your operation."
      />
      <MethodSection />
      <WhySection />
      <CtaSection />
    </>
  );
}
