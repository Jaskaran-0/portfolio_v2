'use client'
// Cursor.tsx — Custom cursor with 4 states
// States driven by data-cursor="default|crosshair|typewriter|target" on hovered elements
// Falls back to tagName detection. Native cursor hidden via globals.css (cursor: none)

import { useEffect, useRef } from 'react'

type CursorState = 'default' | 'crosshair' | 'typewriter' | 'target'

function getStateFromElement(el: Element | null): CursorState {
  let node = el
  while (node && node !== document.body) {
    const cur = (node as HTMLElement).dataset?.cursor as CursorState | undefined
    if (cur) return cur
    const tag = node.tagName.toLowerCase()
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return 'typewriter'
    if (tag === 'button') return 'target'
    if (tag === 'a') return 'crosshair'
    node = node.parentElement
  }
  return 'default'
}

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId   = useRef<number>(0)
  const state   = useRef<CursorState>('default')

  useEffect(() => {
    const dot  = dotRef.current!
    const ring = ringRef.current!

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      const next = getStateFromElement(e.target as Element)
      if (next !== state.current) {
        state.current = next
        dot.dataset.state  = next
        ring.dataset.state = next
      }
    }

    const onLeave = () => {
      mouse.current = { x: -100, y: -100 }
    }

    const tick = () => {
      rafId.current = requestAnimationFrame(tick)
      // Dot snaps instantly
      dot.style.transform  = `translate(${mouse.current.x}px, ${mouse.current.y}px)`
      // Ring lags with lerp
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        data-state="default"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          marginLeft: '-4px',
          marginTop: '-4px',
        }}
      >
        <div className="cursor-dot" />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        data-state="default"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          marginLeft: '-16px',
          marginTop: '-16px',
        }}
      >
        <div className="cursor-ring" />
      </div>

      <style>{`
        .cursor-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--red);
          transition: width .15s, height .15s, background .15s, border-radius .15s;
        }
        .cursor-ring {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,60,0,0.55);
          transition: width .2s, height .2s, border-color .2s, border-radius .2s;
        }

        /* crosshair — links */
        [data-state="crosshair"] .cursor-dot {
          background: var(--yellow);
          width: 6px;
          height: 6px;
        }
        [data-state="crosshair"] .cursor-ring {
          width: 36px;
          height: 36px;
          border-color: rgba(245,197,24,0.5);
        }

        /* typewriter — inputs */
        [data-state="typewriter"] .cursor-dot {
          width: 2px;
          height: 18px;
          border-radius: 1px;
          background: var(--text);
        }
        [data-state="typewriter"] .cursor-ring {
          opacity: 0;
        }

        /* target — buttons/CTAs */
        [data-state="target"] .cursor-dot {
          width: 12px;
          height: 12px;
          background: var(--red);
        }
        [data-state="target"] .cursor-ring {
          width: 44px;
          height: 44px;
          border-color: var(--red);
          border-width: 2px;
        }
      `}</style>
    </>
  )
}
