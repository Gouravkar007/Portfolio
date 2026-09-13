# Codebase Concerns

**Analysis Date:** 2026-09-13

## Tech Debt

**Direct `.env` File Reading in Route Handlers:**
- Issue: `src/app/api/chat/route.ts` and `src/app/api/contact/route.ts` manually invoke `fs.readFileSync(path.join(process.cwd(), ".env"))` as a fallback when `process.env` does not contain variables.
- Files: `src/app/api/chat/route.ts`, `src/app/api/contact/route.ts`
- Impact: In serverless environments (e.g. AWS Lambda, Vercel Serverless Functions) the local filesystem may be read-only or the working directory may not contain the original `.env` file, potentially causing runtime `ENOENT` crashes or log spam.
- Fix approach: Rely exclusively on Next.js built-in environment variable loading and validate them at startup with a validation schema (e.g., Zod or Envalid).

**Hardcoded Knowledge Base Prompt:**
- Issue: Gourav's entire profile, career history, and project list are hardcoded as a large template string inside `src/app/api/chat/route.ts` rather than sourced from a structured data file (JSON or Markdown).
- Files: `src/app/api/chat/route.ts`
- Impact: Any update to career history or projects requires editing backend route logic, risking syntax breaks and duplication between UI components (`ProjectsSection.tsx`, `CareerJourney.tsx`) and the AI knowledge base.
- Fix approach: Extract personal metadata, projects, and career milestones into a single source of truth (e.g., `src/data/profile.json` or `content/profile.md`) consumed by both UI components and the chat endpoint.

## Known Bugs

**Uncommitted Changes in Working Tree:**
- Symptoms: `git status` shows uncommitted modifications in `next-env.d.ts`, `src/app/api/chat/route.ts`, and `src/components/AboutSection.tsx`.
- Files: `next-env.d.ts`, `src/app/api/chat/route.ts`, `src/components/AboutSection.tsx`
- Trigger: Local edits made prior to GSD invocation.
- Workaround: Review diff and commit or restore clean working state before executing new phase work.

## Security Considerations

**Unprotected Public API Endpoints:**
- Risk: `/api/chat` and `/api/contact` do not have rate limiting, CAPTCHA, or IP throttling.
- Files: `src/app/api/chat/route.ts`, `src/app/api/contact/route.ts`
- Current mitigation: Basic input payload validation.
- Recommendations: Implement rate limiting (e.g. `@upstash/ratelimit` or Next.js middleware with in-memory tokens) to prevent exhaustion of OpenRouter API quotas and SMTP spam flooding.

**TLS Reject Unauthorized Disabled:**
- Risk: In `src/app/api/contact/route.ts`, Nodemailer transport specifies `tls: { rejectUnauthorized: false }`.
- Files: `src/app/api/contact/route.ts`
- Current mitigation: Intended to bypass local certificate errors during development.
- Recommendations: Restrict `rejectUnauthorized: false` to local development mode (`process.env.NODE_ENV !== "production"`).

## Performance Bottlenecks

**Cold Starts on OpenRouter Multi-Model Fallbacks:**
- Problem: If the primary model fails or times out, `src/app/api/chat/route.ts` sequentially loops through up to 5 fallback models (`FALLBACK_MODELS`).
- Files: `src/app/api/chat/route.ts`
- Cause: Synchronous sequential iteration through API endpoints without individual request timeouts.
- Improvement path: Add an `AbortController` timeout (e.g. 5–8 seconds per model attempt) so the user doesn't wait 30+ seconds if an upstream model is unresponsive.

## Fragile Areas

**PDF Viewer in Iframe:**
- Files: `src/components/ResumeModal.tsx`, `public/Gourav_Kar_Resume.pdf`
- Why fragile: Mobile browsers (especially iOS Safari and Android Chrome) often fail to display inline PDF iframes, showing a blank gray box or triggering an automatic download.
- Safe modification: Provide a prominent "Direct Download / Open in New Tab" button alongside the iframe and consider rendering a responsive HTML resume fallback for mobile viewports.

## Scaling Limits

**OpenRouter Free Tier Models:**
- Current capacity: Free tier models (`minimax/minimax-m3:free`, etc.) have dynamic rate limits and variable uptime.
- Limit: During peak global traffic, free endpoints can return 429 or 503 HTTP status codes.
- Scaling path: Configure a paid tier fallback key or self-hosted endpoint when traffic increases.

## Dependencies at Risk

**Tailwind CSS v4 & Next.js 16 Early Adoption:**
- Risk: Next.js 16 and Tailwind v4 are very modern releases with evolving ecosystem plugins and PostCSS integrations.
- Impact: Some community component libraries or build plugins may encounter configuration incompatibilities.
- Migration plan: Keep dependency versions pinned and adhere to the latest official migration guides.

## Missing Critical Features

**Automated Test Suite:**
- Problem: No automated tests (unit, integration, or end-to-end) exist.
- Blocks: Regressions cannot be detected automatically before deployment.

## Test Coverage Gaps

**Contact Route Handler:**
- What's not tested: Form submission validation, SMTP authentication failure handling, success response formatting.
- Files: `src/app/api/contact/route.ts`
- Risk: Inability to receive recruitment emails if SMTP configuration lapses.
- Priority: High

**AI Chat Route Handler:**
- What's not tested: OpenRouter API error fallbacks, response formatting, prompt parsing.
- Files: `src/app/api/chat/route.ts`
- Risk: Chat interface breaking quietly in production.
- Priority: High

---

*Concerns audit: 2026-09-13*
