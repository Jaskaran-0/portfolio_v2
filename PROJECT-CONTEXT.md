# PROJECT CONTEXT — Jaskaran Singh Portfolio
# Import this into Claude Projects as the system context document.
# This is the full record of design decisions, what was accepted, what was rejected, and why.

---

## WHO THIS IS FOR

**Owner:** Jaskaran Singh Malhotra  
**GitHub:** `github.com/Jaskaran-0`  
**Location:** Hamilton, ON, Canada  
**Background:** Recent Mohawk College grad, Advanced Diploma in Computer Systems Technology (Software Development). Actively job hunting for junior-to-mid backend and full-stack roles in Canada.  
**Core stack:** ASP.NET Core 8, Java (Android), Python, Flask, PostgreSQL, Entity Framework Core, JWT auth, SignalR, Hangfire.  
**Side interests:** Arduino/ESP32 hardware, anime Discord bots, beginner Canadian investing.

---

## WHAT WE BUILT

A personal portfolio that is a cinematic experience, not a resume. Inspired by three reference points:
- **Apple product pages** — scroll-driven reveals, obsessive spacing, everything glides
- **Rockstar Games website** — cinematic dark atmosphere, full-bleed sections
- **Quentin Tarantino's visual philosophy** — non-linear storytelling, chapter-based structure, uncomfortable pacing, ordinary things made cinematic through framing

The final direction: **Tarantino Full Send** — Pulp Fiction-derived, editorial, aggressive, with a developer portfolio underneath.

---

## DESIGN DECISIONS — ACCEPTED

### Color Palette
- **Primary accent:** `#FF3C00` (Tarantino red/orange aggression)
- **Secondary accent:** `#F5C518` (Pulp Fiction yellow — iconic, immediately recognizable)
- **Base:** `#050505` (near-black, darker than pure black)
- **Text:** `#F5F0EB` (warm white, not cold)
- **Rationale:** The red+yellow war palette is directly derived from Pulp Fiction. Anyone who's seen the film recognizes it. It signals the design is intentional, not arbitrary.

### Typography
- **Display:** `Bebas Neue` — all headings, massive, condensed, commanding. All-caps only.
- **UI:** `Syne 700/800` — nav, buttons, section labels, body paragraph text
- **Meta:** `Space Mono` — eyebrows, tags, terminal, timestamps, code-adjacent text
- **Accent:** `Special Elite` — chapter card quotes, loader dictionary definition, terminal flavor text ONLY. Never for paragraph body copy (causes eye strain).
- **Rejected:** Inter, Roboto, Arial, Space Grotesk — generic, kills the aesthetic

### Structure — Scroll Architecture
- Single-page scroll with `scroll-snap-type: y proximity` on `html`
- **`proximity` not `mandatory`** — guides gently, doesn't fight Three.js animation frames or trap fast scrollers
- Chapter title cards between every content section — act as cinematic pauses
- Chapter cards: `44-52vh` height (not full-screen — original `100vh` made huge empty voids)
- Content sections: `72px` top/bottom padding, `7vw` horizontal

### Chapter Cards — Pulp Fiction Intertitle Proportions
The real PF title cards: centered text, max ~60% viewport width, thin horizontal rules above and below, stark contrast. We mirrored this:
- `max-width: 58vw` on title text — never full width
- Top white rule animates in, then vertical red line, then chapter number, then title, then yellow rule, then quote, then bottom white rule
- Film burn flash on entry (0.08s red/orange overlay, fades in 350ms total)
- Corner crop marks (film frame reference)

### 3D Hero — A+B Combined
- **Option A (Icosahedron):** Wireframe icosahedron + inner solid + ghost outer ring. Right-side positioned (`x: 2.6`) so it never overlaps the text
- **Option B (Shards):** 38 peripheral fragments that scatter on mouse repulsion
- **Combined:** Icosahedron as anchor, shards in periphery. Key design constraint: xMin `-1.2` — shards never enter left content zone
- Left content protected by `linear-gradient(to right, rgba(5,5,5,.78) 0%, transparent 68%)`
- Particle count scales with viewport: `Math.min(150, Math.floor(W*H/5200))`
- Pixel ratio capped at `2` — never remove, kills mobile perf

