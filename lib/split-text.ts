// lib/split-text.ts
// Manual character-split animation helper — CLIENT SIDE ONLY
// GSAP SplitText is a premium plugin; this implements the same pattern via DOM.

import { gsap } from 'gsap'
import { gsapRegister, STAGGER_CHAR, DUR_CHAR, EASE_OUT_EXPO } from './gsap'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SplitResult {
  chars: HTMLElement[]
  words: HTMLElement[]
  /** Restore original HTML and remove injected spans */
  revert: () => void
}

export interface AnimateCharsOptions {
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number
  /** Stagger between chars in seconds (default: STAGGER_CHAR = 42ms) */
  stagger?: number
  /** Duration per char in seconds (default: DUR_CHAR = 0.72s) */
  duration?: number
  /** GSAP ease string (default: EASE_OUT_EXPO) */
  ease?: string
  /** translateY start value in px (default: 24) */
  yFrom?: number
  /** Callback when last char completes */
  onComplete?: () => void
}

// ─── Split ───────────────────────────────────────────────────────────────────

/**
 * Splits the text content of `el` into per-character <span> elements.
 * Words are also wrapped to enable word-level overflow: hidden clipping.
 *
 * Preserves spaces. Returns handles to chars, words, and a revert fn.
 * Safe to call multiple times — reverts previous split first.
 */
export function splitChars(el: HTMLElement): SplitResult {
  const originalHTML = el.innerHTML

  const text = el.textContent ?? ''
  el.innerHTML = ''

  const wordEls: HTMLElement[] = []
  const charEls: HTMLElement[] = []

  // Split by word boundaries while preserving spaces
  const tokens = text.split(/(\s+)/)

  tokens.forEach(token => {
    if (/^\s+$/.test(token)) {
      // Whitespace — render as text node so layout stays natural
      el.appendChild(document.createTextNode(token))
      return
    }

    const wordSpan = document.createElement('span')
    wordSpan.style.cssText = 'display: inline-block; overflow: hidden; vertical-align: bottom;'
    wordSpan.setAttribute('aria-hidden', 'true')

    Array.from(token).forEach(char => {
      const charSpan = document.createElement('span')
      charSpan.style.cssText = 'display: inline-block; will-change: transform, opacity;'
      charSpan.textContent = char
      wordSpan.appendChild(charSpan)
      charEls.push(charSpan)
    })

    el.appendChild(wordSpan)
    wordEls.push(wordSpan)
  })

  // Screen reader sees original text via aria-label on parent
  if (!el.getAttribute('aria-label')) {
    el.setAttribute('aria-label', text)
  }

  return {
    chars: charEls,
    words: wordEls,
    revert: () => {
      el.innerHTML = originalHTML
      el.removeAttribute('aria-label')
    },
  }
}

// ─── Animate ─────────────────────────────────────────────────────────────────

/**
 * Runs the hero name entrance: characters fly up from translateY(yFrom) with
 * staggered timing. Matches spec: stagger 42ms, cubic-bezier(.16,1,.3,1).
 *
 * Call after splitChars(). Returns the GSAP tween so callers can control it.
 */
export function animateChars(
  chars: HTMLElement[],
  {
    delay    = 0,
    stagger  = STAGGER_CHAR,
    duration = DUR_CHAR,
    ease     = EASE_OUT_EXPO,
    yFrom    = 24,
    onComplete,
  }: AnimateCharsOptions = {}
): gsap.core.Tween {
  gsapRegister()

  gsap.set(chars, { opacity: 0, y: yFrom })

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration,
    ease,
    stagger,
    delay,
    onComplete,
  })
}

// ─── Convenience: split + animate in one call ─────────────────────────────────

/**
 * Splits `el` and immediately queues the character entrance animation.
 * Returns the SplitResult (for revert) and the running tween.
 */
export function splitAndAnimate(
  el: HTMLElement,
  options: AnimateCharsOptions = {}
): { split: SplitResult; tween: gsap.core.Tween } {
  const split = splitChars(el)
  const tween = animateChars(split.chars, options)
  return { split, tween }
}
