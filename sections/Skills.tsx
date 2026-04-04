'use client'
// Skills.tsx — 2-col grid, chips grouped by category, scroll-reveal per group

import { useEffect, useRef } from 'react'
import { skillGroups } from '@/data/skills'

function SkillGroup({ label, skills }: { label: string; skills: { name: string; primary: boolean }[] }) {
  const groupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = groupRef.current
    if (!el) return

    // Initial hidden state
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)'

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={groupRef}>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--red)',
        marginBottom: 12,
      }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        {skills.map(({ name, primary }) => (
          <span
            key={name}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.08em',
              padding: '5px 12px',
              borderRadius: 2,
              border: `1px solid ${primary ? 'rgba(255,60,0,0.3)' : 'var(--border2)'}`,
              color: primary ? 'var(--text)' : 'var(--text2)',
              background: primary ? 'rgba(255,60,0,0.06)' : 'transparent',
              transition: 'border-color .2s, color .2s',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section style={{
      padding: 'clamp(48px, 8vw, 100px) clamp(24px, 8vw, 120px)',
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border2)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
        gap: '0 clamp(32px, 6vw, 80px)',
      }}>
        {skillGroups.map(g => (
          <SkillGroup key={g.label} label={g.label} skills={g.skills} />
        ))}
      </div>
    </section>
  )
}
