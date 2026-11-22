import sharp from "sharp";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "assets/headshot-source.jpeg");
const PUBLIC = path.join(ROOT, "public");
const APP = path.join(ROOT, "src/app");

await mkdir(PUBLIC, { recursive: true });

// Head-and-shoulders square crop out of the 800x800 source (white margins trimmed).
const FACE = { left: 150, top: 40, width: 500, height: 500 };

const circleMask = (size) =>
  Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  );

const face = (size) =>
  sharp(SRC).extract(FACE).resize(size, size, { fit: "cover" }).png();

async function circular(size, out, { grayscale = false } = {}) {
  let img = face(size);
  if (grayscale) img = img.grayscale();
  const buf = await img
    .composite([{ input: circleMask(size), blend: "dest-in" }])
    .png()
    .toBuffer();
  await writeFile(out, buf);
  return buf;
}

// Full-colour portrait used on the page itself.
await sharp(SRC)
  .extract(FACE)
  .resize(720, 720, { fit: "cover" })
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(`${PUBLIC}/portrait.jpg`);

// Circular icons (monochrome, matching the black & white theme).
await circular(512, `${APP}/icon.png`, { grayscale: true });
await circular(180, `${APP}/apple-icon.png`, { grayscale: true });
await circular(512, `${PUBLIC}/avatar.png`, { grayscale: true });

// ---- Open Graph image: 1200x630, warm off-white, circular avatar ----
const AV = 300;
const avatar = await circular(AV, `${PUBLIC}/.__tmp_av.png`, {
  grayscale: true,
});

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const ogSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f6f5f1"/>
  <circle cx="235" cy="315" r="162" fill="none" stroke="#171717" stroke-opacity="0.18" stroke-width="2"/>
  <text x="452" y="252" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="62" font-weight="700" fill="#171717" letter-spacing="-1.5">${esc("Maheshwar Rao Bandi")}</text>
  <text x="454" y="312" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="29" font-weight="500" fill="#1d6b4c" letter-spacing="0.5">${esc("Full Stack AI Engineer")}</text>
  <rect x="454" y="352" width="96" height="3" fill="#1d6b4c" rx="1.5"/>
  <text x="454" y="418" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="24" font-weight="400" fill="#171717" fill-opacity="0.62">${esc("Next.js · React · FastAPI · PostgreSQL")}</text>
  <text x="454" y="458" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="24" font-weight="400" fill="#171717" fill-opacity="0.62">${esc("RAG · Google Cloud · Cloudflare Workers")}</text>
  <text x="454" y="524" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="21" font-weight="500" fill="#171717" fill-opacity="0.4" letter-spacing="3">${esc("TOPEKA, KS, USA")}</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .composite([{ input: avatar, left: 235 - AV / 2, top: 315 - AV / 2 }])
  .png()
  .toFile(`${APP}/opengraph-image.png`);

await sharp(`${APP}/opengraph-image.png`).toFile(`${APP}/twitter-image.png`);

await unlink(`${PUBLIC}/.__tmp_av.png`);

console.log("assets generated");
