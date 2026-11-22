"use client";

import { motion } from "motion/react";
import Reveal from "@/components/Reveal";

const ease = [0.22, 1, 0.36, 1];

/**
 * The masthead every sub-page opens with. Keeps /about, /experience,
 * /projects, /skills, and /contact visually consistent with the home hero
 * without repeating its full-height treatment.
 */
export default function PageHero({ eyebrow, title, lead }) {
  const words = title.split(" ");

  return (
    // `id="top"` gives the footer's "back to top" link a target on every
    // sub-page, the way the home hero does.
    <section
      id="top"
      className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20"
    >
      <div className="grid-lines mask-radial pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal from="left">
          <span className="glass border-fg/12 text-fg/55 inline-block rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.24em] uppercase">
            {eyebrow}
          </span>
        </Reveal>

        <h1 className="mt-7 text-[clamp(2.6rem,8vw,6rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom"
            >
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.1 + index * 0.08 }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease, delay: 0.35 }}
          className="bg-accent mt-8 h-px w-40 origin-left"
        />

        {lead ? (
          <Reveal delay={0.3}>
            <p className="text-balance-tight text-fg/60 mt-8 max-w-3xl text-base leading-relaxed sm:text-lg">
              {lead}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
