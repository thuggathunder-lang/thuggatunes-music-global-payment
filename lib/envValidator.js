const requiredKeys = ['TEST_KEY'];

export function validateEnv() {
  const missing = requiredKeys.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing required env keys: ${missing.join(', ')}`);
  }
  return true;
}
