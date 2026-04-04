"use client";

import { useEffect } from "react";
import { useScroll, useTransform, motion, animate, stagger } from "motion/react";
import CountUp from "@/components/ui/CountUp";
import Button from "@/components/ui/Button";

const STATS = [
  { to: 50, suffix: "+", label: "Projects" },
  { to: 3, suffix: "+", label: "Years Exp." },
  { to: 100, suffix: "%", label: "Satisfaction" },
  { to: 24, suffix: "/7", label: "Available" },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const decoY = useTransform(scrollY, [0, 600], [0, -100]);

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

      {/* Center column */}
      <div className="hero__center">
        {/* Status pill */}
        <div
          className="hero__badge"
          role="status"
          aria-label="Currently available for work"
          style={{ opacity: 0 }}
        >
          <span className="hero__status-dot" aria-hidden="true" />
          Available for work
        </div>

        {/* Headline */}
        <h1 className="hero__headline">
          <span className="hero__word">
            <span className="hero__word-inner">Building Things</span>
          </span>
          <span className="hero__word">
            <span className="hero__word-inner">
              People Love
              <span className="hero__cursor" aria-hidden="true">_</span>
            </span>
          </span>
        </h1>

        {/* Meta — subtitle + CTAs */}
        <div className="hero__meta" style={{ opacity: 0 }}>
          <p className="hero__subtitle">
            Student &amp; Developer based in Colombo, Sri Lanka —
            crafting fast, beautiful web experiences.
          </p>

          <div className="hero__ctas">
            <Button href="#work" variant="solid">View My Work →</Button>
            <a href="/cv.pdf" download className="link-draw" aria-label="Download CV">
              Download CV
            </a>
          </div>

          <p className="hero__social-proof">
            50+ projects delivered · 3+ years experience · 100% client satisfaction
          </p>
        </div>
      </div>

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
