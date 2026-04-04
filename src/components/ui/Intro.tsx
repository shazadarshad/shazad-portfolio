"use client";

import { useEffect, useCallback, useState } from "react";
import { animate } from "motion/react";

export default function Intro() {
  // Default true so the overlay renders immediately on first visit (no flash).
  // Set to false once the animation finishes OR when we know intro was already shown.
  const [visible, setVisible] = useState(true);

  const complete = useCallback(() => {
    document.dispatchEvent(new CustomEvent("intro:done"));
    sessionStorage.setItem("intro-shown", "1");
    setVisible(false);
  }, []);

  useEffect(() => {
    // Skip on repeat visits within the same session
    if (sessionStorage.getItem("intro-shown")) {
      complete();
      return;
    }

    const seq = async () => {
      // 1 — "SA" fades in, letter-spacing contracts
      await animate(
        ".intro__text",
        { opacity: [0, 1], letterSpacing: ["0.5em", "0.12em"] },
        { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
      );

      // 2 — thin line draws in from left
      animate(
        ".intro__line",
        { scaleX: [0, 1] },
        { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
      );

      // 3 — hold
      await new Promise<void>((r) => setTimeout(r, 380));

      // 4 — panel wipes up — sharp exponential ease
      await animate(
        ".intro__overlay",
        { y: ["0%", "-100%"] },
        { duration: 0.75, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
      );

      complete();
    };

    seq();
  }, [complete]);

  if (!visible) return null;

  return (
    <div className="intro__overlay" aria-hidden="true" role="presentation">
      <span className="intro__text">SA</span>
      <span className="intro__line" />
    </div>
  );
}
