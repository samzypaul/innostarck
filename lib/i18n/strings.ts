// UI copy for every part of the site that isn't already structured data in
// lib/content.ts. Every entry is a { en, sw } pair so nothing can silently
// fall back to a missing key. Machine/AI-assisted Swahili — recommend a
// native-speaker review before this ships to real visitors.

type Pair<T = string> = { en: T; sw: T };

export const nav = {
  home: { en: "Home", sw: "Nyumbani" } satisfies Pair,
  services: { en: "Services", sw: "Huduma" } satisfies Pair,
  about: { en: "About Us", sw: "Kuhusu Sisi" } satisfies Pair,
  standard: { en: "The Standard", sw: "Kiwango Chetu" } satisfies Pair,
  standardDesc: { en: "Our engineering principles", sw: "Misingi yetu ya uhandisi" } satisfies Pair,
  method: { en: "Method", sw: "Mbinu" } satisfies Pair,
  methodDesc: { en: "How we build, step by step", sw: "Jinsi tunavyojenga, hatua kwa hatua" } satisfies Pair,
  leadership: { en: "Leadership", sw: "Uongozi" } satisfies Pair,
  leadershipDesc: { en: "The team behind the work", sw: "Timu iliyo nyuma ya kazi" } satisfies Pair,
  contactCta: { en: "Contact us →", sw: "Wasiliana nasi →" } satisfies Pair,
};

export const common = {
  tagline: { en: "Precision for Humanity", sw: "Usahihi kwa Ubinadamu" } satisfies Pair,
};

export const hero = {
  exploreCta: { en: "Explore our solutions →", sw: "Angalia suluhisho zetu →" } satisfies Pair,
  talkCta: { en: "Talk to our engineers", sw: "Ongea na wahandisi wetu" } satisfies Pair,
  systemStatus: { en: "SYSTEM STATUS: NOMINAL · 0 ERR", sw: "HALI YA MFUMO: SHWARI · HITILAFU 0" } satisfies Pair,
  uptime: { en: "Uptime", sw: "Muda wa Utendaji" } satisfies Pair,
  marginForError: { en: "Margin for error", sw: "Nafasi ya Kukosea" } satisfies Pair,
  disciplines: { en: "Disciplines", sw: "Taaluma" } satisfies Pair,
  origin: { en: "Origin", sw: "Asili" } satisfies Pair,
};

type HeroSlide = {
  image: string;
  alt: string;
  eyebrow: Pair;
  lede: Pair;
  points: Pair<string[]>;
};

