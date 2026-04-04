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

    // Active section via IntersectionObserver
    useEffect(() => {
        const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
            Boolean,
        ) as Element[];

        if (!sections.length) return;

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive('#' + entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
        );

        sections.forEach((s) => obs.observe(s));
        return () => obs.disconnect();
    }, []);

    const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
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
    );
}
