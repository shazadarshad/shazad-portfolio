"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useScroll, animate, stagger } from "motion/react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Toolkit", href: "#toolkit", id: "toolkit" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const mobileWasOpen = useRef(false);

  // ── Scroll detection ──────────────────────────────────────────────
  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 80));
  }, [scrollY]);

  // ── Scroll-spy via IntersectionObserver ───────────────────────────
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting section
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          setActiveSection(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Mobile menu ───────────────────────────────────────────────────
  const openMobile = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      mobileWasOpen.current = true;
      document.body.style.overflow = "hidden";

      // Reset links to start state before animating in
      const links = document.querySelectorAll<HTMLElement>(".nav__mobile-link");
      links.forEach((link) => {
        link.style.opacity = "0";
        link.style.transform = "translateY(20px)";
      });

      requestAnimationFrame(() => {
        animate(
          ".nav__mobile-link",
          { y: [20, 0], opacity: [0, 1] },
          {
            delay: stagger(0.07),
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }
        );
      });
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ── Close on Escape ───────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMobile]);

  return (
    <>
      <nav
        className={`nav${scrolled ? " nav--scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link href="/" className="nav__logo" aria-label="Shazad Arshad home">
          Shazad Arshad
        </Link>

        <ul className="nav__links" role="list">
          {NAV_LINKS.map(({ label, href, id }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav__link${activeSection === id ? " nav__link--active" : ""}`}
                aria-current={activeSection === id ? "true" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="#contact" className="nav__hire">
          Hire Me
        </Link>

        <button
          className="nav__burger"
          onClick={openMobile}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <span className="nav__burger-line" />
          <span className="nav__burger-line" />
          <span className="nav__burger-line" />
        </button>
      </nav>

      {mobileOpen && (
        <div
          className="nav__mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            className="nav__mobile-close"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            ✕
          </button>

          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="nav__mobile-link"
              onClick={closeMobile}
            >
              {label}
            </Link>
          ))}

          <Link
            href="mailto:shazadarshadcbs@gmail.com"
            className="nav__mobile-link"
            style={{
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
            onClick={closeMobile}
          >
            shazadarshadcbs@gmail.com
          </Link>
        </div>
      )}
    </>
  );
}
