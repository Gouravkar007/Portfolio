# Technology Stack

**Analysis Date:** 2026-09-13

## Languages

**Primary:**
- TypeScript 5.x (`tsconfig.json`) - Primary language for all application logic, React components, and API routes in `src/`
- JavaScript (ESNext / Node.js runtime) - Used for configuration files (`eslint.config.mjs`, `postcss.config.mjs`)

**Secondary:**
- CSS3 (`src/app/globals.css`) - Tailwind v4 utility theme directives and custom cyber-grid design tokens

## Runtime

**Environment:**
- Node.js 20+ (ES2017+ target defined in `tsconfig.json`, `@types/node: ^20` in `package.json`)

**Package Manager:**
- npm (lockfile `package-lock.json` present and committed)

## Frameworks

**Core:**
- Next.js 16.3.0 (`package.json`) - Full-stack React framework using App Router architecture with Turbopack support
- React 19.2.8 & React DOM 19.2.8 (`package.json`) - Latest React version supporting React Server Components and concurrent rendering

**Styling:**
- Tailwind CSS 4 (`@tailwindcss/postcss: ^4`, `tailwindcss: ^4` in `package.json`)
- PostCSS (`postcss.config.mjs`)

**Animation & Icons:**
- Framer Motion 13.0.0 (`package.json`) - Motion primitives and modal transitions
- Lucide React 1.28.0 (`package.json`) - Modern UI icon library

**Testing:**
- Not detected (no automated test runner or test suite configured in `package.json`)

**Build/Dev:**
- Next.js CLI (`next dev`, `next build`, `next start`)
- ESLint 9 (`eslint: ^9`, `eslint-config-next: 16.3.0`)

## Key Dependencies

**Critical:**
- `next` 16.3.0 - Web framework and serverless route handlers (`src/app/api/chat/route.ts`, `src/app/api/contact/route.ts`)
- `nodemailer` 9.0.5 (`package.json`) - SMTP email client for transmitting portfolio contact form submissions
- `clsx` 2.1.1 & `tailwind-merge` 3.6.0 (`package.json`) - Conditional class merging utilities

**Infrastructure:**
- `@types/react` 19, `@types/react-dom` 19, `@types/nodemailer` 8.0.1, `@types/node` 20 (`package.json`) - TypeScript type definitions

## Configuration

**Environment:**
- Configured via `.env` (with template in `.env.example`)
- Key variables:
  - `OPENROUTER_API_KEY` - Authentication token for OpenRouter AI Digital Twin LLM queries
  - `OPENROUTER_MODEL` - Optional target LLM model override
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Mail server credentials for contact transmissions
  - `CONTACT_RECIPIENT_EMAIL` - Inbound recipient address for portfolio inquiries

**Build:**
- `next.config.ts` - Next.js core configuration
- `tsconfig.json` - TypeScript path aliases (`@/*` -> `./src/*`) and compiler targets
- `postcss.config.mjs` - PostCSS plugin bindings for `@tailwindcss/postcss`
- `eslint.config.mjs` - ESLint 9 flat config ignoring `.next`, `out`, `build`

## Platform Requirements

**Development:**
- Node.js (>= 18.17.0 or >= 20.0.0)
- npm package manager

**Production:**
- Vercel or any Node.js serverless/container environment supporting Next.js 16 App Router

---

*Stack analysis: 2026-09-13*
