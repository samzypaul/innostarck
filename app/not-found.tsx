import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center", maxWidth: 540, margin: "0 auto" }}>
        <Eyebrow withLine={false}>Error 404 · Signal Lost</Eyebrow>
        <h1 className="h2" style={{ margin: "10px 0 18px" }}>
          This route doesn&apos;t exist.
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 18, marginBottom: 30 }}>
          The page you were looking for has moved or never existed. Let&apos;s get you back on a
          stable path.
        </p>
        <Link href="/" className="btn btn--primary">
          Return home →
        </Link>
      </div>
    </section>
  );
}