export const heroSlides: HeroSlide[] = [
  {
    image: "/images/hero-1-fiber.jpg",
    alt: "Fiber optic cables radiating light",
    eyebrow: { en: "High Performance Web Systems", sw: "Mifumo ya Wavuti yenye Utendaji wa Juu" },
    lede: {
      en: "We build the technical backbone for organizations that can't afford to fail, engineering web platforms fast enough for operations in real time and secure enough for critical data.",
      sw: "Tunajenga msingi wa kiufundi kwa mashirika yasiyoweza kumudu kushindwa, tukijenga mifumo ya wavuti yenye kasi ya kutosha kwa shughuli za wakati halisi na usalama wa kutosha kwa taarifa muhimu.",
    },
    points: {
      en: [
        "Bespoke architectures for complex business logic and high concurrency.",
        "Security focused engineering, built in from day one.",
        "A biomedical engineering mindset: zero margin for error.",
        "Built in Dar es Salaam, measured against global standards.",
      ],
      sw: [
        "Miundo maalum kwa mantiki changamano ya biashara na matumizi ya wingi kwa wakati mmoja.",
        "Uhandisi unaotanguliza usalama, tangu siku ya kwanza.",
        "Mtazamo wa uhandisi wa kibaiolojia: bila nafasi ya kukosea.",
        "Imejengwa Dar es Salaam, inapimwa dhidi ya viwango vya kimataifa.",
      ],
    },
  },
  {
    image: "/images/hero-2-server.jpg",
    alt: "Server rack cabling in a data center",
    eyebrow: { en: "Intelligent IoT & Hardware", sw: "IoT na Vifaa vyenye Akili" },
    lede: {
      en: "Physical hardware fused to digital platforms, so you can monitor and control what's happening in your business in real time, wherever you are.",
      sw: "Vifaa halisi vilivyounganishwa na mifumo ya kidijitali, ili uweze kufuatilia na kudhibiti kinachoendelea katika biashara yako kwa wakati halisi, popote ulipo.",
    },
    points: {
      en: [
        "Sensors, telemetry, and remote control on infrastructure you can trust.",
        "The nervous system of your business, always connected.",
        "A biomedical engineering mindset: zero margin for error.",
        "Built in Dar es Salaam, measured against global standards.",
      ],
      sw: [
        "Sensa, ufuatiliaji wa mbali, na udhibiti wa mbali kwenye miundombinu unayoweza kuiamini.",
        "Mfumo wa fahamu wa biashara yako, ulioungwa daima.",
        "Mtazamo wa uhandisi wa kibaiolojia: bila nafasi ya kukosea.",
        "Imejengwa Dar es Salaam, inapimwa dhidi ya viwango vya kimataifa.",
      ],
    },
  },
  {
    image: "/images/hero-3-circuit.jpg",
    alt: "Macro shot of a circuit board",
    eyebrow: { en: "AI & Workflow Automation", sw: "AI na Uendeshaji wa Kiotomatiki" },
    lede: {
      en: "Automation that removes repetition, eliminates human error, and frees your team to focus on the work that actually needs a human.",
      sw: "Uendeshaji wa kiotomatiki unaoondoa urudufishaji, kupunguza makosa ya kibinadamu, na kuipa timu yako nafasi ya kuzingatia kazi inayohitaji binadamu.",
    },
    points: {
      en: [
        "Pipelines and predictive systems engineered for operation with zero errors.",
        "The brain for your operations, built for absolute reliability.",
        "A biomedical engineering mindset: zero margin for error.",
        "Built in Dar es Salaam, measured against global standards.",
      ],
      sw: [
        "Mifumo ya kazi na utabiri iliyojengwa kufanya kazi bila hitilafu.",
        "Ubongo wa shughuli zako, uliojengwa kwa uaminifu kamili.",
        "Mtazamo wa uhandisi wa kibaiolojia: bila nafasi ya kukosea.",
        "Imejengwa Dar es Salaam, inapimwa dhidi ya viwango vya kimataifa.",
      ],
    },
  },
];

export const footer = {
  blurb: {
    en: "Precision driven. Human centered. Engineering the digital future for your enterprise.",
    sw: "Tunaongozwa na usahihi. Tunamweka binadamu katikati. Tunajenga mustakabali wa kidijitali kwa biashara yako.",
  } satisfies Pair,
  navigate: { en: "Navigate", sw: "Urambazaji" } satisfies Pair,
  products: { en: "Products", sw: "Bidhaa" } satisfies Pair,
  legal: { en: "Legal", sw: "Sheria" } satisfies Pair,
  reach: { en: "Reach", sw: "Wasiliana" } satisfies Pair,
  privacyPolicy: { en: "Privacy Policy", sw: "Sera ya Faragha" } satisfies Pair,
  termsOfService: { en: "Terms of Service", sw: "Masharti ya Huduma" } satisfies Pair,
  aiTitle: { en: "Meet the InnoStarck AI Assistant", sw: "Fahamu Msaidizi wa AI wa InnoStarck" } satisfies Pair,
  aiBody: {
    en: "Your first line of contact: instant, precise answers 24/7, with a human specialist ready to step in the moment your project needs one.",
    sw: "Njia yako ya kwanza ya mawasiliano: majibu ya haraka na sahihi saa 24/7, huku mtaalamu wa kibinadamu akiwa tayari kuingia pale mradi wako unapohitaji.",
  } satisfies Pair,
  chatNow: { en: "Chat now →", sw: "Anza mazungumzo →" } satisfies Pair,
  rightsReserved: { en: "All rights reserved.", sw: "Haki zote zimehifadhiwa." } satisfies Pair,
};

export const home = {
  servicesEyebrow: { en: "Core Service Pillars", sw: "Nguzo Kuu za Huduma" } satisfies Pair,
  servicesTitle: {
    en: "Not a web agency. The high performance hub of your digital operations.",
    sw: "Sio wakala wa wavuti. Kitovu chenye utendaji wa juu cha shughuli zako za kidijitali.",
  } satisfies Pair,
  servicesIntro: {
    en: "Five integrated disciplines, engineered to work as one system rather than five disconnected tools.",
    sw: "Taaluma tano zilizounganishwa, zilizojengwa kufanya kazi kama mfumo mmoja badala ya zana tano tofauti.",
  } satisfies Pair,
};

