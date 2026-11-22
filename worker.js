// The worker OpenNext emits on `opennextjs-cloudflare build`.
import openNext from "./.open-next/worker.js";
import { buildCsp, createNonce } from "./src/lib/csp.js";

/**
 * Cloudflare Worker entry point.
 *
 * Wraps OpenNext's Next.js handler to give every rendered response a strict,
 * nonce-based Content-Security-Policy. Static assets never reach this code —
 * Workers serves them directly from .open-next/assets.
 */
const worker = {
  async fetch(request, env, ctx) {
    const nonce = createNonce();
    const csp = buildCsp(nonce);

    // Next extracts the nonce from this request header while rendering.
    const headers = new Headers(request.headers);
    headers.set("content-security-policy", csp);
    headers.set("x-nonce", nonce);

    const response = await openNext.fetch(
      new Request(request, { headers }),
      env,
      ctx,
    );

    // Re-wrap so the headers are mutable, then attach the same policy.
    const secured = new Response(response.body, response);
    secured.headers.set("content-security-policy", csp);
    return secured;
  },
};

export default worker;
