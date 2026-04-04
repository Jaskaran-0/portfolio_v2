'use client';
// Nav.tsx — Floating pill nav
// Active state driven by IntersectionObserver on sections

import { useEffect, useRef, useState } from 'react';

const LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

export default function Nav() {
    const [active, setActive] = useState('');
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    // Hide/show on scroll direction
    useEffect(() => {
        const onScroll = () => {
            if (ticking.current) return;
            ticking.current = true;
            requestAnimationFrame(() => {
                const y = window.scrollY;
                if (y > 80) {
                    setHidden(y > lastScrollY.current);
                } else {
                    setHidden(false);
                }
                lastScrollY.current = y;
                ticking.current = false;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Active section — whichever section's top has most recently passed the midpoint
    useEffect(() => {
        const update = () => {
            const mid = window.innerHeight / 2;
            let current = '';
            for (const { href } of LINKS) {
                const el = document.querySelector(href);
                if (el && el.getBoundingClientRect().top <= mid) {
                    current = href;
                }
            }
            setActive(current);
        };

        window.addEventListener('scroll', update, { passive: true });
        update();
        return () => window.removeEventListener('scroll', update);
    }, []);

    const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
        <>
        <nav
            aria-label='Site navigation'
            style={{
                position: 'fixed',
                top: 24,
                left: '50%',
                transform: `translateX(-50%) translateY(${hidden ? '-40%' : '0'})`,
                transition: 'transform .4s cubic-bezier(.16,1,.3,1)',
                zIndex: 100,
                display: 'flex',
                gap: 4,
                background: 'rgba(5,5,5,0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid var(--border2)',
                borderRadius: 999,
                padding: '8px 12px',
            }}
        >
            {LINKS.map(({ label, href }) => {
                const isActive = active === href;
                return (
                    <a
                        key={href}
                        href={href}
                        data-cursor='crosshair'
                        onClick={(e) => scrollTo(e, href)}
                        style={{
                            fontFamily: 'var(--font-ui)',
                            fontWeight: 700,
                            fontSize: 12,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            padding: '6px 14px',
                            borderRadius: 999,
                            color: isActive ? '#050505' : 'var(--text2)',
                            background: isActive ? 'var(--red)' : 'transparent',
                            transition: 'color .2s, background .2s',
                        }}
                    >
                        {label}
                    </a>
                );
            })}
        </nav>

      <style>{`
        @media (max-width: 480px) {
          nav[aria-label="Site navigation"] {
            padding: 6px 8px !important;
          }
          nav[aria-label="Site navigation"] a {
            padding: 5px 8px !important;
            font-size: 10px !important;
            letter-spacing: 0.04em !important;
          }
        }
      `}</style>
    </>
    );
}
