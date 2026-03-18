# .claude/commands/check-tokens.md
# Usage: /check-tokens
# Audits the entire codebase for design system violations.

Scan every `.tsx`, `.ts`, `.css` file in the project for the following violations.
Report each one with file path and line number. Fix them all.

## What to look for:

### 1. Hardcoded colors
Any hex, rgb(), or rgba() value that is NOT inside `globals.css` or `tokens.css`
as a variable definition. All color usage in components must reference `var(--token)`.

Bad:  `color: #FF3C00`
Good: `color: var(--red)`

Bad:  `background: rgba(255,255,255,0.07)`
Good: `background: var(--border2)`

### 2. Wrong font families
Any `font-family` that is not one of:
- `'Bebas Neue', sans-serif`
- `'Syne', sans-serif`
- `'Space Mono', monospace`
- `'Special Elite', cursive`

Flag any use of: Inter, Roboto, Arial, system-ui, -apple-system, sans-serif alone.

### 3. Special Elite on body/paragraph text
`Special Elite` must ONLY appear on:
- Chapter card quotes (`.chq`)
- Loader definition text
- Terminal flavor text
- `avsub` (about visual subtitle)

Flag any `font-family: 'Special Elite'` on paragraph tags, `.ab-p`, `.fdesc`, `.cdsc`, or any element with more than 1 line of reading text.

### 4. Purple anything
Any `#[hex]` or `rgb()` value that resolves to purple/violet range (hue 260-310).
This includes purple gradients. Flag and remove.

### 5. Missing CSS variable definitions
If a `var(--something)` is used but not defined in `globals.css`, flag it.

## After scanning:
- Fix all violations
- Run `/lesson` and note any patterns found
