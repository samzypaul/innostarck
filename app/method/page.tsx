import type { Metadata } from "next";
import { MethodSection, StandardSection, CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Method — From idea to deployment",
  description:
    "A disciplined four-phase path: Discovery & Ideation, Agile Development, Quality Assurance, and Deploy & Support — full transparency and bug-free deployments.",
  alternates: { canonical: "/method" },
  openGraph: {
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
