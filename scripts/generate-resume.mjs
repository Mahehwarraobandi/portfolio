import PDFDocument from "pdfkit";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  education,
  experience,
  profile,
  projects,
  skills,
} from "../src/data/resume.js";

/**
 * Renders the résumé PDF served behind the sign-in gate.
 *
 * The section order, headings, and wording mirror the source résumé document
 * (MaheshwarRaoBandi.docx): Professional Summary → Core Technical Competencies
 * → Professional Experience → Key Projects → Education. Content comes from
 * `src/data/resume.js` — the same file the site renders — so the download can't
 * drift from the pages. The PDF-only fields there are `profile.summaryResume`
 * and each `project.resumeBullet`, which carry the document's verbatim text.
 *
 * Re-run with `npm run generate:resume` after editing that data.
 *
 * pdfkit is a devDependency: this runs at authoring time and the output is
 * committed to public/. Nothing here ships in the Cloud Run image.
 */

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "resume.pdf");

await mkdir(path.dirname(OUT), { recursive: true });

// Accent violet/cyan from globals.css, so the PDF matches the site.
const ACCENT = "#6d28d9";
const ACCENT_2 = "#0891b2";
const INK = "#111114";
const MUTED = "#55555f";
const HAIRLINE = "#d8d8de";

const MARGIN = 46;
const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
  info: {
    Title: `${profile.name} — Résumé`,
    Author: profile.name,
    Subject: profile.roles.join(" / "),
  },
});

doc.pipe(createWriteStream(OUT));

const WIDTH = doc.page.width - MARGIN * 2;

/**
 * The built-in Helvetica is WinAnsi-encoded and has no arrow glyph, so a raw
 * "→" prints as garbage. Swap it for an ASCII arrow; the website keeps the
 * real character. Everything else the résumé uses (— – · …) is in WinAnsi.
 */
const clean = (value) => String(value).replace(/→/g, "->");

/** Starts a new page when the next block wouldn't fit on this one. */
function ensure(space) {
  if (doc.y + space > doc.page.height - MARGIN) doc.addPage();
}

function sectionTitle(label) {
  ensure(46);
  doc.moveDown(0.7);
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(ACCENT)
    .text(label.toUpperCase(), MARGIN, doc.y, { characterSpacing: 1.6 });

  const y = doc.y + 3;
  doc
    .moveTo(MARGIN, y)
    .lineTo(MARGIN + WIDTH, y)
    .lineWidth(0.7)
    .strokeColor(HAIRLINE)
    .stroke();

  doc.moveDown(0.6);
}

/** Renders a "•  text" bullet with a hanging indent so wraps line up. */
function bullet(text, { size = 8.6 } = {}) {
  ensure(28);
  const x = MARGIN + 10;
  const indent = 9;
  const top = doc.y;

  doc.font("Helvetica").fontSize(size).fillColor(INK);
  doc.text("•", x, top, { width: indent });
  doc.text(clean(text), x + indent, top, {
    width: WIDTH - 10 - indent,
    align: "justify",
    lineGap: 1.1,
  });
  doc.moveDown(0.2);
}

function techStack(items) {
  ensure(22);
  const x = MARGIN + 10;
  doc.font("Helvetica-Oblique").fontSize(7.8).fillColor(INK);
  doc.text("Tech Stack: ", x, doc.y, { width: WIDTH - 10, continued: true });
  doc.font("Helvetica").fillColor(MUTED).text(items.join(", "), {
    lineGap: 0.6,
  });
}

/* ---------------- Header ---------------- */

doc
  .font("Helvetica-Bold")
  .fontSize(23)
  .fillColor(INK)
  .text(profile.name, { characterSpacing: -0.3 });

doc.moveDown(0.25);
doc
  .font("Helvetica")
  .fontSize(10.5)
  .fillColor(ACCENT_2)
  .text(profile.roles.join("  |  "));

// Contact line — order matches the document, LinkedIn as a live link.
doc.moveDown(0.4);
doc.font("Helvetica").fontSize(9).fillColor(MUTED);
doc.text(
  `${profile.location}   |   ${profile.phone}   |   ${profile.email}   |   `,
  {
    continued: true,
  },
);
doc
  .fillColor(ACCENT_2)
  .text("LinkedIn", { link: profile.linkedin, underline: true });

/* ---------------- Professional Summary ---------------- */

sectionTitle("Professional Summary");
doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor(INK)
  .text(profile.summaryResume, MARGIN, doc.y, {
    width: WIDTH,
    align: "justify",
    lineGap: 1.4,
  });

/* ---------------- Core Technical Competencies ---------------- */

sectionTitle("Core Technical Competencies");

skills.forEach((group) => {
  ensure(30);
  doc
    .font("Helvetica-Bold")
    .fontSize(8.6)
    .fillColor(INK)
    .text(`${group.title}: `, MARGIN, doc.y, { width: WIDTH, continued: true });
  doc
    .font("Helvetica")
    .fillColor(MUTED)
    .text(group.items.join(", "), { lineGap: 0.8 });
  doc.moveDown(0.24);
});

/* ---------------- Professional Experience ---------------- */

sectionTitle("Professional Experience");

experience.forEach((job, index) => {
  if (index > 0) doc.moveDown(0.55);
  ensure(70);

  const top = doc.y;
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(INK)
    .text(`${job.company}  |  ${job.location}`, MARGIN, top, {
      width: WIDTH * 0.68,
    });

  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(MUTED)
    .text(job.period, MARGIN + WIDTH * 0.68, top + 1.5, {
      width: WIDTH * 0.32,
      align: "right",
    });

  doc.y = Math.max(doc.y, top + 13);
  doc
    .font("Helvetica-Oblique")
    .fontSize(9.5)
    .fillColor(ACCENT_2)
    .text(job.role, MARGIN, doc.y);

  doc.moveDown(0.35);
  job.bullets.forEach((line) => bullet(line));
  techStack(job.stack);
});

/* ---------------- Key Projects ---------------- */

sectionTitle("Key Projects");

projects.forEach((project, index) => {
  if (index > 0) doc.moveDown(0.45);
  ensure(58);

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(INK)
    .text(project.title, MARGIN, doc.y, { width: WIDTH });

  doc.moveDown(0.25);
  bullet(project.resumeBullet);
  techStack(project.stack);
});

/* ---------------- Education ---------------- */

sectionTitle("Education");

ensure(40);
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor(INK)
  .text(`${education.degree} — ${education.school}`, MARGIN, doc.y, {
    width: WIDTH,
  });
doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor(MUTED)
  .text(`GPA: ${education.gpa}   |   ${education.date}`);

doc.end();

console.log(`resume written to ${path.relative(ROOT, OUT)}`);
