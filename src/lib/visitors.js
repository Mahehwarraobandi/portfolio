import { database } from "@/lib/cloudflare";

/**
 * Chat-transcript and visitor storage, on Cloudflare D1 (SQLite).
 *
 * The recruiter sign-in gate was removed on 2026-11-22, so nothing writes new
 * visitors any more; /visitors still lists the ones recorded before that.
 *
 * The Worker reaches the database through its `DB` binding — there is no
 * connection string or password anywhere. Locally, `next dev` gets the same
 * binding backed by a SQLite file under .wrangler/ (see src/lib/cloudflare.js),
 * so the whole flow is testable on localhost against the real schema.
 *
 * Schema: migrations/0001_create_visitors_and_chats.sql.
 */

/** D1 rows are snake_case; the pages read camelCase. */
function toVisitor(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    role: row.role,
    emailKind: row.email_kind,
    emailDomain: row.email_domain,
    referrer: row.referrer,
    userAgent: row.user_agent,
    createdAt: row.created_at,
  };
}

function toChat(row) {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    referrer: row.referrer,
    userAgent: row.user_agent,
    createdAt: row.created_at,
  };
}

/** Most recent sign-ins first. Used by the private /visitors page. */
export async function listVisitors(limit = 200) {
  const db = await database();
  const { results } = await db
    .prepare("SELECT * FROM visitors ORDER BY created_at DESC LIMIT ?")
    .bind(limit)
    .all();
  return results.map(toVisitor);
}

/**
 * Persists one chatbot turn (the visitor question + the assistant reply).
 * Best-effort: callers log and move on, so a storage hiccup never breaks the
 * chat response the visitor is waiting on.
 */
export async function recordChat(chat) {
  const record = {
    id: crypto.randomUUID(),
    question: chat.question,
    answer: chat.answer,
    referrer: chat.referrer || null,
    userAgent: chat.userAgent || null,
    createdAt: new Date().toISOString(),
  };

  const db = await database();
  await db
    .prepare(
      `INSERT INTO chats (id, question, answer, referrer, user_agent, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      record.id,
      record.question,
      record.answer,
      record.referrer,
      record.userAgent,
      record.createdAt,
    )
    .run();

  return record;
}

/** Most recent chats first. For a future private review view. */
export async function listChats(limit = 200) {
  const db = await database();
  const { results } = await db
    .prepare("SELECT * FROM chats ORDER BY created_at DESC LIMIT ?")
    .bind(limit)
    .all();
  return results.map(toChat);
}
