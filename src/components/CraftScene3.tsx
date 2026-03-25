"use client";

import React, { useEffect, useRef } from 'react';

export default function CraftScene3() {
    const sectionRef = useRef(null);
    const chapterRef = useRef(null);
    const headingRef = useRef(null);
    const ruleRef = useRef(null);
    const quoteRef = useRef(null);
    const body1Ref = useRef(null);
    const body2Ref = useRef(null);
    const pillsRef = useRef(null);
    const img1Ref = useRef(null);
    const img2Ref = useRef(null);
    const badgeRef = useRef(null);
    const tornRef = useRef(null);

    useEffect(() => {
        type Killable = { kill: () => void };

        const loadScript = (src: string) =>
            new Promise<void>((resolve) => {
                if (document.querySelector(`script[src="${src}"]`)) return resolve();
                const s = document.createElement('script');
                s.src = src;
                s.onload = () => resolve();
                document.head.appendChild(s);
            });

        (async () => {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');

            const runtimeWindow = window as unknown as Window & {
                gsap: {
                    registerPlugin: (plugin: unknown) => void;
                    fromTo: (...args: unknown[]) => void;
                    to: (...args: unknown[]) => void;
                };
                ScrollTrigger: {
                    getAll: () => Killable[];
                    refresh: () => void;
                };
            };
            const { gsap } = runtimeWindow;
            const { ScrollTrigger } = runtimeWindow;
            gsap.registerPlugin(ScrollTrigger);

            const section = sectionRef.current;
            if (!section) return;

            if (tornRef.current) {
                gsap.fromTo(
                    tornRef.current,
                    { yPercent: 0, opacity: 1 },
                    {
                        yPercent: -110,
                        opacity: 0,
                        duration: 0.9,
                        ease: 'power2.inOut',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            end: 'top 20%',
                            scrub: 0.6,
                        },
                    }
                );
            }

            const clipReveal = (el: Element | null, delay = 0) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { yPercent: 105, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.75,
                        ease: 'power3.out',
                        delay,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 55%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            };

            const fadeReveal = (el: Element | null, delay = 0, xFrom = 0) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { opacity: 0, x: xFrom, y: 10 },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 0.7,
                        ease: 'power2.out',
                        delay,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 55%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            };

            clipReveal(chapterRef.current, 0.0);
            clipReveal(headingRef.current, 0.12);
            fadeReveal(ruleRef.current, 0.28);
            clipReveal(quoteRef.current, 0.38);
            fadeReveal(body1Ref.current, 0.52);
            fadeReveal(body2Ref.current, 0.62);
            fadeReveal(pillsRef.current, 0.76);

            if (img1Ref.current) {
                gsap.fromTo(
                    img1Ref.current,
                    { x: 30, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power2.out',
                        delay: 0.2,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 55%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }
            if (img2Ref.current) {
                gsap.fromTo(
                    img2Ref.current,
                    { x: -30, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power2.out',
                        delay: 0.45,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 55%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }
            if (badgeRef.current) {
                gsap.fromTo(
                    badgeRef.current,
                    { scale: 0.6, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'back.out(1.5)',
                        delay: 0.7,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 55%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }
            gsap.to(img1Ref.current, {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
            gsap.to(img2Ref.current, {
                yPercent: -14,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.4,
                },
            });

            ScrollTrigger.refresh();
        })();

        return () => {
            const maybeScrollTrigger = (window as Window & {
                ScrollTrigger?: {
                    getAll: () => Killable[];
                };
            }).ScrollTrigger;
            if (maybeScrollTrigger) maybeScrollTrigger.getAll().forEach((t: Killable) => t.kill());
        };
    }, []);

    const pills = ['ISO 9001 CERTIFIED', 'GMP CERTIFIED', '5+ YEARS EXPERIENCE'];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital@1&family=DM+Sans:wght@300;400&family=Space+Mono:wght@400;700&display=swap');

                .rayorise-scene3 {
                    font-family: 'DM Sans', sans-serif;
                }

                .clip-wrap {
                    overflow: hidden;
                }

                .ray-pill {
                    font-family: 'Space Mono', monospace;
                    font-size: 10px;
                    letter-spacing: 0.18em;
                    border: 1px solid #B8841F;
                    color: #B8841F;
                    padding: 8px 16px;
                    text-transform: uppercase;
                    display: inline-block;
                    transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
                    cursor: default;
                }
                .ray-pill:hover {
                    background: #B8841F14;
                    box-shadow: 0 0 12px rgba(184,132,31,0.25);
                }

                .img-amber::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(184,132,31,0.1);
                    mix-blend-mode: multiply;
                    pointer-events: none;
                }

                .torn-divider {
                    position: absolute;
                    top: -2px;
                    left: 0;
                    width: 100%;
                    height: 80px;
                    z-index: 20;
                    pointer-events: none;
                }

                .badge-arc {
                    font-family: 'Space Mono', monospace;
                    font-size: 9px;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #B8841F;
                    font-weight: 700;
                }
            `}</style>

            <section
                ref={sectionRef}
                className="rayorise-scene3 relative min-h-screen w-full bg-[#EDE3D0] text-[#1A1410] py-24 px-6 md:px-16 overflow-hidden flex items-center"
            >
                {/* ── Paper grain texture ── */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: 0.032,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '256px 256px',
                    }}
                />

                <div ref={tornRef} className="torn-divider">
                    <svg
                        viewBox="0 0 1440 80"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        style={{ width: '100%', height: '100%', display: 'block' }}
                    >
                        <path
                            d="M0,0 L0,48 Q60,72 120,42 Q180,12 240,50 Q300,88 360,52 Q420,16 480,44 Q540,72 600,38 Q660,4 720,46 Q780,88 840,50 Q900,12 960,42 Q1020,72 1080,44 Q1140,16 1200,48 Q1260,80 1320,50 Q1380,20 1440,52 L1440,0 Z"
                            fill="#0C0905"
                        />
                    </svg>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">

                    <div className="md:col-span-7 flex flex-col items-start gap-0">

                        <div className="clip-wrap mb-4">
                            <span
                                ref={chapterRef}
                                style={{
                                    fontFamily: "'Space Mono', monospace",
                                    color: '#B8841F',
                                    letterSpacing: '0.38em',
                                    fontSize: '10px',
                                    textTransform: 'uppercase',
                                    display: 'block',
                                    opacity: 0,
                                }}
                            >
                                CHAPTER 01
                            </span>
                        </div>

                        <div className="clip-wrap mb-5">
                            <h2
                                ref={headingRef}
                                style={{
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: 'clamp(52px, 5.5vw, 88px)',
                                    lineHeight: 1,
                                    textTransform: 'uppercase',
                                    color: '#1A1410',
                                    letterSpacing: '0.02em',
                                    opacity: 0,
                                    margin: 0,
                                }}
                            >
                                THE CRAFT
                            </h2>
                        </div>

                        <div
                            ref={ruleRef}
                            style={{
                                width: '80px',
                                height: '2px',
                                background: '#B8841F',
                                marginBottom: '28px',
                                opacity: 0,
                            }}
                        />

                        <div className="clip-wrap mb-7" style={{ maxWidth: '88%' }}>
                            <blockquote
                                ref={quoteRef}
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontStyle: 'italic',
                                    fontSize: 'clamp(22px, 2.8vw, 36px)',
                                    lineHeight: 1.28,
                                    color: '#1A1410',
                                    margin: 0,
                                    opacity: 0,
                                }}
                            >
                                "Five years of precision. One standard: authentic."
                            </blockquote>
                        </div>

                        <div
                            ref={body1Ref}
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 300,
                                fontSize: 'clamp(15px, 1.1vw, 17px)',
                                lineHeight: 1.75,
                                color: 'rgba(26,20,16,0.78)',
                                maxWidth: '55ch',
                                marginBottom: '20px',
                                opacity: 0,
                            }}
                        >
                            At Rayorise, every tracksuit carries the weight of an era we never
                            forgot. We design, source, and craft vintage 90s football apparel —
                            tracksuits, jackets, shirts — for those who understand what that era
                            meant.
                        </div>

                        <div
                            ref={body2Ref}
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 300,
                                fontSize: 'clamp(15px, 1.1vw, 17px)',
                                lineHeight: 1.75,
                                color: 'rgba(26,20,16,0.78)',
                                maxWidth: '55ch',
                                marginBottom: '44px',
                                opacity: 0,
                            }}
                        >
                            Custom orders. Bulk manufacturing. Global shipping. Built from
                            consultation to delivery with craftsmanship that stands behind every
                            stitch.
                        </div>

                        <div
                            ref={pillsRef}
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '12px',
                                opacity: 0,
                            }}
                        >
                            {pills.map((pill) => (
                                <span key={pill} className="ray-pill">
                                    {pill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div
                        className="md:col-span-5 relative"
                        style={{ height: 'clamp(480px, 55vw, 680px)' }}
                    >
                        <div
                            ref={img1Ref}
                            className="img-amber absolute"
                            style={{
                                top: 0,
                                right: 0,
                                width: '82%',
                                height: '80%',
                                overflow: 'hidden',
                                boxShadow: '0 24px 60px rgba(26,20,16,0.18)',
                                opacity: 0,
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80"
                                alt="Vintage football tracksuit"
                                style={{
                                    width: '100%',
                                    height: '110%',
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                    filter: 'grayscale(45%) contrast(1.15)',
                                    display: 'block',
                                    marginTop: '-5%',
                                }}
                            />
                        </div>

                        <div
                            ref={img2Ref}
                            className="img-amber absolute"
                            style={{
                                bottom: 0,
                                left: 0,
                                width: '65%',
                                height: '57%',
                                border: '14px solid #B8841F',
                                boxShadow: '0 16px 48px rgba(26,20,16,0.22)',
                                zIndex: 20,
                                overflow: 'hidden',
                                opacity: 0,
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=700&q=80"
                                alt="Vintage apparel stitching detail"
                                style={{
                                    width: '100%',
                                    height: '110%',
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                    filter: 'grayscale(40%)',
                                    display: 'block',
                                    marginTop: '-5%',
                                }}
                            />
                        </div>

                        <div
                            ref={badgeRef}
                            style={{
                                position: 'absolute',
                                bottom: '55%',
                                left: '60%',
                                transform: 'translate(-50%, 50%)',
                                zIndex: 30,
                                width: '112px',
                                height: '112px',
                                borderRadius: '50%',
                                border: '1.5px solid #B8841F',
                                background: '#EDE3D0',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 28px rgba(26,20,16,0.14)',
                                padding: '8px',
                                opacity: 0,
                            }}
                        >
                            <svg
                                viewBox="0 0 100 100"
                                width="100"
                                height="100"
                                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                            >
                                <defs>
                                    <path id="topArc" d="M 14,50 A 36,36 0 0,1 86,50" />
                                    <path id="botArc" d="M 18,58 A 32,32 0 0,0 82,58" />
                                </defs>
                                <text
                                    style={{
                                        fontFamily: "'Space Mono', monospace",
                                        fontSize: '9.5px',
                                        fill: '#B8841F',
                                        fontWeight: 700,
                                        letterSpacing: '0.12em',
                                    }}
                                >
                                    <textPath href="#topArc" startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                                        5+ YEARS
                                    </textPath>
                                </text>
                                <text
                                    style={{
                                        fontFamily: "'Space Mono', monospace",
                                        fontSize: '8px',
                                        fill: '#B8841F',
                                        fontWeight: 400,
                                        letterSpacing: '0.1em',
                                    }}
                                >
                                    <textPath href="#botArc" startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                                        PRECISION CRAFT
                                    </textPath>
                                </text>
                            </svg>
                            <div
                                style={{
                                    width: '36px',
                                    height: '1px',
                                    background: '#B8841F',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}