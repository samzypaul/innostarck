// Shared content used across multiple pages. Keeping it here keeps pages DRY.
// Translatable text is a { en, sw } pair everywhere, so English and Swahili
// stay side by side and nothing can silently miss a translation.

type Pair<T = string> = { en: T; sw: T };

export type Service = {
  code: string;
  title: Pair;
  body: Pair;
  tags: Pair<string[]>;
  icon: "web" | "iot" | "ai" | "data" | "mobile";
  image: string;
};

export const services: Service[] = [
  {
    code: "SVC.01",
    title: { en: "High-Performance Web Systems", sw: "Mifumo ya Wavuti yenye Utendaji wa Juu" },
    body: {
      en: "Bespoke architectures built for complex business logic, high concurrency, security, and long-term scale.",
      sw: "Miundo maalum iliyojengwa kwa ajili ya mantiki changamano ya biashara, matumizi ya wingi kwa wakati mmoja, usalama, na ukuaji wa muda mrefu.",
    },
    tags: {
      en: ["Next.js", "High-concurrency", "Secure by design"],
      sw: ["Next.js", "Matumizi ya wingi", "Usalama kwa muundo"],
    },
    icon: "web",
    image: "/images/svc-web.jpg",
  },
  {
    code: "SVC.02",
    title: { en: "Intelligent IoT & Hardware", sw: "IoT na Vifaa vyenye Akili" },
    body: {
      en: "The nervous system of your business: physical hardware fused to digital platforms, so you can monitor what's happening in real time.",
      sw: "Mfumo wa fahamu wa biashara yako: vifaa halisi vilivyounganishwa na mifumo ya kidijitali, ili uweze kufuatilia kinachoendelea kwa wakati halisi.",
    },
    tags: { en: ["Sensors", "Telemetry", "Remote control"], sw: ["Sensa", "Ufuatiliaji wa mbali", "Udhibiti wa mbali"] },
    icon: "iot",
    image: "/images/svc-iot.jpg",
  },
  {
    code: "SVC.03",
    title: { en: "AI & Workflow Automation", sw: "AI na Uendeshaji wa Kiotomatiki" },
    body: {
      en: "The brain for your operations. Automation that removes repetition, eliminates human error, and frees your team to focus on what matters.",
      sw: "Ubongo wa shughuli zako. Uendeshaji wa kiotomatiki unaoondoa urudufishaji, kupunguza makosa ya kibinadamu, na kuipa timu yako nafasi ya kuzingatia yaliyo muhimu.",
    },
    tags: { en: ["Pipelines", "Predictive", "Zero-error"], sw: ["Mifumo ya kazi", "Utabiri", "Bila makosa"] },
    icon: "ai",
    image: "/images/svc-ai.jpg",
  },
  {
    code: "SVC.04",
    title: { en: "Strategic Data Analytics", sw: "Uchambuzi wa Kimkakati wa Takwimu" },
    body: {
      en: "We turn raw data into a strategic asset, with modeling that surfaces growth opportunities before they arrive.",
      sw: "Tunageuza takwimu ghafi kuwa rasilimali ya kimkakati, kwa kutumia uigaji unaobainisha fursa za ukuaji kabla hazijafika.",
    },
    tags: { en: ["Modeling", "Forecasting", "Dashboards"], sw: ["Uigaji", "Utabiri", "Dashibodi"] },
    icon: "data",
    image: "/images/svc-data.jpg",
  },
  {
    code: "SVC.05",
    title: { en: "Mobile App Development", sw: "Uundaji wa Programu za Simu" },
    body: {
      en: "Native apps for iOS and Android, built to hold up under real-world use, from field teams to customer-facing products.",
      sw: "Programu asili za iOS na Android, zilizojengwa kustahimili matumizi halisi, kuanzia timu za uwandani hadi bidhaa zinazowahudumia wateja.",
    },
    tags: {
      en: ["iOS & Android", "Native performance", "App store ready"],
      sw: ["iOS na Android", "Utendaji asili", "Tayari kwa App Store"],
    },
    icon: "mobile",
    image: "/images/svc-mobile.jpg",
  },
];

export type Principle = { code: string; title: Pair; body: Pair };

export const principles: Principle[] = [
  {
    code: "PR.01",
    title: { en: "Architectural Resilience", sw: "Uimara wa Muundo" },
    body: {
      en: "Systems designed to absorb rapid growth and immense pressure without faltering.",
      sw: "Mifumo iliyoundwa kustahimili ukuaji wa kasi na shinikizo kubwa bila kuyumba.",
    },
  },
  {
    code: "PR.02",
    title: { en: "Security-First Logic", sw: "Usalama Kwanza" },
    body: {
      en: "Data protected from the ground up with engineering-grade protocols, not afterthoughts.",
      sw: "Taarifa zinalindwa tangu msingi kwa taratibu za kiwango cha kiuhandisi, si kama wazo la baadaye.",
    },
  },
  {
    code: "PR.03",
    title: { en: "User-Centric Design", sw: "Muundo Unaomlenga Mtumiaji" },
    body: {
      en: "Complex capability translated into interfaces that feel effortless for the humans using them.",
      sw: "Uwezo changamano unabadilishwa kuwa miingiliano inayohisi rahisi kwa watu wanaoitumia.",
    },
  },
];

