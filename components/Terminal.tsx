'use client'
// Terminal.tsx — Draggable briefcase terminal
// Trigger: 💼 fixed bottom-right. Drag via header bar.

import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Command definitions ──────────────────────────────────────────────────────

type OutputLine = { text: string; color?: string }

function runCommand(input: string, close: () => void): OutputLine[] {
  const cmd = input.trim().toLowerCase()

  switch (cmd) {
    case 'help':
      return [
        { text: 'Available commands:', color: 'var(--yellow)' },
        { text: '  whoami         — who is this person' },
        { text: '  ls projects    — list projects' },
        { text: '  cat resume     — open resume PDF' },
        { text: '  cat impact.txt — key metrics & outcomes' },
        { text: '  skills         — tech stack' },
        { text: '  contact        — get in touch' },
        { text: '  pulp           — easter egg' },
        { text: '  sudo           — do not' },
        { text: '  clear          — clear terminal' },
        { text: '  briefcase      — close terminal' },
      ]

    case 'whoami':
      return [
        { text: 'Jaskaran Singh Malhotra', color: 'var(--red)' },
        { text: 'Backend & full-stack developer, Hamilton ON.' },
        { text: 'ASP.NET Core · Python · PostgreSQL · React.' },
        { text: 'Obsessed with systems that actually ship.' },
      ]

    case 'ls projects':
      return [
        { text: 'drwxr-xr-x  rcaf/          — RCAF facial recognition pipeline', color: 'var(--text)' },
        { text: 'drwxr-xr-x  medichelper/   — medical inventory management system', color: 'var(--text)' },
        { text: 'drwxr-xr-x  job-aggregator/ — real-time job board (in progress)', color: 'var(--text2)' },
      ]

    case 'cat resume':
      if (typeof window !== 'undefined') {
        window.open('/resume/Jaskaran_Singh_Malhotra_Resume.pdf', '_blank')
      }
      return [
        { text: 'Opening resume...', color: 'var(--yellow)' },
        { text: '/resume/Jaskaran_Singh_Malhotra_Resume.pdf' },
      ]

    case 'cat impact.txt':
      return [
        { text: '── IMPACT ──────────────────────────────', color: 'var(--red)' },
        { text: '  40%   reduction in processing time (RCAF pipeline)' },
        { text: '  1000+ archival images processed through Real-ESRGAN' },
        { text: '  98%   match accuracy with ArcFace embeddings' },
        { text: '  3     production systems deployed' },
        { text: '────────────────────────────────────────', color: 'var(--red)' },
      ]

    case 'skills':
      return [
        { text: 'Backend:    ASP.NET Core · Python · Node.js · FastAPI', color: 'var(--text)' },
        { text: 'Frontend:   React · Next.js · TypeScript · Tailwind', color: 'var(--text)' },
        { text: 'Data:       PostgreSQL · SQL Server · Redis', color: 'var(--text)' },
        { text: 'ML/CV:      Real-ESRGAN · ArcFace · OpenCV · PyTorch', color: 'var(--text)' },
        { text: 'Infra:      Docker · GitHub Actions · Linux', color: 'var(--text)' },
      ]

    case 'contact':
      return [
        { text: 'email    → jaskaranmalhotra26@gmail.com', color: 'var(--yellow)' },
        { text: 'linkedin → linkedin.com/in/jaskaran-malhotra', color: 'var(--yellow)' },
        { text: 'github   → github.com/Jaskaran-0', color: 'var(--yellow)' },
      ]

    case 'pulp':
      return [
        { text: '"The path of the righteous man is beset on all sides', color: 'var(--red)' },
        { text: ' by the inequities of the selfish and the tyranny', color: 'var(--red)' },
        { text: ' of evil men."', color: 'var(--red)' },
        { text: '                    — Ezekiel 25:17 (Pulp Fiction)', color: 'var(--text2)' },
        { text: '' },
        { text: 'Also: this portfolio. Same energy.', color: 'var(--text2)' },
      ]

    case 'sudo':
      return [
        { text: 'sudo: permission denied.', color: 'var(--red)' },
        { text: 'Nice try.' },
      ]

    case 'briefcase':
      close()
      return [{ text: 'Closing briefcase.', color: 'var(--text2)' }]

    case 'clear':
      return [{ text: '__CLEAR__' }]

    case '':
      return []

    default:
      return [
        { text: `command not found: ${cmd}`, color: 'var(--text2)' },
        { text: 'Type "help" for available commands.' },
      ]
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface HistoryEntry {
  id: number
  prompt?: string
  output: OutputLine[]
}

const INITIAL: HistoryEntry[] = [
  {
    id: 0,
    output: [
      { text: '╔══════════════════════════════════╗', color: 'var(--red)' },
      { text: '║  JASKARAN SINGH — BRIEFCASE v1.0  ║', color: 'var(--red)' },
      { text: '╚══════════════════════════════════╝', color: 'var(--red)' },
      { text: 'Type "help" to see available commands.', color: 'var(--text2)' },
    ],
  },
]

export default function Terminal() {
  const [open, setOpen]     = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL)
  const [input, setInput]   = useState('')
  const [pos, setPos]       = useState({ x: 0, y: 0 })
  const inputRef  = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragRef   = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null)
  const idRef     = useRef(1)

  // Auto-scroll on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = runCommand(input, close)

    if (result[0]?.text === '__CLEAR__') {
      setHistory(INITIAL)
    } else {
      setHistory(prev => [
        ...prev,
        { id: idRef.current++, prompt: input, output: result },
      ])
    }
    setInput('')
  }

  // Drag logic — pointer events
  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, startY: e.clientY, ox: pos.x, oy: pos.y }
  }

  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setPos({ x: dragRef.current.ox + dx, y: dragRef.current.oy + dy })
  }

  const onDragEnd = () => { dragRef.current = null }

  return (
    <>
      {/* Briefcase trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        data-cursor="target"
        aria-label="Toggle terminal"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 150,
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '1px solid var(--border)',
          background: 'rgba(5,5,5,0.9)',
          backdropFilter: 'blur(8px)',
          fontSize: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'none',
          transition: 'border-color .2s, transform .2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--red)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        💼
      </button>

      {/* Terminal window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: `${88 - pos.y}px`,
            right: `${28 - pos.x}px`,
            zIndex: 149,
            width: 'min(520px, calc(100vw - 32px))',
            height: 380,
            background: 'rgba(8,8,8,0.96)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            overflow: 'hidden',
            boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
            animation: 'termSlideUp .25s cubic-bezier(.16,1,.3,1) both',
          }}
        >
          {/* Drag handle / title bar */}
          <div
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            style={{
              padding: '8px 14px',
              borderBottom: '1px solid var(--border2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'grab',
              userSelect: 'none',
              background: 'rgba(255,60,0,0.06)',
            }}
          >
            <span style={{ color: 'var(--red)', letterSpacing: '0.1em', fontSize: 11 }}>
              BRIEFCASE — jaskaran@portfolio
            </span>
            <button
              onClick={() => setOpen(false)}
              data-cursor="target"
              style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'none', fontSize: 14, lineHeight: 1 }}
            >
              ×
            </button>
          </div>

          {/* Output area */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {history.map(entry => (
              <div key={entry.id}>
                {entry.prompt !== undefined && (
                  <div style={{ color: 'var(--red)', marginBottom: 2 }}>
                    <span style={{ color: 'var(--text2)' }}>→ </span>{entry.prompt}
                  </div>
                )}
                {entry.output.map((line, i) => (
                  <div key={i} style={{ color: line.color || 'var(--text)', lineHeight: 1.6, whiteSpace: 'pre' }}>
                    {line.text}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={submit}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderTop: '1px solid var(--border2)',
              padding: '8px 16px',
              gap: 8,
            }}
          >
            <span style={{ color: 'var(--red)' }}>→</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="type a command..."
              autoComplete="off"
              spellCheck={false}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                cursor: 'text',
              }}
            />
          </form>
        </div>
      )}

      <style>{`
        @keyframes termSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
