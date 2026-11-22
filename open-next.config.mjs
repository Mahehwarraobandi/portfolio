import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext adapter config.
 *
 * Every page renders per request (the CSP nonce requires it), so there is no
 * ISR / incremental cache to back with R2 or KV. The defaults are enough.
 *
 * OpenNext only auto-detects `open-next.config.ts`; this project is JavaScript,
 * so the npm scripts pass this file with `--openNextConfigPath`.
 */
export default defineCloudflareConfig({});
