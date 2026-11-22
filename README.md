# Maheshwar Rao Bandi — Portfolio

Personal portfolio with an AI chat assistant, a recruiter sign-in gate in front
of the résumé, and a private visitors view. Next.js 16 (App Router, JavaScript),
Tailwind CSS v4, and `motion`, running on **Cloudflare Workers** through the
OpenNext adapter.

| Piece               | Runs on                                               |
| ------------------- | ----------------------------------------------------- |
| Pages + API         | Cloudflare Workers (`@opennextjs/cloudflare`)         |
| Chat model          | Workers AI (`AI` binding, model in `wrangler.jsonc`)  |
| Sign-ins, chat logs | Cloudflare D1 (`DB` binding, schema in `migrations/`) |
| Secrets             | Worker secrets: `SESSION_SECRET`, `ADMIN_KEY`         |
| CSP nonce           | `worker.js` + `src/lib/csp.js`                        |

## Requirements

- Node.js **22.12 or newer** (Wrangler refuses to run on older versions).
- `npx wrangler login` once, so local dev can reach Workers AI.

## Develop

```bash
npm install
npm run db:migrate:local   # creates the local D1 tables under .wrangler/
npm run dev                # http://localhost:3000
```

`next dev` gets the real bindings through `initOpenNextCloudflareForDev()` in
`next.config.mjs`: D1 is a local SQLite file and Workers AI calls go to
Cloudflare. Local secrets come from `.env.local` (gitignored).

## Checks

```bash
npm run check   # eslint + prettier --check + next build
```

## Preview the Worker locally

```bash
npm run preview
```

## Deploy

Deploys straight from this machine with Wrangler:

```bash
npm run db:migrate:remote   # only when migrations/ changed
npm run deploy
```

`NEXT_PUBLIC_SITE_URL` is inlined at build time, so it must be set in
`.env.production` (gitignored) before `npm run deploy`.

## Content

Everything the site, the chatbot, and the PDF say comes from
`src/data/resume.js` and `src/data/qa.js`. After editing them:

```bash
npm run generate:resume   # rebuilds public/resume.pdf
npm run generate:assets   # rebuilds icons and the OG image
```
