const db = require('../src/db');
const menuService = require('../src/services/menu-service');

async function main() {
  try {
    await db.runMigrations();
    await menuService.seedMenuIfEmpty();
    console.log('[CLI SEED] Done.');
    process.exit(0);
  } catch (err) {
    console.error('[CLI SEED ERROR]', err);
    process.exit(1);
  }
}

main();
