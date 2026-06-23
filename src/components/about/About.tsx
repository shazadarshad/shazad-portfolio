"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import SectionLabel from "@/components/ui/SectionLabel";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const SERVICES = [
  {
    num: "01",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="1" y="5" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 14l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Web Development",
    desc: "React, Next.js, TypeScript — fast, scalable, and built to last.",
  },
  {
    num: "02",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14" y1="3" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="20" x2="14" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "UI / UX Design",
    desc: "Intuitive, beautiful interfaces that users actually enjoy.",
  },
  {
    num: "03",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 3v4M14 21v4M3 14h4M21 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Backend & APIs",
    desc: "REST APIs and cloud-ready infrastructure that scales.",
  },
  {
    num: "04",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10h14M7 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Responsive Design",
    desc: "Pixel-perfect on every screen — phone to widescreen.",
  },
];

const TRAITS = ["Clean Code", "Fast Delivery", "Great Design", "Open Source"];

function FadeUp({
  children,
  delay = 0,
  className,
  style,
  ariaHidden,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  ariaHidden?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      aria-hidden={ariaHidden}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <SectionLabel number="02" label="About Me" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(3rem, 6vw, 5rem)" }}>
        {/* Bento Grid Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "stretch",
          }}
        >
          {/* Main Intro Card */}
          <FadeUp delay={0} className="glass-card" style={{ padding: "2.5rem", gridColumn: "1 / -1", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2
                id="about-heading"
                className="section__heading"
                style={{ marginBottom: "1.25rem" }}
              >
                Student, developer &amp; problem solver
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.05rem",
                  lineHeight: "1.8",
                  color: "var(--ink)",
                  marginBottom: "2rem",
                  maxWidth: "70ch"
                }}
              >
                I&apos;m <strong>Shazad Arshad</strong> — a Computer Science
                student and freelance web developer based in{" "}
                <strong>Colombo, Sri Lanka</strong>. With 3+ years of hands-on
                experience I build fast, scalable web applications using{" "}
                <strong>React, Next.js and TypeScript</strong> — from
                pixel-perfect front-end interfaces to robust back-end APIs.
                I deliver end-to-end digital products that clients across the
                globe love to use.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {TRAITS.map((trait) => (
                  <span key={trait} className="trait-pill">
                    {trait}
                  </span>
                ))}
              </div>
          </FadeUp>

          {/* Services mapping integrated into the Bento grid */}
          {SERVICES.map((s, idx) => (
            <FadeUp key={s.num} delay={0.1 + (idx * 0.05)} className="service-card" style={{ minHeight: "220px", display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "auto", color: "var(--accent)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  {s.icon}
                  <div className="service-card__num" style={{ margin: 0, opacity: 0.5 }}>{s.num}</div>
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                  <h3 className="service-card__title" style={{ fontSize: "1.25rem" }}>{s.title}</h3>
                  <p className="service-card__desc" style={{ fontSize: "0.95rem" }}>{s.desc}</p>
                </div>
            </FadeUp>
          ))}

          {/* Geo/Exp Card styled to fit the bento grid */}
          <FadeUp delay={0.3} className="glass-card" style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(99,102,241,0.1))", border: "1px solid rgba(139,92,246,0.2)"}}>
             <h3 style={{fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 900, color: "var(--accent)", lineHeight: 1, marginBottom: "0.5rem"}}>3+</h3>
             <p style={{fontFamily: "var(--font-mono)", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink)", fontWeight: 600}}>Years Exp.</p>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
