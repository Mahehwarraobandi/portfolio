@AGENTS.md

# Portfolio — project instructions

## Testing / verification

- **Never launch or drive a browser to test this project.** No Claude Browser,
  no Claude in Chrome, no screenshots, no automated page interaction.
  The user tests everything manually.
- Verification is limited to: `npm run lint`, `npm run format:check`,
  `npm run build`, and `curl` against a running server if headers need checking.
- After finishing code changes: kill whatever is on port 3000, restart the dev
  server, and hand off. The user takes it from there.

## Stack

- Next.js 16 (App Router) — **JavaScript only, never TypeScript**
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- `motion` (Framer Motion) for animation
- ESLint + Prettier (`npm run check` runs lint + format check + build)

## Theming

- The site supports **both dark and light mode**, toggleable, persisted in
  `localStorage`, defaulting to the OS preference.
- Colors are driven by CSS variables `--bg` / `--fg` / `--accent-1` /
  `--accent-2` in `globals.css`, exposed to Tailwind as `bg-bg`, `text-fg`,
  `border-fg/10`, `text-accent`, etc.
- **Do not hard-code `white` / `black` / `zinc-*` in components** — always use
  the semantic tokens so both themes stay correct.

## Assets

- Favicon, apple icon, OG image and portrait are generated from
  `assets/headshot-source.jpeg` by `npm run generate:assets`.
- Icons and the OG avatar are circular by design — keep them that way.

## Hosting (since 2026-11-22)

- Runs on **Cloudflare Workers** via `@opennextjs/cloudflare`; config in
  `wrangler.jsonc`, adapter config in `open-next.config.mjs` (passed with
  `--openNextConfigPath` because OpenNext only auto-detects a `.ts` file).
- D1 (`DB` binding, schema in `migrations/`) stores chat transcripts (and
  past recruiter sign-ins — the sign-in gate was removed 2026-11-22); Workers AI (`AI` binding) runs the chatbot. Bindings are read
  through `src/lib/cloudflare.js`.
- Secrets are Worker secrets (`wrangler secret put`), never in files.
- Deploy with `npm run deploy` from this machine (the user chose direct
  Wrangler deploys for Cloudflare). Wrangler needs Node ≥ 22.12.

## Security

- CSP with a per-request nonce is set in `worker.js` (the Worker entry that
  wraps OpenNext's handler), using `src/lib/csp.js`. There is no `proxy.js`:
  Next 16 proxy is Node-runtime only, which OpenNext marks experimental on
  Workers. Static security headers live in `next.config.mjs` (rendered
  responses) and `public/_headers` (static assets).
- Any new inline `<script>` must carry the nonce read from `headers()`.
