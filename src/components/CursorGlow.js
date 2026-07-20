"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Soft spotlight that trails the pointer. Desktop pointers only, and only
 * after the first real pointer movement (so it never flashes in a corner).
 */
export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return undefined;

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      // State flips inside the event callback, not synchronously in the effect.
      setVisible(true);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden motion-reduce:hidden md:block"
    >
      <div className="h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--wash-1)_0%,var(--wash-2)_38%,transparent_68%)] blur-2xl" />
    </motion.div>
  );
}
