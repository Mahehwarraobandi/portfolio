"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The decorative AI panel beside the sign-in form.
 *
 * Drawn as inline SVG rather than a bitmap on purpose: the site's CSP allows
 * `img-src 'self'` only, so no external illustration could load, and vector
 * art recolours itself from the theme tokens in both light and dark mode.
 *
 * A four-layer feed-forward network — the shape a recruiter reading "AI
 * engineer" expects to see — with a signal pulsing along the edges.
 */

// Node positions per layer, in the 0–100 viewBox space.
const LAYERS = [
  [22, 50, 78],
  [14, 38, 62, 86],
  [14, 38, 62, 86],
  [34, 66],
];

const COLUMN_X = [12, 38, 64, 90];

function buildEdges() {
  const edges = [];
  for (let layer = 0; layer < LAYERS.length - 1; layer += 1) {
    LAYERS[layer].forEach((fromY) => {
      LAYERS[layer + 1].forEach((toY) => {
        edges.push({
          x1: COLUMN_X[layer],
          y1: fromY,
          x2: COLUMN_X[layer + 1],
          y2: toY,
          layer,
        });
      });
    });
  }
  return edges;
}

const EDGES = buildEdges();

export default function NeuralArt() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="na-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent-1)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="na-node">
          <stop offset="0%" stopColor="var(--accent-2)" />
          <stop offset="100%" stopColor="var(--accent-1)" />
        </radialGradient>
        <filter id="na-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Synapses. Each fades in once, then the whole layer breathes. */}
      <g stroke="url(#na-edge)" strokeWidth="0.18">
        {EDGES.map((edge, index) => (
          <motion.line
            key={`${edge.x1}-${edge.y1}-${edge.x2}-${edge.y2}`}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            initial={
              reduced ? { opacity: 0.35 } : { pathLength: 0, opacity: 0 }
            }
            animate={
              reduced
                ? { opacity: 0.35 }
                : { pathLength: 1, opacity: [0.18, 0.5, 0.18] }
            }
            transition={
              reduced
                ? { duration: 0 }
                : {
                    pathLength: {
                      duration: 1.1,
                      delay: 0.3 + edge.layer * 0.25 + index * 0.006,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.05,
                    },
                  }
            }
          />
        ))}
      </g>

      {/* Neurons. */}
      {LAYERS.map((column, layerIndex) =>
        column.map((y, nodeIndex) => (
          <motion.circle
            key={`${layerIndex}-${y}`}
            cx={COLUMN_X[layerIndex]}
            cy={y}
            r="1.9"
            fill="url(#na-node)"
            filter="url(#na-glow)"
            initial={reduced ? { opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={
              reduced ? { opacity: 1 } : { scale: [1, 1.22, 1], opacity: 1 }
            }
            transition={
              reduced
                ? { duration: 0 }
                : {
                    scale: {
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: layerIndex * 0.3 + nodeIndex * 0.16,
                    },
                    opacity: {
                      duration: 0.6,
                      delay: layerIndex * 0.18 + nodeIndex * 0.06,
                    },
                  }
            }
          />
        )),
      )}
    </svg>
  );
}
