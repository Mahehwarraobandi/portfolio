"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

/**
 * A surface with a faint neutral highlight that follows the pointer, plus an
 * accent ring on hover. Monochrome on purpose — no colour washes.
 */
export default function SpotlightCard({
  children,
  className = "",
  radius = 380,
  lift = true,
}) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, var(--fg) 6%, transparent), transparent 70%)`;

  function onMouseMove(event) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={lift ? { y: -4 } : undefined}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0"
      />
      <div className="ring-fg/0 group-hover:ring-accent/40 pointer-events-none absolute inset-0 rounded-[inherit] ring-1 transition-all duration-500" />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
