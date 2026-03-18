# .claude/commands/build-section.md
# Usage: /build-section [section-name]
# Scaffolds a new section component with correct imports and structure.

Create a new section component at `sections/[NAME].tsx`.

Follow this exact structure:
1. `'use client'` directive at top
2. Import: useState, useEffect, useRef from react
3. Import: gsap from gsap, ScrollTrigger from gsap/ScrollTrigger
4. Import: design tokens from styles/globals.css (use CSS vars, not hardcoded values)
5. Register ScrollTrigger plugin inside useEffect
6. Component returns a `<section id="[name]">` with correct scroll-snap-align
7. All animation logic inside useEffect with cleanup return
8. Export as default

Check CLAUDE.md for the correct section design spec before writing any code.
Verify: no hardcoded colors, correct font family, correct padding (72px top/bottom, 7vw horizontal).
