import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "rayo-black": "#0C0905",
                "rayo-cream": "#EDE3D0",
                "rayo-amber": "#B8841F",
                "rayo-red": "#6B2B22",
                "rayo-off-white": "#F2EBD9",
                "rayo-near-black": "#1A1410",
            },
            fontFamily: {
                bebas: ["var(--font-bebas)"],
                playfair: ["var(--font-playfair)"],
                sans: ["var(--font-dm-sans)"],
                mono: ["var(--font-space-mono)"],
            },
        },
    },
    plugins: [],
};

export default config;