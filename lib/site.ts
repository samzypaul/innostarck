export const siteConfig = {
  name: "InnoStarck",
  legalName: "InnoStarck",
  tagline: "Precision for Humanity",
  description:
    "InnoStarck is an engineering-led technology firm based in Dar es Salaam, Tanzania, building high-performance web systems, intelligent IoT, AI workflow automation, and strategic data analytics for organizations across Africa.",
  // Update this to the production domain before deploying.
  url: "https://www.innostarck.com",
  locale: "en_TZ",
  alternateLocales: ["sw_TZ"],
  email: "info@innostarck.com",
  phone: "+255795600348",
  whatsapp: "255795600348",
  location: "Dar es Salaam, Tanzania",
  coordinates: { lat: -6.7924, lng: 39.2083 },
  twitter: "@innostarck",
  social: {
    instagram: "https://www.instagram.com/inno_starck",
    linkedin: "https://www.linkedin.com/company/innostarck",
  },
  keywords: [
    "InnoStarck",
    "InnoStarck Tanzania",
    "engineering technology firm",
    "software company Tanzania",
    "software company Dar es Salaam",
    "IT company Tanzania",
    "web development company Tanzania",
    "web development company Africa",
    "app development Tanzania",
    "mobile app developers Tanzania",
    "high-performance web systems",
    "Next.js development",
    "IoT solutions",
    "IoT company East Africa",
    "AI workflow automation",
    "data analytics",
    "biomedical engineering",
    "Dar es Salaam software",
    "Tanzania technology company",
    "East Africa technology company",
  ],
} as const;

// Next.js does NOT deep-merge `openGraph` between a layout and a page — a
// page that sets its own `openGraph` fully replaces the parent's, dropping
// type/siteName/locale unless the page repeats them. Every page's `openGraph`
// should spread this first so those fields always render.
export const baseOpenGraph = {
  type: "website" as const,
  siteName: siteConfig.name,
  locale: siteConfig.locale,
  alternateLocale: [...siteConfig.alternateLocales],
};

export type NavId = "home" | "services" | "about" | "standard" | "method" | "leadership";

export type NavItem = {
  id: NavId;
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "services", label: "Services", href: "/services" },
  {
    id: "about",
    label: "About Us",
    href: "/about",
    children: [
      {
        id: "standard",
        label: "The Standard",
        href: "/about",
        description: "Our engineering principles",
      },
      {
        id: "method",
        label: "Method",
        href: "/method",
        description: "How we build, step by step",
      },
      {
        id: "leadership",
        label: "Leadership",
        href: "/leadership",
        description: "The team behind the work",
      },
    ],
  },
];
