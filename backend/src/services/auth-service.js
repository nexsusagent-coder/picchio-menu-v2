const argon2 = require('argon2');
const config = require('../config');

async function verifyAdminPassword(inputPassword) {
  if (!config.adminPasswordHash) {
    console.error('[AUTH ERROR] ADMIN_PASSWORD_HASH is not set in environment.');
    return false;
  }

  try {
    return await argon2.verify(config.adminPasswordHash, inputPassword);
  } catch (err) {
    console.error('[AUTH ERROR] Password verification failed:', err.message);
    return false;
  }
}

async function hashPassword(plainPassword) {
  return await argon2.hash(plainPassword, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4
  });
}

module.exports = {
  verifyAdminPassword,
  hashPassword
};
