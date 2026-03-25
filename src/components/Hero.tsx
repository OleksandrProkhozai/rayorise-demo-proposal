"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const SLIDES = [
    {
        src: "https://images.unsplash.com/photo-1551958219-acbc595d8de6?q=80&w=2070",
        alt: "Vintage Tracksuit Hero",
        label: "THE TERRACE COLLECTION",
    },
    {
        src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2070",
        alt: "Retro Football Culture",
        label: "90s STADIUM CULTURE",
    },
    {
        src: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=2070",
        alt: "Vintage Athletic Wear",
        label: "PRECISION MADE",
    },
    {
        src: "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?q=80&w=2070",
        alt: "Retro Sport Style",
        label: "BUILT FROM THE 90S UP",
    },
];

export default function HeroScene1() {
    const [mounted, setMounted] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [prevSlide, setPrevSlide] = useState<number | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    const goToSlide = useCallback(
        (index: number) => {
            if (isTransitioning || index === currentSlide) return;
            setIsTransitioning(true);
            setPrevSlide(currentSlide);
            setCurrentSlide(index);
            setTimeout(() => {
                setIsTransitioning(false);
                setPrevSlide(null);
            }, 900);
        },
        [isTransitioning, currentSlide]
    );

    const nextSlide = useCallback(() => {
        goToSlide((currentSlide + 1) % SLIDES.length);
    }, [currentSlide, goToSlide]);

    useEffect(() => {
        if (!mounted) return;
        intervalRef.current = setInterval(nextSlide, 5000);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [mounted, nextSlide]);

    const handleDotClick = (i: number) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        goToSlide(i);
        intervalRef.current = setInterval(nextSlide, 5000);
    };

    return (
        <>
            <style>{`
        .rayo-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 256px 256px;
          opacity: 0.05;
          mix-blend-mode: overlay;
          z-index: 10;
        }

        .rayo-vignette::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 10%, rgba(12,9,5,0.85) 100%);
          pointer-events: none;
          z-index: 5;
        }

        .slide-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(0.75) contrast(1.2);
          transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: opacity, transform;
        }
        .slide-img.active {
          opacity: 1;
          transform: scale(1.04);
          z-index: 2;
        }
        .slide-img.prev {
          opacity: 0;
          transform: scale(1.08);
          z-index: 1;
        }
        .slide-img.hidden {
          opacity: 0;
          transform: scale(1);
          z-index: 0;
        }

        .amber-tint {
          position: absolute;
          inset: 0;
          background: rgba(184,132,31,0.18);
          mix-blend-mode: color;
          z-index: 3;
          pointer-events: none;
        }

        .left-shadow {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(12,9,5,0.92) 0%, rgba(12,9,5,0.45) 50%, transparent 100%);
          z-index: 4;
          pointer-events: none;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes clipUp {
          from { clip-path: inset(100% 0 0 0); }
          to   { clip-path: inset(0% 0 0 0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.9; }
        }
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .anim-label  { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .anim-title  { animation: clipUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both; }
        .anim-sub    { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.1s both; }
        .anim-body   { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.3s both; }
        .anim-cta    { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.5s both; }
        .anim-bottom { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.7s both; }

        .progress-bar {
          animation: progressBar 5s linear forwards;
          transform-origin: left;
        }

        .rayo-scroll-label { animation: scrollPulse 2.5s ease-in-out infinite; }

        .rayo-cta {
          position: relative;
          font-family: var(--font-bebas), sans-serif;
          font-size: 1.3rem;
          letter-spacing: 0.2em;
          color: #B8841F;
          transition: color 0.25s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 0 4px 0;
        }
        .rayo-cta::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 1.5px;
          background: #B8841F;
          transform-origin: left;
          transition: transform 0.25s, background 0.25s;
        }
        .rayo-cta:hover { color: #F2EBD9; }
        .rayo-cta:hover::after {
          background: #F2EBD9;
          transform: scaleX(1.05);
        }

        .slide-dot {
          width: 28px; height: 3px;
          background: rgba(242,235,217,0.25);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, width 0.3s;
          position: relative;
          overflow: hidden;
        }
        .slide-dot.active {
          width: 48px;
          background: rgba(242,235,217,0.15);
        }
        .slide-dot.active .dot-fill {
          position: absolute;
          inset: 0;
          background: #B8841F;
          transform-origin: left;
          animation: progressBar 5s linear forwards;
        }

        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        .scroll-arrow { animation: arrowBounce 1.8s ease-in-out infinite; }

        .slide-label {
          transition: opacity 0.4s, transform 0.4s;
        }
      `}</style>

            <section
                data-scene-id="hero"
                className="rayo-grain rayo-vignette"
                style={{
                    position: "relative",
                    height: "100svh",
                    minHeight: 500,
                    width: "100%",
                    background: "#0C0905",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "clamp(24px, 5vw, 72px)",
                    paddingRight: "clamp(24px, 5vw, 72px)",
                }}
            >
                <div data-hero-product style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                    {SLIDES.map((slide, i) => (
                        <img
                            key={slide.src}
                            src={slide.src}
                            alt={slide.alt}
                            className={`slide-img ${i === currentSlide
                                ? "active"
                                : i === prevSlide
                                    ? "prev"
                                    : "hidden"
                                }`}
                        />
                    ))}
                    <div className="amber-tint" />
                    <div className="left-shadow" />
                </div>

                <div
                    style={{
                        position: "relative",
                        zIndex: 20,
                        width: "100%",
                        maxWidth: 900,
                    }}
                >
                    <div className="anim-label" style={{ marginBottom: 16 }}>
                        <span
                            style={{
                                fontFamily: "var(--font-space-mono), monospace",
                                color: "#B8841F",
                                letterSpacing: "0.38em",
                                fontSize: "clamp(9px, 1vw, 11px)",
                                textTransform: "uppercase",
                            }}
                        >
                            EST. 2019 — PRECISION MADE
                        </span>
                    </div>

                    <div style={{ overflow: "hidden" }}>
                        <h1
                            className="anim-title"
                            data-reveal="headline"
                            style={{
                                fontFamily: "var(--font-bebas), sans-serif",
                                fontSize: "clamp(52px, 9vw, 120px)",
                                lineHeight: 0.88,
                                color: "#F2EBD9",
                                margin: "0 0 16px 0",
                                textTransform: "uppercase",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Dressed for
                            <br />
                            the terrace.
                        </h1>
                    </div>

                    <p
                        className="anim-sub"
                        style={{
                            fontFamily: "var(--font-bebas), sans-serif",
                            fontSize: "clamp(20px, 3.2vw, 44px)",
                            color: "rgba(242,235,217,0.65)",
                            margin: "0 0 20px 0",
                            textTransform: "uppercase",
                            lineHeight: 1,
                            letterSpacing: "0.04em",
                        }}
                    >
                        Vintage retro apparel built from the 90s up.
                    </p>

                    <div className="anim-body" style={{ maxWidth: 420, marginBottom: 32 }}>
                        <p
                            style={{
                                fontFamily: "var(--font-dm-sans), sans-serif",
                                fontWeight: 300,
                                color: "rgba(242,235,217,0.55)",
                                fontSize: "clamp(14px, 1.2vw, 17px)",
                                lineHeight: 1.65,
                                margin: 0,
                            }}
                        >
                            We transform your ideas into authentic vintage retro apparel
                            through craftsmanship and modern manufacturing.
                        </p>
                    </div>

                    <div className="anim-cta">
                        <button className="rayo-cta">EXPLORE THE COLLECTION</button>
                    </div>
                </div>

                <div
                    className="anim-bottom"
                    style={{
                        position: "absolute",
                        bottom: 32,
                        left: "clamp(24px, 5vw, 72px)",
                        zIndex: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                    }}
                >
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                className={`slide-dot ${i === currentSlide ? "active" : ""}`}
                                onClick={() => handleDotClick(i)}
                                aria-label={`Go to slide ${i + 1}`}
                            >
                                {i === currentSlide && <span className="dot-fill" key={currentSlide} />}
                            </button>
                        ))}
                    </div>

                    <span
                        className="rayo-scroll-label"
                        style={{
                            fontFamily: "var(--font-space-mono), monospace",
                            fontSize: 9,
                            letterSpacing: "0.32em",
                            color: "rgba(242,235,217,0.35)",
                            textTransform: "uppercase",
                        }}
                    >
                        Scroll to enter the story
                    </span>
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: 38,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 20,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <div style={{ width: 28, height: 1, background: "rgba(242,235,217,0.2)" }} />
                    <span
                        className="slide-label"
                        style={{
                            fontFamily: "var(--font-space-mono), monospace",
                            fontSize: 9,
                            letterSpacing: "0.3em",
                            color: "rgba(242,235,217,0.3)",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {SLIDES[currentSlide].label}
                    </span>
                    <div style={{ width: 28, height: 1, background: "rgba(242,235,217,0.2)" }} />
                </div>

                <div
                    className="anim-bottom"
                    style={{
                        position: "absolute",
                        bottom: 36,
                        right: "clamp(24px, 5vw, 72px)",
                        zIndex: 20,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        opacity: 0.28,
                    }}
                >
                    <div style={{ width: 36, height: 1, background: "var(--rayo-off-white)" }} />
                    <span
                        style={{
                            fontFamily: "var(--font-space-mono), monospace",
                            fontSize: 9,
                            letterSpacing: "0.4em",
                            color: "#F2EBD9",
                            textTransform: "uppercase",
                        }}
                    >
                        Scene 01
                    </span>
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: 34,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 20,
                        marginTop: 28,
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        right: "clamp(24px, 5vw, 72px)",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 20,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        opacity: 0.5,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "var(--font-space-mono), monospace",
                            fontSize: 11,
                            color: "#B8841F",
                            letterSpacing: "0.1em",
                        }}
                    >
                        0{currentSlide + 1}
                    </span>
                    <div
                        style={{
                            width: 1,
                            height: 40,
                            background: "rgba(242,235,217,0.2)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 0, left: 0, right: 0,
                                background: "#B8841F",
                                height: `${((currentSlide + 1) / SLIDES.length) * 100}%`,
                                transition: "height 0.5s ease",
                            }}
                        />
                    </div>
                    <span
                        style={{
                            fontFamily: "var(--font-space-mono), monospace",
                            fontSize: 11,
                            color: "rgba(242,235,217,0.3)",
                            letterSpacing: "0.1em",
                        }}
                    >
                        0{SLIDES.length}
                    </span>
                </div>
            </section>
        </>
    );
}