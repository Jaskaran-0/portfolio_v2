'use client'
// Hero.tsx — Three.js icosahedron (A) + shards (B) + SplitText name entrance
// Canvas z-0 · vignette z-1 · content z-2
// Left zone protected by gradient; Three.js lives on right half

import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const nameRef    = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scene: import('@/lib/three-hero').HeroScene | null = null
    let splitResult: import('@/lib/split-text').SplitResult | null = null

    const init = async () => {
      if (!canvasRef.current || !nameRef.current) return

      // Dynamic imports — keep Three.js and GSAP out of SSR bundle
      const [{ HeroScene }, { splitAndAnimate }, { gsapRegister, revealUp }] = await Promise.all([
        import('@/lib/three-hero'),
        import('@/lib/split-text'),
        import('@/lib/gsap'),
      ])

      gsapRegister()

      // Boot Three.js scene
      scene = new HeroScene({ canvas: canvasRef.current! })
      scene.start()

      // Character entrance on name
      const result = splitAndAnimate(nameRef.current!, { delay: 0.3 })
      splitResult = result.split

      // Subtitle reveal
      if (subtitleRef.current) {
        revealUp({ targets: subtitleRef.current, start: 'top 95%' })
      }
    }

    init()

    return () => {
      scene?.dispose()
      splitResult?.revert()
    }
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Three.js canvas — full viewport, z-0 */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          display: 'block',
        }}
      />

      {/* Left gradient — protects text from canvas bleed */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, var(--bg) 42%, rgba(5,5,5,0.7) 65%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Vignette — edges z-1 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5,5,5,0.65) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content — z-2 */}
      <div
        ref={wrapRef}
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 clamp(24px, 8vw, 120px)',
          maxWidth: 'clamp(300px, 55%, 700px)',
        }}
      >
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--red)',
          marginBottom: 20,
        }}>
          Full-Stack Developer · Hamilton, ON
        </p>

        {/* Name — split animated */}
        <h1
          ref={nameRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 9vw, 128px)',
            letterSpacing: '0.04em',
            lineHeight: 0.92,
            color: 'var(--text)',
            marginBottom: 28,
          }}
        >
          JASKARAN SINGH MALHOTRA
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 'clamp(14px, 1.6vw, 18px)',
            color: 'var(--text2)',
            maxWidth: 440,
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          ASP.NET Core · Python · PostgreSQL · React.
          <br />
          Systems that ship. Interfaces that move.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a
            href="#projects"
            data-cursor="target"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '12px 28px',
              background: 'var(--red)',
              color: '#050505',
              borderRadius: 2,
              transition: 'opacity .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            View Work
          </a>
          <a
            href="/resume/Jaskaran_Singh_Malhotra_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="target"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '12px 28px',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: 2,
              transition: 'border-color .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--red)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            Resume
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: 'clamp(24px, 8vw, 120px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: 0.35,
        }}>
          <div style={{
            width: 1,
            height: 48,
            background: 'linear-gradient(to bottom, var(--red), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--text2)' }}>
            SCROLL
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(1); }
          50%       { opacity: 0.8;  transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  )
}