### Pulp Fiction Direct References
All four were accepted:
1. **Loader Phase 1:** Dictionary definition card — `PULP (pyoolp) n.` in Special Elite, exact format from the film's opening frame. Holds 2.2s, fades to production title card
2. **Name hover tooltip:** Hover "Jaskaran Singh." → definition card slides up: `JASKARAN (jahs-kah-rahn) n. — 1. A backend developer. Architect of invisible systems.`
3. **Terminal `pulp` command:** Prints the full dictionary definition + explains the design philosophy
4. **Chapter cards:** Styled to match actual PF intertitle proportions (top/bottom thin rules, constrained text width)

### About Section — 3-Layer Parallax
Three div layers stacked absolutely, each moves at a different speed on mousemove:
- Back (grid): `4px` travel
- Mid (monogram + rings): `10px` travel
- Front (name caption): `16px` travel
- Card itself tilts `perspective(800px)` subtly
- Creates genuine depth perception without Three.js complexity

### RCAF Project — 3D Architecture Diagram
Hover the featured project right panel → static node ring fades out, Three.js scene fades in:
- 5 floating sphere nodes: Archival Images → Real-ESRGAN → ArcFace → PostgreSQL + Match Output
- Connection lines between pipeline stages
- Camera orbits slowly, nodes pulse on their own timing
- `ArchScene` class with `setActive(bool)` to pause when not hovering (performance)

### The Briefcase Terminal
- Fixed bottom-right `💼` icon with glow animation
- Click → draggable OS-style window (grab title bar, drag anywhere)
- Commands: `help`, `whoami`, `ls projects`, `cat resume`, `cat impact.txt`, `skills`, `contact`, `pulp`, `sudo`, `briefcase`, `clear`
- `sudo` response: "Nice try. But I wrote the architecture. I AM the root."
- `cat impact.txt` reveals real metrics (94.7% accuracy, 32 endpoints, etc.)
- `pulp` explains the design philosophy — why the site looks the way it looks

### Cursor Evolution
Changes character per section — user never consciously notices but it feels right:
- Hero / Chapters / Skills: default red dot + ring
- About: typewriter cursor (yellow blinking bar)
- Projects: crosshair
- Contact: target reticle with crosshair lines

### Navigation
- Floating pill nav, centered top, `backdrop-filter: blur`
- Active section highlighted in red
- "Cut to the Chase ⟶" button — yellow pill top-right for recruiters who want to skip
- Progress dots fixed right edge (content sections only, not chapter cards)

### Self-Learning System (Claude Code)
- `tasks/lessons.md` — Claude appends structured entries after every correction
- `tasks/todo.md` — active task list, Claude updates during sessions
- `hooks/post-run.sh` — fires after every session: git diff, todo status, lint, type check, lesson prompt
- Session logs auto-saved to `tasks/logs/`

---

## DESIGN DECISIONS — REJECTED

### Full CSS Scroll Snap (`mandatory`)
**Rejected because:** `scroll-snap-type: y mandatory` locked users in sections and fought Three.js. Felt like a trap, not a guide.  
**Replaced with:** `scroll-snap-type: y proximity` — soft snap that guides without locking.

### Special Elite for Body Copy
**Rejected because:** Typewriter font at paragraph size causes eye strain. Looks charming in demos but not readable for real content.  
**Kept for:** Chapter card quotes, loader definition, terminal accent text only.

### Chapter Cards at `100vh`
**Rejected because:** Created massive black voids in the scroll — dead space that felt unintentional.  
**Replaced with:** `44-52vh` with `padding: 44px` — still dramatic pause, not a black hole.

### Purple Gradients / Purple Anything
**Rejected categorically.** Generic AI aesthetic. Not in this project anywhere.

### Inter / Roboto / System Fonts
**Rejected categorically.** Default choices that kill visual identity.

### Particle Velocity = Scroll Speed (Gemini suggestion, full version)
**Partially rejected.** "Sparks off a grinding wheel" was too aggressive and risked performance issues.  
**Implemented as:** Mild version — particles grow slightly and stretch in movement direction on fast scroll, return to base on stop.

### `special-elite` for All Body Text (Tarantino "Full Send" original)
**Rejected for production.** Special Elite everywhere created eye strain. The Tarantino spirit is in structure and pacing, not font choice for every word.

### CSS Scroll Snap for Chapter Cards (hard mandatory)
**Rejected.** Mandatory snap fighting the Three.js render loop caused frame drops and janky behavior.

