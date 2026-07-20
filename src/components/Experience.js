"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/data/resume";

function Role({ job }) {
  return (
    <div className="relative pb-20 pl-8 last:pb-0 sm:pl-14">
      {/* Timeline node */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="from-accent to-accent-2 absolute top-2 left-0 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br"
      >
        {job.current ? (
          <span className="bg-accent-2/60 absolute h-3 w-3 animate-ping rounded-full" />
        ) : null}
      </motion.span>

      <Reveal from="up">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="text-[clamp(1.35rem,2.8vw,2.1rem)] font-semibold tracking-[-0.03em]">
            {job.company}
          </h3>
          <span className="text-fg/40 font-mono text-xs tracking-[0.16em] uppercase">
            {job.period}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="text-fg/70 text-base">{job.role}</span>
          <span className="bg-fg/20 h-3 w-px" />
          <span className="text-fg/35 font-mono text-xs tracking-[0.12em] uppercase">
            {job.location}
          </span>
          {job.current ? (
            <span className="border-fg/25 text-fg/70 rounded-full border px-3 py-0.5 font-mono text-[10px] tracking-[0.16em] uppercase">
              Current
            </span>
          ) : null}
        </div>
      </Reveal>

      <ul className="mt-7 space-y-4">
        {job.bullets.map((bullet, index) => (
          <Reveal
            as="li"
            key={bullet.slice(0, 42)}
            delay={0.05 * index}
            className="group text-fg/55 hover:text-fg/80 flex gap-4 text-[0.98rem] leading-relaxed transition-colors duration-300"
          >
            <span className="bg-fg/25 group-hover:from-accent group-hover:to-accent-2 mt-2.5 h-px w-4 shrink-0 transition-all duration-300 group-hover:w-7 group-hover:bg-gradient-to-r" />
            <span>{bullet}</span>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.1} className="mt-7 flex flex-wrap gap-2">
        {job.stack.map((tech) => (
          <span
            key={tech}
            className="border-fg/10 text-fg/45 hover:border-accent/50 hover:text-accent rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </Reveal>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 85%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
    >
      <SectionHeading
        index="02"
        title="Experience"
        lead="Five years shipping ML and GenAI across finance, logistics, pharma, and insurance."
      />

      <div ref={containerRef} className="relative ml-1 sm:ml-3">
        {/* Track + progress line */}
        <div className="bg-fg/10 absolute inset-y-0 left-0 w-px" />
        <motion.div
          style={{ scaleY, opacity }}
          className="from-accent via-accent-2 to-accent-3 absolute inset-y-0 left-0 w-px origin-top bg-gradient-to-b"
        />
        {experience.map((job) => (
          <Role key={job.company} job={job} />
        ))}
      </div>
    </section>
  );
}
