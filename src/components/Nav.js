"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, profile } from "@/data/resume";

const ease = [0.22, 1, 0.36, 1];

/**
 * Floating glass navigation. On desktop the links sit in a capsule with a pill
 * that glides to the hovered or current page; on phones a full-screen sheet
 * opens with large staggered links.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  const highlighted =
    hovered ?? navLinks.find((link) => link.href === pathname)?.href;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 lg:px-10 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link
          href="/"
          aria-label={`${profile.name} — home`}
          className="group glass border-fg/10 text-fg flex h-11 items-center gap-2 rounded-full border px-4 font-mono text-sm tracking-[0.2em] uppercase"
        >
          MRB
          <span className="from-accent to-accent-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br transition-transform duration-500 group-hover:scale-150" />
        </Link>

        <ul
          onMouseLeave={() => setHovered(null)}
          className={`glass border-fg/10 hidden items-center gap-1 rounded-full border p-1.5 transition-shadow duration-500 md:flex ${
            scrolled ? "shadow-xl shadow-black/10" : ""
          }`}
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                {highlighted === link.href ? (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="bg-fg/[0.08] border-fg/10 absolute inset-0 rounded-full border"
                  />
                ) : null}
                <Link
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  aria-current={active ? "page" : undefined}
                  className={`relative z-10 block rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${
                    active ? "text-fg" : "text-fg/60 hover:text-fg"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="from-accent to-accent-2 absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gradient-to-br" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Routes through the sign-in gate, so every download is attributed
              to a named visitor. */}
          <Link
            href="/login?next=%2Fresume"
            className="from-accent to-accent-2 hidden rounded-full bg-gradient-to-r px-5 py-2.5 font-mono text-xs tracking-[0.14em] text-white uppercase shadow-[0_8px_30px_-8px_var(--accent-1)] transition-transform duration-300 hover:scale-[1.04] md:inline-block"
          >
            Résumé ↓
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="glass border-fg/10 relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="bg-fg block h-px w-5"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="bg-fg block h-px w-5"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.6, ease }}
            className="bg-bg fixed inset-0 z-50 flex flex-col justify-between px-6 pt-28 pb-10 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + 0.06 * index,
                    duration: 0.5,
                    ease,
                  }}
                  className="border-fg/10 border-b"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`flex items-baseline justify-between py-5 text-4xl font-semibold tracking-[-0.03em] ${
                      pathname === link.href ? "text-shimmer" : "text-fg/80"
                    }`}
                  >
                    {link.label}
                    <span className="text-fg/30 font-mono text-xs">
                      0{index + 1}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/login?next=%2Fresume"
                onClick={() => setOpen(false)}
                className="from-accent to-accent-2 block rounded-full bg-gradient-to-r py-4 text-center font-mono text-sm tracking-[0.14em] text-white uppercase"
              >
                Download résumé ↓
              </Link>
              <a
                href={`mailto:${profile.email}`}
                className="text-fg/50 mt-5 block text-center font-mono text-xs tracking-[0.14em]"
              >
                {profile.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
