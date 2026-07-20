"use client";

import { motion, useReducedMotion } from "motion/react";

const directions = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered reveal. Animates once, respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  from = "up",
  className,
  as = "div",
}) {
  const reduced = useReducedMotion();
  const offset = directions[from] ?? directions.up;
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