export const servicesPage = {
  eyebrow: { en: "Core Service Pillars", sw: "Nguzo Kuu za Huduma" } satisfies Pair,
  title: {
    en: "The high performance hub of your digital operations.",
    sw: "Kitovu chenye utendaji wa juu cha shughuli zako za kidijitali.",
  } satisfies Pair,
  intro: {
    en: "Five integrated disciplines, engineered to work as one system rather than five disconnected tools. Explore how each fits your operation.",
    sw: "Taaluma tano zilizounganishwa, zilizojengwa kufanya kazi kama mfumo mmoja badala ya zana tano tofauti. Angalia jinsi kila moja inavyofaa kwa shughuli zako.",
  } satisfies Pair,
};

export const products = {
  eyebrow: { en: "From Our Own Stack", sw: "Kutoka kwenye Mfumo Wetu" } satisfies Pair,
  title: {
    en: "Software we've built and use ourselves, ready for your business today.",
    sw: "Programu tulizojenga na tunazotumia wenyewe, tayari kwa biashara yako leo.",
  } satisfies Pair,
  liveProduct: { en: "● Live product", sw: "● Bidhaa hai" } satisfies Pair,
  viewSystem: { en: "View system →", sw: "Angalia mfumo →" } satisfies Pair,
};

export const standard = {
  eyebrow: { en: "The InnoStarck Standard", sw: "Kiwango cha InnoStarck" } satisfies Pair,
  title: {
    en: "Engineering rigor, borrowed from a field where error costs lives.",
    sw: "Umakini wa kiuhandisi, uliokopwa kutoka taaluma ambapo kosa hugharimu maisha.",
  } satisfies Pair,
  para1: {
    en: "Our approach is rooted in the discipline of Biomedical Engineering. In a field where precision is a matter of life and death, the most resilient systems are those built with zero margin for error.",
    sw: "Mtazamo wetu umejikita katika taaluma ya Uhandisi wa Kibaiolojia (Biomedical Engineering). Katika taaluma ambapo usahihi ni suala la uhai na kifo, mifumo imara zaidi ni ile iliyojengwa bila nafasi ya kukosea.",
  } satisfies Pair,
  para2: {
    en: "We bring that mission critical mindset to every project, whether we're architecting a corporate platform or a nationwide logistics tracker.",
    sw: "Tunaleta mtazamo huo wa kazi za lazima kwenye kila mradi, iwe tunajenga mfumo wa kampuni au mfumo wa ufuatiliaji wa usafirishaji wa kitaifa.",
  } satisfies Pair,
  cta: { en: "Read the founder's statement →", sw: "Soma tamko la mwanzilishi →" } satisfies Pair,
};

export const method = {
  eyebrow: { en: "The Methodology", sw: "Mbinu Yetu" } satisfies Pair,
  title: {
    en: "A disciplined path from idea to deployment.",
    sw: "Njia iliyopangwa vizuri kutoka wazo hadi utekelezaji.",
  } satisfies Pair,
};

export const leadership = {
  quote: {
    en: "Technology should be as resilient as the people it serves. My foundation in Biomedical Engineering taught me that excellence is never an accident. It's the result of disciplined architecture and a commitment to precision.",
    sw: "Teknolojia inapaswa kuwa imara kama watu inaowahudumia. Msingi wangu wa Uhandisi wa Kibaiolojia ulinifundisha kuwa ubora si bahati mbaya. Ni matokeo ya muundo uliopangwa vizuri na dhamira ya usahihi.",
  } satisfies Pair,
  role: { en: "Managing Director, InnoStarck", sw: "Mkurugenzi Mkuu, InnoStarck" } satisfies Pair,
};

export const why = {
  eyebrow: { en: "Why Partner With Us", sw: "Kwa Nini Ushirikiane Nasi" } satisfies Pair,
  title: {
    en: "Three reasons clients trust us with mission critical work.",
    sw: "Sababu tatu wateja wanatuamini na kazi zao muhimu.",
  } satisfies Pair,
  industriesLabel: { en: "Industries We Serve", sw: "Sekta Tunazohudumia" } satisfies Pair,
};

export const cta = {
  eyebrow: { en: "Start a Conversation", sw: "Anzisha Mazungumzo" } satisfies Pair,
  title: {
    en: "Let's engineer something that doesn't break.",
    sw: "Hebu tujenge kitu ambacho hakivunjiki.",
  } satisfies Pair,
  body: {
    en: "Tell us what you're building. We'll tell you how we'd make it resilient.",
    sw: "Tuambie unachojenga. Tutakuambia jinsi tutakavyokifanya kiwe imara.",
  } satisfies Pair,
  button: { en: "Talk to our engineers →", sw: "Ongea na wahandisi wetu →" } satisfies Pair,
};

