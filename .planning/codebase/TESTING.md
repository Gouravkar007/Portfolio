# Testing Patterns

**Analysis Date:** 2026-09-13

## Test Framework

**Runner:**
- Not detected (No test runner currently installed in `package.json`).

**Assertion Library:**
- Not detected.

**Run Commands:**
```bash
# Currently available validation commands:
npm run lint           # Runs ESLint checks
npx tsc --noEmit       # Runs TypeScript type validation
npm run build          # Builds production bundle and validates Next.js routes
```

## Test File Organization

**Location:**
- No test directories or files currently exist.

**Naming:**
- Recommended standard when adding tests: `*.test.ts`, `*.test.tsx`, or `*.spec.ts`.

**Structure:**
- Recommended layout:
```
src/
├── __tests__/           # Integration and API route tests
│   ├── api-chat.test.ts
│   └── api-contact.test.ts
└── components/
    └── __tests__/       # Component unit tests (or co-located *.test.tsx)
```

## Test Structure

**Suite Organization (Recommended for Vitest / Jest):**
```typescript
import { describe, it, expect, vi } from "vitest";

describe("DigitalTwinChat Component", () => {
  it("renders welcome message when opened", () => {
    // test implementation
  });
});
```

**Patterns:**
- Unit tests for isolated UI state transitions.
- Mocking external HTTP requests (`fetch` for OpenRouter and `nodemailer` transporter).

## Mocking

**Framework:**
- Recommended: Vitest or Jest built-in mocking (`vi.mock` / `jest.mock`).

**What to Mock:**
- Network requests to external APIs (`https://openrouter.ai/api/v1/chat/completions`).
- SMTP server network connections in `nodemailer.createTransport`.
- Browser-specific objects if testing in jsdom (`window.matchMedia`, PDF iframes).

**What NOT to Mock:**
- React state transitions and internal component hooks.
- Pure utility logic and class name mergers (`clsx`, `tailwind-merge`).

## Fixtures and Factories

**Test Data:**
- Sample contact payload:
```typescript
const mockContactPayload = {
  name: "Recruiter Test",
  email: "recruiter@example.com",
  subject: "Backend Opportunity",
  message: "We reviewed your Java/Spring Boot experience.",
};
```
- Sample chat conversation payload:
```typescript
const mockChatPayload = {
  messages: [{ role: "user", content: "Tell me about your Spring Boot ERP project" }],
};
```

## Coverage

**Requirements:** None currently enforced.

**View Coverage:**
- To be configured upon integrating Vitest (`npm run test -- --coverage`).

## Test Types

**Unit Tests:**
- Needed for: Component rendering, form input state, prompt construction in `src/app/api/chat/route.ts`.

**Integration Tests:**
- Needed for: `POST /api/chat` and `POST /api/contact` route handlers testing input validation, error handling, and environment fallbacks.

**E2E Tests:**
- Framework: Not used. Recommended: Playwright for full browser interaction testing (navigating sections, sending message in chat, testing contact form dialog).

## Common Patterns

**Async Testing (Recommended pattern):**
```typescript
it("handles contact form submission successfully", async () => {
  const req = new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    body: JSON.stringify(mockContactPayload),
  });
  const res = await POST(req);
  expect(res.status).toBe(200);
});
```

---

*Testing analysis: 2026-09-13*
