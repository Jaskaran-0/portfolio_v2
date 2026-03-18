#!/bin/bash
# hooks/post-run.sh
# Runs automatically after every Claude Code session.
# Logs what happened, what was learned, what changed.
# Install: add to .claude/hooks/post-run in project config.

set -e

DATE=$(date '+%Y-%m-%d %H:%M')
LESSONS_FILE="tasks/lessons.md"
TODO_FILE="tasks/todo.md"
LOG_DIR="tasks/logs"
LOG_FILE="$LOG_DIR/session-$(date '+%Y%m%d-%H%M%S').md"

mkdir -p "$LOG_DIR"

# ── 1. COLLECT CHANGED FILES ──
CHANGED=$(git diff --name-only HEAD 2>/dev/null || echo "no git context")
ADDED=$(git diff --name-only --diff-filter=A HEAD 2>/dev/null || echo "")
DELETED=$(git diff --name-only --diff-filter=D HEAD 2>/dev/null || echo "")

# ── 2. WRITE SESSION LOG ──
cat > "$LOG_FILE" <<EOF
# Session Log — $DATE

## Files Modified
\`\`\`
$CHANGED
\`\`\`

## Files Added
\`\`\`
$ADDED
\`\`\`

## Files Deleted
\`\`\`
$DELETED
\`\`\`

## Auto-captured Context
- Git branch: $(git branch --show-current 2>/dev/null || echo "unknown")
- Last commit: $(git log -1 --pretty=format:'%s' 2>/dev/null || echo "none")
- Node version: $(node -v 2>/dev/null || echo "unknown")
- Working dir: $(pwd)

## Lesson Entry (Claude fills this in)
<!-- 
FORMAT — Claude should append to lessons.md:

**What worked:** [what went well this session]
**What went wrong:** [any mistakes, bugs, incorrect assumptions]
**Root cause:** [why it went wrong]
**Rule going forward:** [one-line rule to prevent recurrence]
**Files changed:** [key files touched]
-->

EOF

echo "✓ Session log written to $LOG_FILE"

# ── 3. PROMPT CLAUDE TO FILL THE LESSON ──
# Claude Code reads this and appends the lesson entry to lessons.md
# The actual content is written by Claude at session end via /lesson command

# ── 4. AUTO-SNAPSHOT TODO STATUS ──
DONE_COUNT=$(grep -c '\[x\]' "$TODO_FILE" 2>/dev/null || echo 0)
PENDING_COUNT=$(grep -c '\[ \]' "$TODO_FILE" 2>/dev/null || echo 0)
IN_PROGRESS=$(grep -c '\[~\]' "$TODO_FILE" 2>/dev/null || echo 0)

echo "✓ Todo status: $DONE_COUNT done / $IN_PROGRESS in progress / $PENDING_COUNT pending"

# ── 5. LINT CHECK (non-blocking) ──
if [ -f "package.json" ]; then
  echo "Running lint check..."
  npx next lint --quiet 2>/dev/null && echo "✓ Lint clean" || echo "⚠ Lint warnings — check before commit"
fi

# ── 6. TYPE CHECK (non-blocking) ──
if [ -f "tsconfig.json" ]; then
  echo "Running type check..."
  npx tsc --noEmit --skipLibCheck 2>/dev/null && echo "✓ Types clean" || echo "⚠ Type errors — check before commit"
fi

echo ""
echo "─────────────────────────────────────"
echo "Session complete. Log: $LOG_FILE"
echo "Next: run /lesson to capture what you learned."
echo "─────────────────────────────────────"
