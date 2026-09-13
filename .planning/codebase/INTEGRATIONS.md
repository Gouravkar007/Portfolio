# External Integrations

**Analysis Date:** 2026-09-13

## APIs & External Services

**AI & LLM Services:**
- OpenRouter API (`https://openrouter.ai/api/v1/chat/completions`) - Used to power Gourav Kar's AI Digital Twin chat assistant in `src/app/api/chat/route.ts` and `src/components/DigitalTwinChat.tsx`
  - SDK/Client: Direct HTTP `fetch` in Next.js Route Handler
  - Auth: `OPENROUTER_API_KEY` environment variable
  - Fallback Models: `minimax/minimax-m3:free`, `nvidia/nemotron-3-super-120b-a12b:free`, `nvidia/nemotron-3.5-lightning:free`, `google/gemma-4-26b-a4b-it:free`, `liquid/lfm-2.5-2.6b:free`

**Email Delivery Services:**
- SMTP Mailer (e.g. Gmail SMTP) - Used to send inquiry emails submitted via the contact form in `src/app/api/contact/route.ts` and `src/components/ContactSection.tsx`
  - SDK/Client: `nodemailer` (`^9.0.5`)
  - Auth: `SMTP_USER` and `SMTP_PASS` environment variables
  - Configuration: `SMTP_HOST` (default `smtp.gmail.com`), `SMTP_PORT` (default `587`)

## Data Storage

**Databases:**
- Not detected / None directly integrated in this Next.js web application.
- Showcased showcase projects (e.g. `Garment Industry ERP Portal`, `A2Z Fast Food`) connect to SQL Server in their respective repositories.

**File Storage:**
- Local filesystem only (`public/` directory):
  - Resume PDF: `public/Gourav_Kar_Resume.pdf` (viewed via iframe in `src/components/ResumeModal.tsx`)
  - Profile avatar: `public/profile.png`
  - Icons and brand assets: `public/*.svg`

**Caching:**
- None / In-memory Next.js build-time static page generation and fetch cache

## Authentication & Identity

**Auth Provider:**
- None (Public portfolio website, no user accounts or authentication gates)

## Monitoring & Observability

**Error Tracking:**
- None currently configured (Console error logging in `src/app/api/chat/route.ts` and `src/app/api/contact/route.ts`)

**Logs:**
- Standard runtime stdout/stderr via `console.log`, `console.warn`, and `console.error`

## CI/CD & Deployment

**Hosting:**
- Vercel / Cloud serverless platform (indicated in `next.config.ts` and `README.md`)

**CI Pipeline:**
- GitHub Actions workflows present in `.github/workflows/` (includes modernize assessment scripts and CI definitions)

## Environment Configuration

**Required env vars:**
- `OPENROUTER_API_KEY` - Required for `/api/chat` AI responses
- `SMTP_USER` - SMTP sender username
- `SMTP_PASS` - SMTP app password
- `CONTACT_RECIPIENT_EMAIL` - Inbound recipient address for inquiries

**Secrets location:**
- `.env` in project root (ignored by `.gitignore`)
- Template defined in `.env.example`

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: 2026-09-13*
