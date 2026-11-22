import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Access to the Worker's bindings (D1, Workers AI) and execution context.
 *
 * In production these come from the running Worker. Under `next dev`,
 * `initOpenNextCloudflareForDev()` in next.config.mjs provides the same
 * bindings locally: D1 is a local SQLite file under .wrangler/, and Workers AI
 * calls go to Cloudflare (it has no local emulator).
 *
 * The async form is used so this is also safe to call while Next prerenders.
 */
export async function cloudflare() {
  return getCloudflareContext({ async: true });
}

/** The D1 database holding sign-ins and chat transcripts. */
export async function database() {
  const { env } = await cloudflare();
  if (!env.DB) {
    throw new Error(
      "D1 binding `DB` is missing. Check d1_databases in wrangler.jsonc.",
    );
  }
  return env.DB;
}

/**
 * Keeps the Worker alive for `promise` after the response has been sent, so
 * best-effort writes (chat transcripts) aren't cut off when the stream closes.
 */
export async function runAfterResponse(promise) {
  const { ctx } = await cloudflare();
  if (ctx?.waitUntil) {
    ctx.waitUntil(promise);
    return;
  }
  await promise;
}

/**
 * The visitor's IP. Cloudflare sets `cf-connecting-ip` on every request; the
 * forwarded header is only a fallback for local development.
 */
export function clientIp(requestHeaders) {
  return (
    requestHeaders.get("cf-connecting-ip") ||
    requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown"
  );
}
