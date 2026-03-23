'use client'
// Loader.tsx — Two-phase cinematic loader
// Phase 1: PULP dictionary definition card (2.2s)
// Phase 2: "A Jaskaran Singh Production" title card + progress bar

import { useEffect, useRef, useState } from 'react'

type Phase = 'p1' | 'p2' | 'done'

export default function Loader() {
  const [phase, setPhase]     = useState<Phase>('p1')
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const rafId = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    // Phase 1: show definition for 2.2s
    const t1 = setTimeout(() => setPhase('p2'), 2200)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (phase !== 'p2') return

    // Phase 2: animate progress bar 0 → 100% over ~1.4s
    startRef.current = performance.now()
    const DURATION = 1400

    const tick = (now: number) => {
      const elapsed = now - startRef.current
      const p = Math.min(elapsed / DURATION, 1)
      setProgress(p)

      if (p < 1) {
        rafId.current = requestAnimationFrame(tick)
      } else {
        // Fade out
        setTimeout(() => setVisible(false), 300)
      }
    }

    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [phase])

  if (!visible) return null

  return (
    <div
      aria-label="Loading"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: phase === 'done' ? 'opacity .3s' : undefined,
        opacity: !visible ? 0 : 1,
        background: phase === 'p1' ? '#F5F0EB' : 'var(--bg)',
      }}
    >
      {phase === 'p1' && (
        <div style={{
          maxWidth: 420,
          padding: '40px 48px',
          background: '#F5F0EB',
          color: '#050505',
          fontFamily: 'var(--font-accent)',
          animation: 'fadeInUp .4s cubic-bezier(.16,1,.3,1) both',
        }}>
          <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'var(--font-mono)', opacity: 0.5 }}>
            pulp &nbsp;/pʌlp/ &nbsp;·&nbsp; noun
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>
            <strong>1.</strong> A soft, moist, shapeless matter. The inner moist part of fruit. Something cheap but lurid — designed for maximum impact.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>
            <strong>2.</strong> <em>(adj.)</em> Of or denoting popular entertainment in a simplified or sensationalized form. See: Tarantino. See: this portfolio.
          </p>
          <p style={{ fontSize: 13, marginTop: 18, opacity: 0.45, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
            — Merriam-Webster, abridged for dramatic effect
          </p>
        </div>
      )}

      {phase === 'p2' && (
        <div style={{
          textAlign: 'center',
          animation: 'fadeInUp .5s cubic-bezier(.16,1,.3,1) both',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text2)',
            marginBottom: 24,
          }}>
            A Jaskaran Singh Production
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 10vw, 96px)',
            letterSpacing: '0.04em',
            color: 'var(--text)',
            lineHeight: 1,
            marginBottom: 48,
          }}>
            JASKARAN SINGH<br />MALHOTRA
          </h1>

          {/* Progress bar */}
          <div style={{
            width: 'clamp(200px, 40vw, 360px)',
            height: 2,
            background: 'rgba(255,255,255,0.1)',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--red)',
              transformOrigin: 'left',
              transform: `scaleX(${progress})`,
              transition: 'transform .04s linear',
            }} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
