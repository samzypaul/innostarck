import type { Service, Reason } from "@/lib/content";

const base = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  "aria-hidden": true,
} as const;

export function ServiceIcon({ name }: { name: Service["icon"] }) {
  switch (name) {
    case "web":
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 9h18M8 21h8" />
        </svg>
      );
    case "iot":
      return (
        <svg {...base}>
          <rect x="7" y="7" width="10" height="10" rx="1" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
        </svg>
      );
    case "ai":
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
        </svg>
      );
    case "data":
      return (
        <svg {...base}>
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 3 3 5-6" />
        </svg>
      );
  }
}

export function ReasonIcon({ name }: { name: Reason["icon"] }) {
  const p = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true } as const;
  switch (name) {
    case "target":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        </svg>
      );
    case "link":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="13" width="8" height="8" rx="1" />
          <path d="M11 7h4a2 2 0 0 1 2 2v4" />
        </svg>
      );
    case "globe":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
        </svg>
      );
  }
}
