"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_+=*#";
const HOLD_MS = 3200;
const FRAMES_PER_CHAR = 2;

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/**
 * Cycles through `words`, "decoding" each one from random glyphs into place,
 * left to right. Reduced-motion users just see the first word.
 */
export default function ScrambleText({ words, className = "" }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(words[0]);

  // Advance to the next word on a timer.
  useEffect(() => {
    if (reduced || words.length < 2) return undefined;
    const id = setInterval(
      () => setIndex((value) => (value + 1) % words.length),
      HOLD_MS,
    );
    return () => clearInterval(id);
  }, [reduced, words.length]);

  // Decode the current word. State only changes inside animation frames.
  useEffect(() => {
    if (reduced) return undefined;
    const target = words[index];
    let frame = 0;
    let raf = 0;

    const tick = () => {
      const revealed = Math.floor(frame / FRAMES_PER_CHAR);
      const next = target
        .split("")
        .map((char, i) => (i < revealed || char === " " ? char : randomGlyph()))
        .join("");
      setDisplay(next);
      frame += 1;
      if (revealed <= target.length) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, reduced, words]);

  return (
    <span className={className} aria-label={words[reduced ? 0 : index]}>
      <span aria-hidden="true">{reduced ? words[0] : display}</span>
    </span>
  );
}
