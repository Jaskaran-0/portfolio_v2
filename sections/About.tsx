'use client'
// About.tsx — Split grid: left copy + right 3-layer parallax visual
// Redacted blocks reveal on hover

import { useEffect, useRef } from 'react'

function Redacted({ children }: { children: string }) {
  return (
    <span
      data-cursor="crosshair"
      className="redacted"
      title="hover to reveal"
    >
      {children}
    </span>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const backRef    = useRef<HTMLDivElement>(null)
  const midRef     = useRef<HTMLDivElement>(null)
  const frontRef   = useRef<HTMLDivElement>(null)

  // 3-layer parallax — each layer scrolls at a different rate
  useEffect(() => {
    const onScroll = () => {
      const back  = backRef.current
      const mid   = midRef.current
      const front = frontRef.current
      if (!sectionRef.current || !back || !mid || !front) return

      const rect     = sectionRef.current.getBoundingClientRect()
      const progress = -rect.top / (window.innerHeight * 0.6)

      back.style.transform  = `translateY(${progress * 24}px)`
      mid.style.transform   = `translateY(${progress * 56}px)`
      front.style.transform = `translateY(${progress * 88}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(48px, 8vw, 100px) clamp(24px, 8vw, 120px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(32px, 6vw, 80px)',
        alignItems: 'start',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border2)',
      }}
    >
      {/* ── Left: copy ── */}
      <div>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--red)',
          marginBottom: 24,
        }}>
          Background
        </p>

        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(15px, 1.5vw, 17px)', lineHeight: 1.8, color: 'var(--text)', marginBottom: 20 }}>
          I build backend systems for problems that{' '}
          <Redacted>most developers refuse to touch</Redacted>. My stack
          is ASP.NET Core, Python, and PostgreSQL — tools chosen for
          production reliability, not resume padding.
        </p>

        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(15px, 1.5vw, 17px)', lineHeight: 1.8, color: 'var(--text)', marginBottom: 20 }}>
          The RCAF project started as a{' '}
          <Redacted>long-shot government contract</Redacted>. It ended
          with a pipeline that matched faces across a 1,000-image
          archival database with 94.7% accuracy. The client called it
          impossible before we delivered it.
        </p>

        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(15px, 1.5vw, 17px)', lineHeight: 1.8, color: 'var(--text)', marginBottom: 20 }}>
          I&apos;m based in Hamilton, ON. Currently{' '}
          <Redacted>actively looking for the right team</Redacted> — backend-heavy,
          product-focused, ships real things. If you&apos;re building something that
          scares you a little, that&apos;s my lane.
        </p>

        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(15px, 1.5vw, 17px)', lineHeight: 1.8, color: 'var(--text2)' }}>
          <em>Fun fact: this portfolio is named after a Tarantino aesthetic. The code
          is not — it&apos;s clean, typed, and documented.</em>
        </p>

        <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            ['Hamilton, ON', '📍'],
            ['Open to work', '🟢'],
            ['Backend-first', '⚙️'],
          ].map(([label, icon]) => (
            <span key={label} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.1em',
              color: 'var(--text2)',
              border: '1px solid var(--border2)',
              borderRadius: 2,
              padding: '5px 12px',
            }}>
              {icon} {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right: 3-layer parallax visual ── */}
      <div style={{
        position: 'relative',
        height: 'clamp(320px, 40vw, 480px)',
        overflow: 'hidden',
      }}>
        {/* Layer 1 — back (slowest): large ghost initials */}
        <div
          ref={backRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(120px, 18vw, 220px)',
            letterSpacing: '0.02em',
            color: 'rgba(255,60,0,0.05)',
            lineHeight: 1,
            userSelect: 'none',
          }}>
            JSM
          </span>
        </div>

        {/* Layer 2 — mid: stats card */}
        <div
          ref={midRef}
          style={{
            position: 'absolute',
            top: '18%',
            left: '8%',
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            padding: 'clamp(16px, 2vw, 24px) clamp(20px, 3vw, 32px)',
            borderRadius: 2,
          }}
        >
          {[
            { val: '3',   label: 'Shipped projects' },
            { val: '94%', label: 'Face match accuracy' },
            { val: '1k+', label: 'Images processed' },
            { val: '32',  label: 'API endpoints (MedicHelper)' },
          ].map(({ val, label }) => (
            <div key={label} style={{ marginBottom: 16, display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                letterSpacing: '0.04em',
                color: 'var(--red)',
                lineHeight: 1,
                flexShrink: 0,
              }}>{val}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text2)',
                letterSpacing: '0.08em',
              }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Layer 3 — front (fastest): floating label */}
        <div
          ref={frontRef}
          style={{
            position: 'absolute',
            bottom: '12%',
            right: '6%',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--yellow)',
            background: 'rgba(245,197,24,0.08)',
            border: '1px solid rgba(245,197,24,0.2)',
            padding: '6px 14px',
            borderRadius: 2,
          }}>
            Hamilton, ON · 2025
          </div>
          <div style={{
            marginTop: 10,
            width: 1,
            height: 48,
            background: 'linear-gradient(to bottom, var(--yellow), transparent)',
            marginLeft: 'auto',
            marginRight: 'auto',
          }} />
        </div>
      </div>

      <style>{`
        .redacted {
          background: var(--text);
          color: transparent;
          border-radius: 2px;
          padding: 0 3px;
          transition: background 0.35s, color 0.35s;
        }
        .redacted:hover {
          background: transparent;
          color: var(--text);
        }
      `}</style>
    </section>
  )
}
