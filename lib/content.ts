// Shared content used across multiple pages. Keeping it here keeps pages DRY.

export type Service = {
  code: string;
  title: string;
  body: string;
  tags: string[];
  icon: "web" | "iot" | "ai" | "data";
};

export const services: Service[] = [
  {
    code: "SVC.01",
    title: "High-Performance Web Systems",
    body: "Bespoke architectures built for complex business logic, high concurrency, security, and long-term scale.",
    tags: ["Next.js", "High-concurrency", "Secure by design"],
    icon: "web",
  },
  {
    code: "SVC.02",
    title: "Intelligent IoT & Hardware",
    body: "The nervous system of your business — physical hardware fused to digital platforms for real-time monitoring.",
    tags: ["Sensors", "Telemetry", "Remote control"],
    icon: "iot",
  },
  {
    code: "SVC.03",
    title: "AI & Workflow Automation",
    body: "The brain for your operations — automation that removes repetition, eliminates human error, and frees your team.",
    tags: ["Pipelines", "Predictive", "Zero-error"],
    icon: "ai",
  },
  {
    code: "SVC.04",
    title: "Strategic Data Analytics",
    body: "Raw data into strategic asset. Advanced modeling that surfaces growth opportunities before they arrive.",
    tags: ["Modeling", "Forecasting", "Dashboards"],
    icon: "data",
  },
];

export type Principle = { code: string; title: string; body: string };

export const principles: Principle[] = [
  {
    code: "PR.01",
    title: "Architectural Resilience",
    body: "Systems designed to absorb rapid growth and immense pressure without faltering.",
  },
  {
    code: "PR.02",
    title: "Security-First Logic",
    body: "Data protected from the ground up with engineering-grade protocols, not afterthoughts.",
  },
  {
    code: "PR.03",
    title: "User-Centric Design",
    body: "Complex capability translated into interfaces that feel effortless for the humans using them.",
  },
];

export type Step = { index: string; phase: string; title: string; body: string };

export const methodSteps: Step[] = [
  {
    index: "01",
    phase: "Discovery",
    title: "Discovery & Ideation",
    body: "We map your business logic, audience, and constraints before a single line is written.",
  },
  {
    index: "02",
    phase: "Build",
    title: "Agile Development",
    body: "Iterative sprints deliver functional features with full transparency and flexibility.",
  },
  {
    index: "03",
    phase: "Verify",
    title: "Quality Assurance",
    body: "Automated and manual testing across the lifecycle guarantees bug-free deployments.",
  },
  {
    index: "04",
    phase: "Ship",
    title: "Deploy & Support",
    body: "A seamless launch followed by dedicated maintenance built to scale with you.",
  },
];

export type Reason = { icon: "target" | "link" | "globe"; title: string; body: string };

export const reasons: Reason[] = [
  {
    icon: "target",
    title: "Systemic Thinking",
    body: "We never look at a website in isolation — we engineer how it integrates with your entire business ecosystem.",
  },
  {
    icon: "link",
    title: "Hardware–Software Synergy",
    body: "One of few firms that reliably connect physical operations directly to real-time digital dashboards.",
  },
  {
    icon: "globe",
    title: "Local Context, Global Standards",
    body: "Built in Dar es Salaam for real local infrastructure — measured against global performance benchmarks.",
  },
];

export const industries: string[] = [
  "Finance & Fintech",
  "Healthcare & MedTech",
  "Retail & E-Commerce",
  "Logistics & Supply Chain",
];
