-- Migration 001: Initial Schema for Picchio QR Menu

-- 1. Menu State Table (Single row id=1)
CREATE TABLE IF NOT EXISTS menu_state (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data JSONB NOT NULL,
  version INT NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT DEFAULT 'admin'
);

-- 2. Menu Change Log Table
CREATE TABLE IF NOT EXISTS menu_change_log (
  id SERIAL PRIMARY KEY,
  version INT NOT NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  source TEXT NOT NULL DEFAULT 'admin',
  prev_data_hash TEXT,
  new_data_hash TEXT
);

-- 3. Session Store Table for connect-pg-simple
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
) WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
