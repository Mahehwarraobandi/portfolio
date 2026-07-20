/**
 * Input validation for the visitor sign-in form.
 *
 * Every provider is welcome — Gmail, Yahoo, Outlook, iCloud, or a company
 * domain all pass. The only rejections are addresses that are malformed or
 * come from throwaway-inbox services, which would leave an unreachable lead.
 */

// Deliberately permissive: one @, no whitespace, a dotted domain with a
// 2+ character TLD. Anything stricter starts rejecting valid real addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/;

// C0 controls plus DEL. Escaped, so the source stays plain ASCII.
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
  "getnada.com",
  "dispostable.com",
  "fakeinbox.com",
]);

const LIMITS = {
  name: 80,
  email: 254, // RFC 5321 maximum
  company: 100,
  role: 120,
};

/** Trims, collapses inner whitespace, and strips control characters. */
function clean(value, max) {
  if (typeof value !== "string") return "";
  return value
    .replace(CONTROL_CHARS, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/**
 * Validates the submitted form.
 *
 * @returns {{ ok: true, data: object } | { ok: false, errors: object }}
 */
export function validateVisitor(raw) {
  const data = {
    name: clean(raw.name, LIMITS.name),
    email: clean(raw.email, LIMITS.email).toLowerCase(),
    company: clean(raw.company, LIMITS.company),
    role: clean(raw.role, LIMITS.role),
  };

  const errors = {};

  if (data.name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!data.email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "That doesn't look like a valid email address.";
  } else if (DISPOSABLE_DOMAINS.has(data.email.split("@")[1])) {
    errors.email = "Please use a permanent email address so I can reply.";
  }

  if (data.company.length < 2) {
    errors.company = "Please enter your company or organisation.";
  }

  if (!data.role) {
    errors.role = "Please tell me what brings you here.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data };
}

const PERSONAL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "gmx.com",
  "mail.com",
  "yandex.com",
]);

/** Tags an address as a work or personal domain, stored alongside the lead. */
export function classifyEmail(email) {
  const domain = email.split("@")[1] ?? "";
  return {
    domain,
    kind: PERSONAL_DOMAINS.has(domain) ? "personal" : "work",
  };
}
