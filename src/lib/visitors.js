import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

/**
 * Visitor storage.
 *
 * Production writes to Firestore in Native mode, authenticated by the Cloud Run
 * runtime service account through Application Default Credentials — there is no
 * database password anywhere in the image or in Secret Manager.
 *
 * Local development, where no GCP project is configured, appends to a
 * gitignored JSONL file instead. That keeps the whole flow testable on
 * localhost before the Firestore database exists, without ever reaching for
 * real credentials.
 */

const COLLECTION = process.env.FIRESTORE_COLLECTION || "portfolio_visitors";
const LOCAL_FILE = path.join(process.cwd(), ".data", "visitors.jsonl");

// This project's Firestore instance is a *named* database ("portfoliodata"),
// not the account-wide "(default)" one, so the client must target it by id.
// Set FIRESTORE_DATABASE_ID in the Cloud Run env (see cloudbuild.yaml).
const DATABASE_ID = process.env.FIRESTORE_DATABASE_ID || "(default)";

function projectId() {
  return (
    process.env.FIRESTORE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.GCLOUD_PROJECT ||
    null
  );
}

/** True when a real Firestore database should be used. */
export function usingFirestore() {
  return Boolean(projectId());
}

/*
 * The client is created once per server instance and reused across requests, so
 * Cloud Run doesn't pay connection setup on every sign-in. It is imported lazily
 * because `next build` runs with no credentials — a module-level client would
 * make the build fail.
 */
let clientPromise = null;

async function firestore() {
  if (!clientPromise) {
    clientPromise = import("@google-cloud/firestore").then(
      ({ Firestore }) =>
        new Firestore({ projectId: projectId(), databaseId: DATABASE_ID }),
    );
  }
  return clientPromise;
}

async function appendLocal(record) {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.appendFile(LOCAL_FILE, `${JSON.stringify(record)}\n`, "utf8");
}

async function readLocal() {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

/**
 * Persists one sign-in.
 *
 * Failures are surfaced to the caller rather than swallowed — a lead that
 * silently vanishes is worse than an error the visitor can retry.
 */
export async function recordVisitor(visitor) {
  const record = {
    id: crypto.randomUUID(),
    name: visitor.name,
    email: visitor.email,
    company: visitor.company,
    role: visitor.role,
    emailKind: visitor.emailKind,
    emailDomain: visitor.emailDomain,
    referrer: visitor.referrer || null,
    userAgent: visitor.userAgent || null,
    createdAt: new Date().toISOString(),
  };

  if (!usingFirestore()) {
    if (process.env.NODE_ENV === "production") {
      // Cloud Run's filesystem is ephemeral; a local write here would look
      // like success and lose every lead on the next cold start.
      throw new Error(
        "No Firestore project configured. Set GOOGLE_CLOUD_PROJECT on the Cloud Run service.",
      );
    }
    await appendLocal(record);
    return record;
  }

  const db = await firestore();
  await db.collection(COLLECTION).doc(record.id).set(record);
  return record;
}

/** Most recent sign-ins first. Used by the private /visitors page. */
export async function listVisitors(limit = 200) {
  if (!usingFirestore()) {
    const all = await readLocal();
    return all
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit);
  }

  const db = await firestore();
  const snapshot = await db
    .collection(COLLECTION)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => doc.data());
}