export const contact = {
  eyebrow: { en: "Start a Conversation", sw: "Anzisha Mazungumzo" } satisfies Pair,
  title: {
    en: "Let's engineer something that doesn't break.",
    sw: "Hebu tujenge kitu ambacho hakivunjiki.",
  } satisfies Pair,
  lede: {
    en: "Tell us what you're building. We'll tell you how we'd make it resilient. Our AI assistant replies instantly, day or night.",
    sw: "Tuambie unachojenga. Tutakuambia jinsi tutakavyokifanya kiwe imara. Msaidizi wetu wa AI hujibu papo hapo, mchana na usiku.",
  } satisfies Pair,
  emailLabel: { en: "Email", sw: "Barua Pepe" } satisfies Pair,
  hqLabel: { en: "Headquarters", sw: "Makao Makuu" } satisfies Pair,
  webLabel: { en: "Web", sw: "Wavuti" } satisfies Pair,
};

export const contactForm = {
  nameLabel: { en: "Name", sw: "Jina" } satisfies Pair,
  namePlaceholder: { en: "Your full name", sw: "Jina lako kamili" } satisfies Pair,
  emailLabel: { en: "Email", sw: "Barua Pepe" } satisfies Pair,
  messageLabel: { en: "Message", sw: "Ujumbe" } satisfies Pair,
  messagePlaceholder: { en: "What are you building?", sw: "Unajenga nini?" } satisfies Pair,
  sending: { en: "Sending…", sw: "Inatuma…" } satisfies Pair,
  send: { en: "Send message →", sw: "Tuma ujumbe →" } satisfies Pair,
  successTitle: { en: "Message sent ✓", sw: "Ujumbe umetumwa ✓" } satisfies Pair,
  successBodyPrefix: {
    en: "Thanks for reaching out. Our team will get back to you shortly, and for anything urgent you can also message us on ",
    sw: "Asante kwa kuwasiliana nasi. Timu yetu itakujibu hivi karibuni, na kwa jambo la dharura unaweza pia kutuandikia kwenye ",
  } satisfies Pair,
  errorPrefix: {
    en: "Sorry, we couldn't send that. Please email us directly at ",
    sw: "Samahani, hatukuweza kutuma hilo. Tafadhali tutumie barua pepe moja kwa moja kwa ",
  } satisfies Pair,
};

