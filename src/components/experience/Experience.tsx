"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import SectionLabel from "@/components/ui/SectionLabel";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface ExperienceEntry {
  years: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
  stack: string[];
}

interface EducationEntry {
  years: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  details: string[];
}

interface Certification {
  title: string;
  issuer: string;
  platform: string;
  year: string;
  abbr: string;
  credential?: string;
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    years: "2022 — Present",
    role: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    bullets: [
      "Built custom websites for small to medium businesses across multiple industries.",
      "Implemented e-commerce solutions with payment integration via Stripe and PayPal.",
      "Ongoing maintenance and support for client websites, ensuring 99.9% uptime.",
      "Achieved 100% client satisfaction rate across all delivered projects.",
    ],
    stack: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
  },
];

const EDUCATION: EducationEntry[] = [
  {
    years: "2020 — Present",
    degree: "Bachelor of Science",
    field: "Computer Science",
    institution: "University of Technology",
    location: "Colombo, Sri Lanka",
    details: [
      "GPA: 3.8 / 4.0",
      "Focus areas: Software Engineering, Web Technologies, Data Structures.",
      "Active member of the university tech society and coding club.",
    ],
  },
];

const CERTIFICATIONS: Certification[] = [
  {
    title: "Introduction to Databases",
    issuer: "IBM", platform: "Coursera", year: "2024", abbr: "DB",
    credential: "https://www.coursera.org/account/accomplishments/records/YAM9SJYA2ZEI",
  },
  {
    title: "Introduction to HTML, CSS & JavaScript",
    issuer: "IBM", platform: "Coursera", year: "2024", abbr: "WEB",
    credential: "https://www.coursera.org/account/accomplishments/records/AY0D9033OEAF",
  },
  {
    title: "Getting Started with Git and GitHub",
    issuer: "IBM", platform: "Coursera", year: "2024", abbr: "GIT",
    credential: "https://www.coursera.org/account/accomplishments/records/OO3KI0IE7DK9",
  },
];

function FadeUp({ children, delay = 0, style }: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} style={style}
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function TimelineItem({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} className="timeline-item"
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      <div className="timeline-item__marker" aria-hidden="true" />
      <p className="timeline-item__year">{entry.years}</p>
      <h3 className="timeline-item__role">{entry.role}</h3>
      <p className="timeline-item__company">{entry.company} · {entry.location}</p>
      <ul className="timeline-item__bullets" aria-label="Responsibilities">
        {entry.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1.25rem" }}>
        {entry.stack.map((s) => (
          <span key={s} className="work-tag">{s}</span>
        ))}
      </div>
    </motion.div>
  );
}

function EducationItem({ entry, index }: { entry: EducationEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} className="timeline-item"
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      <div className="timeline-item__marker" aria-hidden="true" />
      <p className="timeline-item__year">{entry.years}</p>
      <h3 className="timeline-item__role">
        {entry.degree}
        <span style={{
          display: "block", fontFamily: "var(--font-body)", fontSize: "1rem",
          fontWeight: 400, color: "var(--gray-500)", marginTop: "0.2rem",
        }}>
          {entry.field}
        </span>
      </h3>
      <p className="timeline-item__company">{entry.institution} · {entry.location}</p>
      <ul className="timeline-item__bullets" aria-label="Education details" style={{ marginTop: "1rem" }}>
        {entry.details.map((d, i) => <li key={i}>{d}</li>)}
      </ul>
    </motion.div>
  );
}

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className="cert-card"
      style={{ display: "flex", flexDirection: "column", gap: "0.75rem", position: "relative", overflow: "hidden" }}
    >
      {/* Background watermark */}
      <span aria-hidden="true" style={{
        position: "absolute", insetInlineEnd: "1rem", insetBlockEnd: "-0.5rem",
        fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "4rem",
        color: "var(--accent-muted)", lineHeight: 1, userSelect: "none", letterSpacing: "-0.02em",
      }}>
        {cert.abbr}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.65rem",
          color: "var(--accent-soft)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
        }}>
          {cert.issuer}
        </span>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.6rem",
          color: "var(--gray-500)", letterSpacing: "0.06em",
        }}>
          via {cert.platform}
        </span>
      </div>

      <h4 style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "1rem", lineHeight: 1.2, letterSpacing: "-0.01em",
        color: "var(--black)", position: "relative", zIndex: 1, maxWidth: "18ch",
      }}>
        {cert.title}
      </h4>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--gray-500)", letterSpacing: "0.1em" }}>
          {cert.year}
        </p>
        {cert.credential && (
          <a
            href={cert.credential}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600,
              color: "var(--accent)", letterSpacing: "0.01em",
              position: "relative", zIndex: 1,
              display: "inline-flex", alignItems: "center", gap: "0.25rem",
            }}
            aria-label={`View ${cert.title} credential`}
          >
            View credential ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

function SubHeading({ label, title }: { label: string; title: string }) {
  return (
    <FadeUp style={{ marginBottom: "2.5rem" }}>
      <p className="section__label">
        <span aria-hidden="true">◆</span> {label}
      </p>
      <h3 style={{
        fontFamily: "var(--font-display)", fontWeight: 800,
        fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)",
        lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--black)",
      }}>
        {title}
      </h3>
    </FadeUp>
  );
}

const DIVIDER = {
  marginBlockStart: "clamp(3.5rem, 6vw, 5rem)",
  paddingBlockStart: "clamp(2rem, 4vw, 3rem)",
  borderBlockStart: "1px solid var(--border)",
};

export default function Experience() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section
      id="experience"
      className="section"
      style={{
        position: "relative",
        zIndex: 2,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.5)",
        borderTopLeftRadius: "2rem",
        borderTopRightRadius: "2rem",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.05)",
        marginTop: "-10vh",
        paddingTop: "5rem"
      }}
      aria-labelledby="experience-heading"
    >
      <motion.div
        ref={headingRef}
        initial={{ y: 40, opacity: 0 }}
        animate={headingInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ marginBottom: "3rem" }}
      >
        <SectionLabel number="04" label="Experience" />
        <h2 id="experience-heading" className="section__heading">My Journey</h2>
      </motion.div>

      <div className="timeline">
        {EXPERIENCE.map((entry, i) => (
          <TimelineItem key={entry.role} entry={entry} index={i} />
        ))}
      </div>

      <div style={DIVIDER}>
        <SubHeading label="Education" title="Academic Background" />
        <div className="timeline">
          {EDUCATION.map((entry, i) => (
            <EducationItem key={entry.degree} entry={entry} index={i} />
          ))}
        </div>
      </div>

      <div style={DIVIDER}>
        <SubHeading label="Certifications" title="Credentials & Courses" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
