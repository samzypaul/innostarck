import type { Metadata } from "next";
import { LeadershipSection, WhySection, CtaSection } from "@/components/sections";
import { baseOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leadership: The team behind the work",
  description:
    "A statement from Managing Director Samuel Paul Mbano on why technology should be as resilient as the people it serves, leading InnoStarck from Dar es Salaam, Tanzania.",
  alternates: { canonical: "/leadership" },
  openGraph: {
    ...baseOpenGraph,
    title: "InnoStarck Leadership",
    description: "The team behind the work, and the principles that drive it.",
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
