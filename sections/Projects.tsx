'use client'
// Projects.tsx — Featured RCAF card (ArchScene on hover) + grid with 3D tilt + glare

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { featuredProject, gridProjects, type Project } from '@/data/projects'
import { gsapRegister, attachCardTilt } from '@/lib/gsap'

// ─── Glare card ───────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsapRegister()
    const card = cardRef.current
    if (!card) return

    const cleanup = attachCardTilt(card)

    const onMove = (e: MouseEvent) => {
      const glare = glareRef.current
      if (!glare) return
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      glare.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.07), transparent 65%)`
      glare.style.opacity = '1'
    }

    const onLeave = () => {
      if (glareRef.current) glareRef.current.style.opacity = '0'
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)

    return () => {
      cleanup()
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const isInProgress = project.status === 'in-progress'

  return (
    <div
      ref={cardRef}
      data-cursor="crosshair"
      style={{
        position: 'relative',
        background: 'var(--bg2)',
        border: '1px solid var(--border2)',
        borderRadius: 2,
        padding: 'clamp(20px, 2.5vw, 32px)',
        overflow: 'hidden',
        cursor: 'none',
        transition: 'border-color .2s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border2)' }}
    >
      {/* Glare overlay */}
      <div
        ref={glareRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          transition: 'opacity .15s',
          pointerEvents: 'none',
          borderRadius: 'inherit',
        }}
      />

      {/* Status badge */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: isInProgress ? 'var(--yellow)' : 'var(--red)',
          background: isInProgress ? 'rgba(245,197,24,0.08)' : 'rgba(255,60,0,0.08)',
          border: `1px solid ${isInProgress ? 'rgba(245,197,24,0.2)' : 'rgba(255,60,0,0.2)'}`,
          padding: '3px 8px',
          borderRadius: 1,
        }}>
          {isInProgress ? 'In Progress' : 'Shipped'}
        </span>
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--text2)',
        marginBottom: 8,
      }}>
        {project.tag}
      </p>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px, 2.8vw, 32px)',
        letterSpacing: '0.04em',
        color: 'var(--text)',
        marginBottom: 12,
        lineHeight: 1.1,
      }}>
        {project.title}
      </h3>

      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 15,
        lineHeight: 1.7,
        color: 'var(--text2)',
        marginBottom: 20,
      }}>
        {project.description}
      </p>

      {/* Stack chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: project.caseStudyPath ? 20 : 0 }}>
        {project.stack.map(s => (
          <span key={s} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            color: 'var(--text3)',
            border: '1px solid var(--border2)',
            padding: '3px 8px',
            borderRadius: 1,
          }}>
            {s}
          </span>
        ))}
      </div>

      {/* Case study link */}
      {project.caseStudyPath && (
        <Link
          href={project.caseStudyPath}
          data-cursor="target"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: 'var(--red)',
            transition: 'gap .2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '10px' }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '6px' }}
        >
          Case Study <span>→</span>
        </Link>
      )}
    </div>
  )
}

// ─── Featured RCAF card with ArchScene ────────────────────────────────────────

function FeaturedCard() {
  const cardRef    = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const sceneRef   = useRef<import('@/lib/three-arch').ArchScene | null>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        const { ArchScene } = await import('@/lib/three-arch')
        if (!mounted || !canvasRef.current) return
        sceneRef.current = new ArchScene({ canvas: canvasRef.current })
        sceneRef.current.start()
      } catch (err) {
        console.error('[FeaturedCard] ArchScene init failed:', err)
      }
    }

    init()

    return () => {
      mounted = false
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [])

  const onEnter = () => {
    setHovered(true)
    sceneRef.current?.setActive(true)
  }

  const onLeave = () => {
    setHovered(false)
    sceneRef.current?.setActive(false)
  }

  const p = featuredProject

  return (
    <div
      ref={cardRef}
      data-cursor="crosshair"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        background: 'var(--bg2)',
        border: `1px solid ${hovered ? 'var(--border)' : 'var(--border2)'}`,
        borderRadius: 2,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 340,
        overflow: 'hidden',
        transition: 'border-color .25s',
        cursor: 'none',
        marginBottom: 'clamp(20px, 3vw, 36px)',
      }}
    >
      {/* Left: project info */}
      <div style={{ padding: 'clamp(24px, 3vw, 40px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--red)',
              background: 'rgba(255,60,0,0.08)',
              border: '1px solid rgba(255,60,0,0.2)',
              padding: '3px 8px',
            }}>
              Featured
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.1em',
              color: 'var(--text2)',
            }}>
              {p.tag}
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            letterSpacing: '0.04em',
            lineHeight: 1.05,
            color: 'var(--text)',
            marginBottom: 14,
          }}>
            {p.title}
          </h3>

          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 15,
            lineHeight: 1.75,
            color: 'var(--text2)',
            marginBottom: 20,
          }}>
            {p.description}
          </p>

          {/* Metrics */}
          {p.metrics && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {p.metrics.map(m => (
                <div key={m.label} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    letterSpacing: '0.04em',
                    color: 'var(--red)',
                    flexShrink: 0,
                    lineHeight: 1,
                  }}>
                    {m.value}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--text2)',
                    letterSpacing: '0.08em',
                  }}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {p.caseStudyPath && (
            <Link
              href={p.caseStudyPath}
              data-cursor="target"
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '10px 20px',
                background: 'var(--red)',
                color: '#050505',
                borderRadius: 2,
              }}
            >
              Case Study →
            </Link>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            {p.stack.map(s => (
              <span key={s} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--text3)',
                border: '1px solid var(--border2)',
                padding: '3px 8px',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Three.js arch diagram */}
      <div style={{ position: 'relative', background: 'var(--bg3)', overflow: 'hidden' }}>
        {/* Hover prompt when inactive */}
        {!hovered && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 1,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              color: 'var(--text3)',
              textTransform: 'uppercase',
            }}>
              Hover to explore
            </span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            opacity: hovered ? 1 : 0.15,
            transition: 'opacity .4s',
          }}
        />
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <section style={{
      padding: 'clamp(48px, 8vw, 100px) clamp(24px, 8vw, 120px)',
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border2)',
    }}>
      {/* Featured */}
      <FeaturedCard />

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
        gap: 'clamp(12px, 2vw, 20px)',
      }}>
        {gridProjects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
