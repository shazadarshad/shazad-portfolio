"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "motion/react";

interface CountUpProps {
  to: number;
  suffix?: string;
  duration?: number;
}

export default function CountUp({
  to,
  suffix = "",
  duration = 2,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const animated = useRef(false);

  useEffect(() => {
    if (!inView || animated.current || !ref.current) return;
    animated.current = true;
    const el = ref.current;

    animate(0, to, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toString() + suffix;
      },
    });
  }, [inView, to, suffix, duration]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}
