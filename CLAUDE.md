# CLAUDE.md — Jaskaran Singh Portfolio
# Last updated: auto-updated by post-run hook
# Read this FULLY before any task.

---

## SESSION START — MANDATORY
Do this before any other action, every session, no exceptions:
1. Read tasks/lessons.md — internalize standing rules
2. Read tasks/todo.md — know current state
3. Update CURRENT SESSION section in todo.md with today's planned tasks
4. Confirm /mcp shows github, context7, puppeteer, sequential-thinking connected
5. Mark todo items [x] as you complete them — not at the end
6. Run /lesson before /exit every session

---

## WORKFLOW ORCHESTRATION

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity
- **Before writing a single line of code: state your plan in a numbered list**

### 2. Subagent Strategy
- Use subagents to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Be ruthless — iterate on lessons until mistake rate drops
- Review `lessons.md` at session start

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests → then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

## TASK MANAGEMENT

1. **Plan First** — Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan** — Check in before starting implementation
3. **Track Progress** — Mark items complete as you go
4. **Explain Changes** — High-level summary at each step
5. **Document Results** — Add result section to `tasks/todo.md`
6. **Capture Lessons** — Update `tasks/lessons.md` after corrections

---

## CORE PRINCIPLES

- **Simplicity First** — Make every change as simple as possible. Impact minimal code
- **No Laziness** — Find root causes. No temporary fixes. Senior developer standards
- **Minimal Impact** — Only touch what's necessary. No side effects with new bugs
- **No Guessing** — If unclear, ask one focused question before proceeding
- **Own Mistakes** — When wrong, fix it. No excuses, no re-explaining

---

## PROJECT IDENTITY

**Name:** Jaskaran Singh Malhotra — Personal Portfolio  
**Owner:** Jaskaran Singh Malhotra (`github.com/Jaskaran-0`)  
**Location:** Hamilton, ON, Canada  
**Goal:** Cinematic experience portfolio. Not a resume. Gets him hired.  
**Live URL:** `jaskaran-0.github.io` (GitHub Pages static export)  
**Repo:** `github.com/Jaskaran-0/portfolio_v2`

---

## TECH STACK

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16 App Router + TypeScript | Static export, SEO, Canadian employers recognize it |
| Styling | Tailwind v4 + CSS custom properties — `@theme` directive in globals.css, no tailwind.config.ts | Utility layout + design token system |
| 3D / WebGL | Three.js r128 | Hero icosahedron + shard scene, RCAF arch diagram |
| Animation | GSAP 3 + ScrollTrigger | Scroll-driven reveals, SplitText character animation |
| Fonts | Bebas Neue, Syne, Space Mono, Special Elite | DO NOT substitute |
| Hosting | GitHub Pages (static export) | Free, `jaskaran-0.github.io` |
| CI/CD | GitHub Actions | Auto-deploy on push to main |

---

## DESIGN SYSTEM — NON-NEGOTIABLE

```css
/* Color tokens */
--red:     #FF3C00   /* Primary accent — Tarantino aggression */
--yellow:  #F5C518   /* Secondary — Pulp Fiction yellow */
--bg:      #050505   /* Near-black base */
--bg2:     #0A0A0A
--bg3:     #111111
--text:    #F5F0EB   /* Warm white */
--text2:   rgba(255,255,255,0.40)
--text3:   rgba(255,255,255,0.18)
--border:  rgba(255,60,0,0.15)
--border2: rgba(255,255,255,0.07)
```

**Typography scale:**
- Display: `Bebas Neue` — headings only, `letter-spacing: .04em`
- UI: `Syne 700/800` — nav, buttons, labels
- Body: `Syne 400` — paragraph text (NOT Special Elite for body)
- Meta: `Space Mono` — eyebrows, tags, terminal, timestamps
- Accent: `Special Elite` — chapter card quotes, loader definition, terminal flavor text ONLY

**DO NOT:**
- Use Inter, Roboto, Arial, or system fonts anywhere
- Use purple gradients
- Center-align body text
- Add animations that autoplay on loop (scroll-triggered only)
- Hardcode colors outside CSS variables

---

## FILE STRUCTURE

```
/
├── CLAUDE.md              ← this file
├── tasks/
│   ├── todo.md            ← active task list (auto-updated)
│   └── lessons.md         ← self-learning log (auto-updated)
├── hooks/
│   └── post-run.sh        ← runs after every Claude Code session
├── app/
│   ├── layout.tsx
│   ├── page.tsx           ← single scroll page
│   └── projects/
│       ├── rcaf/page.tsx
│       ├── medichelper/page.tsx
│       └── job-aggregator/page.tsx
├── components/
│   ├── Cursor.tsx
│   ├── Loader.tsx         ← two-phase: definition → production title
│   ├── Nav.tsx            ← floating pill nav
│   ├── Terminal.tsx       ← draggable briefcase terminal
│   └── ui/                ← atoms (Button, Badge, Chip)
├── sections/
│   ├── Hero.tsx           ← Three.js A+B scene
│   ├── Chapter.tsx        ← reusable chapter card
│   ├── About.tsx          ← 3-layer parallax visual
│   ├── Projects.tsx       ← featured + grid
│   ├── Skills.tsx
│   └── Contact.tsx
├── lib/
│   ├── three-hero.ts      ← icosahedron + shard scene
│   ├── three-arch.ts      ← RCAF architecture 3D diagram
│   ├── gsap.ts            ← animation configs + ScrollTrigger setup
│   └── split-text.ts      ← character animation helper
├── data/
│   ├── projects.ts        ← typed project data
│   └── skills.ts          ← typed skills data
├── public/
│   └── fonts/             ← self-hosted fonts (perf)
├── styles/
│   └── globals.css        ← CSS variables, resets
└── next.config.js         ← output: 'export', images: unoptimized
```

