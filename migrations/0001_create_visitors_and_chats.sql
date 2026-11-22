-- Recruiter sign-ins captured by the /login gate.
CREATE TABLE IF NOT EXISTS visitors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  email_kind TEXT,
  email_domain TEXT,
  referrer TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS visitors_created_at ON visitors (created_at DESC);

-- One row per chatbot turn: the visitor's question and the streamed answer.
CREATE TABLE IF NOT EXISTS chats (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS chats_created_at ON chats (created_at DESC);
