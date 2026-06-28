import type { Metadata } from "next";
import { PageHeader } from "@/components/sections";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of InnoStarck's web systems, IoT integration, AI automation, and data analytics services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container legal">
        <PageHeader eyebrow="Legal" title="Terms of Service" />
        <p className="legal__date">Effective Date: May 2, 2026</p>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using the digital platforms and web systems provided by Inno Starck, you
          agree to be bound by these Terms of Service. If you do not agree, you must immediately
          cease use of our services.
        </p>

        <h3>2. Description of Services</h3>
        <p>
          Inno Starck provides custom web systems, IoT integration, AI-driven automation, and
          predictive data analytics. Our services are tailored for complex business logic and require
          the client to provide accurate operational constraints during the architectural phase.
        </p>

        <h3>3. System Resilience and Availability</h3>
        <p>
          While we architect systems with a &apos;Mission-Critical&apos; mindset for zero margin of
          error, Inno Starck does not guarantee absolute, uninterrupted uptime due to factors beyond
          our control, including global network outages or hardware degradation outside our immediate
          oversight.
        </p>

        <h3>4. Intellectual Property Rights</h3>
        <p>
          All systemic architectures, underlying codebases, proprietary algorithms, and designs
          produced by Inno Starck remain our exclusive intellectual property, unless specifically
          transferred via a separate legal software licensing agreement with the client.
        </p>

        <h3>5. Governing Law</h3>
        <p>
          These terms shall be governed by and construed in accordance with the laws of Tanzania. Any
          disputes relating to these terms will be subject to the exclusive jurisdiction of the
          courts of Dar es Salaam.
        </p>
      </div>
    </section>
  );
}
