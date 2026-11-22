"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/resume";

const DESKTOP = "(min-width: 1024px)";

/** True on wide screens, where the cards stack; phones get a plain list. */
function useIsDesktop() {
  return useSyncExternalStore(
    (callback) => {
      const query = window.matchMedia(DESKTOP);
      query.addEventListener("change", callback);
      return () => query.removeEventListener("change", callback);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}

function ProjectCard({ project, index, total, progress, stacking }) {
  // Earlier cards shrink slightly as later ones slide over them.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    // The sticky wrapper must be a direct child of the tall container, or it
    // has no room to stick within.
    <div
      className="lg:sticky"
      style={stacking ? { top: `calc(7rem + ${index * 28}px)` } : undefined}
    >
      <Reveal from="up">
        <motion.article
          style={stacking ? { scale } : undefined}
          className="border-fg/10 bg-elevated relative origin-top overflow-hidden rounded-[2rem] border shadow-2xl shadow-black/10"
        >
          <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:p-12">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-fg/30 font-mono text-xs tracking-[0.24em]">
                  {project.index}
                </span>
                <span className="border-fg/15 text-fg/55 rounded-full border px-3 py-0.5 font-mono text-[10px] tracking-[0.16em] uppercase">
                  {project.org} · {project.period}
                </span>
              </div>

              <h3 className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-semibold tracking-[-0.035em]">
                {project.title}
              </h3>
              <p className="text-fg/60 mt-4 leading-relaxed">
                {project.description}
              </p>

              <div className="border-fg/10 mt-8 border-t pt-6">
                <span className="text-fg/35 block font-mono text-[10px] tracking-[0.2em] uppercase">
                  {project.metricLabel}
                </span>
                <span className="text-accent mt-1 block text-xl font-semibold tracking-[-0.02em]">
                  {project.metric}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-fg/10 text-fg/55 hover:border-accent/40 hover:text-accent rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="min-h-[16rem] lg:min-h-0">
              <ProjectVisual index={index} />
            </div>
          </div>
        </motion.article>
      </Reveal>
    </div>
  );
}

/**
 * Projects as a stack of cards that pile up as you scroll (desktop), each
 * with a live-drawn preview. `showHeading` is false on /projects, where the
 * page hero already states the title.
 */
export default function Projects({ showHeading = true }) {
  const containerRef = useRef(null);
  const stacking = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      className={`relative mx-auto max-w-7xl scroll-mt-24 px-6 lg:px-10 ${
        showHeading ? "py-28 lg:py-36" : "pt-8 pb-28 lg:pb-36"
      }`}
    >
      {showHeading ? (
        <SectionHeading
          index="04"
          title="Selected Projects"
          lead="Things I've built end to end — and one I'm building now."
        />
      ) : null}

      <div ref={containerRef} className="relative space-y-8 lg:space-y-[16vh]">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
            stacking={stacking}
          />
        ))}
      </div>
    </section>
  );
}
