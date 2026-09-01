import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { siteConfig, baseOpenGraph } from "@/lib/site";
import { LanguageProvider } from "@/lib/i18n/language-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: Precision for Humanity`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    ...baseOpenGraph,
    url: siteConfig.url,
    title: `${siteConfig.name}: Precision for Humanity`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: `${siteConfig.name}: Precision for Humanity`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

// ProfessionalService is a LocalBusiness subtype: it keeps every Organization
// field we already had while also making the firm eligible for local-pack /
// Maps-style rich results tied to the Dar es Salaam address below.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.legalName,
  alternateName: "InnoStarck Technologies",
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  image: `${siteConfig.url}/opengraph-image`,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  sameAs: Object.values(siteConfig.social),
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dar es Salaam",
    addressCountry: "TZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.coordinates.lat,
    longitude: siteConfig.coordinates.lng,
  },
  areaServed: [
    { "@type": "Country", name: "Tanzania" },
    { "@type": "Place", name: "East Africa" },
    { "@type": "Continent", name: "Africa" },
  ],
  founder: {
    "@type": "Person",
    name: "Samuel Paul Mbano",
    jobTitle: "Managing Director",
  },
  knowsAbout: [
    "High Performance Web Systems",
    "Mobile App Development",
    "Intelligent IoT & Hardware",
    "AI & Workflow Automation",
    "Strategic Data Analytics",
  ],
  knowsLanguage: ["en", "sw"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
