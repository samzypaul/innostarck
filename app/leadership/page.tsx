import type { Metadata } from "next";
import { LeadershipSection, WhySection, CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Leadership — The team behind the work",
  description:
    "A statement from Managing Director Samuel Paul Mbano on why technology should be as resilient as the people it serves.",
  alternates: { canonical: "/leadership" },
  openGraph: {
    title: "InnoStarck Leadership",
    description: "The team behind the work — and the principles that drive it.",
    url: "/leadership",
  },
};

export default function LeadershipPage() {
  return (
    <>
      <LeadershipSection />
      <WhySection />
      <CtaSection />
    </>
  );
}
