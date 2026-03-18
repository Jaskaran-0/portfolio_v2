# .claude/commands/deploy.md
# Usage: /deploy
# Builds, exports, and verifies the static site. You push manually.

## Pre-deploy checklist
Run these before building. Fix anything that fails.

- [ ] `npm run lint` — zero errors (warnings OK)
- [ ] `npx tsc --noEmit` — zero type errors
- [ ] All dynamic routes have `generateStaticParams()` exported
- [ ] `next.config.js` has `output: 'export'` and `images: { unoptimized: true }`
- [ ] `/public/resume/jaskaran-singh-resume.pdf` exists
- [ ] No `getServerSideProps` anywhere (incompatible with static export)
- [ ] No API routes under `app/api/` (incompatible with static export)

## Build
```bash
npm run build
```

If build fails:
- Read the error fully before trying to fix it
- Check the static export gotchas in CLAUDE.md first
- Fix the root cause — do not comment out or skip errors

## Verify the output
```bash
ls out/
# Must contain: index.html, projects/, _next/
ls out/projects/
# Must contain: rcaf/, medichelper/, job-aggregator/
# Each subfolder must contain an index.html
```

If any project subfolder is missing, `generateStaticParams()` is not exported from that page. Fix it.

## Test locally before pushing
```bash
npx serve out -p 3001
# Open http://localhost:3001 and verify:
# - Home page loads
# - Navigation works
# - All project case study links work
# - Resume download works
# - 3D hero renders
```

## Hand off to Jas
Once verified, tell Jas:
- Build succeeded
- Output is in `/out`
- Run: `git add . && git commit -m "deploy: [description]" && git push origin main`
- GitHub Actions will deploy automatically (~60s)
- Live at: https://jaskaran-0.github.io

DO NOT run git commands yourself unless Jas explicitly says to.
