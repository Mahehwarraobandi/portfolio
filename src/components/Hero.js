"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Ambient from "@/components/Ambient";
import { profile } from "@/data/resume";

const ease = [0.22, 1, 0.36, 1];

function AnimatedWord({ word, delay }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease, delay }}
        className="inline-block"
      >
        {word}
      </motion.span>
    </span>
  );
}

function RoleRotator() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(
      () => setIndex((value) => (value + 1) % profile.roles.length),
      3200,
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    // min-width must clear the longest role ("Machine Learning Engineer");
    // the parent's overflow-hidden masks the vertical slide, and would clip
    // any role wider than this box.
    <span className="relative inline-flex h-[1.4em] min-w-[28ch] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="from-accent to-accent-2 absolute inset-0 bg-gradient-to-r bg-clip-text whitespace-nowrap text-transparent"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const words = profile.name.split(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16"
    >
      <Ambient variant="top" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.35fr_1fr] lg:px-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="border-fg/12 bg-fg/[0.03] mb-8 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="bg-accent-2/70 absolute inline-flex h-full w-full animate-ping rounded-full" />
              <span className="from-accent to-accent-2 relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br" />
            </span>
            <span className="text-fg/60 font-mono text-[11px] tracking-[0.2em] uppercase">
              Available for AI / ML roles — {profile.location}
            </span>
          </motion.div>

          <h1 className="text-gradient text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
            {words.map((word, index) => (
              <span key={word} className="mr-[0.22em] inline-block">
                <AnimatedWord word={word} delay={0.25 + index * 0.09} />
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.7 }}
            className="rule-gradient my-8 h-px origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.8 }}
            className="text-[clamp(1.05rem,2.2vw,1.6rem)] font-light"
          >
            <RoleRotator />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.9 }}
            className="text-balance-tight text-fg/60 mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/experience"
              className="group from-accent to-accent-2 relative overflow-hidden rounded-full bg-gradient-to-r px-7 py-3.5 font-mono text-xs tracking-[0.16em] text-white uppercase transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="from-accent-2 to-accent-3 absolute inset-0 -translate-x-full bg-gradient-to-r transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10">View my work</span>
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="group border-fg/20 text-fg hover:border-accent/60 hover:text-accent rounded-full border px-7 py-3.5 font-mono text-xs tracking-[0.16em] uppercase transition-colors duration-300"
            >
              Contact
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Circular portrait with orbiting rings. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.45 }}
          className="relative mx-auto aspect-square w-[min(78vw,26rem)]"
        >
          <div className="animate-spin-slow border-fg/15 absolute inset-0 rounded-full border border-dashed" />
          <div className="border-fg/10 absolute inset-[7%] rounded-full border" />
          <motion.div
            animate={{ opacity: [0.35, 0.8, 0.35], scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-8%] rounded-full bg-[conic-gradient(from_0deg,var(--wash-1),var(--wash-2),var(--wash-3),var(--wash-1))] blur-2xl"
          />
          <div className="ring-fg/20 absolute inset-[14%] overflow-hidden rounded-full ring-1">
            <Image
              src="/portrait.jpg"
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 78vw, 26rem"
              className="scale-105 object-cover grayscale transition-all duration-700 hover:scale-110 hover:grayscale-0"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-fg/40 font-mono text-[10px] tracking-[0.28em] uppercase">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 9, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="from-accent block h-8 w-px bg-gradient-to-b to-transparent"
        />
      </motion.div>
    </section>
  );
}
