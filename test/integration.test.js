const { spawn } = require('child_process');
const path = require('path');

function runScript(args = [], env = {}) {
  return new Promise((resolve, _reject) => {
    const script = path.join(__dirname, '..', 'thuggatunesmusicandglobalpayment.js');
    // If env is empty object, pass process.env; otherwise pass the env object exactly
    const childEnv = Object.keys(env).length ? env : process.env;
    const child = spawn(process.execPath, [script, ...args], { env: childEnv });
    let out = '';
    child.stdout.on('data', (d) => (out += d.toString()));
    child.stderr.on('data', (d) => (out += d.toString()));
    child.on('close', (code) => resolve({ code, out }));
  });
}

describe('integration', () => {
  test('runs and prints env test when TEST_KEY provided', async () => {
    const res = await runScript(['--no-dotenv'], { TEST_KEY: 'IntegrationKey' });
    expect(res.code).toBe(0);
    expect(res.out).toMatch(/Env test: IntegrationKey/);
  });

  test('fails when TEST_KEY missing', async () => {
    const newEnv = Object.assign({}, process.env);
    delete newEnv.TEST_KEY;
    const res = await runScript(['--no-dotenv'], newEnv);
    expect(res.code).not.toBe(0);
    expect(res.out).toMatch(/Environment validation failed/);
  });
});
