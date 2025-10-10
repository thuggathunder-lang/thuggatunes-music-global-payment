const { validateEnv } = require('../lib/envValidator');

describe('envValidator', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });
  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('throws when TEST_KEY is missing', () => {
    delete process.env.TEST_KEY;
    expect(() => validateEnv()).toThrow(/Missing required env keys/);
  });

  test('passes when TEST_KEY present', () => {
    process.env.TEST_KEY = 'ok';
    expect(validateEnv()).toBe(true);
  });
});
