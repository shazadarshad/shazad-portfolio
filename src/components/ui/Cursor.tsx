"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.14);
      currentY = lerp(currentY, targetY, 0.14);
      cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 5;
      targetY = e.clientY - 5;
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("a, button, [role='button'], label")) {
        cursor.classList.add("cursor--large");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("a, button, [role='button'], label")) {
        cursor.classList.remove("cursor--large");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
