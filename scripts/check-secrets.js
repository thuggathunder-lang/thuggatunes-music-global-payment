#!/usr/bin/env node
// scripts/check-secrets.js
// A tiny scanner for common secret patterns in staged files
const { execSync } = require('child_process');
const fs = require('fs');

function getStagedFiles() {
  try {
    const out = execSync('git diff --name-only --cached', { encoding: 'utf8' });
    return out.split(/\r?\n/).filter(Boolean);
  } catch (e) {
    return [];
  }
}

const patterns = [
  /sk_live_[0-9a-zA-Z]+/, // Stripe live
  /sk_test_[0-9a-zA-Z]+/, // Stripe test
  /-----BEGIN PRIVATE KEY-----/,
  /AKIA[0-9A-Z]{16}/, // AWS access key id
  /aws_secret_access_key\s*=\s*[A-Za-z0-9\/+=]{40}/i,
];

const files = getStagedFiles();
let found = false;
for (const f of files) {
  try {
    const content = fs.readFileSync(f, 'utf8');
    for (const re of patterns) {
      if (re.test(content)) {
        console.error(`Potential secret found in ${f}: ${re}`);
        found = true;
      }
    }
  } catch (e) {
    // ignore unreadable files
  }
}

if (found) {
  console.error('Aborting commit: potential secrets detected. Remove them or use environment variables.');
  process.exit(1);
}
console.log('No obvious secrets found in staged files.');