"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="from-accent via-accent-2 to-accent-3 fixed inset-x-0 top-0 z-60 h-[2px] origin-left bg-gradient-to-r"
    />
  );
}
