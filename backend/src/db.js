const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const pool = new Pool({
  connectionString: config.databaseUrl,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('[DB] Unexpected error on idle client', err);
});

async function runMigrations() {
  const client = await pool.connect();
  try {
    // 1. Ensure schema_migrations table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Check if 001_initial has been applied
    const checkRes = await client.query(`SELECT version FROM schema_migrations WHERE version = '001_initial'`);
    if (checkRes.rows.length === 0) {
      const migrationPath = path.join(__dirname, '../migrations/001_initial.sql');
      const sql = fs.readFileSync(migrationPath, 'utf8');
      await client.query(sql);
      await client.query(`INSERT INTO schema_migrations (version) VALUES ('001_initial') ON CONFLICT DO NOTHING`);
      console.log('[DB] Migration 001_initial executed successfully.');
    } else {
      console.log('[DB] Migration 001_initial already applied. Skipping.');
    }
  } catch (err) {
    console.error('[DB] Migration failed:', err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  runMigrations
};
