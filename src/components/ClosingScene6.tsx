"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
interface Step {
    num: string;
    title: string;
    desc: string;
}

interface Badge {
    name: string;
    detail: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STEPS: Step[] = [
    {
        num: "01",
        title: "CONSULTATION & DESIGN",
        desc: "Tell us your vision — sizing, era, silhouette. We draft it.",
    },
    {
        num: "02",
        title: "APPROVAL & SAMPLING",
        desc: "Review your sample. Approve every detail before production begins.",
    },
    {
        num: "03",
        title: "PRODUCTION & DELIVERY",
        desc: "Precision manufactured. Fast worldwide shipping. Delivered to your door.",
    },
];

const BADGES: Badge[] = [
    { name: "ISO", detail: "9001" },
    { name: "CE", detail: "CERTIFIED" },
    { name: "FBR", detail: "REGISTERED" },
    { name: "FDA", detail: "COMPLIANT" },
    { name: "GMP", detail: "VERIFIED" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
/** Split a string into word-wrapped spans for clip-path reveal */
function WordReveal({
    text,
    className,
}: {
    text: string;
    className?: string;
}) {
    return (
        <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className ?? ""}`}>
            {text.split(" ").map((word, i) => (
                <span key={i} className="word-wrap overflow-hidden inline-block">
                    <span
                        className="word-inner inline-block"
                        style={{ clipPath: "inset(0 0 100% 0)" }}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </span>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Scene6ClosingFrame() {
    const sectionRef = useRef<HTMLElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const zoneARef = useRef<HTMLDivElement>(null);
    const zoneBRef = useRef<HTMLDivElement>(null);
    const zoneCRef = useRef<HTMLDivElement>(null);

    // ── Hard Cut Flash ──────────────────────────────────────────────────────────
    useEffect(() => {
        const flash = flashRef.current;
        const section = sectionRef.current;
        if (!flash || !section) return;

        const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            once: true,
            onEnter: () => {
                gsap.set(flash, { opacity: 1, pointerEvents: "none" });
                gsap.to(flash, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    delay: 0.05,
                });
            },
        });

        return () => trigger.kill();
    }, []);

    // ── Zone A: Process steps ───────────────────────────────────────────────────
    useEffect(() => {
        const zone = zoneARef.current;
        if (!zone) return;

        // Numeral scale animation
        const numerals = zone.querySelectorAll<HTMLElement>(".bg-numeral");
        numerals.forEach((el) => {
            gsap.fromTo(
                el,
                { scale: 0.85 },
                {
                    scale: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        end: "bottom 30%",
                        scrub: 0.8,
                    },
                }
            );
        });

        // Word reveal for step headlines
        const columns = zone.querySelectorAll<HTMLElement>(".step-col");

        columns.forEach((col, ci) => {
            const colWords = col.querySelectorAll<HTMLElement>(".word-inner");
            const body = col.querySelector<HTMLElement>(".step-body");

            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: col,
                        start: "top 80%",
                        once: true,
                    },
                })
                .to(colWords, {
                    clipPath: "inset(0 0 0% 0)",
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.08,
                    delay: ci * 0.15,
                })
                .fromTo(
                    body,
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
                    "-=0.3"
                );
        });

        return () => ScrollTrigger.getAll().forEach(() => { }); // cleanup handled globally
    }, []);

    // ── Zone B: Trust Signals ───────────────────────────────────────────────────
    useEffect(() => {
        const zone = zoneBRef.current;
        if (!zone) return;

        const label = zone.querySelector<HTMLElement>(".trust-label");
        const badges = zone.querySelectorAll<HTMLElement>(".trust-badge");

        gsap
            .timeline({
                scrollTrigger: { trigger: zone, start: "top 80%", once: true },
            })
            .fromTo(
                label,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            )
            .fromTo(
                badges,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 },
                "-=0.4"
            );
    }, []);

    // ── Zone C: CTA ─────────────────────────────────────────────────────────────
    useEffect(() => {
        const zone = zoneCRef.current;
        if (!zone) return;

        const headline = zone.querySelectorAll<HTMLElement>(".word-inner");
        const sub = zone.querySelector<HTMLElement>(".cta-sub");
        const btns = zone.querySelectorAll<HTMLElement>(".cta-btn");
        const footer = zone.querySelector<HTMLElement>(".credits");

        gsap
            .timeline({
                scrollTrigger: { trigger: zone, start: "top 75%", once: true },
            })
            .to(headline, {
                clipPath: "inset(0 0 0% 0)",
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.06,
            })
            .fromTo(
                sub,
                { opacity: 0, y: 10 },
                { opacity: 0.7, y: 0, duration: 0.6, ease: "power2.out" },
                "-=0.4"
            )
            .fromTo(
                btns,
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.12 },
                "-=0.3"
            )
            .fromTo(
                footer,
                { opacity: 0 },
                { opacity: 0.6, duration: 0.8, ease: "power1.out" },
                "-=0.2"
            );
    }, []);

    return (
        <>
            {/* ── Local visual helpers ───────────────────────────────────────────── */}
            <style>{`
        /* Film grain overlay */
        .grain-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.05;
          pointer-events: none;
          z-index: 1;
        }

                /* Match Hero mood: warm tint + vignette depth */
                .hero-mood-amber {
                    position: absolute;
                    inset: 0;
                    background: rgba(184,132,31,0.09);
                    mix-blend-mode: color;
                    pointer-events: none;
                    z-index: 2;
                }

                .hero-mood-vignette {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse at center, transparent 16%, rgb(12 9 5 / 0.86) 100%);
                    pointer-events: none;
                    z-index: 2;
                }
      `}</style>

            {/* ── Flash cut overlay ───────────────────────────────────────────────── */}
            <div
                ref={flashRef}
                className="fixed inset-0 bg-rayo-black z-50 pointer-events-none"
                style={{ opacity: 0 }}
            />

            {/* ── SECTION ─────────────────────────────────────────────────────────── */}
            <section
                ref={sectionRef}
                className="relative grain-overlay overflow-hidden bg-rayo-black"
            >
                <div className="hero-mood-amber" />
                <div className="hero-mood-vignette" />

                {/* ── ZONE A: Process ─────────────────────────────────────────────── */}
                <div
                    ref={zoneARef}
                    className="relative z-10 px-6 md:px-16 pt-24 pb-16"
                >
                    {/* section eyebrow */}
                    <p
                        className="font-mono text-xs tracking-[0.3em] mb-12 text-center text-rayo-off-white/55"
                    >
                        THE PROCESS
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        {STEPS.map((step, i) => (
                            <div
                                key={step.num}
                                className={`step-col relative flex flex-col px-6 py-8 md:py-0 ${i < STEPS.length - 1
                                    ? "md:border-r md:border-r-rayo-amber/20 border-b border-b-rayo-amber/10"
                                    : "border-b border-b-rayo-amber/10"
                                    }`}
                            >
                                {/* Large background numeral */}
                                <span
                                    className="bg-numeral font-bebas absolute top-0 left-4 select-none leading-none origin-top-left"
                                    style={{
                                        fontSize: "15vw",
                                        color: "rgb(184 132 31 / 0.12)",
                                        lineHeight: 0.9,
                                        transform: "scale(0.85)",
                                        zIndex: 0,
                                    }}
                                >
                                    {step.num}
                                </span>

                                {/* Content */}
                                <div className="relative z-10 mt-[10vw] md:mt-[12vw]">
                                    <h3
                                        className="font-bebas mb-4 text-2xl md:text-3xl tracking-wide text-rayo-off-white"
                                    >
                                        <WordReveal text={step.title} />
                                    </h3>
                                    <p
                                        className="step-body font-sans text-sm md:text-base leading-relaxed text-rayo-cream/65"
                                        style={{ opacity: 0 }}
                                    >
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── ZONE B: Trust Signals ────────────────────────────────────────── */}
                <div
                    ref={zoneBRef}
                    className="relative z-10 mx-6 md:mx-16 my-6 rounded-none px-8 py-10 bg-rayo-near-black"
                >
                    <p
                        className="trust-label font-playfair text-center text-lg md:text-xl mb-10 text-rayo-cream/85"
                        style={{ opacity: 0 }}
                    >
                        Built to standards that speak for themselves.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                        {BADGES.map((badge) => (
                            <div
                                key={badge.name}
                                className="trust-badge flex flex-col items-center opacity-0"
                            >
                                <span
                                    className="font-bebas text-2xl md:text-3xl tracking-widest text-rayo-amber"
                                >
                                    {badge.name}
                                </span>
                                <span
                                    className="font-mono text-[10px] tracking-[0.2em] text-rayo-cream/55"
                                >
                                    {badge.detail}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── ZONE C: Final CTA ────────────────────────────────────────────── */}
                <div
                    ref={zoneCRef}
                    className="relative z-10 px-6 md:px-16 pt-20 pb-32 flex flex-col items-center text-center"
                >
                    {/* Main headline */}
                    <h2
                        className="font-bebas leading-none mb-6 text-rayo-off-white"
                        style={{ fontSize: "clamp(2.8rem, 6vw, 7rem)" }}
                    >
                        <WordReveal text="READY TO BUILD YOUR COLLECTION?" />
                    </h2>

                    {/* Sub-headline */}
                    <p
                        className="cta-sub font-sans text-base md:text-lg max-w-xl mb-10 opacity-0 text-rayo-cream/75"
                    >
                        Custom vintage tracksuits, bulk orders, worldwide delivery.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <button
                            className="cta-btn font-bebas text-lg tracking-widest px-10 py-4 transition-shadow duration-300 opacity-0 bg-rayo-amber text-rayo-black rounded-none hover:shadow-[0_0_20px_rgba(184,132,31,0.4)]"
                        >
                            START YOUR ORDER
                        </button>
                        <button
                            className="cta-btn font-bebas text-lg tracking-widest px-10 py-4 transition-colors duration-300 opacity-0 hover:bg-rayo-red/25 border border-rayo-amber/70 text-rayo-off-white rounded-none"
                        >
                            CONTACT US
                        </button>
                    </div>

                    {/* Footer Credits */}
                    <p
                        className="credits font-mono text-[10px] md:text-xs tracking-[0.35em] opacity-0 text-rayo-cream/60"
                    >
                        RAYORISE — EST. 2019 — PRECISION VINTAGE APPAREL
                    </p>
                </div>

                {/* Decorative bottom fade to black */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
                    style={{
                        background:
                            "linear-gradient(to bottom, transparent, rgb(12 9 5 / 0.9))",
                    }}
                />
            </section>
        </>
    );
}