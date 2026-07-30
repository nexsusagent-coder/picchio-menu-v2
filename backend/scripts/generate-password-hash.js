const readline = require('readline');
const argon2 = require('argon2');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.stdoutMuted = true;

rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (rl.stdoutMuted)
    rl.output.write('*');
  else
    rl.output.write(stringToWrite);
};

console.log('--- Picchio Argon2id Password Hash Generator ---');
rl.stdoutMuted = false;
rl.question('Enter Admin Password to Hash: ', async (password) => {
  rl.stdoutMuted = false;
  console.log('\nGenerating Argon2id Hash...');

  try {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4
    });
    console.log('\n--- HASH GENERATED SUCCESSFULLY ---');
    console.log(hash);
    console.log('-----------------------------------\n');
  } catch (err) {
    console.error('Error generating hash:', err);
  } finally {
    rl.close();
  }
});
