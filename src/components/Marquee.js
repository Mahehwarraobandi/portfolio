"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { marquee } from "@/data/resume";

function Row({ items, reverse, skew }) {
  const doubled = [...items, ...items];
  return (
    <motion.div style={{ skewX: skew }} className="flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-10 pr-10 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`flex shrink-0 items-center gap-10 whitespace-nowrap ${
              reverse
                ? "text-outline text-[clamp(1.6rem,4vw,3rem)] font-semibold tracking-[-0.03em]"
                : "text-fg/45 font-mono text-sm tracking-[0.18em] uppercase"
            }`}
          >
            {item}
            <span aria-hidden="true" className="text-accent/50 text-sm">
              ✦
            </span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Two counter-scrolling bands of the stack. They lean into the direction of
 * travel with scroll speed, then settle back upright.
 */
export default function Marquee() {
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), {
    stiffness: 120,
    damping: 30,
  });
  const skew = useTransform(velocity, [-2500, 0, 2500], [7, 0, -7]);

  const half = Math.ceil(marquee.length / 2);

  return (
    <div className="border-fg/10 bg-fg/[0.02] mask-fade-x relative border-y py-6">
      <p className="sr-only">Stack: {marquee.join(", ")}</p>
      <div aria-hidden="true" className="space-y-4">
        <Row items={marquee.slice(0, half)} skew={skew} />
        <Row items={marquee.slice(half)} reverse skew={skew} />
      </div>
    </div>
  );
}
