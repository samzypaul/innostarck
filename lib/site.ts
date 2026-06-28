export const siteConfig = {
  name: "InnoStarck",
  legalName: "InnoStarck",
  tagline: "Precision for Humanity",
  description:
    "InnoStarck is an engineering-led technology firm building high-performance web systems, intelligent IoT, AI workflow automation, and strategic data analytics with mission-critical reliability.",
  // Update this to the production domain before deploying.
  url: "https://www.innostarck.com",
  locale: "en_US",
  email: "info@innostarck.com",
  phone: "+255795600348",
  whatsapp: "255795600348",
  location: "Dar es Salaam, Tanzania",
  coordinates: { lat: -6.7924, lng: 39.2083 },
  twitter: "@innostarck",
  keywords: [
    "InnoStarck",
    "engineering technology firm",
    "high-performance web systems",
    "Next.js development",
    "IoT solutions",
    "AI workflow automation",
    "data analytics",
    "biomedical engineering",
    "Dar es Salaam software",
    "Tanzania technology",
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  {
    label: "About Us",
    href: "/about",
    children: [
      {
        label: "The Standard",
        href: "/about",
        description: "Our engineering principles",
      },
      {
        label: "Method",
        href: "/method",
        description: "How we build, step by step",
      },
      {
        label: "Leadership",
        href: "/leadership",
        description: "The team behind the work",
      },
    ],
  },
];