export type Step = { index: string; phase: Pair; title: Pair; body: Pair };

export const methodSteps: Step[] = [
  {
    index: "01",
    phase: { en: "Discovery", sw: "Ugunduzi" },
    title: { en: "Discovery & Ideation", sw: "Ugunduzi na Ubunifu wa Mawazo" },
    body: {
      en: "We map your business logic, audience, and constraints before a single line is written.",
      sw: "Tunaainisha mantiki ya biashara yako, hadhira, na vikwazo kabla ya mstari mmoja wa msimbo kuandikwa.",
    },
  },
  {
    index: "02",
    phase: { en: "Build", sw: "Ujenzi" },
    title: { en: "Agile Development", sw: "Uundaji wa Kirahisi (Agile)" },
    body: {
      en: "Iterative sprints deliver functional features with full transparency and flexibility.",
      sw: "Mizunguko ya kazi inayojirudia hutoa vipengele vinavyofanya kazi kwa uwazi kamili na unyumbufu.",
    },
  },
  {
    index: "03",
    phase: { en: "Verify", sw: "Uhakiki" },
    title: { en: "Quality Assurance", sw: "Uhakiki wa Ubora" },
    body: {
      en: "Automated and manual testing across the lifecycle guarantees bug-free deployments.",
      sw: "Upimaji wa kiotomatiki na wa mikono katika mzunguko mzima huhakikisha utekelezaji usio na hitilafu.",
    },
  },
  {
    index: "04",
    phase: { en: "Ship", sw: "Uzinduzi" },
    title: { en: "Deploy & Support", sw: "Uzinduzi na Msaada" },
    body: {
      en: "A seamless launch followed by dedicated maintenance built to scale with you.",
      sw: "Uzinduzi laini unaofuatiwa na matunzo makini yaliyoundwa kukua pamoja na wewe.",
    },
  },
];

export type Reason = { icon: "target" | "link" | "globe"; title: Pair; body: Pair };

export const reasons: Reason[] = [
  {
    icon: "target",
    title: { en: "Systemic Thinking", sw: "Fikra za Kimfumo" },
    body: {
      en: "We never look at a website in isolation. We look at how it fits into your entire business, end to end.",
      sw: "Hatuangalii wavuti kwa kutengwa. Tunaangalia jinsi inavyoendana na biashara yako yote, mwanzo hadi mwisho.",
    },
  },
  {
    icon: "link",
    title: { en: "Hardware-Software Synergy", sw: "Uwiano wa Vifaa na Programu" },
    body: {
      en: "One of few firms that reliably connect physical operations directly to real-time digital dashboards.",
      sw: "Mojawapo ya makampuni machache yanayounganisha kwa uhakika shughuli halisi moja kwa moja na dashibodi za kidijitali za wakati halisi.",
    },
  },
  {
    icon: "globe",
    title: { en: "Local Context, Global Standards", sw: "Mazingira ya Kienyeji, Viwango vya Kimataifa" },
    body: {
      en: "Built in Dar es Salaam for real local infrastructure, and measured against global performance benchmarks.",
      sw: "Imejengwa Dar es Salaam kwa miundombinu halisi ya kienyeji, na inapimwa dhidi ya viwango vya kimataifa vya utendaji.",
    },
  },
];

export type Product = {
  code: string;
  name: string;
  tagline: Pair;
  body: Pair;
  url: string;
  tags: Pair<string[]>;
};

export const products: Product[] = [
  {
    code: "PRODUCT",
    name: "BMS Suite",
    tagline: {
      en: "Business Management SaaS, built by InnoStarck and ready to use today.",
      sw: "SaaS ya Usimamizi wa Biashara, iliyojengwa na InnoStarck na tayari kutumika leo.",
    },
    body: {
      en: "A complete operations platform for running your business: inventory, sales, staff, and reporting, all in one system. No lengthy build cycle. Sign up and start running your business on it today.",
      sw: "Jukwaa kamili la uendeshaji wa biashara yako: bidhaa, mauzo, wafanyakazi, na taarifa, vyote katika mfumo mmoja. Hakuna mchakato mrefu wa ujenzi. Jisajili na anza kuendesha biashara yako leo.",
    },
    url: "https://bmssuite.online",
    tags: { en: ["SaaS", "Live product", "No setup wait"], sw: ["SaaS", "Bidhaa hai", "Hakuna kusubiri kuweka"] },
  },
];

export const industries: Pair<string[]> = {
  en: ["Finance & Fintech", "Healthcare & MedTech", "Retail & E-Commerce", "Logistics & Supply Chain"],
  sw: ["Fedha na Tekfini", "Afya na Tekiafya", "Rejareja na Biashara Mtandao", "Usafirishaji na Ugavi"],
};
