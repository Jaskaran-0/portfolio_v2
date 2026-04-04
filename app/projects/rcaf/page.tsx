'use client'
// /projects/rcaf — RCAF Facial Recognition case study

import Link from 'next/link'

const METRICS = [
  { value: '94.7%', label: 'Face match accuracy' },
  { value: '1,000+', label: 'Archival images processed' },
  { value: '2-stage', label: 'AI pipeline (upscale → match)' },
  { value: '0', label: 'Prior art — client said it was impossible' },
]

const PIPELINE = [
  {
    step: '01',
    name: 'Image Ingestion',
    detail: 'PowerShell script walks the archival directory, normalises filenames, extracts EXIF metadata, and loads records into PostgreSQL. Handles duplicates and corrupt files gracefully.',
    tech: ['PowerShell', 'PostgreSQL', 'Npgsql'],
  },
  {
    step: '02',
    name: 'Super-Resolution',
    detail: 'Real-ESRGAN (4× upscale) runs on each image. Historical photos averaged 240×180px — far below the minimum face detection threshold. Upscaling brings them to 960×720px before recognition.',
    tech: ['Real-ESRGAN', 'Python', 'CUDA'],
  },
  {
    step: '03',
    name: 'Face Detection',
    detail: 'MTCNN detects and aligns faces in the upscaled images. Alignment is critical — ArcFace embeddings are sensitive to pose. Only confident detections (>0.92 confidence) pass through.',
    tech: ['MTCNN', 'Python', 'facenet-pytorch'],
  },
  {
    step: '04',
    name: 'Embedding + Matching',
    detail: 'InceptionResNet (ArcFace-trained) generates 512-dim embeddings per face. Cosine similarity search across the database returns ranked candidates. Threshold tuned to minimise false positives.',
    tech: ['ArcFace', 'InceptionResNet', 'cosine similarity'],
  },
  {
    step: '05',
    name: 'Result Storage',
    detail: 'Match results, confidence scores, and bounding box metadata stored in PostgreSQL. Reviewers access results via a simple query interface — no frontend needed for the client\'s workflow.',
    tech: ['PostgreSQL', 'psycopg2'],
  },
]

const CHALLENGES = [
  {
    problem: 'Photo quality',
    detail: 'Archival photos from the 1940s–80s. Low resolution, film grain, sepia tone, physical damage. Standard recognition pipelines fail completely below 100px face width.',
    fix: 'Real-ESRGAN pre-processing before any recognition step. Custom CUDA pipeline to batch-process 1,000 images overnight.',
  },
  {
    problem: 'No ground truth',
    detail: 'The museum had no labelled dataset. We couldn\'t train or fine-tune — we had to use a pre-trained ArcFace model and tune the matching threshold manually.',
    fix: 'Built a small validation set from photos with known subjects. Iterated on the similarity threshold until false positive rate was acceptable for archival review.',
  },
  {
    problem: 'Client expectations',
    detail: 'The client was told by two other vendors this was "not feasible." Starting from a baseline of zero trust means every demo has to work.',
    fix: 'Delivered a live demo on real museum photos in week 2. 94.7% accuracy on the final validation set. The client called it impossible before we delivered it.',
  },
]

export default function RCAFCaseStudy() {
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
          Case Study · AI / Computer Vision
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
          RCAF FACIAL<br />RECOGNITION<br />SYSTEM
        </h1>

        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'clamp(15px, 1.5vw, 18px)',
          lineHeight: 1.8,
          color: 'var(--text2)',
          maxWidth: 600,
          marginBottom: 48,
        }}>
          Applied research for the Canadian Air Force Museum. A two-stage AI pipeline —
          Real-ESRGAN super-resolution into ArcFace recognition — built to identify
          personnel in a 1,000-image archival photograph collection.
        </p>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Python', 'Real-ESRGAN', 'ArcFace', 'PostgreSQL', 'PowerShell', 'CUDA'].map(s => (
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

      {/* Pipeline */}
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
          THE PIPELINE
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {PIPELINE.map(({ step, name, detail, tech }, i) => (
            <div
              key={step}
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
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3vw, 42px)',
                color: 'rgba(255,60,0,0.25)',
                lineHeight: 1,
                paddingTop: 4,
              }}>
                {step}
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

      {/* Challenges */}
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
          Challenges
        </p>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          letterSpacing: '0.04em',
          color: 'var(--text)',
          marginBottom: 48,
          lineHeight: 1,
        }}>
          WHAT MADE IT HARD
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
          gap: 'clamp(16px, 2vw, 24px)',
        }}>
          {CHALLENGES.map(({ problem, detail, fix }) => (
            <div key={problem} style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border2)',
              borderRadius: 2,
              padding: 'clamp(20px, 2.5vw, 32px)',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--yellow)',
                marginBottom: 10,
              }}>
                Problem
              </p>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 2vw, 26px)',
                letterSpacing: '0.04em',
                color: 'var(--text)',
                marginBottom: 12,
                lineHeight: 1.1,
              }}>
                {problem}
              </h3>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                lineHeight: 1.75,
                color: 'var(--text2)',
                marginBottom: 16,
              }}>
                {detail}
              </p>
              <div style={{ height: 1, background: 'var(--border2)', marginBottom: 16 }} />
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--red)',
                marginBottom: 8,
              }}>
                How we fixed it
              </p>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                lineHeight: 1.75,
                color: 'var(--text)',
              }}>
                {fix}
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
            href="/projects/medichelper"
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
            MedicHelper Platform →
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
