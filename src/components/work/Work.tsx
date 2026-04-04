"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import SectionLabel from "@/components/ui/SectionLabel";

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

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const rowVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0, opacity: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: EASE },
  }),
};

export default function Work() {
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const featured = filtered.filter((p) => p.featured);
  const grid = filtered.filter((p) => !p.featured);

  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="work" className="section" aria-labelledby="work-heading">
      <motion.div
        ref={headingRef}
        initial={{ y: 40, opacity: 0 }}
        animate={headingInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <SectionLabel number="04" label="Work" />
        <h2 id="work-heading" className="section__heading">
          Selected Work
        </h2>
      </motion.div>

      {/* Filter tabs */}
      <div
        className="work-filters"
        role="tablist"
        aria-label="Filter projects"
        style={{ marginTop: "2rem", marginBottom: "2.5rem" }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`filter-tab${filter === f ? " filter-tab--active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Featured rows */}
      {featured.length > 0 && (
        <div className="work-rows" style={{ marginBottom: "2rem" }}>
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              className="work-row"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={rowVariants}
              role="article"
              aria-label={p.title}
            >
              <span className="work-row__num">{p.num}</span>
              <div className="work-row__info">
                <span className="work-row__title">{p.title}</span>
                <span className="work-row__tagline">{p.tagline}</span>
              </div>
              <div className="work-row__tags" aria-label="Technologies used">
                {p.tags.map((t) => (
                  <span key={t} className="work-tag">{t}</span>
                ))}
              </div>
              <div className="work-row__actions" aria-label="Project links">
                <span title="View live" aria-label="View live project" style={{ fontSize: "1.1rem" }}>↗</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Grid cards */}
      {grid.length > 0 && (
        <div className="work-grid">
          {grid.map((p, i) => (
            <motion.div
              key={p.id}
              className="work-card"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={rowVariants}
              role="article"
              aria-label={p.title}
            >
              <div className="work-card__num">{p.num}</div>
              <h3 className="work-card__title">{p.title}</h3>
              <div className="work-card__tags">
                {p.tags.map((t) => (
                  <span key={t} className="work-tag">{t}</span>
                ))}
              </div>
              <p className="work-card__desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.8rem",
          color: "var(--gray-500)", padding: "3rem 0", letterSpacing: "0.1em",
        }}>
          No projects in this category yet.
        </p>
      )}
    </section>
  );
}
