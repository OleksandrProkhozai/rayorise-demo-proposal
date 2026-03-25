const STEPS = [
    {
        num: "01",
        title: "CONSULTATION & DESIGN",
        desc: "Tell us your vision: sizing, era, silhouette. We draft the full spec.",
    },
    {
        num: "02",
        title: "APPROVAL & SAMPLING",
        desc: "Review your sample and approve every detail before production starts.",
    },
    {
        num: "03",
        title: "PRODUCTION & DELIVERY",
        desc: "Precision manufactured, globally shipped, delivered ready to wear.",
    },
];

const BADGES = [
    { name: "ISO", detail: "9001" },
    { name: "CE", detail: "CERTIFIED" },
    { name: "FBR", detail: "REGISTERED" },
    { name: "FDA", detail: "COMPLIANT" },
    { name: "GMP", detail: "VERIFIED" },
];

export default function Scene6ClosingFrame() {
    return (
        <section className="relative overflow-hidden bg-rayo-black">
            <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(circle_at_30%_25%,rgba(184,132,31,0.2),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(184,132,31,0.15),transparent_35%)]" />

            <div className="relative z-10 px-6 md:px-16 pt-24 pb-16">
                <p className="font-mono text-xs tracking-[0.3em] mb-12 text-center text-rayo-off-white/55">THE PROCESS</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {STEPS.map((step, i) => (
                        <div
                            key={step.num}
                            className={`step-col relative flex flex-col px-6 py-8 md:py-0 ${i < STEPS.length - 1
                                ? "md:border-r md:border-r-rayo-amber/20 border-b border-b-rayo-amber/10"
                                : "border-b border-b-rayo-amber/10"
                                }`}
                        >
                            <span
                                className="font-bebas absolute top-0 left-4 select-none leading-none origin-top-left"
                                style={{
                                    fontSize: "15vw",
                                    color: "rgb(184 132 31 / 0.12)",
                                    lineHeight: 0.9,
                                    zIndex: 0,
                                }}
                            >
                                {step.num}
                            </span>

                            <div className="relative z-10 mt-[10vw] md:mt-[12vw]">
                                <h3 data-reveal="headline" className="font-bebas mb-4 text-2xl md:text-3xl tracking-wide text-rayo-off-white">
                                    {step.title}
                                </h3>
                                <p className="font-sans text-sm md:text-base leading-relaxed text-rayo-cream/65 pb-2">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 mx-6 md:mx-16 my-6 rounded-none px-8 py-10 bg-rayo-near-black">
                <p className="font-playfair text-center text-lg md:text-xl mb-10 text-rayo-cream/85">Built to standards that speak for themselves.</p>

                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                    {BADGES.map((badge) => (
                        <div key={badge.name} className="flex flex-col items-center">
                            <span className="font-bebas text-2xl md:text-3xl tracking-widest text-rayo-amber">{badge.name}</span>
                            <span className="font-mono text-[10px] tracking-[0.2em] text-rayo-cream/55">{badge.detail}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 px-6 md:px-16 pt-20 pb-32 flex flex-col items-center text-center">
                <h2 data-reveal="headline" className="font-bebas leading-none mb-6 text-rayo-off-white" style={{ fontSize: "clamp(2.8rem, 6vw, 7rem)" }}>
                    READY TO BUILD YOUR COLLECTION?
                </h2>

                <p className="font-sans text-base md:text-lg max-w-xl mb-10 text-rayo-cream/75">
                    Custom vintage tracksuits, bulk orders, worldwide delivery.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                    <button className="font-bebas text-lg tracking-widest px-10 py-4 rounded-none bg-rayo-amber text-rayo-black cursor-pointer transform-gpu transition-all duration-300 ease-out hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_0_24px_rgba(184,132,31,0.45)] active:translate-y-0 active:scale-[0.99]">
                        START YOUR ORDER
                    </button>
                    <button className="font-bebas text-lg tracking-widest px-10 py-4 rounded-none border border-rayo-amber/70 text-rayo-off-white cursor-pointer transform-gpu transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-rayo-amber hover:bg-rayo-red/25 hover:shadow-[0_0_18px_rgba(184,132,31,0.22)] active:translate-y-0 active:scale-[0.99]">
                        CONTACT US
                    </button>
                </div>

                <p className="font-mono text-[10px] md:text-xs tracking-[0.35em] text-rayo-cream/60">
                    RAYORISE - EST. 2019 - PRECISION VINTAGE APPAREL
                </p>
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
                style={{ background: "linear-gradient(to bottom, transparent, rgb(12 9 5 / 0.9))" }}
            />
        </section>
    );
}
