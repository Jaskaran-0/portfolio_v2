// lib/gsap.ts
// GSAP + ScrollTrigger setup — CLIENT SIDE ONLY
// Import this only inside useEffect or dynamic imports — never at module top level in SSR contexts

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Registration ───────────────────────────────────────────────────────────

let registered = false

/**
 * Call once inside a useEffect (or client-side entry point) before any GSAP usage.
 * Safe to call multiple times — guarded by `registered` flag.
 */
export function gsapRegister(): void {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

// ─── Easing Tokens ──────────────────────────────────────────────────────────

export const EASE_OUT_EXPO  = 'cubic-bezier(0.16, 1, 0.3, 1)'   // hero char entrance
export const EASE_OUT_CIRC  = 'power4.out'                        // fast reveals
export const EASE_STANDARD  = 'power2.out'                        // general motion

// ─── Duration Tokens ────────────────────────────────────────────────────────

export const DUR_CHAR       = 0.72    // single character entrance
export const DUR_REVEAL     = 0.65    // scroll reveal fade-up
export const DUR_FILM_BURN  = 0.35    // chapter card film flash (350ms)
export const DUR_RULE       = 0.45    // chapter card rule expand
export const STAGGER_CHAR   = 0.042   // 42ms per character (spec)

// ─── Scroll Reveal ──────────────────────────────────────────────────────────

interface RevealUpOptions {
  /** Elements to animate. Selector string or NodeList or Element array. */
  targets: string | Element | Element[] | NodeListOf<Element>
  /** ScrollTrigger scroller element (defaults to window) */
  scroller?: string | Element
  /** Start trigger (default: "top 88%") */
  start?: string
  /** Stagger between multiple targets in seconds (default: 0) */
  stagger?: number
  /** Callback fired when animation completes */
  onComplete?: () => void
}

/**
 * Fade-up reveal driven by IntersectionObserver-like ScrollTrigger.
 * Threshold equivalent: element enters when 12% of it is visible.
 * translateY(20px) → 0, opacity 0 → 1
 */
export function revealUp({
  targets,
  scroller,
  start = 'top 88%',
  stagger = 0,
  onComplete,
}: RevealUpOptions): ScrollTrigger[] {
  gsapRegister()

  const els: Element[] = typeof targets === 'string'
    ? Array.from(document.querySelectorAll(targets))
    : targets instanceof Element
      ? [targets]
      : Array.from(targets)

  if (!els.length) return []

  // Set initial hidden state
  gsap.set(els, { opacity: 0, y: 20 })

  return els.map((el, i) =>
    ScrollTrigger.create({
      trigger: el,
      scroller,
      start,
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE_OUT_CIRC,
          delay: stagger * i,
          onComplete: i === els.length - 1 ? onComplete : undefined,
        })
      },
    })
  )
}

// ─── Chapter Card Entrance ───────────────────────────────────────────────────

interface ChapterEntranceTargets {
  topRule:    Element | null
  vertLine:   Element | null
  chapterNum: Element | null
  title:      Element | null
  yellowRule: Element | null
  quote:      Element | null
  bottomRule: Element | null
}

/**
 * Staggered chapter card entrance sequence:
 * top rule → vertical line → chapter num → title → yellow rule → quote → bottom rule
 * Each element animates in after the previous with a tight stagger.
 */
export function chapterCardEntrance(
  targets: ChapterEntranceTargets,
  onComplete?: () => void
): gsap.core.Timeline {
  gsapRegister()

  const tl = gsap.timeline({ onComplete })

  const steps: [Element | null, gsap.TweenVars, gsap.TweenVars, string][] = [
    [targets.topRule,    { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: DUR_RULE, ease: EASE_OUT_CIRC },         '+=0'],
    [targets.vertLine,   { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: DUR_RULE * 0.9, ease: EASE_OUT_CIRC },   '-=0.2'],
    [targets.chapterNum, { opacity: 0, y: 8 },       { opacity: 1, y: 0,     duration: 0.4, ease: EASE_STANDARD },              '-=0.15'],
    [targets.title,      { opacity: 0, y: 14 },      { opacity: 1, y: 0,     duration: 0.55, ease: EASE_OUT_EXPO },             '-=0.25'],
    [targets.yellowRule, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.3, ease: EASE_OUT_CIRC },              '-=0.1'],
    [targets.quote,      { opacity: 0, y: 6 },       { opacity: 1, y: 0,     duration: 0.4, ease: EASE_STANDARD },              '-=0.05'],
    [targets.bottomRule, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: DUR_RULE, ease: EASE_OUT_CIRC },         '-=0.1'],
  ]

  steps.forEach(([el, fromVars, toVars, position]) => {
    if (!el) return
    gsap.set(el, fromVars)
    tl.to(el, toVars, position)
  })

  return tl
}

// ─── Film Burn Flash ─────────────────────────────────────────────────────────

/**
 * Film burn flash on chapter card entry.
 * opacity: 0 → 0.14 → 0 over 350ms.
 * Pass an overlay element (position: absolute, inset: 0, bg: white or warm white).
 */
export function filmBurn(overlay: Element): gsap.core.Timeline {
  gsapRegister()

  return gsap.timeline()
    .set(overlay, { opacity: 0 })
    .to(overlay, { opacity: 0.14, duration: DUR_FILM_BURN * 0.4, ease: 'power1.in' })
    .to(overlay, { opacity: 0,    duration: DUR_FILM_BURN * 0.6, ease: 'power2.out' })
}

// ─── Card 3D Tilt ────────────────────────────────────────────────────────────

interface TiltOptions {
  /** Max rotateY degrees (default 17) */
  maxY?: number
  /** Max rotateX degrees (default 13) */
  maxX?: number
  /** Perspective in px (default 700) */
  perspective?: number
}

/**
 * Attaches mousemove/mouseleave listeners for 3D card tilt.
 * Returns a cleanup function — call in useEffect return.
 * perspective(700px) rotateY(17deg) rotateX(13deg) max — per spec.
 */
export function attachCardTilt(
  card: HTMLElement,
  { maxY = 17, maxX = 13, perspective = 700 }: TiltOptions = {}
): () => void {
  gsapRegister()

  const onMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width  - 0.5   // -0.5 → 0.5
    const cy = (e.clientY - rect.top)  / rect.height - 0.5

    gsap.to(card, {
      rotateY:     cx * maxY * 2,
      rotateX:    -cy * maxX * 2,
      transformPerspective: perspective,
      duration: 0.35,
      ease: EASE_STANDARD,
      overwrite: 'auto',
    })
  }

  const onLeave = () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: EASE_OUT_EXPO,
      overwrite: 'auto',
    })
  }

  card.addEventListener('mousemove', onMove)
  card.addEventListener('mouseleave', onLeave)

  return () => {
    card.removeEventListener('mousemove', onMove)
    card.removeEventListener('mouseleave', onLeave)
    gsap.set(card, { clearProps: 'rotateX,rotateY,transformPerspective' })
  }
}

// ─── Re-exports ──────────────────────────────────────────────────────────────

export { gsap, ScrollTrigger }
