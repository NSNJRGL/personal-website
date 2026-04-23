# Project: personal-website

## Overview
- Personal website built with the Next.js Pages Router.
- The main `/` experience is a chat-style portfolio assistant backed by the OpenAI API and JSON portfolio content in `src/content/portfolio/`.
- Legacy portfolio pages still live under `/v1` and use the shared app shell in `pages/_app.tsx`.

## Tech Stack
- Next.js 15 with the Pages Router
- React 18
- TypeScript 5 with `strict: true`
- Tailwind CSS 3
- `next-themes` for dark mode
- `framer-motion` for animation
- OpenAI Node SDK for chat completions and embeddings
- `node:test` + `node:assert/strict` for tests

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npx tsc --noEmit`
- Test compile: `npx tsc -p tsconfig.test.json`
- Test run: `node --test .tmp-tests/tests/*.test.js`

## Source Map
- `pages/`: routes, app shell, and the `/api/chat` endpoint
- `src/components/`: UI components, including chat UI and legacy v1 pages
- `src/lib/`: portfolio data shaping, retrieval, chat orchestration, OpenAI client helpers, and error helpers
- `src/content/portfolio/`: JSON source of truth for profile, projects, experience, skills, links, and FAQ
- `src/styles/globals.css`: global styles and shared Tailwind component classes
- `tests/`: `node:test` coverage for utility and data-layer behavior

## Conventions
- Follow existing Next.js Pages Router patterns; do not introduce App Router structure unless explicitly requested.
- Match the repo's export style: most pages and UI components use default exports, while shared utilities and types use named exports.
- Prefer absolute imports from `src/...`; `@styles/*` is available for styles.
- Keep TypeScript strict and use explicit types at API and data boundaries.
- Reuse existing helpers in `src/lib/` and `src/components/chat/helpers.ts` instead of introducing parallel utilities.
- Keep changes minimal and colocated with the current feature area.
- Use Tailwind utility classes and existing global component classes such as `.link` instead of adding ad hoc styling systems.
- Preserve dark-mode behavior through `next-themes` and the current `class`-based Tailwind setup.

## Data And Content Rules
- Treat `src/content/portfolio/*.json` as the source of truth for portfolio facts.
- Do not invent profile details, dates, links, employers, or project metrics not present in the repo.
- When changing portfolio-answer behavior, preserve the existing constraint that answers should stay grounded in retrieved context.

## API And Chat Patterns
- `pages/api/chat.ts` accepts `POST` only, validates incoming messages defensively, and streams SSE events: `token`, `sources`, `error`, `done`.
- Client chat UI in `src/components/chat/ChatShell.tsx` expects streamed token updates and source metadata; keep server/client event names aligned.
- Public-facing chat errors should go through the existing chat error helpers instead of exposing raw server errors.

## Testing And Verification
- Run `npm run lint` and `npx tsc --noEmit` after meaningful TypeScript or UI changes.
- For utility or data-layer changes covered by tests, compile tests with `npx tsc -p tsconfig.test.json` and run `node --test .tmp-tests/tests/*.test.js`.
- If a task touches streaming chat behavior, verify both the API route and the chat UI expectations.

## Boundaries
- Never commit secrets such as `OPENAI_API_KEY`.
- Do not change the JSON portfolio content to satisfy code issues unless the task is explicitly about content.
- Avoid adding dependencies unless there is a clear need.
- Preserve the existing security-header setup in `next.config.js` unless the task is specifically about security policy.

## Patterns To Reference
- App shell and route split: `pages/_app.tsx`
- Streaming chat page: `pages/index.tsx`
- SSE API route: `pages/api/chat.ts`
- Chat orchestration and retrieval grounding: `src/lib/chat.ts`
- Portfolio typing and chunk building: `src/lib/portfolio.ts`
- Example utility tests: `tests/chatHelpers.test.ts`

## Task Context Workflow
- Before editing, read the target file, any related tests, and one nearby example that already follows the desired pattern.
- For chat work, usually load `pages/api/chat.ts`, `src/components/chat/ChatShell.tsx`, and the relevant helper in `src/lib/` together.
- For content/data work, load the relevant JSON file plus `src/lib/portfolio.ts`.
- When builds or tests fail, focus on the specific error output rather than reloading broad project context.
