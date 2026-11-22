"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

/**
 * Text whose words light up one by one as it scrolls through the viewport.
 * Reduced-motion users get the plain text at full strength.
 */
export default function WordReveal({ text, as = "p", className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.45"],
  });
  const Tag = as;

  if (reduced) {
    return (
      <Tag ref={ref} className={className}>
        {text}
      </Tag>
    );
  }

  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <Word
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          >
            {word}
          </Word>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
