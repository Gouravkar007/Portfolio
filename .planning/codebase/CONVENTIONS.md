# Coding Conventions

**Analysis Date:** 2026-09-13

## Naming Patterns

**Files:**
- React components use PascalCase matching component name (e.g., `DigitalTwinChat.tsx`, `HeroSection.tsx`, `ProjectsSection.tsx`).
- Next.js route entry points use standard lowercase conventions (`page.tsx`, `layout.tsx`, `route.ts`).
- Configuration files use dot notation (`next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`).

**Functions:**
- React component functions use PascalCase (`export const HeroSection: React.FC = () => { ... }`).
- Helper functions and route methods use camelCase (`getApiKey()`, `getEnvVar()`, `toggleChat()`) or HTTP verb uppercase (`export async function POST(...)`).

**Variables:**
- Local variables and React state hooks use camelCase (`isChatOpen`, `inputMessage`, `selectedProject`).
- Constants and system prompts use UPPER_SNAKE_CASE (`SYSTEM_PROMPT`, `FALLBACK_MODELS`).

**Types & Interfaces:**
- Types and interfaces use PascalCase without Hungarian prefix notation (e.g. `interface Message`, `interface DigitalTwinChatProps`, `interface ProjectData`).

## Code Style

**Formatting:**
- 2-space indentation across TypeScript, TSX, CSS, and JSON files.
- Double quotes used for strings in TSX attributes and JSON; single or double quotes used across TS.
- Semicolons used consistently.

**Linting:**
- ESLint 9 (`eslint.config.mjs`) extending `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Ignores `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`.

## Import Organization

**Order:**
1. Core React hooks and React default (`import React, { useState, useRef, useEffect } from "react";`)
2. Framework and third-party libraries (`import { NextRequest, NextResponse } from "next/server";`, `import { Sparkles, MessageSquare } from "lucide-react";`)
3. Internal component imports via path alias (`import { Navbar } from "@/components/Navbar";`)
4. Node.js built-ins in route handlers (`import fs from "fs";`, `import path from "path";`)

**Path Aliases:**
- Configured in `tsconfig.json`: `"@/*": ["./src/*"]`

## Error Handling

**Patterns:**
- Route handlers wrap all logic in `try ... catch` blocks.
- On exception, server returns a `NextResponse.json({ error: ... }, { status: 500 })`.
- Client components catch promise rejections and set a local `error` state string to display inline warnings to the user (e.g., `setError("Failed to transmit message...")`).

## Logging

**Framework:**
- Built-in `console` methods (`console.error`, `console.warn`).

**Patterns:**
- Errors in route handling and external API failure warnings logged with descriptive prefixes:
  - `console.error("API Chat route error:", err);`
  - `console.warn("Model ... returned ... Trying fallback...");`

## Comments

**When to Comment:**
- Section division markers in components (e.g., `/* Hero Section */`, `/* Digital Twin Chat Widget */`).
- Operational steps in route handlers (`// 1. Validation`, `// 2. Load SMTP configurations`, `// 3. Configure Nodemailer transport`).
- Fallback rationale explanations (e.g. explaining why `.env` is parsed directly as a fallback for local environments).

**JSDoc/TSDoc:**
- Light usage; code relies primarily on self-documenting TypeScript types and interfaces.

## Function Design

**Size:**
- UI components are modular, ranging from 50 to ~350 lines for complex interactive modals like `DigitalTwinChat.tsx`.
- Specialized concerns are cleanly separated into subcomponents (`ProjectModal`, `ResumeModal`, `SocialIcons`).

**Parameters:**
- Explicit typed interfaces for React component props (e.g. `interface ResumeModalProps { isOpen: boolean; onClose: () => void; }`).

**Return Values:**
- Explicit React JSX elements (`React.FC` or typed Next.js route responses `NextResponse.json(...)`).

## Module Design

**Exports:**
- Named exports preferred for UI components (`export const HeroSection: React.FC = ...`).
- Default export used for page and layout entry points (`export default function Home()`, `export default function RootLayout()`).
- Named HTTP verbs exported in API routes (`export async function POST(req: NextRequest)`).

**Barrel Files:**
- Not currently used; components are imported directly from their respective files (`@/components/Navbar`).

---

*Convention analysis: 2026-09-13*
