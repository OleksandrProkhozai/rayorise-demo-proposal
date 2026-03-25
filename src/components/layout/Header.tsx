"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, ChevronDown, X, Menu } from "lucide-react";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products", hasDropdown: true },
    { label: "Contact Us", href: "/contact" },
];

const BoltSVG = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-rayo-amber">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full z-100 bg-rayo-black border-b border-rayo-amber/20">

            <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <div className="border-b border-rayo-amber/10">
                <div className="container mx-auto px-8 py-2 flex justify-between items-center">
                    <p className="font-mono text-xs tracking-[0.15em] text-rayo-off-white/40 uppercase">
                        Vintage Retro Apparel • Heritage Manufacturing
                    </p>
                    <div className="flex gap-5 items-center">
                        <Link href="#" className="text-rayo-off-white/40 hover:text-rayo-amber transition-colors">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </Link>
                        <Link href="#" className="text-rayo-off-white/40 hover:text-rayo-amber transition-colors">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>


            <div className="container mx-auto px-4 md:px-6 xl:px-8 py-4 flex justify-between items-center">


                <Link href="/" className="flex items-center gap-2 md:gap-3 xl:gap-4 group">
                    <div className="relative w-9 h-9 md:w-10 md:h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full border border-rayo-amber/30 bg-rayo-near-black group-hover:border-rayo-amber transition-all duration-500 shadow-[0_0_20px_rgba(184,132,31,0.1)]">
                        <BoltSVG />
                    </div>
                    <span className="font-bebas text-xl md:text-2xl xl:text-3xl tracking-[0.05em] text-rayo-off-white">
                        RAYO <span className="text-rayo-amber">RISE</span>
                    </span>
                </Link>


                <nav className="hidden md:flex items-center gap-1 xl:gap-4">
                    {NAV_ITEMS.map((item, idx) => {
                        return (
                            <div key={item.label} className="flex items-center">
                                <Link
                                    href={item.href}
                                    className="relative px-2 xl:px-3 py-2 font-bebas text-base md:text-lg xl:text-xl tracking-[0.12em] transition-all duration-300 flex items-center gap-1 group/link text-rayo-off-white hover:text-rayo-amber"
                                >
                                    {item.label}
                                    {item.hasDropdown && <ChevronDown size={14} className="text-rayo-off-white/50" />}


                                    <span className="absolute bottom-1 left-2 right-2 xl:left-4 xl:right-4 h-px bg-rayo-amber transition-transform duration-500 origin-left scale-x-0 group-hover/link:scale-x-100" />
                                </Link>

                                {idx < NAV_ITEMS.length - 1 && (
                                    <div className="w-px h-4 xl:h-5 bg-rayo-amber/20 rotate-25 mx-1 xl:mx-2" />
                                )}
                            </div>
                        );
                    })}
                </nav>


                <div className="flex items-center gap-3 xl:gap-6">
                    <button className="relative group p-2 transition-transform active:scale-95">
                        <ShoppingCart className="text-rayo-amber group-hover:text-rayo-red transition-colors" size={24} />
                        <span className="absolute top-0 right-0 w-4 h-4 xl:w-5 xl:h-5 bg-rayo-red text-rayo-off-white font-bebas text-xs rounded-full flex items-center justify-center border border-rayo-black shadow-lg">
                            0
                        </span>
                    </button>


                    <button
                        className="md:hidden p-2 text-rayo-amber transition-transform active:scale-95"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>


            <div
                className={`
                    md:hidden
                    overflow-hidden
                    transition-all duration-500 ease-in-out
                    ${mobileMenuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}
                `}
            >

                <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                <nav className="relative border-t border-rayo-amber/10 bg-rayo-black px-8 py-4 flex flex-col gap-1">
                    {NAV_ITEMS.map((item, idx) => {
                        return (
                            <div key={item.label}>
                                <Link
                                    href={item.href}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`
                                        flex items-center justify-between
                                        py-3 font-bebas text-2xl tracking-[0.12em]
                                        transition-colors duration-300
                                        text-rayo-off-white hover:text-rayo-amber
                                    `}
                                >
                                    <span>{item.label}</span>
                                    {item.hasDropdown && (
                                        <ChevronDown size={18} className="text-rayo-off-white/40" />
                                    )}
                                </Link>

                                {idx < NAV_ITEMS.length - 1 && (
                                    <div className="h-px bg-rayo-amber/10" />
                                )}
                            </div>
                        );
                    })}

                    <p className="font-mono text-[9px] tracking-[0.25em] text-rayo-off-white/25 uppercase mt-4">
                        EST. 2019 — PRECISION MADE
                    </p>
                </nav>
            </div>
        </header>
    );
}