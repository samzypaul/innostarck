# Testing & QA

## Stack

- **Test runner:** [Vitest](https://vitest.dev) (`node` environment)
- **Coverage:** `@vitest/coverage-v8`

## Commands

```bash
npm test            # run all tests once
npm run test:watch  # watch mode
npm run test:coverage
```

## What's covered

Pure business logic is extracted into `lib/` modules so it can be unit-tested
without spinning up Next.js, a browser, or live AI/email services:

| Module | Responsibility | Tests |
| --- | --- | --- |
| `lib/validation.ts` | Email & phone validation | `lib/validation.test.ts` |
| `lib/lead.ts` | Lead sanitization, length-clamping, WhatsApp link + email body | `lib/lead.test.ts` |
| `lib/ai.ts` | API-key parsing, provider order, model-response coercion | `lib/ai.test.ts` |

40 tests covering success states, edge cases, and error/abuse handling
(oversized input, malformed JSON, non-string fields, unknown keys).

## Gaps / next steps

- **Component tests** (ChatWidget, ContactForm, Header) — add `@testing-library/react`
  + `jsdom` and test the phone-input validation flow, option chips, and form states.
- **API route integration tests** — test `app/api/lead` and `app/api/chat` handlers
  by mocking `nodemailer` / `fetch`, asserting failover order and email payloads.
- **E2E** — Playwright smoke test: load each page, open the chat, submit the contact form.
