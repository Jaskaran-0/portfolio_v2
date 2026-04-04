'use client'
// Contact.tsx — Massive Bebas heading, radial glow orb, 4 link buttons

import { useEffect, useRef } from 'react'

const LINKS = [
  {
    label: 'Email',
    href: 'mailto:jaskaranmalhotra26@gmail.com',
    icon: '✉',
    hint: 'jaskaranmalhotra26@gmail.com',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jaskaran-malhotra',
    icon: 'in',
    hint: 'linkedin.com/in/jaskaran-malhotra',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Jaskaran-0',
    icon: '</>',
    hint: 'github.com/Jaskaran-0',
  },
  {
    label: 'Resume',
    href: '/resume/Jaskaran_Singh_Malhotra_Resume.pdf',
    icon: '↓',
    hint: 'PDF · Updated 2025',
  },
]

export default function Contact() {
  const orbRef = useRef<HTMLDivElement>(null)

  // Orb pulses and reacts to mouse
  useEffect(() => {
    const orb = orbRef.current
    if (!orb) return

    const onMove = (e: MouseEvent) => {
      const rect = orb.parentElement!.getBoundingClientRect()
      const dx = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 30
      const dy = ((e.clientY - rect.top  - rect.height / 2) / rect.height) * 20
      orb.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`
    }

    const onLeave = () => {
      orb.style.transform = 'translate(-50%, -50%)'
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section style={{
      position: 'relative',
      padding: 'clamp(80px, 12vw, 160px) clamp(24px, 8vw, 120px)',
      background: 'var(--bg)',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Radial glow orb */}
      <div
        ref={orbRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(400px, 60vw, 800px)',
          height: 'clamp(400px, 60vw, 800px)',
          background: 'radial-gradient(ellipse at center, rgba(255,60,0,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          transition: 'transform .8s cubic-bezier(.16,1,.3,1)',
          animation: 'orbPulse 6s ease-in-out infinite',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--red)',
          marginBottom: 24,
        }}>
          Available · Hamilton, ON
        </p>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 10vw, 140px)',
          letterSpacing: '0.04em',
          lineHeight: 0.9,
          color: 'var(--text)',
          marginBottom: 20,
        }}>
          LET'S MAKE<br />SOMETHING
        </h2>

        <p style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 17,
          lineHeight: 1.7,
          color: 'var(--text2)',
          maxWidth: 420,
          margin: '0 auto 56px',
          fontStyle: 'italic',
        }}>
          "The best work happens when both sides are slightly uncomfortable with how good the result might be."
        </p>

        {/* 4 link buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'center',
        }}>
          {LINKS.map(({ label, href, icon, hint }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              data-cursor="target"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '14px 24px',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                borderRadius: 2,
                background: 'transparent',
                transition: 'border-color .2s, color .2s, background .2s',
                position: 'relative',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'var(--red)'
                el.style.color = 'var(--red)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'var(--border)'
                el.style.color = 'var(--text)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, opacity: 0.7 }}>{icon}</span>
              {label}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.06em', fontWeight: 400, textTransform: 'none' }}>
                {hint}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 'clamp(60px, 8vw, 100px)',
        paddingTop: 24,
        borderTop: '1px solid var(--border2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.1em' }}>
          © 2025 Jaskaran Singh Malhotra
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.1em' }}>
          Built with Next.js · Three.js · GSAP
        </span>
      </div>

      <style>{`
        @keyframes orbPulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>
    </section>
  )
}
