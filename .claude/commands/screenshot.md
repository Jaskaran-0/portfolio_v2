# .claude/commands/screenshot.md
# Usage: /screenshot
# Takes Puppeteer screenshots at all 4 breakpoints and reports layout issues.

Use the Puppeteer MCP to capture screenshots of the running dev server at:
- 375px  — mobile
- 768px  — tablet
- 1280px — laptop
- 1920px — desktop

Save each to: `tasks/screenshots/[timestamp]-[breakpoint].png`
Create the directory if it doesn't exist.

After capturing all four, review each screenshot and report:
- Any text wrapping or overflow
- Elements overlapping (nav over content, terminal over page, progress dots clipping)
- Three.js canvas covering content text
- Chapter cards not displaying correctly
- Grid layouts collapsing unexpectedly
- Anything that looks broken at that breakpoint

Fix any issues you find before marking done.
