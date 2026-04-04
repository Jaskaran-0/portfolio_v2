'use client';
// Chapter.tsx — Reusable cinematic chapter card
// Spec: 44-52vh, Bebas Neue clamp(42px,7vw,96px), PF intertitle proportions
// Entrance: film burn flash + staggered rule/line/title sequence via GSAP

import { useEffect, useRef } from 'react';
import { gsapRegister, chapterCardEntrance, filmBurn } from '@/lib/gsap';

interface ChapterProps {
    num: string; // e.g. "01"
    title: string; // e.g. "THE WORK"
    quote?: string; // italic flavor line
    id?: string; // section id for nav
    children?: React.ReactNode;
}

export default function Chapter({ num, title, quote, id, children }: ChapterProps) {
    const rootRef = useRef<HTMLElement>(null);
    const topRuleRef = useRef<HTMLDivElement>(null);
    const vertLineRef = useRef<HTMLDivElement>(null);
    const chapNumRef = useRef<HTMLSpanElement>(null);
    const chapTitleRef = useRef<HTMLHeadingElement>(null);
    const quoteRef = useRef<HTMLParagraphElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const triggered = useRef(false);

    useEffect(() => {
        gsapRegister();

        const root = rootRef.current;
        if (!root) return;

        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !triggered.current) {
                    triggered.current = true;
                    obs.disconnect();

                    // Film burn first, then card entrance
                    if (overlayRef.current) filmBurn(overlayRef.current);

                    chapterCardEntrance({
                        topRule: topRuleRef.current,
                        vertLine: vertLineRef.current,
                        chapterNum: chapNumRef.current,
                        title: chapTitleRef.current,
                        quote: quoteRef.current || null,
                    });
                }
            },
            { threshold: 0.12 },
        );

        obs.observe(root);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            id={id}
            ref={rootRef}
            style={{
                scrollMarginTop: '80px',
                minHeight: 'clamp(44vh, 48vh, 52vh)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 'clamp(32px, 6vw, 80px) clamp(24px, 8vw, 120px)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Film burn overlay */}
            <div
                ref={overlayRef}
                aria-hidden='true'
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#F5F0EB',
                    opacity: 0,
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: 860 }}>
                {/* Top rule */}
                <div
                    ref={topRuleRef}
                    style={{
                        height: 1,
                        background: 'var(--red)',
                        marginBottom: 20,
                        transformOrigin: 'left',
                        opacity: 0,
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        gap: 'clamp(16px, 3vw, 36px)',
                        alignItems: 'flex-start',
                    }}
                >
                    {/* Vertical line */}
                    <div
                        ref={vertLineRef}
                        style={{
                            width: 2,
                            background: 'var(--red)',
                            alignSelf: 'stretch',
                            minHeight: 80,
                            transformOrigin: 'top',
                            opacity: 0,
                            flexShrink: 0,
                        }}
                    />

                    <div style={{ flex: 1 }}>
                        {/* Chapter number */}
                        <span
                            ref={chapNumRef}
                            style={{
                                display: 'block',
                                fontFamily: 'var(--font-mono)',
                                fontSize: 11,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'var(--yellow)',
                                marginBottom: 12,
                                opacity: 0,
                            }}
                        >
                            CH. {num}
                        </span>

                        {/* Title */}
                        <h2
                            ref={chapTitleRef}
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(42px, 7vw, 96px)',
                                letterSpacing: '0.04em',
                                lineHeight: 0.95,
                                color: 'var(--text)',
                                marginBottom: 16,
                                opacity: 0,
                            }}
                        >
                            {title}
                        </h2>

                        {/* Quote */}
                        {quote && (
                            <p
                                ref={quoteRef}
                                style={{
                                    fontFamily: 'var(--font-accent)',
                                    fontSize: 'clamp(14px, 1.4vw, 16px)',
                                    lineHeight: 1.7,
                                    color: 'var(--text2)',
                                    fontStyle: 'italic',
                                    maxWidth: 480,
                                    opacity: 0,
                                }}
                            >
                                "{quote}"
                            </p>
                        )}

                        {/* Slot for section content */}
                        {children && <div style={{ marginTop: 32 }}>{children}</div>}
                    </div>
                </div>
            </div>
        </section>
    );
}
