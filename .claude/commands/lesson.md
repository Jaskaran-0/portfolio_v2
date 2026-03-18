# .claude/commands/lesson.md
# Usage: /lesson
# Appends a structured lesson entry to tasks/lessons.md.
# Run this after any correction, bug discovery, or important decision.

Open `tasks/lessons.md`.

Prepend the following entry directly below the `## STANDING RULES` section
and above any previous dated entries. Newest entries always go on top.

```markdown
## [TODAY'S DATE — YYYY-MM-DD] — [ONE LINE: what happened]

**What worked:** [what went well — be specific]
**What went wrong:** [the mistake or unexpected behavior — be honest]
**Root cause:** [why it happened — not what happened, WHY]
**Rule going forward:** [one actionable sentence that prevents recurrence]
**Files changed:** [comma-separated list of key files touched this session]

---
```

## Rules for writing good lessons:

- "What went wrong" should name the actual mistake, not describe the symptom
- "Root cause" should be one level deeper than "What went wrong"
- "Rule going forward" must be actionable — start with a verb (Never, Always, Check, Confirm, Run)
- If the lesson generalizes to a standing rule, also add it to the `## STANDING RULES` section at the top of the file

## Example of a good entry:

```markdown
## 2025-03-18 — Three.js memory leak on hot reload

**What worked:** HeroScene rendered correctly and performed well
**What went wrong:** Console showed "WebGL context lost" after 3 hot reloads
**Root cause:** useEffect cleanup didn't call renderer.dispose() — Three.js renderer
  was being garbage collected but GPU memory wasn't released
**Rule going forward:** Always call renderer.dispose() AND traverse scene to
  dispose geometry and materials in useEffect return function
**Files changed:** sections/Hero.tsx, lib/three-hero.ts

---
```
