"use client";

import { useRef, useState, ReactElement, cloneElement } from "react";
import { motion, useAnimation } from "motion/react";

export default function Magnetic({
  children,
  strength = 30,
}: {
  children: ReactElement;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    controls.start({
      x: (x / width) * strength,
      y: (y / height) * strength,
      transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={controls}
      style={{ display: "inline-block" }}
      data-magnetic="true"
    >
      {cloneElement(children as ReactElement<{ "data-hovered"?: boolean }>, {
        "data-hovered": isHovered,
      })}
    </motion.div>
  );
}
