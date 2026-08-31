import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
          background: "linear-gradient(135deg, #060a0d 0%, #0a1a1e 55%, #0a0e12 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 44 }}>
          <svg width="64" height="64" viewBox="0 0 96 96">
            <rect width="96" height="96" rx="20" fill="#18CBAE" />
            <path
              fillRule="evenodd"
              fill="#0A0E12"
              d="M48 14 C50.5 44 60 53.5 90 56 C60 58.5 50.5 68 48 98 C45.5 68 36 58.5 6 56 C36 53.5 45.5 44 48 14 Z"
              transform="translate(0 -8)"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 46, fontWeight: 700, letterSpacing: -1 }}>
            <span style={{ color: "#9aa4ad" }}>Inno</span>
            <span style={{ color: "#18CBAE" }}>Starck</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5 }}>
            Precision for Humanity.
          </div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.72)", fontSize: 30, lineHeight: 1.4 }}>
            Engineering-grade web, IoT, AI &amp; data systems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 56,
            fontSize: 26,
            color: "#18CBAE",
            fontFamily: "monospace",
            letterSpacing: 2,
          }}
        >
          DAR ES SALAAM, TANZANIA · SERVING AFRICA
        </div>
      </div>
    ),
    { ...size },
  );
}