### Center-aligning Body Text
**Rejected.** Apple/editorial convention. Left-aligned text for all paragraphs.

### Looping Autoplay Animations
**Rejected.** All non-decorative animations are scroll-triggered only. Looping things draw attention away from content.

---

## GEMINI FEEDBACK — WHAT WAS USED

We pitched the design concept to Gemini for a second opinion. Here's what we took:

**Accepted from Gemini:**
- GSAP ScrollTrigger pin on chapter cards instead of CSS snap (better control)
- "Cut to the Chase" button — respects recruiter's 30-second first pass
- SplitText character animation on Bebas Neue headings (striking-paper effect)
- Architecture diagrams on project hover — proves "systems thinker" claim visually
- Card glare effect — dynamic `radial-gradient` tracking mouse position on project cards
- Draggable terminal window
- `sudo` Easter egg command
- `cat impact.txt` hidden metrics command
- Scroll velocity tied to particle behavior (implemented conservatively)
- Film burn transition on chapter card entry

**Rejected from Gemini:**
- Swapping body font to Inter or Space Grotesk — "safe choices that kill the aesthetic"
- Calling it "typewriter fatigue" for Special Elite everywhere — we agreed on middle ground (flavor only)

---

## PROJECTS IN THE PORTFOLIO

### 1. RCAF Facial Recognition System (Featured)
Applied research for the Canadian Air Force Museum. Role: Team Member A — progress oversight, data collection, analysis, success metrics.  
Pipeline: Real-ESRGAN upscaling → ArcFace/InceptionResNet face recognition → PostgreSQL identity store.  
1,000+ archival images processed. 94.7% match accuracy.  
Stack: Python, Real-ESRGAN, ArcFace, PostgreSQL, PowerShell.

### 2. MedicHelper Platform
Full-stack medical platform. ASP.NET Core 8 backend + Android Java frontend.  
Features: ASP.NET Identity + JWT auth, SignalR real-time notifications, Hangfire scheduled reminders, family account switching.  
32 API endpoints. PostgreSQL via Npgsql.  
Known gotchas: FCMToken NOT NULL constraint, hardcoded Eastern Time in reminder services, JWT security consideration on family account switching.

### 3. Job Aggregation System (In-progress)
Python + Playwright scraper → Flask API → PostgreSQL. Automated job application workflows across boards.  
Status: active development at time of portfolio build.

### 4. Water Tower IoT
ESP32 + LittleFS environmental sensor platform. Adafruit AHTX0 sensor served over mobile web interface via LittleFS.

---

## TECHNICAL CONSTRAINTS

- **GitHub Pages:** Static export only. No server-side rendering, no API routes, no `getServerSideProps`
- **Next.js static export:** All dynamic routes need `generateStaticParams()`
- **Three.js version:** Locked to `r128` — later versions change imports
- **GSAP in App Router:** Must be `'use client'` + `useEffect` or dynamic import. Never in server components
- **Font loading:** Self-hosted in `/public/fonts/` for production performance. Google Fonts OK in dev
- **Scroll snap + Three.js:** Only `proximity`, never `mandatory`
- **Three.js cleanup:** `renderer.dispose()` + geometry/material disposal in `useEffect` return or memory leaks on hot reload
- **basePath:** Empty string for `username.github.io` repos. Set to `/repo-name` for all others

---

## WHAT STILL NEEDS DECISIONS (bring to next session)

1. **About section photo:** Real photo of Jas vs. monogram JS visual vs. illustrated avatar — not decided
2. **Hero tagline copy:** "I turn complex problems into clean architecture" — accepted as direction, exact final wording TBD
3. **Chapter title copy:** Accepted as-is from demos but Jas may want to personalize
4. **Case study content:** RCAF and MedicHelper case study page copy not written yet
5. **Contact email:** Placeholder in demos, real email needed before deploy
6. **Resume PDF:** Needs to exist at `/public/resume/jaskaran-singh-resume.pdf` before download button works
7. **OG image:** For social sharing when URL is posted — needs to be created

---

## MCP STACK

