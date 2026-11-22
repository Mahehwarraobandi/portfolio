"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/data/resume";

function Role({ job }) {
  return (
    <div className="relative pb-24 pl-8 last:pb-0 sm:pl-14">
      {/* Timeline node */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="from-accent to-accent-2 absolute top-2 left-0 z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br shadow-[0_0_24px_var(--accent-1)]"
      >
        {job.current ? (
          <span className="bg-accent-2/60 absolute h-3.5 w-3.5 animate-ping rounded-full" />
        ) : null}
      </motion.span>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        {/* Role meta — sticks beside the bullets on wide screens. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal from="up">
            <span className="text-outline block text-[clamp(3rem,7vw,5.5rem)] leading-none font-semibold tracking-[-0.05em]">
              {job.start}
            </span>
            <h3 className="mt-4 text-[clamp(1.5rem,2.8vw,2.2rem)] leading-tight font-semibold tracking-[-0.03em]">
              {job.company}
            </h3>
            <p className="text-shimmer mt-2 text-lg font-medium">{job.role}</p>
            <div className="text-fg/45 mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase">
              <span>{job.period}</span>
              <span className="bg-fg/20 h-3 w-px" />
              <span>{job.location}</span>
              {job.current ? (
                <span className="border-accent/40 text-accent rounded-full border px-3 py-0.5 text-[10px]">
                  Current
                </span>
              ) : null}
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {job.stack.map((tech) => (
                <span
                  key={tech}
                  className="border-fg/10 text-fg/50 hover:border-accent/50 hover:text-accent rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.06em] transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <ul className="space-y-3">
          {job.bullets.map((bullet, index) => (
            <Reveal
              as="li"
              key={bullet.slice(0, 42)}
              delay={0.05 * index}
              className="group border-fg/10 bg-fg/[0.02] hover:border-accent/30 hover:bg-fg/[0.04] flex gap-4 rounded-2xl border p-5 transition-colors duration-300"
            >
              <span className="text-fg/25 group-hover:text-accent font-mono text-[11px] tracking-[0.1em] transition-colors duration-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-fg/65 group-hover:text-fg/85 text-[0.98rem] leading-relaxed transition-colors duration-300">
                {bullet}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * `showHeading` is false when the component sits on /experience, where the
 * page hero already states the title — rendering both would repeat it.
 */
export default function Experience({ showHeading = true }) {
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
      className={`relative mx-auto max-w-7xl scroll-mt-24 px-6 lg:px-10 ${
        showHeading ? "py-28 lg:py-36" : "pt-8 pb-28 lg:pb-36"
      }`}
    >
      {showHeading ? (
        <SectionHeading
          index="02"
          title="Experience"
          lead="Full stack engineering today, data science before it."
        />
      ) : null}

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
