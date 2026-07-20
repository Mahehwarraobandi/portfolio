"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "motion/react";
import { signIn } from "@/app/login/actions";

const ease = [0.22, 1, 0.36, 1];

const initialState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};

const FIELDS = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    placeholder: "Jane Doe",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "jane@company.com",
    autoComplete: "email",
    hint: "Work or personal — Gmail, Outlook, Yahoo, anything.",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Acme Inc.",
    autoComplete: "organization",
  },
];

function Field({ field, defaultValue, error }) {
  const errorId = `${field.name}-error`;
  const hintId = `${field.name}-hint`;

  return (
    <div>
      <label
        htmlFor={field.name}
        className="text-fg/50 mb-2 block font-mono text-[10px] tracking-[0.2em] uppercase"
      >
        {field.label}
      </label>
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        required
        defaultValue={defaultValue}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : field.hint ? hintId : undefined}
        className={`bg-fg/[0.03] text-fg placeholder:text-fg/25 focus:border-accent/70 focus:ring-accent/20 w-full rounded-xl border px-4 py-3.5 text-sm transition duration-300 outline-none focus:ring-4 ${
          error ? "border-accent-3/70" : "border-fg/12 hover:border-fg/25"
        }`}
      />
      {error ? (
        <p id={errorId} className="text-accent-3 mt-2 text-xs">
          {error}
        </p>
      ) : field.hint ? (
        <p id={hintId} className="text-fg/35 mt-2 text-xs">
          {field.hint}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group from-accent to-accent-2 relative mt-2 w-full overflow-hidden rounded-full bg-gradient-to-r px-8 py-4 font-mono text-xs tracking-[0.16em] text-white uppercase transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
    >
      <span className="from-accent-2 to-accent-3 absolute inset-0 -translate-x-full bg-gradient-to-r transition-transform duration-500 ease-out group-hover:translate-x-0 group-disabled:translate-x-[-100%]" />
      <span className="relative z-10 flex items-center justify-center gap-3">
        {pending ? (
          <>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Verifying
          </>
        ) : (
          <>
            Continue
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </>
        )}
      </span>
    </button>
  );
}

export default function LoginForm({ next }) {
  const [state, formAction] = useActionState(signIn, initialState);
  const errors = state?.errors ?? {};
  const values = state?.values ?? {};

  return (
    <motion.form
      action={formAction}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.15 }}
      className="space-y-5"
      noValidate
    >
      <input type="hidden" name="next" value={next} />

      {state?.status === "error" && state.message ? (
        <div
          role="alert"
          className="border-accent-3/30 bg-accent-3/[0.07] text-accent-3 rounded-xl border px-4 py-3 text-xs"
        >
          {state.message}
        </div>
      ) : null}

      {FIELDS.map((field) => (
        <Field
          key={field.name}
          field={field}
          defaultValue={values[field.name]}
          error={errors[field.name]}
        />
      ))}

      <div>
        <label
          htmlFor="role"
          className="text-fg/50 mb-2 block font-mono text-[10px] tracking-[0.2em] uppercase"
        >
          What brings you here?
        </label>
        <select
          id="role"
          name="role"
          required
          defaultValue={values.role ?? ""}
          aria-invalid={errors.role ? "true" : undefined}
          aria-describedby={errors.role ? "role-error" : undefined}
          className={`bg-fg/[0.03] text-fg focus:border-accent/70 focus:ring-accent/20 w-full rounded-xl border px-4 py-3.5 text-sm transition duration-300 outline-none focus:ring-4 ${
            errors.role
              ? "border-accent-3/70"
              : "border-fg/12 hover:border-fg/25"
          }`}
        >
          <option value="" disabled>
            Select one…
          </option>
          <option value="Recruiter / Talent">
            Recruiter or talent partner
          </option>
          <option value="Hiring Manager">Hiring manager</option>
          <option value="Engineer / Peer">Engineer or peer</option>
          <option value="Founder">Founder</option>
          <option value="Collaboration">Exploring a collaboration</option>
          <option value="Just Browsing">Just browsing</option>
        </select>
        {errors.role ? (
          <p id="role-error" className="text-accent-3 mt-2 text-xs">
            {errors.role}
          </p>
        ) : null}
      </div>

      <SubmitButton />

      <p className="text-fg/35 pt-1 text-center text-[11px] leading-relaxed">
        Your details are stored privately so I can follow up — never shared or
        sold. No password, no account to create.
      </p>
    </motion.form>
  );
}
