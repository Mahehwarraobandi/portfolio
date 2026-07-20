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
import { navLinks } from "@/data/resume";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-fg/10 bg-bg/70 border-b backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link
          href="/"
          className="group text-fg font-mono text-sm tracking-[0.2em] uppercase"
        >
          MRB
          <span className="from-accent to-accent-2 ml-1 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br align-middle transition-transform duration-500 group-hover:scale-150" />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative font-mono text-xs tracking-[0.14em] uppercase transition-colors ${
                    active ? "text-fg" : "text-fg/60 hover:text-fg"
                  }`}
                >
                  {link.label}
                  <span
                    className={`from-accent to-accent-2 absolute -bottom-1 left-0 h-px bg-gradient-to-r transition-all duration-400 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Sits beside Contact and routes through the sign-in gate, so every
              download is attributed to a named visitor. */}
          <Link
            href="/login?next=%2Fresume"
            className="from-accent to-accent-2 hidden rounded-full bg-gradient-to-r px-5 py-2 font-mono text-xs tracking-[0.14em] text-white uppercase transition-transform duration-300 hover:scale-[1.04] md:inline-block"
          >
            Résumé ↓
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="bg-fg block h-px w-6"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="bg-fg block h-px w-6"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="border-fg/10 bg-bg/95 overflow-hidden border-t backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * index, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`border-fg/5 block border-b py-4 font-mono text-sm tracking-[0.14em] uppercase ${
                      pathname === link.href ? "text-accent" : "text-fg/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * navLinks.length, duration: 0.4 }}
              >
                <Link
                  href="/login?next=%2Fresume"
                  onClick={() => setOpen(false)}
                  className="text-accent block py-4 font-mono text-sm tracking-[0.14em] uppercase"
                >
                  Download résumé ↓
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
