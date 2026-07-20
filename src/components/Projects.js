"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Ambient from "@/components/Ambient";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/resume";

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const background = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, var(--wash-1), var(--wash-2) 45%, transparent 72%)`;

  const onMouseMove = (event) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  return (
    <Reveal delay={0.1 * index} from="up">
      <motion.article
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="group border-fg/10 bg-fg/[0.02] relative h-full overflow-hidden rounded-3xl border p-8 sm:p-10"
      >
        <motion.div
          aria-hidden="true"
          style={{ background }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0"
        />
        <div className="ring-fg/0 group-hover:ring-accent/40 pointer-events-none absolute inset-0 rounded-3xl ring-1 transition-all duration-500" />

        <div className="relative">
          <div className="flex items-start justify-between gap-6">
            <span className="text-fg/30 font-mono text-xs tracking-[0.24em]">
              {project.index}
            </span>
            <span className="text-right">
              <span className="text-fg/35 block font-mono text-[10px] tracking-[0.2em] uppercase">
                {project.metricLabel}
              </span>
              <span className="from-accent to-accent-2 mt-1 block bg-gradient-to-r bg-clip-text font-mono text-sm text-transparent">
                {project.metric}
              </span>
            </span>
          </div>

          <h3 className="mt-8 text-[clamp(1.4rem,2.6vw,2rem)] leading-tight font-semibold tracking-[-0.03em]">
            {project.title}
          </h3>
          <p className="text-fg/55 mt-4 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border-fg/10 text-fg/45 group-hover:border-accent/30 group-hover:text-fg/75 rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
    >
      <Ambient variant="top" />
      <SectionHeading
        index="03"
        title="Selected Projects"
        lead="Agentic systems and fine-tuned models built end to end."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
