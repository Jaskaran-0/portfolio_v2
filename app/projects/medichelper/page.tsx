'use client'
// /projects/medichelper — MedicHelper Platform case study

import Link from 'next/link'

const METRICS = [
  { value: '32', label: 'REST API endpoints' },
  { value: 'JWT', label: 'Auth — ASP.NET Identity + tokens' },
  { value: 'SignalR', label: 'Real-time WebSocket layer' },
  { value: 'Hangfire', label: 'Scheduled background jobs' },
]

const LAYERS = [
  {
    layer: 'API',
    name: 'ASP.NET Core 8',
    detail: 'RESTful API with 32 endpoints covering user management, medication tracking, appointment scheduling, and notifications. Repository pattern throughout — no raw SQL in controllers. Swagger/OpenAPI documentation generated automatically.',
    tech: ['ASP.NET Core 8', 'C#', 'Entity Framework Core', 'Swagger'],
  },
  {
    layer: 'Auth',
    name: 'JWT + ASP.NET Identity',
    detail: 'ASP.NET Identity manages user records and password hashing. On login, a signed JWT is issued with role claims (Patient, Doctor, Admin). Refresh token rotation implemented — tokens expire every 15 minutes, refresh tokens after 7 days.',
    tech: ['JWT', 'ASP.NET Identity', 'Role-based auth', 'Refresh tokens'],
  },
  {
    layer: 'Real-time',
    name: 'SignalR WebSocket',
    detail: 'SignalR hub pushes medication reminders, appointment confirmations, and doctor messages in real-time. Android client connects on login and maintains a persistent WebSocket connection. Falls back to long polling on poor connections.',
    tech: ['SignalR', 'WebSocket', 'Java Android client'],
  },
  {
    layer: 'Jobs',
    name: 'Hangfire Scheduler',
    detail: 'Hangfire runs recurring jobs: daily medication reminder dispatch, weekly appointment digest, and cleanup of expired refresh tokens. Jobs are persisted in PostgreSQL — survive server restarts. Dashboard accessible at /hangfire in dev.',
    tech: ['Hangfire', 'Recurring jobs', 'PostgreSQL persistence'],
  },
  {
    layer: 'DB',
    name: 'PostgreSQL via Npgsql',
    detail: 'Normalised schema with Users, Medications, Schedules, Appointments, and Notifications tables. EF Core migrations manage schema evolution. Connection pooling via Npgsql — handles concurrent requests without connection exhaustion.',
    tech: ['PostgreSQL', 'Npgsql', 'EF Core Migrations'],
  },
  {
    layer: 'Mobile',
    name: 'Android Java Frontend',
    detail: 'Native Android app in Java. Retrofit handles HTTP to the ASP.NET Core API. Volley manages the SignalR WebSocket connection. Local Room database caches medication schedules for offline access.',
    tech: ['Java', 'Android', 'Retrofit', 'Room', 'Volley'],
  },
]

const DECISIONS = [
  {
    decision: 'ASP.NET Core over Node',
    reason: 'Medical data. Strong typing, mature middleware ecosystem, and built-in DI container. ASP.NET Identity is a solved problem for user management — no need to roll auth from scratch.',
  },
  {
    decision: 'SignalR over polling',
    reason: 'Medication reminders need to arrive in real-time. Polling every 30s kills battery on mobile. SignalR maintains a single persistent connection and pushes on server-side events only.',
  },
  {
    decision: 'Hangfire over cron',
    reason: 'Hangfire persists jobs to PostgreSQL. If the server restarts mid-schedule, jobs are not lost — they resume from where they left off. Cron-based approaches are stateless and can\'t recover from failures.',
  },
  {
    decision: 'Repository pattern',
    reason: 'Controllers should not contain query logic. The repository pattern keeps business logic testable and data access swappable. When the client later asked about switching to a different ORM, it was a 1-file change per entity.',
  },
]

export default function MedicHelperCaseStudy() {
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
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--red)',
          marginBottom: 20,
        }}>
          Case Study · Full-Stack · Mobile
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
          MEDICHELPER<br />PLATFORM
        </h1>

        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'clamp(15px, 1.5vw, 18px)',
          lineHeight: 1.8,
          color: 'var(--text2)',
          maxWidth: 600,
          marginBottom: 48,
        }}>
          ASP.NET Core 8 backend with JWT auth, SignalR real-time notifications,
          and Hangfire scheduled jobs. Paired with a native Android Java frontend.
          32 REST endpoints. Built from scratch.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['ASP.NET Core 8', 'Java', 'PostgreSQL', 'JWT', 'SignalR', 'Hangfire', 'Entity Framework'].map(s => (
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

      {/* Metrics */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))',
        borderBottom: '1px solid var(--border2)',
      }}>
        {METRICS.map(({ value, label }) => (
          <div
            key={label}
            style={{
              padding: 'clamp(32px, 4vw, 48px) clamp(24px, 4vw, 48px)',
              borderRight: '1px solid var(--border2)',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '0.04em',
              color: 'var(--red)',
              lineHeight: 1,
              marginBottom: 10,
            }}>
              {value}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.1em',
              color: 'var(--text2)',
            }}>
              {label}
            </div>
          </div>
        ))}
      </section>

      {/* System layers */}
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
          SYSTEM LAYERS
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {LAYERS.map(({ layer, name, detail, tech }, i) => (
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

      {/* Decisions */}
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
          Engineering Decisions
        </p>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          letterSpacing: '0.04em',
          color: 'var(--text)',
          marginBottom: 48,
          lineHeight: 1,
        }}>
          WHY THIS, NOT THAT
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
          gap: 'clamp(16px, 2vw, 24px)',
        }}>
          {DECISIONS.map(({ decision, reason }) => (
            <div key={decision} style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border2)',
              borderRadius: 2,
              padding: 'clamp(20px, 2.5vw, 32px)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(18px, 2vw, 24px)',
                letterSpacing: '0.04em',
                color: 'var(--red)',
                marginBottom: 14,
                lineHeight: 1.1,
              }}>
                {decision}
              </h3>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                lineHeight: 1.8,
                color: 'var(--text2)',
              }}>
                {reason}
              </p>
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
            Next case study
          </p>
          <Link
            href="/projects/job-aggregator"
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
            Job Aggregation System →
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
    </main>
  )
}