```bash
# All 5 must be running before building:

# 1. GitHub MCP — reads repos directly, no copy-paste READMEs
claude mcp add github -- npx -y @modelcontextprotocol/server-github
# Needs: GITHUB_PERSONAL_ACCESS_TOKEN env var

# 2. Context7 — live docs, prevents stale GSAP/Three.js/Next.js API calls
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest

# 3. Puppeteer — screenshots at any viewport without leaving terminal
claude mcp add puppeteer -- npx @modelcontextprotocol/server-puppeteer

# 4. Sequential Thinking — for architectural decisions
claude mcp add sequential-thinking -- npx @modelcontextprotocol/server-sequential-thinking
```

---

## SLASH COMMANDS

| Command | What it does |
|---|---|
| `/build-section [name]` | Scaffold new section component with correct structure |
| `/screenshot` | Puppeteer screenshots at 375, 768, 1280, 1920px |
| `/check-tokens` | Audit for hardcoded colors, wrong fonts, design violations |
| `/new-project` | Add project to `data/projects.ts` with full schema |
| `/deploy` | Build + export + push to gh-pages |
| `/lesson` | Append lesson entry to `tasks/lessons.md` |

---

## WORKFLOW RULES (from Boris Cherny's CLAUDE.md, adapted)

1. **Plan Mode** — Enter plan mode for any task with 3+ steps. Write numbered plan before any code
2. **Subagents** — Use subagents to keep main context clean. One task per subagent
3. **Self-Improvement** — After any user correction, append to `tasks/lessons.md` immediately
4. **Verify Before Done** — Never mark complete without proving it works
5. **Demand Elegance** — Before finishing non-trivial work: "Is there a more elegant way?"
6. **Autonomous Bug Fixing** — When given a bug: fix it. Don't ask for hand-holding
7. **Simplicity First** — Minimal code impact. No side effects
8. **No Laziness** — Find root causes. No temporary fixes
9. **Session Start** — Always read `tasks/lessons.md` and `tasks/todo.md` first

---

## CONVERSATION HISTORY SUMMARY

**Session scope:** Full design phase from scratch to export-ready spec.

**What happened in order:**
1. Started with goal: portfolio as experience, not resume. Inspirations: Apple, Rockstar, Google product pages
2. Explored MCP integrations for UI/UX (Context7, Puppeteer, Sequential Thinking)
3. Built palette comparison demo — 4 options (Navy+Gold, Black+Blue, Charcoal+Crimson, Dark+Emerald)
4. Selected **Charcoal + Crimson** as base palette
5. Built font comparison — Syne, Epilogue, Figtree. Selected **Syne 800**
6. Determined layout was "too flat, like reading a restaurant menu" — moved to experience design
7. Introduced **Tarantino/Pulp Fiction direction** — accepted enthusiastically
8. Built 4 Tarantino intensity levels (Subtle / Medium / Full Send / Show All)
9. **Full Send locked in** — Bebas Neue display, Special Elite flavor, red+yellow war palette, scanlines
10. Added scroll snapping — debated mandatory vs proximity, landed on proximity
11. Pitched concept to Gemini for second opinion — incorporated accepted suggestions
12. Built complete scrollable portfolio demo with all Gemini suggestions
13. Fixed layout issues (overlap, text wrapping) — clean rewrite
14. Added Pulp Fiction direct references — dictionary definition loader, name hover tooltip, `pulp` terminal command, PF intertitle chapter cards
15. Built 3D hero comparison demo (4 options in Three.js)
16. Selected **A+B combination** — icosahedron anchor + peripheral shards
17. Built final combined 3D demo with content-first constraints
18. Built final complete portfolio demo with everything integrated
19. Generated all export files: CLAUDE.md, lessons.md, todo.md, post-run.sh, slash commands, three-hero.ts, three-arch.ts, projects.ts, skills.ts, deploy.yml, next.config.js
20. Generated project structure + this context document

---

## FOR CLAUDE PROJECTS — HOW TO USE THIS

When starting a new Claude Projects session for this portfolio:

1. This document is your full context — you know the design decisions, the rejected options, and why
2. Read `CLAUDE.md` in the repo for session-specific rules
3. Read `tasks/lessons.md` for what went wrong in previous sessions
4. Read `tasks/todo.md` for current task state
5. The final design demo is `portfolio-FINAL.html` — reference it for any "how should this look" questions
6. Never ask "what palette are we using" or "what fonts" — it's all above
7. The about section photo decision is still open — ask Jas if needed before building `About.tsx`
