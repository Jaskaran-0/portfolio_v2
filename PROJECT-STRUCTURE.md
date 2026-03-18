# Portfolio — Complete Project Structure
# Next.js 14 App Router + TypeScript + Tailwind + Three.js + GSAP
# Deploy target: GitHub Pages (static export) → jaskaran-0.github.io

```
portfolio/
│
├── CLAUDE.md                          ← AI session intelligence (read first every session)
├── next.config.js                     ← output: export, images: unoptimized
├── tailwind.config.ts                 ← custom colors, fonts, spacing
├── tsconfig.json
├── package.json
├── .gitignore
│
├── .github/
│   └── workflows/
│       └── deploy.yml                 ← auto-deploy to GitHub Pages on push to main
│
├── .claude/
│   └── commands/
│       ├── build-section.md           ← /build-section [name]
│       ├── screenshot.md              ← /screenshot — puppeteer at 4 breakpoints
│       ├── check-tokens.md            ← /check-tokens — audit for design violations
│       ├── new-project.md             ← /new-project — add to data/projects.ts
│       ├── deploy.md                  ← /deploy — build + export + push
│       └── lesson.md                  ← /lesson — append to tasks/lessons.md
│
├── hooks/
│   └── post-run.sh                    ← fires after every session: git diff, lint, types, lesson prompt
│
├── tasks/
│   ├── todo.md                        ← active task list (Claude updates during sessions)
│   ├── lessons.md                     ← self-learning log (Claude appends after corrections)
│   └── logs/                          ← auto-generated session logs (gitignored)
│       └── session-YYYYMMDD-HHMMSS.md
│
├── app/                               ← Next.js App Router
│   ├── layout.tsx                     ← root layout: fonts, metadata, Cursor, Nav, Terminal
│   ├── page.tsx                       ← single scroll page — imports all sections in order
│   ├── globals.css                    ← CSS variables (design tokens), resets
│   │
│   └── projects/                      ← case study pages (static params required)
│       ├── layout.tsx                 ← case study shell layout
│       ├── rcaf/
│       │   └── page.tsx               ← RCAF Facial Recognition case study
│       ├── medichelper/
│       │   └── page.tsx               ← MedicHelper case study
│       └── job-aggregator/
│           └── page.tsx               ← Job Aggregation System (in-progress)
│
├── components/                        ← reusable UI atoms
│   ├── Cursor.tsx                     ← custom cursor, 4 states (default/crosshair/type/target)
│   ├── Loader.tsx                     ← Phase 1: PULP definition. Phase 2: production title + bar
│   ├── Nav.tsx                        ← floating pill nav, active on scroll
│   ├── Terminal.tsx                   ← draggable briefcase terminal, all commands
│   └── ui/
│       ├── Button.tsx
│       ├── Chip.tsx
│       └── Badge.tsx
│
├── sections/                          ← full-page scroll sections
│   ├── Hero.tsx                       ← Three.js A+B scene + SplitText entrance + name tooltip
│   ├── Chapter.tsx                    ← reusable chapter card (receives title, quote, num props)
│   ├── About.tsx                      ← 3-layer parallax visual + redacted blocks
│   ├── Projects.tsx                   ← RCAF featured card + 3D arch diagram + card grid
│   ├── Skills.tsx                     ← grouped chips, scroll reveal
│   └── Contact.tsx                    ← massive heading, radial orb, link buttons
│
├── lib/
│   ├── three-hero.ts                  ← HeroScene class: icosahedron + shards (A+B combined)
│   ├── three-arch.ts                  ← ArchScene class: RCAF floating architecture diagram
│   ├── gsap.ts                        ← GSAP + ScrollTrigger setup, animation configs
│   └── split-text.ts                  ← character split animation helper
│
├── data/
│   ├── projects.ts                    ← typed Project[] — single source of truth
│   └── skills.ts                      ← typed SkillGroup[] — single source of truth
│
├── public/
│   ├── fonts/                         ← self-hosted (perf — no Google Fonts in prod)
│   │   ├── BebasNeue-Regular.woff2
│   │   ├── Syne-Bold.woff2
│   │   ├── Syne-ExtraBold.woff2
│   │   ├── SpaceMono-Regular.woff2
│   │   └── SpecialElite-Regular.woff2
│   ├── resume/
│   │   └── jaskaran-singh-resume.pdf  ← downloadable resume
│   └── og/
│       └── og-image.png               ← open graph image for social sharing
│
└── styles/
    └── tokens.css                     ← design token reference (imported in globals.css)
```

