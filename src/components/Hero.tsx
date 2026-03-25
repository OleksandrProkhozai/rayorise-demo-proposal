"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";

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

// 90s-style vintage tracksuit jacket – well-lit on a dark studio bg
const JACKET_SRC =
    "https://pngimg.com/d/jacket_PNG8048.png";

const HERO_HEADER_OFFSET = "clamp(92px, 11vh, 136px)";

export default function HeroScene1() {
    const [mounted, setMounted] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [prevSlide, setPrevSlide] = useState<number | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Jacket refs
    const jacketWrapRef = useRef<HTMLDivElement>(null);
    const jacketImgRef = useRef<HTMLImageElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    // ─── Slider logic (unchanged) ─────────────────────────────────────────────
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
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [mounted, nextSlide]);

    const handleDotClick = (i: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        goToSlide(i);
        intervalRef.current = setInterval(nextSlide, 5000);
    };

    // ─── GSAP: entrance + breathing ──────────────────────────────────────────
    useEffect(() => {
        if (!mounted) return;

        const wrap = jacketWrapRef.current;
        const img = jacketImgRef.current;
        if (!wrap || !img) return;

        const ctx = gsap.context(() => {
            gsap.set(wrap, {
                opacity: 1,
                scale: 1.06,
                rotateY: 6,
                transformPerspective: 1200,
                transformOrigin: "58% 45%",
            });

            gsap.timeline()
                .to(wrap, {
                    scale: 1,
                    rotateY: 0,
                    duration: 1.2,
                    ease: "power3.out",
                })
                .to(wrap, {
                    rotateY: 2,
                    duration: 2,
                    ease: "power1.inOut",
                    repeat: -1,
                    yoyo: true,
                });
        }, sectionRef);

        return () => ctx.revert();
    }, [mounted]);

    // ─── Mouse tilt (no GSAP dep needed – pure rAF) ──────────────────────────
    useEffect(() => {
        if (!mounted) return;
        const img = jacketImgRef.current;
        if (!img) return;

        let raf = 0;
        let targetRX = 0;
        let targetRY = 0;
        let currentRX = 0;
        let currentRY = 0;

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const onMove = (e: MouseEvent) => {
            const rect = img.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (window.innerWidth / 2);
            const dy = (e.clientY - cy) / (window.innerHeight / 2);
            targetRY = dx * 7;   // max ±7° horizontal
            targetRX = -dy * 5;  // max ±5° vertical
        };

        const tick = () => {
            currentRX = lerp(currentRX, targetRX, 0.12);
            currentRY = lerp(currentRY, targetRY, 0.12);
            img.style.transform = `translateZ(0) rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;
            raf = requestAnimationFrame(tick);
        };

        const onLeave = () => {
            targetRX = 0;
            targetRY = 0;
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseleave", onLeave);
        raf = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(raf);
        };
    }, [mounted]);

    return (
        <>
            <style>{`
        /* ── Grain & vignette ─────────────────────────────────────── */
        .rayo-grain::after {
          content: '';
          position: absolute; inset: 0;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 256px 256px;
          opacity: 0.05; mix-blend-mode: overlay; z-index: 10;
        }
        .rayo-vignette::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 10%, rgba(12,9,5,0.85) 100%);
          pointer-events: none; z-index: 5;
        }

        /* ── Slider images ────────────────────────────────────────── */
        .slide-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          filter: grayscale(0.75) contrast(1.2);
          transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1),
                      transform 6s cubic-bezier(0.25,0.46,0.45,0.94);
          will-change: opacity, transform;
        }
        .slide-img.active { opacity:1; transform:scale(1.04); z-index:2; }
        .slide-img.prev   { opacity:0; transform:scale(1.08); z-index:1; }
        .slide-img.hidden { opacity:0; transform:scale(1);    z-index:0; }

        .amber-tint {
          position:absolute; inset:0;
          background:rgba(184,132,31,0.18);
          mix-blend-mode:color; z-index:3; pointer-events:none;
        }
        .left-shadow {
          position:absolute; inset:0;
          background:linear-gradient(to right,rgba(12,9,5,0.92) 0%,rgba(12,9,5,0.45) 50%,transparent 100%);
          z-index:4; pointer-events:none;
        }

        /* ── Jacket wrapper ───────────────────────────────────────── */
        .jacket-wrap {
          position: absolute;
                    right: clamp(44px, 7vw, 140px);
                    top: 46%;
          translate: 0 -50%;
                    width: clamp(220px, 28vw, 420px);
          z-index: 25;
          transform-style: preserve-3d;
          perspective: 900px;
          will-change: transform, opacity;
        }
                .jacket-wrap::before {
                    content: '';
                    position: absolute;
                    inset: -12% -10% -8% -14%;
                    background: radial-gradient(circle at 22% 18%, rgba(184,132,31,0.42) 0%, rgba(184,132,31,0.18) 34%, transparent 68%);
                    mix-blend-mode: screen;
                    filter: blur(18px);
                    z-index: -2;
                    pointer-events: none;
                }
        /* image itself */
        .jacket-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 4px;
          /* make dark bg areas "transparent" via screen blend */
          mix-blend-mode: screen;
          filter: contrast(1.15) brightness(1.05) saturate(0.85);
          pointer-events: none;
          user-select: none;
        }

        /* glow halo behind the jacket */
        .jacket-halo {
          position: absolute;
          inset: -10% -5%;
          background: radial-gradient(ellipse at 55% 45%,
            rgba(184,132,31,0.22) 0%,
            transparent 70%);
          filter: blur(32px);
          z-index: -1;
          pointer-events: none;
        }

        /* floating dust particles around jacket */
        .jacket-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(184,132,31,0.55);
          animation: floatParticle var(--dur, 4s) var(--delay,0s) ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes floatParticle {
          from { transform: translate(0,0) scale(1);   opacity:0.4; }
          to   { transform: translate(var(--tx,6px), var(--ty,-12px)) scale(1.3); opacity:0.85; }
        }

        /* ── Text animations ──────────────────────────────────────── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes clipUp {
          from { clip-path:inset(100% 0 0 0); }
          to   { clip-path:inset(0% 0 0 0); }
        }
        @keyframes scrollPulse {
          0%,100% { opacity:0.25; }
          50%     { opacity:0.9; }
        }
        @keyframes progressBar {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }

        .anim-label  { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s  both; }
        .anim-title  { animation: clipUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s  both; }
        .anim-sub    { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.1s  both; }
        .anim-body   { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.3s  both; }
        .anim-cta    { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.5s  both; }
        .anim-bottom { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.7s  both; }
        .progress-bar { animation:progressBar 5s linear forwards; transform-origin:left; }
        .rayo-scroll-label { animation: scrollPulse 2.5s ease-in-out infinite; }

        /* ── CTA button ───────────────────────────────────────────── */
        .rayo-cta {
          position:relative;
          font-family:var(--font-bebas),sans-serif;
          font-size:1.3rem;
          letter-spacing:0.2em;
          color:#B8841F;
          transition:color 0.25s;
          background:none; border:none; cursor:pointer;
          padding: 0 0 4px 0;
        }
        .rayo-cta::after {
          content:'';
          position:absolute; bottom:0; left:0;
          width:100%; height:1.5px;
          background:#B8841F;
          transform:scaleX(0);
          transform-origin:left;
          transition:transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.25s;
        }
        .rayo-cta:hover { color:#F2EBD9; }
        .rayo-cta:hover::after { background:#F2EBD9; transform:scaleX(1); }

        /* ── Slide dots ───────────────────────────────────────────── */
        .slide-dot {
          width:28px; height:3px;
          background:rgba(242,235,217,0.25);
          border:none; cursor:pointer; padding:0;
          transition:background 0.3s, width 0.3s;
          position:relative; overflow:hidden;
        }
        .slide-dot.active { width:48px; background:rgba(242,235,217,0.15); }
        .slide-dot.active .dot-fill {
          position:absolute; inset:0;
          background:#B8841F;
          transform-origin:left;
          animation:progressBar 5s linear forwards;
        }

        @keyframes arrowBounce {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(5px); }
        }
        .scroll-arrow { animation:arrowBounce 1.8s ease-in-out infinite; }
        .slide-label  { transition:opacity 0.4s, transform 0.4s; }

                @media (max-width: 549px) {
                    .jacket-wrap {
                        top: 74%;
                        right: auto;
                        left: 50%;
                        translate: -50% -50%;
                        width: clamp(176px, 22.4vw, 336px);
                    }
                }
      `}</style>

            <section
                ref={sectionRef}
                data-scene-id="hero"
                className="rayo-grain rayo-vignette"
                style={{
                    position: "relative",
                    height: `calc(100svh - ${HERO_HEADER_OFFSET})`,
                    minHeight: 420,
                    width: "100%",
                    background: "#0C0905",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "flex-start",
                    paddingTop: "clamp(12px, 3vh, 36px)",
                    paddingLeft: "clamp(24px, 5vw, 72px)",
                    paddingRight: "clamp(24px, 5vw, 72px)",
                }}
            >
                {/* ── Background slider ──────────────────────────────────── */}
                <div data-hero-product style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                    {SLIDES.map((slide, i) => (
                        <img
                            key={slide.src}
                            src={slide.src}
                            alt={slide.alt}
                            className={`slide-img ${i === currentSlide ? "active" : i === prevSlide ? "prev" : "hidden"
                                }`}
                        />
                    ))}
                    <div className="amber-tint" />
                    <div className="left-shadow" />
                </div>

                {/* ── Left text content ──────────────────────────────────── */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 20,
                        width: "100%",
                        maxWidth: 560,
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
                            Dressed

                            for&nbsp;&nbsp;the

                            terrace.
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

                {/* ── Jacket photo (right side) ──────────────────────────── */}
                <div
                    ref={jacketWrapRef}
                    data-shared-jacket-source-wrap
                    className="jacket-wrap"
                    style={{ opacity: 1 }}
                >
                    {/* ambient glow */}
                    <div className="jacket-halo" />

                    {/* floating dust particles */}
                    {[
                        { size: 4, top: "12%", left: "18%", dur: "3.8s", delay: "0s", tx: "8px", ty: "-14px" },
                        { size: 3, top: "28%", left: "82%", dur: "5.1s", delay: "0.7s", tx: "-6px", ty: "-10px" },
                        { size: 5, top: "65%", left: "72%", dur: "4.2s", delay: "1.4s", tx: "10px", ty: "-8px" },
                        { size: 2, top: "78%", left: "30%", dur: "6s", delay: "0.3s", tx: "-4px", ty: "-16px" },
                        { size: 3, top: "45%", left: "90%", dur: "4.6s", delay: "2s", tx: "7px", ty: "-12px" },
                    ].map((p, i) => (
                        <div
                            key={i}
                            className="jacket-particle"
                            style={{
                                width: p.size,
                                height: p.size,
                                top: p.top,
                                left: p.left,
                                ["--dur" as string]: p.dur,
                                ["--delay" as string]: p.delay,
                                ["--tx" as string]: p.tx,
                                ["--ty" as string]: p.ty,
                            }}
                        />
                    ))}

                    {/* The jacket image */}
                    <img
                        ref={jacketImgRef}
                        data-shared-jacket-source
                        src={JACKET_SRC}
                        alt="90s Vintage Tracksuit Jacket"
                        className="jacket-img"
                        draggable={false}
                    />
                </div>

                {/* ── Bottom-left: dots + scroll label ──────────────────── */}
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
                                {i === currentSlide && (
                                    <span className="dot-fill" key={currentSlide} />
                                )}
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

                {/* ── Bottom-center: current slide label ────────────────── */}
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

            </section>
        </>
    );
}