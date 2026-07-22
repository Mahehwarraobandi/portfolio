"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/resume";

const ease = [0.22, 1, 0.36, 1];

const BOT_NAME = "Bandi Bot";

// How long the panel waits before popping itself open on a fresh visit.
const AUTO_OPEN_DELAY_MS = 1000;
// Once the visitor has seen the panel this session, don't auto-open it again.
const SEEN_KEY = "bandibot-seen";

const SUGGESTIONS = [
  "What are you working on right now?",
  "What's your experience with RAG?",
  "Tell me about your GenAI projects",
];

const GREETING = `Hey — I'm ${profile.firstName} 👋 (well, an AI version of me, answering as myself). Before we dive in, what's your name, and which company are you with? Then ask me anything about my experience, projects, or background.`;

/** Friendly robot mark for the launcher and header — inline SVG, no licensing,
 *  themes with the surrounding text via currentColor. */
function BotIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5V5" />
      <circle cx="12" cy="1.8" r="1" fill="currentColor" stroke="none" />
      <rect x="4" y="6" width="16" height="12" rx="3.5" />
      <path d="M2.5 11v2M21.5 11v2" />
      <circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <path d="M9.5 15h5" />
    </svg>
  );
}

/** Close (×) mark, matching the line style of the bot icon. */
function CloseIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function Bubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "from-accent to-accent-2 bg-gradient-to-br text-white"
            : "bg-fg/[0.05] text-fg/80"
        }`}
      >
        {text || (
          <span className="text-fg/40 inline-flex gap-1">
            <span className="animate-bounce">·</span>
            <span className="animate-bounce [animation-delay:0.15s]">·</span>
            <span className="animate-bounce [animation-delay:0.3s]">·</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [messages, reduced]);

  // Pop the panel open shortly after the first visit so visitors notice they
  // can chat with me. Only once per session — sessionStorage remembers that
  // they've seen it, so it won't reopen as they move between pages or after
  // they close it. (The layout persists across route changes, so this effect
  // runs a single time per browser session.)
  useEffect(() => {
    if (typeof window === "undefined") return;
    let seen;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY);
    } catch {
      seen = null; // Private mode / storage blocked — just skip auto-open.
    }
    if (seen) return;
    const timer = setTimeout(() => setOpen(true), AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Remember that the panel has been shown, so we don't auto-open it again.
  useEffect(() => {
    if (!open) return;
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage blocked — non-fatal */
    }
  }, [open]);

  async function send(text) {
    const question = text.trim();
    if (!question || busy) return;

    // The history the API should see — prior turns only, before this question.
    const history = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      text: m.text,
    }));

    setInput("");
    setBusy(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "assistant", text: "" },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });

      if (!res.ok || !res.body) {
        const info = await res.json().catch(() => ({}));
        throw new Error(info.error || "Request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            text: next[next.length - 1].text + chunk,
          };
          return next;
        });
      }
    } catch (error) {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          text: `Sorry — something went wrong. You can reach ${profile.firstName} at ${profile.email}.`,
        };
        return next;
      });
      console.error(error);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    send(input);
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={
          open ? `Close ${BOT_NAME}` : `Chat with ${profile.firstName}`
        }
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="from-accent to-accent-2 fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg shadow-black/20"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {open ? <CloseIcon /> : <BotIcon />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease }}
            role="dialog"
            aria-label={BOT_NAME}
            className="border-fg/10 bg-bg/95 fixed right-5 bottom-24 z-50 flex h-[min(32rem,70vh)] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="border-fg/10 flex items-center gap-3 border-b px-5 py-4">
              <span className="from-accent to-accent-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-white">
                <BotIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-[-0.01em]">
                  {BOT_NAME}
                </p>
                <p className="text-fg/40 font-mono text-[10px] tracking-[0.14em] uppercase">
                  {profile.firstName}, in my own words
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-5 py-4"
            >
              <Bubble role="assistant" text={GREETING} />
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} text={m.text} />
              ))}

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="border-fg/15 text-fg/60 hover:border-accent/50 hover:text-accent rounded-full border px-3 py-1.5 text-left text-xs transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={onSubmit}
              className="border-fg/10 flex items-center gap-2 border-t p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Ask a question…"
                aria-label="Your question"
                className="bg-fg/[0.04] text-fg placeholder:text-fg/30 focus:border-accent/60 min-w-0 flex-1 rounded-full border border-transparent px-4 py-2.5 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="from-accent to-accent-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              >
                {busy ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  "↑"
                )}
              </button>
            </form>

            <p className="text-fg/30 px-5 pb-3 text-center text-[10px]">
              AI can be wrong — verify anything important with{" "}
              {profile.firstName}.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
