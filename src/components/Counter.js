"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

/**
 * Counts up to `value` the first time it scrolls into view.
 */
export default function Counter({ value, prefix = "", suffix = "", decimals }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const count = useMotionValue(0);
  const places = decimals ?? (Number.isInteger(value) ? 0 : 1);
  const [animated, setAnimated] = useState("0");

  useEffect(() => {
    // Reduced motion renders the final value directly — no animation to run.
    if (!inView || reduced) return undefined;
    const controls = animate(count, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setAnimated(latest.toFixed(places)),
    });
    return () => controls.stop();
  }, [inView, value, places, reduced, count]);

  const display = reduced ? value.toFixed(places) : animated;

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
