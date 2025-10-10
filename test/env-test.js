const { spawn } = require('child_process');
const path = require('path');

const script = path.join(__dirname, '..', 'thuggatunesmusicandglobalpayment.js');

const child = spawn(process.execPath, [script]);

let out = '';
child.stdout.on('data', (d) => {
  out += d.toString();
  process.stdout.write(d);
});
child.stderr.on('data', (d) => process.stderr.write(d.toString()));
child.on('close', (code) => {
  if (code !== 0) {
    console.error(`Script exited with code ${code}`);
    process.exit(1);
  }
  if (!out.includes('Env test:')) {
    console.error('Unexpected output:', out);
    process.exit(1);
  }
  console.log('env-test: OK');
});
