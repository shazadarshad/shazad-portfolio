"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, useInView } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import Magnetic from "@/components/ui/Magnetic";

type FilterType = "All" | "Web Dev" | "Design" | "Apps";

interface Project {
  id: number;
  num: string;
  title: string;
  tagline: string;
  tags: string[];
  category: FilterType;
  featured: boolean;
  desc: string;
}

const PROJECTS: Project[] = [
  {
    id: 1, num: "01",
    title: "Coffee Shop Project",
    tagline: "Menu, ordering UI & smooth brand experience",
    tags: ["Next.js", "React", "TypeScript"],
    category: "Web Dev", featured: true,
    desc: "Modern coffee shop site with interactive menu, ordering UI and smooth animations — built for a real client brief.",
  },
  {
    id: 2, num: "02",
    title: "E-Commerce Platform",
    tagline: "Full-stack store with Stripe-powered checkout",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    category: "Web Dev", featured: true,
    desc: "Full-stack Zenva Store — cart management, product filtering, and Stripe payment integration from scratch.",
  },
  {
    id: 3, num: "03",
    title: "Portfolio Website",
    tagline: "Modern design meets performant motion",
    tags: ["Next.js", "React", "Motion"],
    category: "Design", featured: true,
    desc: "This site. Designed and built entirely from zero — rounded modern aesthetic, CSS-only marquees, Motion v12 animations.",
  },
  {
    id: 4, num: "04",
    title: "Task Management App",
    tagline: "Drag-and-drop boards with real-time sync",
    tags: ["React", "TypeScript", "Node.js"],
    category: "Apps", featured: false,
    desc: "Kanban-style task boards with drag-and-drop, real-time updates via WebSocket, and team collaboration.",
  },
  {
    id: 5, num: "05",
    title: "Weather Dashboard",
    tagline: "7-day forecast with animated weather icons",
    tags: ["Next.js", "TypeScript", "API"],
    category: "Apps", featured: false,
    desc: "Location-based weather app with 7-day forecast, animated condition icons, and OpenWeather API integration.",
  },
  {
    id: 6, num: "06",
    title: "Finance Dashboard",
    tagline: "Expense analytics, budgets & investments",
    tags: ["Next.js", "React", "TypeScript"],
    category: "Apps", featured: false,
    desc: "Personal finance tracker with expense categorisation, budget alerts, and investment portfolio visualisations.",
  },
  {
    id: 7, num: "07",
    title: "Design System",
    tagline: "Component library with design tokens",
    tags: ["React", "TypeScript", "Storybook"],
    category: "Design", featured: false,
    desc: "Reusable UI component library with design tokens, Storybook documentation, and accessibility-first approach.",
  },
];

const FILTERS: FilterType[] = ["All", "Web Dev", "Design", "Apps"];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current && scrollRef.current) {
      const pin = gsap.to(scrollRef.current, {
        x: () => -(scrollRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + scrollRef.current!.scrollWidth,
        }
      });

      return () => {
        pin.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, []);

  return (
    <section id="work" ref={containerRef} style={{ overflow: "hidden", height: "100vh", position: "relative", backgroundColor: "transparent" }}>

      <div style={{ position: "absolute", top: "4rem", left: "clamp(1.5rem, 5vw, 4rem)", zIndex: 10 }}>
        <SectionLabel number="03" label="Selected Works" />
        <h2 className="section__heading" style={{ color: "var(--black)" }}>Projects</h2>
      </div>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
          paddingRight: "clamp(1.5rem, 5vw, 4rem)",
          gap: "3rem",
          width: "max-content"
        }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="glass-card"
            style={{
              width: "clamp(300px, 40vw, 500px)",
              height: "60vh",
              minHeight: "400px",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "auto" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent)", letterSpacing: "0.1em" }}>{p.num}</span>
              <span className="trait-pill">{p.category}</span>
            </div>

            <div style={{ marginTop: "auto" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem", lineHeight: 1.1 }}>{p.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink)", marginBottom: "1.5rem", fontSize: "1.05rem" }}>{p.desc}</p>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", padding: "0.2rem 0.6rem", border: "1px solid var(--glass-border)", borderRadius: "9999px" }}>{t}</span>
                ))}
              </div>

              <Magnetic strength={20}>
                <button className="btn btn--solid" style={{ borderRadius: "9999px", padding: "0.75rem 2rem", width: "100%" }}>
                  <span className="btn__text">View Project</span>
                </button>
              </Magnetic>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
