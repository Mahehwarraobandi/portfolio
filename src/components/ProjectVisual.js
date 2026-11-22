"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Decorative "app window" previews for each project, drawn in code so they
 * recolour with the theme and need no screenshots. Purely illustrative —
 * screen readers skip them.
 */

const ease = [0.22, 1, 0.36, 1];

function Window({ title, children }) {
  return (
    <div className="border-fg/10 bg-bg/70 relative h-full overflow-hidden rounded-2xl border shadow-2xl shadow-black/20">
      <div className="border-fg/10 flex items-center gap-2 border-b px-4 py-3">
        <span className="bg-fg/15 h-2.5 w-2.5 rounded-full" />
        <span className="bg-fg/15 h-2.5 w-2.5 rounded-full" />
        <span className="bg-fg/15 h-2.5 w-2.5 rounded-full" />
        <span className="text-fg/35 ml-3 truncate font-mono text-[10px] tracking-[0.12em]">
          {title}
        </span>
      </div>
      <div className="relative p-5">{children}</div>
    </div>
  );
}

/**
 * Help-desk RAG: a support question answered from docs with a cited source,
 * then routed. Illustrative example content, not real data.
 */
function HelpDeskPreview({ reduced }) {
  const steps = [
    {
      key: "question",
      node: (
        <div className="flex justify-end">
          <span className="text-bg bg-fg max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed">
            How do I reset my VPN token?
          </span>
        </div>
      ),
    },
    {
      key: "answer",
      node: (
        <div className="bg-fg/[0.06] text-fg/75 max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed">
          Open the self-service portal, go to Security, and choose Reset token.{" "}
          <span className="text-accent font-mono">[1]</span>
          <span className="border-fg/10 text-fg/45 mt-2 block border-t pt-2 font-mono text-[10px]">
            [1] IT handbook · Remote access
          </span>
        </div>
      ),
    },
    {
      key: "route",
      node: (
        <div className="flex flex-wrap gap-2">
          {["Category: Access", "Routed: IT queue"].map((tag) => (
            <span
              key={tag}
              className="border-fg/15 text-fg/60 rounded-full border px-2.5 py-1 font-mono text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
  ];
  return (
    <Window title="help-desk — answer with sources">
      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.key}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.6 }}
          >
            {step.node}
          </motion.div>
        ))}
      </div>
    </Window>
  );
}

/** Career Navigator: résumé-to-job match scores filling in. */
function MatchPreview({ reduced }) {
  const jobs = [
    { role: "Full Stack Engineer", score: 92 },
    { role: "AI Engineer", score: 86 },
    { role: "Backend Engineer", score: 74 },
    { role: "Data Analyst", score: 58 },
  ];
  return (
    <Window title="career-navigator — matches">
      <div className="text-fg/40 mb-4 font-mono text-[10px] tracking-[0.16em] uppercase">
        résumé ↔ listings · vector search
      </div>
      <div className="space-y-4">
        {jobs.map((job, i) => (
          <div key={job.role}>
            <div className="text-fg/70 mb-1.5 flex justify-between text-xs">
              <span>{job.role}</span>
              <span className="text-fg/45 font-mono">{job.score}%</span>
            </div>
            <div className="bg-fg/[0.07] h-1.5 overflow-hidden rounded-full">
              <motion.div
                initial={reduced ? false : { width: 0 }}
                whileInView={{ width: `${job.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease, delay: 0.2 + i * 0.15 }}
                style={reduced ? { width: `${job.score}%` } : undefined}
                className="bg-accent h-full rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
}

/** Skill prediction: precision / F1 bars growing from the baseline. */
function MetricsPreview({ reduced }) {
  const bars = [
    { label: "Precision", value: 87 },
    { label: "F1", value: 84 },
  ];
  return (
    <Window title="skill-prediction — evaluation">
      <div className="flex h-44 items-end justify-around gap-6 px-4">
        {bars.map((bar, i) => (
          <div key={bar.label} className="flex h-full flex-1 flex-col">
            <div className="relative flex flex-1 items-end">
              <motion.div
                initial={reduced ? false : { height: 0 }}
                whileInView={{ height: `${bar.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease, delay: 0.25 + i * 0.2 }}
                style={reduced ? { height: `${bar.value}%` } : undefined}
                className="bg-accent relative w-full rounded-t-xl"
              >
                <span className="text-fg/80 absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-xs">
                  {bar.value}%
                </span>
              </motion.div>
            </div>
            <span className="text-fg/45 mt-3 text-center font-mono text-[10px] tracking-[0.16em] uppercase">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </Window>
  );
}

const PREVIEWS = [HelpDeskPreview, MatchPreview, MetricsPreview];

export default function ProjectVisual({ index }) {
  const reduced = useReducedMotion();
  const Preview = PREVIEWS[index % PREVIEWS.length];
  return (
    <div aria-hidden="true" className="relative h-full">
      <div className="relative h-full">
        <Preview reduced={reduced} />
      </div>
    </div>
  );
}
