"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Page transition. A template (unlike a layout) re-mounts on every
 * navigation, so each page fades and lifts into place as it arrives. The nav,
 * footer, and chat widget live in the layout and stay put.
 */
export default function SiteTemplate({ children }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
