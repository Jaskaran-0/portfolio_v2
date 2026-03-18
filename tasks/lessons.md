# lessons.md — Claude Self-Learning Log
# Auto-appended by hooks/post-run.sh after every session
# READ THIS AT THE START OF EVERY SESSION

---

## HOW TO READ THIS FILE

Each entry = one thing that went wrong or one pattern worth keeping.
Newest entries at the TOP. Act on every rule listed here before writing code.

---

## STANDING RULES (distilled from all sessions)

- Special Elite is FLAVOR ONLY — never use for paragraph body text
- Always check scroll-snap-type is `proximity` not `mandatory` near Three.js
- Three.js cleanup: always `renderer.dispose()` in useEffect return
- Never hardcode a color — use CSS variables only
- Static export: generateStaticParams() required for all dynamic routes
- GSAP must be client-side only in Next.js App Router
- Pixel ratio cap at 2 — never remove this, it tanks mobile perf

## VERSION NOTES — Actual installed stack (use these, not the spec targets)

**Next.js 16.2.0 / React 19.2.4 / Tailwind 4.x differences from spec (14/18/3):**

- **Page params are Promises (Next 15+):** `params` in page components is now `Promise<{slug:string}>` — must `await params` or use `use(params)`. Old: `{ params: { slug } }` → New: `const { slug } = await params`
- **No `tailwind.config.ts` in Tailwind v4:** All theme config lives in CSS via `@theme {}` directive inside globals.css. No JS config file.
- **Tailwind v4 imports:** Use `@import "tailwindcss"` not `@tailwind base/components/utilities`
- **React 19 `use()` hook:** Can unwrap promises and context directly in render — useful for async data
- **`next/font/google` still works** but we self-host via @font-face in globals.css — do not add google font imports back to layout.tsx
- **`output: 'export'` still valid** in next.config.js for static GitHub Pages deploy — no change needed
- **No `getServerSideProps` or `getStaticProps`** — App Router only. Use `generateStaticParams()` for dynamic routes

---

## 2026-03-18 — CLAUDE.md updated: SESSION START section added, stale refs fixed

**What worked:** Targeted edits landed cleanly — new mandatory session ritual at top, old checklist removed, repo/version refs corrected in one pass
**What went wrong:** CLAUDE.md had stale version numbers (Next.js 14, Tailwind without v4 note) and a wrong repo name that would have caused confusion on every future session
**Root cause:** CLAUDE.md was written as a spec before the actual install — installed versions diverged from spec targets and were never reconciled back into the doc
**Rule going forward:** After any `npm install` or scaffold, immediately reconcile CLAUDE.md tech stack versions against what was actually installed — never let spec and reality drift
**Files changed:** CLAUDE.md

---

## 2026-03-18 — todo.md restructure: Phase 2A/2B inserted before core components

**What worked:** Splitting "Phase 2 — Core Components" into 2A (tokens), 2B (utility libs), and 2C (components) gives a cleaner dependency order — styles and animation helpers must exist before components consume them
**What went wrong:** Original todo.md had no separation between infrastructure (CSS tokens, GSAP setup) and component work, making it easy to start components before the foundations were ready
**Root cause:** Initial task plan was written top-down by feature, not by dependency layer — infrastructure and utility code were grouped under the same phase as UI components
**Rule going forward:** Always layer task phases by dependency: tokens → utility libs → components → sections → pages. Never put a component task in the same phase as the libs it imports
**Files changed:** tasks/todo.md

---

## 2026-03-18 — Phase 1 Foundation: CSS tokens, Tailwind v4 theme, layout cleanup

**What worked:** Tailwind v4 `@theme {}` directive cleanly maps all design tokens to utility classes. `@import "tailwindcss"` replaces the old three-directive pattern. Self-hosted @font-face in globals.css works without any next/font setup. Build was clean first try after adding `metadataBase`.

**What went wrong:** `metadataBase` missing on first build — Next.js 16 warns when OG image URLs can't be resolved to absolute. Easy fix but easy to forget.

**Root cause:** `create-next-app` scaffolds with Geist fonts and placeholder metadata — always replace fully before first build.

**Rule going forward:** After any `create-next-app` scaffold, immediately strip Geist imports from layout.tsx, set real metadata with `metadataBase`, and replace globals.css before running the first build. Never leave scaffold defaults in place.

**Files changed:** `app/globals.css`, `app/layout.tsx`, `styles/tokens.css`, `tasks/lessons.md`

---

<!-- NEW ENTRIES PREPENDED ABOVE THIS LINE BY post-run.sh -->