---

## SECTION INVENTORY

| Section | Key Details |
|---|---|
| Loader | Phase 1: PULP dictionary definition (2.2s). Phase 2: "A Jaskaran Singh Production" title card + progress bar |
| Hero | Three.js icosahedron (right-side, x:2.6) + 38 peripheral shards. Character-by-character name entrance. Left zone protected by gradient |
| Chapter Cards | `44-52vh`, Bebas Neue `clamp(42px,7vw,96px)`, PF intertitle proportions, top/bottom rules animate in, film burn flash on entry, `scroll-snap-align: center` |
| About | Split grid. Left: copy with redacted blocks (hover to reveal). Right: 3-layer parallax visual (back/mid/front move at different speeds) |
| Projects | Featured: RCAF card with Three.js floating arch diagram on hover. Grid: 3 cards with 3D tilt + dynamic glare |
| Skills | 2-col grid, grouped by category, chips animate in on scroll |
| Contact | Massive Bebas heading, radial glow orb, 4 link buttons |
| Terminal | Briefcase 💼 fixed bottom-right. Draggable. Commands: help, whoami, ls projects, cat resume, cat impact.txt, skills, contact, pulp, sudo, briefcase, clear |

---

## MCP SERVERS — INSTALL BEFORE BUILDING

```bash
# 1. GitHub — reads your repos directly
claude mcp add github -- npx -y @modelcontextprotocol/server-github
# Set: GITHUB_PERSONAL_ACCESS_TOKEN in env

# 2. Context7 — live docs for GSAP, Three.js, Next.js (prevents stale API)
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest

# 3. Puppeteer — screenshot at any viewport without leaving terminal
claude mcp add puppeteer -- npx @modelcontextprotocol/server-puppeteer

# 4. Sequential Thinking — for architectural decisions
claude mcp add sequential-thinking -- npx @modelcontextprotocol/server-sequential-thinking
```

---

## COMMANDS

Custom slash commands live in `.claude/commands/`. Run with `/command-name`.

```
/build-section   — scaffold a new section component with correct imports
/screenshot      — puppeteer screenshot at 375px, 768px, 1280px, 1920px
/check-tokens    — verify no hardcoded colors, wrong fonts, or broken vars
/new-project     — add a new project to data/projects.ts with full schema
/deploy          — run build + export + push to gh-pages branch
/lesson          — manually append an entry to tasks/lessons.md
```

---

## SELF-LEARNING SYSTEM

Claude logs what it learns after every session via post-run hook.

### How it works
1. Every session end → `hooks/post-run.sh` fires
2. Hook appends structured entry to `tasks/lessons.md`
3. Next session → Claude reads lessons.md at start
4. Patterns accumulate → fewer repeated mistakes

### lessons.md format
```markdown
## [DATE] — [TASK SUMMARY]
**What worked:** ...
**What went wrong:** ...
**Root cause:** ...
**Rule going forward:** ...
**Files changed:** ...
```

### Self-improvement triggers
- User corrects Claude → mandatory lesson entry
- Bug discovered in own code → lesson entry + root cause analysis
- Architectural decision made → document reasoning
- Performance issue found → document the fix pattern

---

## GITHUB ACTIONS — AUTO DEPLOY

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

```js
// next.config.js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '',
  trailingSlash: true,
}
module.exports = nextConfig
```

---

## ANIMATION RULES

- **Scroll reveals:** `IntersectionObserver` threshold `0.12` — elements fade up `translateY(20px) → 0`
- **Chapter card entrance:** staggered sequence — top rule → vertical line → chapter num → title → yellow rule → quote → bottom rule
- **Hero name:** character split, stagger `42ms` per char, `cubic-bezier(.16,1,.3,1)`
- **Film burn:** `opacity 0 → .14 → 0` on chapter card entry, total `350ms`
- **GSAP ScrollTrigger:** pin chapter cards for `0.4s` of scroll before release (not CSS snap)
- **Card tilt:** `perspective(700px) rotateY(17deg) rotateX(13deg)` max
- **Scroll snap:** `scroll-snap-type: y proximity` on `html` — guides, never locks

---

## PERFORMANCE TARGETS

- Lighthouse score: **90+** on all metrics
- Three.js: pixel ratio capped at `2`, particle count scaled to viewport (`W*H/5200`)
- GSAP: tree-shake — import only what's used
- Fonts: self-host via `/public/fonts/`, `font-display: swap`
- Images: Next.js `<Image>` with `priority` on above-fold only
- Bundle: analyze with `@next/bundle-analyzer` before deploy

---

## KNOWN GOTCHAS

1. **Three.js canvas z-index** — hero canvas must be `z-index: 0`, vignette `z-index: 1`, content `z-index: 2`. If content disappears, check stacking context
2. **GSAP ScrollTrigger + Next.js App Router** — import GSAP client-side only (`'use client'` + dynamic import or `useEffect`)
3. **Static export + dynamic routes** — case study pages need `generateStaticParams()` or they 404 on GitHub Pages
4. **GitHub Pages base path** — if repo is not `username.github.io`, set `basePath: '/repo-name'` in `next.config.js`
5. **Special Elite font** — body copy in Special Elite causes eye strain at 16px+. Use Syne for all paragraph text. Special Elite = flavor only
6. **Scroll snap + Three.js** — `scroll-snap-type: mandatory` fights Three.js animation frames. Use `proximity` only
7. **`useEffect` cleanup** — Three.js renderer must be disposed in cleanup: `renderer.dispose()`. Memory leak otherwise