---

## Key Files — What Each One Does

### `app/layout.tsx`
Root layout. Loads fonts, sets metadata (title, description, OG tags), renders:
- `<Cursor />` — fixed, z-index 9999
- `<Nav />` — fixed pill, z-index 900
- `<Terminal />` — fixed bottom-right, z-index 945
- `{children}` — the page content

### `app/page.tsx`
Single scroll page. Renders sections in this exact order:
```tsx
<Loader />
<Hero />
<Chapter num="One" title="The Man Behind the Code" quote="..." />
<About />
<Chapter num="Two" title="The Work That Speaks" quote="..." />
<Projects />
<Chapter num="Three" title="Tools of the Trade" quote="..." />
<Skills />
<Chapter num="Four" title="The Final Scene" quote="..." />
<Contact />
```

### `app/globals.css`
```css
:root {
  --red:     #FF3C00;
  --yellow:  #F5C518;
  --bg:      #050505;
  --bg2:     #0A0A0A;
  --bg3:     #111111;
  --text:    #F5F0EB;
  --text2:   rgba(255,255,255,0.40);
  --text3:   rgba(255,255,255,0.18);
  --border:  rgba(255,60,0,0.15);
  --border2: rgba(255,255,255,0.07);
}
html {
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;
}
```

### `sections/Hero.tsx`
- `'use client'` + `useEffect` for Three.js (client-only)
- Instantiates `HeroScene` from `lib/three-hero.ts`
- Canvas positioned `z-index: 0`, left gradient vignette protects text zone
- SplitText character animation on name via `lib/split-text.ts`
- Pulp Fiction definition tooltip on name hover
- Cleanup: `scene.dispose()` in `useEffect` return

### `sections/About.tsx`
- Three `div` layers (back/mid/front) with `will-change: transform`
- `mousemove` event updates each layer's `translateX/Y` at different rates
- Back: `4px` travel. Mid: `10px`. Front: `16px`
- Card tilts `perspective(800px)` subtly following mouse
- Redacted blocks: `data-text` attribute + hover to reveal

### `sections/Projects.tsx`
- Featured card instantiates `ArchScene` from `lib/three-arch.ts`
- `onMouseEnter` → `archScene.setActive(true)`, canvas fades in
- `onMouseLeave` → `archScene.setActive(false)`, canvas fades out
- Grid cards: `mousemove` → 3D tilt + dynamic glare radial gradient

### `components/Terminal.tsx`
Commands object is populated from `data/projects.ts` for `ls projects`.
All terminal commands: `help`, `whoami`, `ls projects`, `cat resume`, `cat impact.txt`, `skills`, `contact`, `pulp`, `sudo`, `briefcase`, `clear`.
Draggable via mousedown on title bar.

---

## `package.json` Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "three": "^0.128.0",
    "gsap": "^3.12.x"
  },
  "devDependencies": {
    "typescript": "5.x",
    "@types/react": "18.x",
    "@types/three": "^0.128.0",
    "tailwindcss": "3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x",
    "@next/bundle-analyzer": "latest"
  }
}
```

## Init Commands

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --no-src-dir
cd portfolio
npm install three@0.128.0 @types/three@0.128.0 gsap@3
npm install --save-dev @next/bundle-analyzer

# MCP Servers
claude mcp add github -- npx -y @modelcontextprotocol/server-github
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest
npx @21st-dev/cli@latest install --api-key YOUR_KEY
claude mcp add puppeteer -- npx -y @modelcontextprotocol/server-puppeteer
claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking

# First run
claude "Read CLAUDE.md and tasks/todo.md then begin Phase 1 — Foundation"
```
