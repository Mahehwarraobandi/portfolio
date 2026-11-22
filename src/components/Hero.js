"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Ambient from "@/components/Ambient";
import { OPEN_CHAT_EVENT } from "@/components/ChatWidget";
import Counter from "@/components/Counter";
import Magnetic from "@/components/Magnetic";
import ScrambleText from "@/components/ScrambleText";
import { profile, stats } from "@/data/resume";

const ease = [0.22, 1, 0.36, 1];

// Tech the portrait is "orbited" by — all from the résumé's skills.
const ORBIT = [
  { label: "Next.js", className: "left-[-6%] top-[18%]", delay: 0 },
  { label: "FastAPI", className: "right-[-8%] top-[10%]", delay: 1.2 },
  { label: "RAG", className: "right-[-4%] bottom-[22%]", delay: 0.6 },
  { label: "Gemini", className: "left-[-2%] bottom-[12%]", delay: 1.8 },
  { label: "PostgreSQL", className: "left-[34%] bottom-[-5%]", delay: 2.4 },
];

function AnimatedWord({ word, delay }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        initial={{ y: "110%", rotate: 4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1, ease, delay }}
        className="inline-block origin-bottom-left"
      >
        {word}
      </motion.span>
    </span>
  );
}

/** Portrait that tilts in 3D toward the pointer, with orbiting tech chips. */
function TiltPortrait() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18 });
  const sy = useSpring(py, { stiffness: 140, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["30%", "70%"]);

  function onPointerMove(event) {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    px.set((event.clientX - bounds.left) / bounds.width - 0.5);
    py.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      initial={{ opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease, delay: 0.45 }}
      className="relative mx-auto aspect-square w-[min(78vw,27rem)] [perspective:1100px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <div className="animate-spin-slow border-fg/15 absolute inset-0 rounded-full border border-dashed" />
        <div className="animate-spin-slower border-accent/25 absolute inset-[4%] rounded-full border border-dotted" />
        <div className="border-fg/10 absolute inset-[8%] rounded-full border" />
        <motion.div
          animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-8%] rounded-full bg-[conic-gradient(from_0deg,var(--wash-1),var(--wash-2),var(--wash-3),var(--wash-1))] blur-2xl"
        />
        <div
          className="ring-fg/20 absolute inset-[14%] overflow-hidden rounded-full ring-1"
          style={{ transform: "translateZ(40px)" }}
        >
          <Image
            src="/portrait.jpg"
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes="(max-width: 1024px) 78vw, 27rem"
            className="scale-105 object-cover grayscale transition-all duration-700 hover:scale-110 hover:grayscale-0"
          />
          {/* Specular highlight that tracks the tilt. */}
          <motion.div
            aria-hidden="true"
            style={{ left: glowX, top: glowY }}
            className="pointer-events-none absolute h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 blur-2xl"
          />
        </div>

        {ORBIT.map((chip) => (
          <span
            key={chip.label}
            className={`absolute ${chip.className}`}
            style={{ transform: "translateZ(70px)" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 1 + chip.delay * 0.25 }}
              className="block"
            >
              <span
                className="glass border-fg/15 text-fg/75 animate-float block rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap shadow-lg shadow-black/10"
                style={{ animationDelay: `${chip.delay}s` }}
              >
                <span className="from-accent to-accent-2 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br align-middle" />
                {chip.label}
              </span>
            </motion.span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const words = profile.name.split(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pt-32 pb-20"
    >
      <Ambient variant="top" />
      <div className="grid-lines mask-radial pointer-events-none absolute inset-0 opacity-80" />
      {/* Slow aurora behind everything. */}
      <div
        aria-hidden="true"
        className="animate-aurora pointer-events-none absolute top-[-30%] left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full bg-[conic-gradient(from_90deg,var(--wash-2),transparent_30%,var(--wash-1),transparent_70%,var(--wash-3))] opacity-60 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.3fr_1fr] lg:px-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="glass border-fg/12 mb-8 inline-flex items-center gap-3 rounded-full border px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="bg-accent-2/70 absolute inline-flex h-full w-full animate-ping rounded-full" />
              <span className="from-accent to-accent-2 relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br" />
            </span>
            <span className="text-fg/65 font-mono text-[11px] tracking-[0.2em] uppercase">
              Open to full stack AI roles — {profile.location}
            </span>
          </motion.div>

          <h1 className="text-gradient text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.92] font-semibold tracking-[-0.045em]">
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
            className="flex flex-wrap items-baseline gap-x-3 text-[clamp(1.15rem,2.4vw,1.75rem)] font-light"
          >
            <span className="text-fg/40 font-mono text-sm">&gt;_</span>
            <ScrambleText
              words={profile.roles}
              className="text-shimmer font-mono font-medium tracking-[-0.02em] whitespace-nowrap"
            />
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
            <Magnetic>
              <Link
                href="/projects"
                className="group from-accent to-accent-2 relative block overflow-hidden rounded-full bg-gradient-to-r px-7 py-3.5 font-mono text-xs tracking-[0.16em] text-white uppercase shadow-[0_10px_40px_-10px_var(--accent-1)]"
              >
                <span className="from-accent-2 to-accent-3 absolute inset-0 -translate-x-full bg-gradient-to-r transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10">View my work</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT))
                }
                className="group border-spin glass text-fg block rounded-full px-7 py-3.5 font-mono text-xs tracking-[0.16em] uppercase"
              >
                Ask my AI
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </Magnetic>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="border-fg/10 mt-12 grid max-w-xl grid-cols-3 gap-6 border-t pt-8"
          >
            {stats.slice(1).map((stat) => (
              // Label first in the DOM (valid <dl>), value shown on top.
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-fg/40 mt-2 font-mono text-[10px] leading-relaxed tracking-[0.14em] uppercase">
                  {stat.label}
                </dt>
                <dd className="text-gradient text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <TiltPortrait />
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
        <span className="border-fg/25 flex h-9 w-5 justify-center rounded-full border pt-1.5">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="bg-accent block h-1.5 w-1 rounded-full"
          />
        </span>
      </motion.div>
    </section>
  );
}
