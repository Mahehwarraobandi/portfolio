import { NextResponse } from "next/server";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy.
 *
 * Production: a fresh per-request nonce authorises Next's inline bootstrap
 * scripts, so inline injection stays blocked without 'unsafe-inline'.
 *
 * Development: nonces are skipped deliberately. Next stamps the nonce into the
 * server HTML but React drops it from the client tree, which makes the dev
 * overlay report a hydration attribute mismatch on every script tag. Dev also
 * needs 'unsafe-eval' + 'unsafe-inline' for React Refresh, so the nonce buys
 * nothing there. The shipped policy is the strict one.
 */
function buildCsp(nonce) {
  const scriptSrc = isDev
    ? "'self' 'unsafe-inline' 'unsafe-eval'"
    : `'self' 'nonce-${nonce}'`;

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    // Tailwind and next/font inject style tags; styles carry no script capability.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self' data:",
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export default function proxy(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  if (!isDev) {
    // Next reads the nonce back out of this header to stamp its own scripts.
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("content-security-policy", csp);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("content-security-policy", csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * Everything except static assets and prefetches, which don't execute
     * scripts and don't need a nonce.
     */
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
