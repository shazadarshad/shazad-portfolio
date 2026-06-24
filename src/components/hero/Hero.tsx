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
  const decoY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);

  useEffect(() => {
    const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

    const seq = async () => {
      animate(".hero__badge", { y: [16, 0], opacity: [0, 1] }, { duration: 0.5, ease: EASE });

      await animate(
        ".hero__word-inner",
        { y: [60, 0], opacity: [0, 1] },
        { delay: stagger(0.08), duration: 0.7, ease: EASE }
      );

      animate(".hero__meta", { y: [20, 0], opacity: [0, 1] }, { duration: 0.5, ease: EASE });
      animate(".hero__content-right", { y: [20, 0], opacity: [0, 1] }, { duration: 0.5, delay: 0.1, ease: EASE });
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
    <section className="hero" aria-label="Hero">
      {/* Noise overlay */}
      <svg className="hero__noise" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* Faint watermark deco */}
      <motion.div className="hero__deco" style={{ y: decoY }} aria-hidden="true">
        SHAZAD
      </motion.div>

      {/* Split Layout Column with Parallax */}
      <motion.div className="hero__center" style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", textAlign: "left", y: heroY }}>

        <div className="hero__content-left" style={{ flex: 1, minWidth: "300px" }}>
          {/* Status pill */}
          <div
            className="hero__badge"
            role="status"
            aria-label="Currently available for work"
            style={{ opacity: 0, marginBottom: "2rem" }}
          >
            <span className="hero__status-dot" aria-hidden="true" />
            Available for work
          </div>

          {/* Headline */}
          <h1 className="hero__headline" style={{ alignItems: "flex-start", maxWidth: "100%" }}>
            <span className="hero__word">
              <span className="hero__word-inner">Designing &</span>
            </span>
            <span className="hero__word">
              <span className="hero__word-inner">
                Building Futures
                <span className="hero__cursor" aria-hidden="true">_</span>
              </span>
            </span>
          </h1>

          {/* Meta — subtitle + CTAs */}
          <div className="hero__meta" style={{ opacity: 0, alignItems: "flex-start" }}>
            <p className="hero__subtitle" style={{ textAlign: "left" }}>
              Creative Developer based in Colombo, Sri Lanka.
              <br/>Turning complex problems into elegant, glassmorphic web experiences.
            </p>

            <div className="hero__ctas">
              <Magnetic strength={40}>
                <Button href="#work" variant="solid">Explore Portfolio</Button>
              </Magnetic>
              <Magnetic strength={20}>
                <a href="#contact" className="link-draw" aria-label="Let's Talk" style={{display: "inline-block"}}>
                  Let&apos;s Talk
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="hero__content-right glass-card" style={{ flex: 0.8, minWidth: "300px", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", opacity: 0 }} >
            <h3 style={{fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "1rem"}}>Quick Facts</h3>
            <ul style={{listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", fontFamily: "var(--font-body)", color: "var(--ink)"}}>
              <li style={{display: "flex", alignItems: "center", gap: "0.5rem"}}><span style={{color: "var(--accent)"}}>✦</span> Modern React & Next.js</li>
              <li style={{display: "flex", alignItems: "center", gap: "0.5rem"}}><span style={{color: "var(--accent)"}}>✦</span> Intuitive UI/UX Design</li>
              <li style={{display: "flex", alignItems: "center", gap: "0.5rem"}}><span style={{color: "var(--accent)"}}>✦</span> Performance Optimized</li>
            </ul>
        </div>
      </motion.div>

      {/* Stats bar at bottom */}
      <div
        className="hero__stats"
        aria-label="Quick stats"
        style={{ paddingInline: "clamp(1.5rem, 5vw, 4rem)", paddingBottom: "clamp(2rem, 4svh, 3rem)", opacity: 0 }}
      >
        {STATS.map(({ to, suffix, label }) => (
          <div key={label} className="hero__stat">
            <div className="hero__stat-num">
              <CountUp to={to} suffix={suffix} duration={1.8} />
            </div>
            <div className="hero__stat-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
