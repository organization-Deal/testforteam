CREATE TABLE IF NOT EXISTS exam_results (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  correct INTEGER NOT NULL,
  total INTEGER NOT NULL,
  pct INTEGER NOT NULL,
  wrong_count INTEGER NOT NULL DEFAULT 0,
  wrong_nos TEXT,
  wrong_json TEXT,
  user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_exam_results_submitted_at ON exam_results(submitted_at DESC);
