import crypto from "node:crypto";

/**
 * Admin session for the private /visitors page.
 *
 * Entering the admin key sets an HttpOnly cookie holding a small JSON payload
 * plus an HMAC over it. Nothing secret lives in the cookie — it only asserts
 * "this browser entered the admin key", so the signature exists to stop
 * someone hand-crafting one, not to hide the contents.
 */

export const ADMIN_COOKIE = "portfolio_admin";
const ADMIN_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

/**
 * In production the secret is a Worker secret (`wrangler secret put`). Locally we fall back
 * to a fixed development key so the flow is testable with no setup — the
 * fallback is deliberately obvious so it can never be mistaken for a real one.
 */
function secret() {
  const fromEnv = process.env.SESSION_SECRET;
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "SESSION_SECRET is not set. Add it with `wrangler secret put SESSION_SECRET`.",
    );
  }
  return "dev-only-insecure-session-secret";
}

function b64url(input) {
  return Buffer.from(input).toString("base64url");
}

function sign(payloadB64) {
  return crypto
    .createHmac("sha256", secret())
    .update(payloadB64)
    .digest("base64url");
}

function issue(payload, maxAgeSeconds) {
  const body = {
    ...payload,
    iat: Date.now(),
    exp: Date.now() + maxAgeSeconds * 1000,
  };
  const payloadB64 = b64url(JSON.stringify(body));
  return `${payloadB64}.${sign(payloadB64)}`;
}

/** Builds a short-lived signed token proving the owner entered the admin key. */
export function createAdminToken() {
  return issue({ scope: "admin" }, ADMIN_MAX_AGE_SECONDS);
}

/**
 * Returns the payload if the token is authentic and unexpired, else null.
 * `scope` must match, so a token minted for one purpose can't be replayed as another.
 */
export function readToken(token, scope) {
  if (typeof token !== "string" || !token.includes(".")) return null;

  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  const expected = sign(payloadB64);
  // Both sides are hex-ish base64url of a fixed-length digest, so the length
  // check below is just a guard against timingSafeEqual throwing.
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString());
    if (typeof payload.exp !== "number" || payload.exp < Date.now())
      return null;
    if (payload.scope !== scope) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Reads an admin cookie. */
export function readAdminToken(token) {
  return readToken(token, "admin");
}

/**
 * Constant-time comparison of a submitted admin key against ADMIN_KEY.
 * Returns false when no key is configured, so /visitors fails closed.
 */
export function checkAdminKey(submitted) {
  const expected = process.env.ADMIN_KEY;
  if (!expected || typeof submitted !== "string" || !submitted) return false;

  const a = Buffer.from(submitted);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Options for the admin cookie — HttpOnly, Strict, scoped to /visitors. */
export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/visitors",
    maxAge: ADMIN_MAX_AGE_SECONDS,
  };
}
