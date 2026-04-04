'use client'
// /projects/job-aggregator — Job Aggregation System case study (in-progress)

import Link from 'next/link'

const BUILT = [
  {
    layer: 'Scraper',
    name: 'Playwright + Python',
    detail: 'Headless Chromium via Playwright scrapes job listings from multiple boards. Handles JavaScript-rendered pages that block simple HTTP scrapers. Randomised request timing and user-agent rotation to avoid rate limiting.',
    tech: ['Python', 'Playwright', 'Chromium'],
  },
  {
    layer: 'API',
    name: 'Flask REST API',
    detail: 'Flask serves scraped job data over a REST API. Endpoints for listing jobs, filtering by keyword/location, and marking applications. SQLAlchemy ORM manages PostgreSQL reads/writes.',
    tech: ['Flask', 'Python', 'SQLAlchemy', 'REST'],
  },
  {
    layer: 'DB',
    name: 'PostgreSQL',
    detail: 'Jobs table stores listings with deduplication on (title, company, date_posted). Applications table tracks status per job (saved, applied, rejected, offer). Schema managed via Alembic migrations.',
    tech: ['PostgreSQL', 'Alembic', 'deduplication'],
  },
]

const ROADMAP = [
  {
    status: 'done',
    item: 'Playwright scraper — LinkedIn, Indeed, Workopolis',
  },
  {
    status: 'done',
    item: 'Flask API with job listing + filter endpoints',
  },
  {
    status: 'done',
    item: 'PostgreSQL persistence with deduplication',
  },
  {
    status: 'done',
    item: 'Application status tracking (saved → applied → response)',
  },
  {
    status: 'in-progress',
    item: 'Automated application form filling via Playwright',
  },
  {
    status: 'in-progress',
    item: 'Resume tailoring per job description (keyword match)',
  },
  {
    status: 'planned',
    item: 'Email parser — ingest recruiter replies into application timeline',
  },
  {
    status: 'planned',
    item: 'Dashboard UI — React frontend for application pipeline view',
  },
]

const STATUS_COLORS: Record<string, string> = {
  done: 'var(--red)',
  'in-progress': 'var(--yellow)',
  planned: 'var(--text3)',
}

const STATUS_LABELS: Record<string, string> = {
  done: 'Done',
  'in-progress': 'In Progress',
  planned: 'Planned',
}

export default function JobAggregatorCaseStudy() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>

      {/* Back nav */}
      <div style={{
        position: 'fixed',
        top: 24,
        left: 'clamp(24px, 6vw, 80px)',
        zIndex: 900,
      }}>
        <Link
          href="/#projects"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: 'var(--text2)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'color .2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--red)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text2)' }}
        >
          ← Back
        </Link>
      </div>

      {/* Hero */}
      <section style={{
        padding: 'clamp(100px, 14vw, 180px) clamp(24px, 8vw, 120px) clamp(48px, 8vw, 80px)',
        borderBottom: '1px solid var(--border2)',
      }}>
        {/* In-progress badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--yellow)',
          background: 'rgba(245,197,24,0.08)',
          border: '1px solid rgba(245,197,24,0.2)',
          padding: '4px 12px',
          borderRadius: 2,
          marginBottom: 20,
        }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--yellow)',
            display: 'inline-block',
            animation: 'blink 1.4s ease-in-out infinite',
          }} />
          In Progress
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--red)',
          marginBottom: 20,
        }}>
          Case Study · Automation · Backend
        </p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 8vw, 110px)',
          letterSpacing: '0.04em',
          lineHeight: 0.92,
          color: 'var(--text)',
          marginBottom: 32,
          maxWidth: 900,
        }}>
          JOB AGGREGATION<br />SYSTEM
        </h1>

        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'clamp(15px, 1.5vw, 18px)',
          lineHeight: 1.8,
          color: 'var(--text2)',
          maxWidth: 600,
          marginBottom: 48,
        }}>
          Python + Playwright scraper feeding a Flask REST API backed by PostgreSQL.
          Aggregates job listings across multiple boards, deduplicates, and tracks
          application status. Automated form-filling in progress.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Python', 'Playwright', 'Flask', 'PostgreSQL', 'SQLAlchemy', 'Alembic'].map(s => (
            <span key={s} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.08em',
              color: 'var(--text2)',
              border: '1px solid var(--border2)',
              padding: '4px 12px',
              borderRadius: 2,
            }}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* What's built */}
      <section style={{
        padding: 'clamp(48px, 8vw, 100px) clamp(24px, 8vw, 120px)',
        borderBottom: '1px solid var(--border2)',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--red)',
          marginBottom: 16,
        }}>
          Architecture
        </p>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          letterSpacing: '0.04em',
          color: 'var(--text)',
          marginBottom: 48,
          lineHeight: 1,
        }}>
          WHAT'S BUILT
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {BUILT.map(({ layer, name, detail, tech }, i) => (
            <div
              key={layer}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: 'clamp(16px, 3vw, 40px)',
                padding: 'clamp(24px, 3vw, 36px) 0',
                borderTop: i === 0 ? '1px solid var(--border2)' : 'none',
                borderBottom: '1px solid var(--border2)',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--yellow)',
                paddingTop: 6,
              }}>
                {layer}
              </span>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 2.5vw, 30px)',
                  letterSpacing: '0.04em',
                  color: 'var(--text)',
                  marginBottom: 12,
                  lineHeight: 1,
                }}>
                  {name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: 'var(--text2)',
                  marginBottom: 16,
                  maxWidth: 640,
                }}>
                  {detail}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {tech.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      color: 'var(--red)',
                      background: 'rgba(255,60,0,0.06)',
                      border: '1px solid rgba(255,60,0,0.2)',
                      padding: '3px 8px',
                      borderRadius: 1,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section style={{
        padding: 'clamp(48px, 8vw, 100px) clamp(24px, 8vw, 120px)',
        borderBottom: '1px solid var(--border2)',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--red)',
          marginBottom: 16,
        }}>
          Roadmap
        </p>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          letterSpacing: '0.04em',
          color: 'var(--text)',
          marginBottom: 48,
          lineHeight: 1,
        }}>
          WHERE IT'S GOING
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 720 }}>
          {ROADMAP.map(({ status, item }, i) => (
            <div
              key={item}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: 24,
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: i < ROADMAP.length - 1 ? '1px solid var(--border2)' : 'none',
                opacity: status === 'planned' ? 0.5 : 1,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: STATUS_COLORS[status],
              }}>
                {STATUS_LABELS[status]}
              </span>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 15,
                color: status === 'done' ? 'var(--text2)' : 'var(--text)',
                textDecoration: status === 'done' ? 'line-through' : 'none',
                textDecorationColor: 'var(--text3)',
              }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{
        padding: 'clamp(48px, 8vw, 80px) clamp(24px, 8vw, 120px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 24,
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            color: 'var(--text3)',
            marginBottom: 6,
          }}>
            First case study
          </p>
          <Link
            href="/projects/rcaf"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 2.5vw, 32px)',
              letterSpacing: '0.04em',
              color: 'var(--text)',
              textDecoration: 'none',
              transition: 'color .2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--red)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)' }}
          >
            RCAF Facial Recognition →
          </Link>
        </div>

        <Link
          href="/#projects"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '12px 24px',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            borderRadius: 2,
            transition: 'border-color .2s, color .2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--red)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--red)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)' }}
        >
          All Projects
        </Link>
      </section>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </main>
  )
}
