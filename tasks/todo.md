# todo.md — Active Task List
# Auto-updated by Claude Code during sessions
# Format: - [ ] pending  - [x] done  - [~] in progress

---

## CURRENT SESSION — 2026-03-23

**Done today:**
- Phase 2B: lib/gsap.ts, lib/split-text.ts (complete)
- Phase 2C: Cursor, Loader, Nav, Terminal, Chapter (all complete)
- Phase 3 (partial): Hero.tsx — Three.js scene + SplitText entrance
- Wired layout.tsx (Cursor, Loader, Nav, Terminal) and page.tsx (Hero + 4 Chapter stubs)
- Build: clean, zero errors

**Up next:** Phase 4 — Case study pages (/projects/rcaf, /projects/medichelper, /projects/job-aggregator)

---

## BACKLOG

### Phase 1 — Foundation
- [x] Init Next.js 14 App Router + TypeScript
- [x] Configure Tailwind with custom design tokens
- [x] Set up CSS variables in globals.css (all tokens from CLAUDE.md)
- [x] Self-host Bebas Neue, Syne, Space Mono, Special Elite in /public/fonts/
- [x] Configure next.config.js for static export
- [x] Set up GitHub Actions deploy workflow
- [x] Write CLAUDE.md to repo root
- [x] Install and verify all 5 MCP servers

### Phase 2A — Styles + Tokens
- [x] Create styles/tokens.css with all CSS variables from CLAUDE.md
- [x] Update app/globals.css — @font-face, scroll-snap, resets, body defaults
- [x] Configure Tailwind v4 using @theme directive in globals.css

### Phase 2B — Utility Libs
- [x] lib/gsap.ts — GSAP + ScrollTrigger registration, animation configs
- [x] lib/split-text.ts — character split animation helper

### Phase 2C — Core Components
- [x] Cursor.tsx — 4 states (default, crosshair, typewriter, target)
- [x] Loader.tsx — Phase 1 definition card + Phase 2 production title
- [x] Nav.tsx — floating pill, active state on scroll
- [x] Terminal.tsx — draggable, all commands, briefcase trigger
- [x] Chapter.tsx — reusable chapter card with all animations

### Phase 3 — Sections
- [x] Hero.tsx — Three.js A+B scene (ico + shards), SplitText entrance
- [x] About.tsx — 3-layer parallax visual, redacted blocks
- [x] Projects.tsx — RCAF featured with 3D arch diagram, card grid
- [x] Skills.tsx — grouped chips, scroll reveal
- [x] Contact.tsx — massive heading, link buttons

### Phase 4 — Case Study Pages
- [ ] /projects/rcaf — full breakdown, arch diagram, metrics
- [ ] /projects/medichelper — system diagram, tech deep dive
- [ ] /projects/job-aggregator — in-progress state, roadmap

### Phase 5 — Polish + Deploy
- [ ] Lighthouse audit (target 90+)
- [ ] Puppeteer screenshots at all breakpoints
- [ ] Mobile responsive check (375px, 768px)
- [ ] Bundle analysis
- [ ] Deploy to jaskaran-0.github.io
- [ ] Update LinkedIn + GitHub profile README with live URL

---

## COMPLETED
<!-- Moved here when done -->
