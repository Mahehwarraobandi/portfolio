"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion } from "motion/react";

const STORAGE_KEY = "portfolio-theme";

/**
 * Tiny external store for the active theme.
 *
 * useSyncExternalStore (rather than state + effect) keeps hydration clean:
 * the server snapshot is always "dark", and the client resolves the real
 * value on its first client render without a cascading re-render.
 */
let current = null;
const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  if (current === null) {
    let stored = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage can be unavailable (private mode) — fall back to the OS.
    }
    current =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
  }
  return current;
}

function getServerSnapshot() {
  return "dark";
}

function setTheme(next) {
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable; the theme still applies for this session.
  }
  listeners.forEach((listener) => listener());
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  // Mirrors the resolved theme onto <html> for the CSS token blocks to read.
  // DOM-sync only — no state is set here.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group border-fg/15 bg-fg/[0.04] hover:border-fg/35 relative flex h-9 w-16 shrink-0 items-center rounded-full border p-1 transition-colors duration-300"
    >
      <motion.span
        animate={{ x: isDark ? 0 : 28 }}
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
        className="from-accent to-accent-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br text-[11px] text-white"
      >
        {isDark ? "☾" : "☀"}
      </motion.span>
    </button>
  );
}
