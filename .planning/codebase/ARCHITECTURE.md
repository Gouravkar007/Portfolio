# Architecture

**Analysis Date:** 2026-09-13

## Pattern Overview

**Overall:** Next.js 16 App Router Single Page Application (SPA) with Serverless API Endpoints and Interactive Client Components.

**Key Characteristics:**
- Dark cyber-grid themed personal portfolio showcasing backend engineering (Java 17 / Spring Boot) and Machine Learning (Python / Scikit-Learn) expertise.
- Client-side interactive widgets including a full-featured AI Digital Twin chatbot and PDF resume viewer modal.
- RESTful Next.js Route Handlers (`src/app/api/*`) for backend API capabilities (OpenRouter LLM proxy and Nodemailer SMTP email dispatcher).
- Responsive, glassmorphic UI styled with Tailwind CSS v4 and animated via Framer Motion.

## Layers

**Presentation Layer:**
- Purpose: Render portfolio sections, hero banner, interactive modals, and chat widget
- Location: `src/app/page.tsx` and `src/components/`
- Contains: React client components (`HeroSection.tsx`, `AboutSection.tsx`, `CareerJourney.tsx`, `ProjectsSection.tsx`, `SkillsSection.tsx`, `CertificationsSection.tsx`, `ContactSection.tsx`, `Footer.tsx`, `DigitalTwinChat.tsx`, `ResumeModal.tsx`, `ProjectModal.tsx`, `TerminalWidget.tsx`, `SocialIcons.tsx`)
- Depends on: Framer Motion, Lucide React, Tailwind CSS utilities
- Used by: End users visiting the portfolio

**Styling & Theme Layer:**
- Purpose: Define global styling tokens, dark palette, animations, cyber-grid backgrounds, and custom scrollbars
- Location: `src/app/globals.css` and `src/app/layout.tsx`
- Contains: CSS custom properties (`--bg-primary`, `--cyan-accent`, `--border-cyan`, etc.) and utility rules
- Depends on: Tailwind CSS v4 `@import "tailwindcss";`

**API / Serverless Backend Layer:**
- Purpose: Handle AI chat completion requests and contact form email dispatches
- Location: `src/app/api/chat/route.ts` and `src/app/api/contact/route.ts`
- Contains: Next.js App Router POST handlers with validation, external API calls, and email templating
- Depends on: `nodemailer`, OpenRouter API, Node.js `fs`/`path`
- Used by: `src/components/DigitalTwinChat.tsx` and `src/components/ContactSection.tsx`

## Data Flow

**1. AI Digital Twin Chat Interaction Flow:**
1. User types message or clicks suggested query in `src/components/DigitalTwinChat.tsx`.
2. Component sends `POST` request with message history to `/api/chat`.
3. `src/app/api/chat/route.ts` validates request, resolves API key from environment, prepends `SYSTEM_PROMPT` containing Gourav's knowledge base, and queries OpenRouter.
4. If primary model fails or is rate-limited, fallback loop tests successive free models (`minimax/minimax-m3:free`, `nvidia/nemotron-3-super-120b-a12b:free`, etc.).
5. Cleaned text response and model metadata returned as JSON to client.
6. Chat window appends assistant response and renders related search tags.

**2. Contact Inquiry Flow:**
1. User completes contact form in `src/components/ContactSection.tsx` (name, email, subject, message).
2. Form submits `POST` payload to `/api/contact`.
3. `src/app/api/contact/route.ts` validates required fields and loads SMTP configuration.
4. HTML email formatted with cyber-grid themed design and dispatched to `CONTACT_RECIPIENT_EMAIL` via `nodemailer`.
5. JSON response with success/error status rendered to user.

**State Management:**
- Component-level state via React `useState` hooks (active filter tabs, modal open/close states, chat message histories, input field bindings).
- No global state store (Redux/Zustand) is required due to focused single-page scope.

## Key Abstractions

**Modular Section Components:**
- Purpose: Encapsulate specific portfolio areas with self-contained styling and interactivity
- Examples: `src/components/HeroSection.tsx`, `src/components/ProjectsSection.tsx`, `src/components/CareerJourney.tsx`
- Pattern: Functional React Components with TypeScript props and lucide icons

**Modal Dialogs:**
- Purpose: Provide overlays for detailed views without page reloads
- Examples: `src/components/ProjectModal.tsx`, `src/components/ResumeModal.tsx`, `src/components/DigitalTwinChat.tsx`
- Pattern: Controlled React modals rendered in root `src/app/page.tsx`

**API Route Handlers:**
- Purpose: Process server-side operations securely without exposing private API keys or SMTP secrets to client bundles
- Examples: `src/app/api/chat/route.ts`, `src/app/api/contact/route.ts`
- Pattern: Next.js 16 Web Request/Response `export async function POST(req: NextRequest)`

## Entry Points

**Web Application Root:**
- Location: `src/app/page.tsx` and `src/app/layout.tsx`
- Triggers: HTTP GET request to root `/`
- Responsibilities: Render HTML metadata, fonts, global theme, and orchestrate portfolio sections and modals

**Chat Endpoint:**
- Location: `src/app/api/chat/route.ts`
- Triggers: POST `/api/chat`
- Responsibilities: Stream/generate AI responses acting as Gourav Kar's Digital Twin

**Contact Endpoint:**
- Location: `src/app/api/contact/route.ts`
- Triggers: POST `/api/contact`
- Responsibilities: Validate inquiry data and relay email through SMTP transport

## Error Handling

**Strategy:**
- Client-side error state capture with user-friendly alerts.
- Server-side error wrapping returning structured JSON with appropriate HTTP status codes (400, 500, 503).

**Patterns:**
- Try-catch blocks in both API route handlers.
- Multi-model fallback cascade in `src/app/api/chat/route.ts` to survive upstream model outages.

## Cross-Cutting Concerns

**Logging:** Console error and warning logging (`console.error`, `console.warn`)
**Validation:** Basic presence validation on inbound JSON payloads (`name`, `email`, `message`, `messages`)
**Authentication:** Not applicable for public web frontend; API routes verify presence of server environment keys (`OPENROUTER_API_KEY`, `SMTP_PASS`)

---

*Architecture analysis: 2026-09-13*
