"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function splitHeadline(headline: HTMLElement) {
    if (headline.dataset.splitReady === "true") {
        return;
    }

    const text = headline.textContent?.trim() ?? "";
    if (!text) {
        return;
    }

    const words = text.split(/\s+/);
    headline.textContent = "";

    words.forEach((word, index) => {
        const wrap = document.createElement("span");
        wrap.style.display = "inline-block";
        wrap.style.overflow = "hidden";
        wrap.style.verticalAlign = "bottom";
        wrap.style.marginRight = index === words.length - 1 ? "0" : "0.22em";

        const inner = document.createElement("span");
        inner.textContent = word;
        inner.className = "reveal-word";
        inner.style.display = "inline-block";
        inner.style.clipPath = "inset(0 0 100% 0)";
        inner.style.transform = "translateY(36%)";

        wrap.appendChild(inner);
        headline.appendChild(wrap);
    });

    headline.dataset.splitReady = "true";
}

export default function StoryMotion() {
    const sharedLayerRef = useRef<HTMLDivElement>(null);
    const movingJacketRef = useRef<HTMLImageElement>(null);
    const tornMaskRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const hero = document.querySelector<HTMLElement>('[data-scene="scene1"]');
            const scene3 = document.querySelector<HTMLElement>('[data-scene="scene3"]');
            const sourceWrap = document.querySelector<HTMLElement>("[data-shared-jacket-source-wrap]");
            const sourceJacket = document.querySelector<HTMLImageElement>("[data-shared-jacket-source]");
            const targetWrap = document.querySelector<HTMLElement>("[data-shared-jacket-target-wrap]");
            const targetJacket = document.querySelector<HTMLImageElement>("[data-shared-jacket-target]");
            const parallaxBack = document.querySelector<HTMLElement>('[data-parallax="back"]');
            const parallaxFront = document.querySelector<HTMLElement>('[data-parallax="front"]');
            const movingJacket = movingJacketRef.current;
            const sharedLayer = sharedLayerRef.current;
            const tornMask = tornMaskRef.current;
            const isSmallScreen = window.matchMedia("(max-width: 549px)").matches;

            const getTargetY = () => {
                const rect = targetJacket?.getBoundingClientRect();
                if (!rect) return 0;
                if (!isSmallScreen) return rect.top;

                const safeTopMax = window.innerHeight - rect.height - 28;
                return Math.min(rect.top, Math.max(24, safeTopMax));
            };

            if (
                hero &&
                scene3 &&
                sourceWrap &&
                sourceJacket &&
                targetWrap &&
                targetJacket &&
                movingJacket &&
                sharedLayer &&
                tornMask
            ) {
                movingJacket.src = sourceJacket.currentSrc || sourceJacket.src;

                gsap.set(sharedLayer, { autoAlpha: 1 });
                gsap.set(sourceWrap, { autoAlpha: 1 });
                gsap.set([targetWrap, movingJacket], { autoAlpha: 0 });
                gsap.set(tornMask, { autoAlpha: 0, yPercent: 0 });
                gsap.set(movingJacket, {
                    transformPerspective: 1200,
                    transformOrigin: "50% 50%",
                    force3D: true,
                });

                const setMovingToSourceBounds = () => {
                    const sourceRect = sourceJacket.getBoundingClientRect();
                    gsap.set(movingJacket, {
                        x: sourceRect.left,
                        y: sourceRect.top,
                        width: sourceRect.width,
                        height: sourceRect.height,
                        rotate: 0,
                        rotateY: 0,
                        autoAlpha: 0,
                        transformOrigin: "50% 50%",
                    });
                };

                setMovingToSourceBounds();

                gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: hero,
                        start: "top+=80 top",
                        endTrigger: scene3,
                        end: "top -34%",
                        scrub: 1.8,
                        invalidateOnRefresh: true,
                        onRefreshInit: setMovingToSourceBounds,
                    },
                })
                    .to(
                        movingJacket,
                        {
                            autoAlpha: 1,
                            duration: 0.12,
                        },
                        0.08
                    )
                    .to(
                        sourceWrap,
                        {
                            autoAlpha: 0,
                            duration: 0.25,
                        },
                        0.14
                    )
                    .to(
                        movingJacket,
                        {
                            x: () => targetJacket.getBoundingClientRect().left,
                            y: getTargetY,
                            width: () => targetJacket.getBoundingClientRect().width,
                            height: () => targetJacket.getBoundingClientRect().height,
                            rotate: -7,
                            rotateY: 12,
                            duration: 0.45,
                            ease: "none",
                        },
                        0.16
                    )
                    .to(
                        tornMask,
                        {
                            autoAlpha: 0.72,
                            yPercent: -48,
                            duration: 0.36,
                            ease: "none",
                        },
                        0.46
                    )
                    .to(
                        tornMask,
                        {
                            autoAlpha: 0,
                            yPercent: -108,
                            duration: 0.4,
                            ease: "none",
                        },
                        0.78
                    )
                    .to(
                        targetWrap,
                        {
                            autoAlpha: 1,
                            duration: 0.13,
                        },
                        0.53
                    )
                    .to(
                        movingJacket,
                        {
                            autoAlpha: 0,
                            duration: 0.11,
                        },
                        0.62
                    );
            }

            if (scene3 && parallaxBack && parallaxFront) {
                gsap.to(parallaxBack, {
                    yPercent: -18,
                    ease: "none",
                    scrollTrigger: {
                        trigger: scene3,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });

                gsap.to(parallaxFront, {
                    yPercent: -21.6,
                    ease: "none",
                    scrollTrigger: {
                        trigger: scene3,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }

            const headlines = gsap.utils.toArray<HTMLElement>('[data-reveal="headline"]');
            headlines.forEach((headline) => {
                splitHeadline(headline);
                const words = headline.querySelectorAll<HTMLElement>(".reveal-word");

                gsap.to(words, {
                    clipPath: "inset(0 0 0% 0)",
                    yPercent: -36,
                    duration: 0.7,
                    ease: "power2.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: headline,
                        start: "top 85%",
                        once: true,
                    },
                });
            });

            ScrollTrigger.refresh();
        });

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <>
            <div ref={sharedLayerRef} className="pointer-events-none fixed inset-0 z-70" aria-hidden>
                <img
                    ref={movingJacketRef}
                    alt=""
                    className="absolute block select-none"
                    style={{
                        objectFit: "contain",
                        mixBlendMode: "screen",
                        filter: "drop-shadow(0 42px 58px rgba(12,9,5,0.45)) contrast(1.08)",
                        willChange: "transform,width,height,opacity",
                    }}
                    draggable={false}
                />
            </div>

            <div
                ref={tornMaskRef}
                className="pointer-events-none fixed inset-0 z-60"
                aria-hidden
                style={{
                    top: "58vh",
                    bottom: 0,
                    background: "transparent",
                    clipPath:
                        "polygon(0 0,100% 0,100% 88%,95% 90%,89% 87%,81% 92%,74% 88%,66% 93%,58% 89%,50% 94%,42% 89%,34% 93%,26% 88%,18% 92%,10% 87%,0 90%)",
                    willChange: "transform",
                    opacity: 0,
                }}
            />
        </>
    );
}
