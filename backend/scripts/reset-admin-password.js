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

  if (!password || password.length < 14) {
    console.error('ERROR: Password must be at least 14 characters.');
    process.exit(1);
  }

  // Validate complexity: letters, numbers, special characters
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  if (!hasLetter || !hasDigit || !hasSpecial) {
    console.error('ERROR: Password must contain letters, numbers, and special characters.');
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
