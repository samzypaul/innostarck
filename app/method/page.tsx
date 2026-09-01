import type { Metadata } from "next";
import { MethodSection, StandardSection, CtaSection } from "@/components/sections";
import { baseOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "Method: From idea to deployment",
  description:
    "A disciplined path across four phases: Discovery & Ideation, Agile Development, Quality Assurance, and Deploy & Support, with full transparency and bug free deployments.",
  alternates: { canonical: "/method" },
  openGraph: {
    ...baseOpenGraph,
    title: "The InnoStarck Method",
    description: "A disciplined path from idea to deployment.",
    url: "/method",
  },
};

export default function MethodPage() {
  return (
    <>
      <MethodSection />
      <StandardSection />
      <CtaSection />
    </>
  );
}
