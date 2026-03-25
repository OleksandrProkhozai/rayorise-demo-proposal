"use client";

import { useLayoutEffect } from "react";
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
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const hero = document.querySelector<HTMLElement>('[data-scene="scene1"]');
            const scene3 = document.querySelector<HTMLElement>('[data-scene="scene3"]');
            const heroProduct = document.querySelector<HTMLElement>('[data-hero-product]');
            const parallaxBack = document.querySelector<HTMLElement>('[data-parallax="back"]');
            const parallaxFront = document.querySelector<HTMLElement>('[data-parallax="front"]');

            if (hero && scene3 && heroProduct) {
                gsap.to(heroProduct, {
                    scale: 0.82,
                    yPercent: 42,
                    transformOrigin: "center center",
                    ease: "none",
                    scrollTrigger: {
                        trigger: hero,
                        start: "top top",
                        endTrigger: scene3,
                        end: "top top",
                        scrub: 1,
                    },
                });
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

    return null;
}
