const crypto = require('crypto');
const fs = require('fs');
const db = require('../db');
const config = require('../config');

function hashObject(obj) {
  return crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex');
}

async function seedMenuIfEmpty() {
  const selectRes = await db.query('SELECT id, version FROM menu_state WHERE id = 1');
  
  if (selectRes.rows.length === 0) {
    console.log('[SEED] menu_state table is empty. Seeding initial data from menu-data.json...');
    const rawData = fs.readFileSync(config.initialMenuPath, 'utf8');
    const initialJson = JSON.parse(rawData);

    await db.query(
      `INSERT INTO menu_state (id, data, version, updated_at, updated_by)
       VALUES (1, $1, 1, NOW(), 'system_seed')
       ON CONFLICT (id) DO NOTHING`,
      [initialJson]
    );

    await db.query(
      `INSERT INTO menu_change_log (version, source, prev_data_hash, new_data_hash)
       VALUES (1, 'system_seed', NULL, $1)`,
      [hashObject(initialJson)]
    );

    console.log('[SEED] Initial menu data seeded successfully.');
  } else {
    console.log(`[SEED] Existing menu state found (Version: ${selectRes.rows[0].version}). Skipping seed.`);
  }
}

async function getMenu() {
  const res = await db.query('SELECT data, version, updated_at FROM menu_state WHERE id = 1');
  if (res.rows.length === 0) {
    return { data: {}, version: 0, updatedAt: new Date().toISOString(), source: 'database' };
  }
  const row = res.rows[0];
  return {
    data: row.data,
    version: row.version,
    updatedAt: row.updated_at,
    source: 'database'
  };
}

async function updateMenu(newData, updatedBy = 'admin') {
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    const selectRes = await client.query('SELECT data, version FROM menu_state WHERE id = 1 FOR UPDATE');
    let currentVersion = 0;
    let prevHash = null;

    if (selectRes.rows.length > 0) {
      currentVersion = selectRes.rows[0].version;
      prevHash = hashObject(selectRes.rows[0].data);
    }

    const nextVersion = currentVersion + 1;
    const newHash = hashObject(newData);

    const updateRes = await client.query(
      `INSERT INTO menu_state (id, data, version, updated_at, updated_by)
       VALUES (1, $1, $2, NOW(), $3)
       ON CONFLICT (id) DO UPDATE SET
         data = EXCLUDED.data,
         version = EXCLUDED.version,
         updated_at = NOW(),
         updated_by = EXCLUDED.updated_by
       RETURNING data, version, updated_at`,
      [newData, nextVersion, updatedBy]
    );

    await client.query(
      `INSERT INTO menu_change_log (version, source, prev_data_hash, new_data_hash)
       VALUES ($1, $2, $3, $4)`,
      [nextVersion, updatedBy, prevHash, newHash]
    );

    await client.query('COMMIT');

    const updatedRow = updateRes.rows[0];
    return {
      data: updatedRow.data,
      version: updatedRow.version,
      updatedAt: updatedRow.updated_at,
      source: 'database'
    };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[MENU UPDATE ERROR]', err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  seedMenuIfEmpty,
  getMenu,
  updateMenu
};