export const chat = {
  greeting: {
    en: "Hi, I'm the InnoStarck AI assistant. I can answer questions about our services, scope, and approach, and connect you with our team. What are you building?",
    sw: "Habari, mimi ni msaidizi wa AI wa InnoStarck. Ninaweza kujibu maswali kuhusu huduma zetu, upeo wa kazi, na mbinu yetu, na kukuunganisha na timu yetu. Unajenga nini?",
  } satisfies Pair,
  suggestions: {
    en: ["Explore services", "Get a quote", "Talk to a human"],
    sw: ["Angalia huduma", "Pata bei", "Ongea na mtu"],
  } satisfies Pair<string[]>,
  panelTitle: { en: "InnoStarck Assistant", sw: "Msaidizi wa InnoStarck" } satisfies Pair,
  status: { en: "AI · REPLIES INSTANTLY", sw: "AI · HUJIBU MARA MOJA" } satisfies Pair,
  talkToHuman: { en: "Talk to a human", sw: "Ongea na mtu" } satisfies Pair,
  closeChat: { en: "Close chat", sw: "Funga mazungumzo" } satisfies Pair,
  tapPhone: { en: "Tap to enter your phone number →", sw: "Gusa kuweka nambari yako ya simu →" } satisfies Pair,
  phoneAria: { en: "Your phone or WhatsApp number", sw: "Nambari yako ya simu au WhatsApp" } satisfies Pair,
  save: { en: "Save", sw: "Hifadhi" } satisfies Pair,
  phoneError: {
    en: "Please enter a valid phone number, 9 to 15 digits, e.g. +255 712 345 678.",
    sw: "Tafadhali weka nambari sahihi ya simu, tarakimu 9 hadi 15, mfano +255 712 345 678.",
  } satisfies Pair,
  humanNote: { en: "Choose how you'd like to connect with our team:", sw: "Chagua jinsi unavyotaka kuwasiliana na timu yetu:" } satisfies Pair,
  reachWhatsapp: { en: "Reach out on WhatsApp →", sw: "Wasiliana kwa WhatsApp →" } satisfies Pair,
  callNow: { en: "Call us now →", sw: "Tupigie sasa →" } satisfies Pair,
  leaveWhatsapp: { en: "Leave your WhatsApp number →", sw: "Acha nambari yako ya WhatsApp →" } satisfies Pair,
  whatsappAria: { en: "Your WhatsApp number", sw: "Nambari yako ya WhatsApp" } satisfies Pair,
  send: { en: "Send", sw: "Tuma" } satisfies Pair,
  callbackSent: {
    en: "✓ Thanks, our team will reach out to you on WhatsApp shortly.",
    sw: "✓ Asante, timu yetu itakuwasiliana kwa WhatsApp hivi karibuni.",
  } satisfies Pair,
  backToChat: { en: "← Back to chat", sw: "← Rudi kwenye mazungumzo" } satisfies Pair,
  sharedTitle: { en: "✓ Shared with the InnoStarck team", sw: "✓ Imetumwa kwa timu ya InnoStarck" } satisfies Pair,
  emailedNote: { en: "We've emailed your details to a specialist. ", sw: "Tumetuma maelezo yako kwa barua pepe kwa mtaalamu. " } satisfies Pair,
  savedNote: { en: "Your details are saved. ", sw: "Maelezo yako yamehifadhiwa. " } satisfies Pair,
  continueWhatsapp: { en: "Continue the conversation on WhatsApp:", sw: "Endelea na mazungumzo kwenye WhatsApp:" } satisfies Pair,
  openWhatsapp: { en: "Open WhatsApp →", sw: "Fungua WhatsApp →" } satisfies Pair,
  stillThere: { en: "Are you still there?", sw: "Bado upo?" } satisfies Pair,
  warningPrefix: { en: "This chat will end in ", sw: "Mazungumzo haya yataisha baada ya sekunde " } satisfies Pair,
  warningSuffix: {
    en: " due to inactivity, and I'll pass our conversation to the team.",
    sw: " kutokana na kutokuwepo, kisha nitapeleka mazungumzo yetu kwa timu.",
  } satisfies Pair,
  imStillHere: { en: "I'm still here", sw: "Bado nipo" } satisfies Pair,
  startNewChat: { en: "Start new chat", sw: "Anza mazungumzo mapya" } satisfies Pair,
  askAnything: { en: "Ask anything…", sw: "Uliza chochote…" } satisfies Pair,
  chatEnded: { en: "Chat ended, start a new chat", sw: "Mazungumzo yamekwisha, anza mapya" } satisfies Pair,
  disclaimer: {
    en: "AI ASSISTED · A SPECIALIST JOINS WHEN NEEDED",
    sw: "KWA MSAADA WA AI · MTAALAMU ATAJIUNGA INAPOHITAJIKA",
  } satisfies Pair,
  fabLabel: { en: "Ask InnoStarck AI", sw: "Uliza InnoStarck AI" } satisfies Pair,
  fabOpenAria: { en: "Open InnoStarck AI assistant", sw: "Fungua msaidizi wa AI wa InnoStarck" } satisfies Pair,
  fabCloseAria: { en: "Close InnoStarck AI assistant", sw: "Funga msaidizi wa AI wa InnoStarck" } satisfies Pair,
  chatErrorReply: {
    en: "Sorry, something went wrong on my end. You can reach us directly at info@innostarck.com.",
    sw: "Samahani, kuna hitilafu kwa upande wangu. Unaweza kuwasiliana nasi moja kwa moja kwa info@innostarck.com.",
  } satisfies Pair,
  terminatedReply: {
    en: "This chat has ended due to inactivity. I've shared our conversation with the InnoStarck team, and they'll follow up shortly. Tap “Start new chat” to continue.",
    sw: "Mazungumzo haya yamekwisha kutokana na kutokuwepo. Nimeshiriki mazungumzo yetu na timu ya InnoStarck, nao watafuatilia hivi karibuni. Gusa “Anza mazungumzo mapya” kuendelea.",
  } satisfies Pair,
};

export const langSwitch = {
  english: { en: "English", sw: "Kiingereza" } satisfies Pair,
  swahili: { en: "Swahili", sw: "Kiswahili" } satisfies Pair,
};
