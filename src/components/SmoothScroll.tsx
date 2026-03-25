"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = {
    children: React.ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
    return <>{children}</>;
}
