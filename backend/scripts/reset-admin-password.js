const argon2 = require('argon2');
const fs = require('fs');
const path = require('path');

async function main() {
  // Read plain password from stdin
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  let password = Buffer.concat(chunks).toString('utf8');

  // Strip trailing newlines from stdin pipe
  password = password.replace(/[\r\n]+$/, '');

  if (!password || password.length < 8 || password.length > 128) {
    console.error('ERROR: Password length must be between 8 and 128 characters.');
    process.exit(1);
  }

  if (password === 'admin') {
    console.error('ERROR: Password "admin" is not allowed.');
    process.exit(1);
  }

  // Generate Argon2id hash
  const hash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4
  });

  // Zero out password in memory
  password = '';

  // Output raw hash to stdout
  process.stdout.write(hash);
}

main().catch((err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
