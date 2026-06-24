"use client";

import { useEffect } from "react";
import { useScroll, useTransform, motion, animate, stagger } from "motion/react";
import CountUp from "@/components/ui/CountUp";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";

const STATS = [
  { to: 50, suffix: "+", label: "Projects" },
  { to: 3, suffix: "+", label: "Years Exp." },
  { to: 100, suffix: "%", label: "Satisfaction" },
  { to: 24, suffix: "/7", label: "Available" },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 800], [0, 250]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

    const seq = async () => {
      await animate(
        ".hero__large-text span",
        { y: [150, 0], opacity: [0, 1], rotate: [10, 0] },
        { delay: stagger(0.1), duration: 1.2, ease: EASE }
      );

      animate(".hero__badge", { y: [16, 0], opacity: [0, 1] }, { duration: 0.5, ease: EASE });
      animate(".hero__meta", { y: [20, 0], opacity: [0, 1] }, { duration: 0.5, ease: EASE });
      animate(".hero__stats", { y: [20, 0], opacity: [0, 1] }, { duration: 0.5, delay: 0.15, ease: EASE });
    };

    if (sessionStorage.getItem("intro-shown")) {
      const timer = setTimeout(seq, 100);
      return () => clearTimeout(timer);
    }

    document.addEventListener("intro:done", seq, { once: true });
    return () => document.removeEventListener("intro:done", seq);
  }, []);

  return (
    <section className="hero" aria-label="Hero" style={{ justifyContent: "center", alignItems: "center", minHeight: "100svh", paddingBlock: "0" }}>
      {/* Noise overlay */}
      <svg className="hero__noise" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      <motion.div style={{ y: textY, opacity, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingInline: "1.5rem" }}>

        <div
          className="hero__badge"
          role="status"
          aria-label="Currently available for work"
          style={{ opacity: 0, marginBottom: "2rem" }}
        >
          <span className="hero__status-dot" aria-hidden="true" />
          Available for work
        </div>

        <h1 className="hero__large-text" style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 12vw, 12rem)",
          fontWeight: 900,
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          color: "var(--black)",
          textAlign: "center",
          textTransform: "uppercase",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <span style={{ display: "block", overflow: "hidden" }}>
             <span style={{ display: "inline-block", transformOrigin: "left center" }}>CREATIVE</span>
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
             <span style={{ display: "inline-block", transformOrigin: "left center", color: "var(--accent)" }}>DEVELOPER</span>
          </span>
        </h1>

        <div className="hero__meta" style={{ opacity: 0, marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
          <p className="hero__subtitle" style={{ fontSize: "1.25rem", maxWidth: "600px", textAlign: "center" }}>
            I craft immersive, award-winning digital experiences from Colombo, Sri Lanka.
          </p>

          <div className="hero__ctas" style={{ display: "flex", gap: "1.5rem" }}>
            <Magnetic strength={50}>
              <div style={{ borderRadius: "9999px" }}>
                <Button href="#work" variant="solid">View Projects</Button>
              </div>
            </Magnetic>
            <Magnetic strength={30}>
              <a href="#contact" className="link-draw" style={{ display: "inline-block", padding: "0.8rem 1rem" }}>
                Let&apos;s Talk
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.div>

      {/* Floating stats bar */}
      <motion.div
        className="hero__stats glass-card"
        aria-label="Quick stats"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "800px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "1rem 2rem",
          opacity: 0,
          border: "1px solid rgba(255,255,255,0.4)"
        }}
      >
        {STATS.map(({ to, suffix, label }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="hero__stat-num" style={{ fontSize: "1.5rem", color: "var(--accent)" }}>
              <CountUp to={to} suffix={suffix} duration={2} />
            </div>
            <div className="hero__stat-label" style={{ fontSize: "0.6rem" }}>{label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
