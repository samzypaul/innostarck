# InnoStarck

Marketing website for **InnoStarck** — an engineering-led technology firm. Built with
**Next.js (App Router) + React + TypeScript**, ported from the "InnoStarck Home" design system.

## Stack

- Next.js 15 (App Router, React Server Components)
- React 19 + TypeScript (strict)
- `next/font` (Space Grotesk, Inter, Space Mono) — self-hosted, no layout shift
- Plain CSS design tokens in `app/globals.css` (no runtime CSS-in-JS)

## Multi-page structure

The original design was a single scroll page; here it is split into real routes so each section
gets its own URL, metadata, and crawlable content:

| Route                | Page                                       |
| -------------------- | ------------------------------------------ |
| `/`                  | Home — hero, services preview, why-us, CTA |
| `/services`          | Service pillars, method, industries        |
| `/about`             | The InnoStarck Standard (principles)       |
| `/method`            | The methodology, step by step              |
| `/leadership`        | Founder statement                          |
| `/contact`           | Contact form + details                     |
| `/privacy`, `/terms` | Legal placeholders (noindex)               |

## SEO

- Per-page `title` / `description` / canonical via the Next.js Metadata API
- Title template, Open Graph + Twitter cards, `metadataBase`, robots directives (`app/layout.tsx`)
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`
- Organization JSON-LD structured data
- Semantic landmarks, heading hierarchy, and `aria-current` nav state

> Before deploying, set the production domain in [`lib/site.ts`](lib/site.ts) (`siteConfig.url`)
> so canonical URLs, sitemap, and Open Graph tags resolve correctly.

## AI assistant (Gemini agent + lead capture)

The floating "Ask InnoStarck AI" widget is a real agent:

- **Model:** Google Gemini via `app/api/chat/route.ts` (REST, no SDK dep). Uses
  `gemini-2.5-flash` by default.
- **Knowledge:** grounded in the official company profile + WhatsApp catalogue link
  (`lib/knowledge.ts`). It won't invent pricing — it defers to a specialist / the
  WhatsApp catalogue.
- **Lead capture:** the model returns structured JSON (`reply` + `collected` lead +
  `complete`). When a conversation is complete, the client posts the lead to
  `app/api/lead/route.ts`, which:
  - emails the full lead + transcript to `LEAD_TO_EMAIL` via Gmail SMTP (Nodemailer), and
  - returns a pre-filled **wa.me** click-to-send link to `WHATSAPP_TO_NUMBER`.

### Configuration (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini key from [AI Studio](https://aistudio.google.com/apikey) |
| `GOOGLE_GENERATIVE_AI_API_KEYS` | Optional. Comma/space-separated keys, rotated per-request with failover on 429. Only raises limits if each key is from a **different** Google project. |
| `GEMINI_MODEL` | Defaults to `gemini-2.5-flash` |
| `GROQ_API_KEY` / `GROQ_API_KEYS` | Groq key(s) — OpenAI-compatible fallback provider with higher free limits |
| `GROQ_MODEL` | Defaults to `llama-3.3-70b-versatile` |
| `AI_PROVIDER_ORDER` | Provider failover order. Defaults to `groq,gemini` |
| `GMAIL_USER` / `GMAIL_APP_PASSWORD` | Gmail sender + 16-char App Password (needs 2FA) |
| `LEAD_TO_EMAIL` | Where leads are emailed (`samzypaul@gmail.com`) |
| `WHATSAPP_TO_NUMBER` | WhatsApp number for the click-to-send link (`255795600348`) |

> If the AI service is unreachable or out of quota, the chat degrades gracefully — it
> returns a fallback reply pointing visitors to WhatsApp/email, so the widget always works.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```
