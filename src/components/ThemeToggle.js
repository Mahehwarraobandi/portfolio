"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";

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
  // Applied synchronously so a view transition captures the new palette.
  document.documentElement.setAttribute("data-theme", next);
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable; the theme still applies for this session.
  }
  listeners.forEach((listener) => listener());
}

/**
 * Switches theme with a circle that grows out of the toggle and floods the
 * page in the new palette (View Transitions API). Browsers without it, and
 * reduced-motion users, get an instant switch.
 */
function switchTheme(next, origin) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduced || !origin) {
    setTheme(next);
    return;
  }

  const { left, top, width, height } = origin.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  // Colour transitions would otherwise fade the new snapshot in slowly behind
  // the circle; switch them off for the duration of the reveal.
  const root = document.documentElement;
  root.setAttribute("data-theme-switching", "");
  const transition = document.startViewTransition(() => setTheme(next));
  transition.finished.finally(() =>
    root.removeAttribute("data-theme-switching"),
  );
  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      // A skipped transition still applied the theme; nothing to undo.
    });
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";
  const buttonRef = useRef(null);

  // Mirrors the resolved theme onto <html> on first load for the CSS token
  // blocks to read. DOM-sync only — no state is set here.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => switchTheme(isDark ? "light" : "dark", buttonRef.current)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group border-fg/15 bg-fg/[0.04] hover:border-fg/35 relative flex h-9 w-16 shrink-0 items-center rounded-full border p-1 transition-colors duration-300"
    >
      <motion.span
        animate={{ x: isDark ? 0 : 28 }}
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
        className="text-bg bg-fg flex h-7 w-7 items-center justify-center overflow-hidden rounded-full"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
