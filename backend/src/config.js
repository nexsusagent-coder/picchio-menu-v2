const path = require('path');

const config = {
  env: process.env.NODE_ENV || 'production',
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL || 'postgresql://picchio_user:picchio_secure_pass_2026@picchio-postgres:5432/picchio_db',
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || '',
  sessionSecret: process.env.SESSION_SECRET || 'picchio_default_session_secret_replace_in_env',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '*')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean),
  initialMenuPath: path.join(__dirname, '../data/menu-data.json')
};

module.exports = config;
