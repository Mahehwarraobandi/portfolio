/**
 * Content-Security-Policy.
 *
 * A fresh per-request nonce authorises Next's inline bootstrap scripts, so
 * inline injection stays blocked without 'unsafe-inline'. Next reads the nonce
 * back out of the request's `content-security-policy` header and stamps it on
 * its own scripts, which is why the policy is set on the request as well as the
 * response (see worker.js).
 *
 * This runs in the Worker entry rather than in a Next `proxy.js`: Next 16 proxy
 * always uses the Node.js runtime, and OpenNext marks Node proxy on Workers as
 * experimental and unsupported. A plain Worker wrapper is the documented path.
 *
 * `next dev` does not go through the Worker, so local development runs without
 * a CSP — dev needed 'unsafe-eval' + 'unsafe-inline' for React Refresh anyway.
 */
export function buildCsp(nonce) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    // Tailwind and next/font inject style tags; styles carry no script capability.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/** 128 bits of randomness, base64-encoded for the `nonce-` source. */
export function createNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}
