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
    const migrationPath = path.join(__dirname, '../migrations/001_initial.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    await client.query(sql);
    console.log('[DB] Migrations executed successfully.');
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
