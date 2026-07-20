"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { unlock } from "@/app/visitors/actions";

const initialState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="from-accent to-accent-2 w-full rounded-full bg-gradient-to-r px-6 py-3.5 font-mono text-xs tracking-[0.16em] text-white uppercase transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
    >
      {pending ? "Checking…" : "Unlock"}
    </button>
  );
}

export default function UnlockForm() {
  const [state, formAction] = useActionState(unlock, initialState);

  return (
    <form action={formAction} className="w-full max-w-sm space-y-4">
      <div>
        <label
          htmlFor="key"
          className="text-fg/50 mb-2 block font-mono text-[10px] tracking-[0.2em] uppercase"
        >
          Admin key
        </label>
        <input
          id="key"
          name="key"
          type="password"
          required
          autoComplete="off"
          className="bg-fg/[0.03] border-fg/12 text-fg focus:border-accent/70 focus:ring-accent/20 w-full rounded-xl border px-4 py-3.5 text-sm transition outline-none focus:ring-4"
        />
      </div>

      {state.status === "error" ? (
        <p role="alert" className="text-accent-3 text-xs">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
