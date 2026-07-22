"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/resume";

const ease = [0.22, 1, 0.36, 1];

const SUGGESTIONS = [
  "What's his experience with RAG?",
  "Where does he work now?",
  "Summarize his GenAI projects",
];

const GREETING = `Hi! I'm ${profile.firstName}'s assistant. Ask me anything about his experience, projects, or skills.`;

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
        aria-label={open ? "Close assistant" : "Ask about Maheshwar"}
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
            className="text-xl"
          >
            {open ? "✕" : "💬"}
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
            aria-label="Portfolio assistant"
            className="border-fg/10 bg-bg/95 fixed right-5 bottom-24 z-50 flex h-[min(32rem,70vh)] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="border-fg/10 flex items-center gap-3 border-b px-5 py-4">
              <span className="from-accent to-accent-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-sm text-white">
                AI
              </span>
              <div>
                <p className="text-sm font-semibold tracking-[-0.01em]">
                  Ask about {profile.firstName}
                </p>
                <p className="text-fg/40 font-mono text-[10px] tracking-[0.14em] uppercase">
                  Portfolio assistant
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
