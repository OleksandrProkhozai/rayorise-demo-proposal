const pills = ["ISO 9001 CERTIFIED", "GMP CERTIFIED", "5+ YEARS EXPERIENCE"];
const JACKET_SRC = "https://pngimg.com/d/jacket_PNG8048.png";

export default function CraftScene3() {
    return (
        <>
            <style>{`
        .rayorise-scene3 {
          font-family: var(--font-dm-sans), sans-serif;
        }

        .ray-pill {
          font-family: var(--font-space-mono), monospace;
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
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(184,132,31,0.1);
          mix-blend-mode: multiply;
          pointer-events: none;
        }
      `}</style>

            <section className="rayorise-scene3 relative min-h-screen w-full bg-[#EDE3D0] text-[#1A1410] py-24 px-6 md:px-16 overflow-hidden flex items-center">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: 0.032,
                        backgroundImage:
                            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                        backgroundRepeat: "repeat",
                        backgroundSize: "256px 256px",
                    }}
                />

                <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
                    <div className="md:col-span-7 flex flex-col items-start gap-0">
                        <span
                            style={{
                                fontFamily: "var(--font-space-mono), monospace",
                                color: "#B8841F",
                                letterSpacing: "0.38em",
                                fontSize: "10px",
                                textTransform: "uppercase",
                                display: "block",
                                marginBottom: "16px",
                            }}
                        >
                            CHAPTER 01
                        </span>

                        <h2
                            data-reveal="headline"
                            style={{
                                fontFamily: "var(--font-bebas), sans-serif",
                                fontSize: "clamp(52px, 5.5vw, 88px)",
                                lineHeight: 1,
                                textTransform: "uppercase",
                                color: "#1A1410",
                                letterSpacing: "0.02em",
                                margin: "0 0 20px 0",
                            }}
                        >
                            THE CRAFT
                        </h2>

                        <div
                            style={{
                                width: "80px",
                                height: "2px",
                                background: "#B8841F",
                                marginBottom: "28px",
                            }}
                        />

                        <blockquote
                            style={{
                                fontFamily: "var(--font-playfair), serif",
                                fontStyle: "italic",
                                fontSize: "clamp(22px, 2.8vw, 36px)",
                                lineHeight: 1.28,
                                color: "#1A1410",
                                margin: "0 0 28px 0",
                                maxWidth: "88%",
                            }}
                        >
                            &quot;Five years of precision. One standard: authentic.&quot;
                        </blockquote>

                        <div
                            style={{
                                fontWeight: 300,
                                fontSize: "clamp(15px, 1.1vw, 17px)",
                                lineHeight: 1.75,
                                color: "rgba(26,20,16,0.78)",
                                maxWidth: "55ch",
                                marginBottom: "20px",
                            }}
                        >
                            At Rayorise, every tracksuit carries the weight of an era we never forgot. We design,
                            source, and craft vintage 90s football apparel for those who understand what that era
                            meant.
                        </div>

                        <div
                            style={{
                                fontWeight: 300,
                                fontSize: "clamp(15px, 1.1vw, 17px)",
                                lineHeight: 1.75,
                                color: "rgba(26,20,16,0.78)",
                                maxWidth: "55ch",
                                marginBottom: "44px",
                            }}
                        >
                            Custom orders. Bulk manufacturing. Global shipping. Built from consultation to delivery
                            with craftsmanship that stands behind every stitch.
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px",
                            }}
                        >
                            {pills.map((pill) => (
                                <span key={pill} className="ray-pill">
                                    {pill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-5 relative" style={{ height: "clamp(480px, 55vw, 680px)" }}>
                        <div
                            data-parallax="back"
                            data-speed="1"
                            className="img-amber absolute"
                            style={{
                                top: 0,
                                right: 0,
                                width: "82%",
                                height: "80%",
                                overflow: "hidden",
                                boxShadow: "0 24px 60px rgba(26,20,16,0.18)",
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80"
                                alt="Vintage football tracksuit"
                                style={{
                                    width: "100%",
                                    height: "110%",
                                    objectFit: "cover",
                                    objectPosition: "center top",
                                    filter: "grayscale(45%) contrast(1.15)",
                                    display: "block",
                                    marginTop: "-5%",
                                }}
                            />
                        </div>

                        <div
                            data-parallax="front"
                            data-speed="1.2"
                            className="img-amber absolute"
                            style={{
                                bottom: 0,
                                left: 0,
                                width: "65%",
                                height: "57%",
                                border: "14px solid #B8841F",
                                boxShadow: "0 16px 48px rgba(26,20,16,0.22)",
                                zIndex: 20,
                                overflow: "hidden",
                                background:
                                    "linear-gradient(155deg, #F7F2E8 0%, #EFE8D9 54%, #E6DCC8 100%)",
                            }}
                        >
                            <div
                                data-shared-jacket-target-wrap
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    width: "58%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 30,
                                    opacity: 0,
                                    pointerEvents: "none",
                                }}
                            >
                                <img
                                    data-shared-jacket-target
                                    src={JACKET_SRC}
                                    alt="Vintage jacket settled into the craft scene"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "block",
                                        mixBlendMode: "multiply",
                                        filter: "contrast(1.08) saturate(0.92)",
                                        transform: "rotate(-7deg)",
                                        transformOrigin: "center center",
                                    }}
                                />
                            </div>

                            <div
                                aria-hidden
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "radial-gradient(120% 80% at 50% 20%, rgba(255,255,255,0.35) 0%, rgba(237,227,208,0) 65%)",
                                    pointerEvents: "none",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
