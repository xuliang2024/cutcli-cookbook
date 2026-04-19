#!/usr/bin/env node
/**
 * Aggregate lint runner. Runs case validation, command-name check, and link check.
 * Used by `npm run lint`.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dir = path.dirname(__filename);

const checks = [
  { name: 'examples', script: 'validate-example.mjs', args: ['--all'] },
  { name: 'commands', script: 'check-command-name.mjs', args: [] },
  { name: 'links', script: 'check-links.mjs', args: [] },
];

function runOne({ name, script, args }) {
  return new Promise((resolve) => {
    const proc = spawn(process.execPath, [path.join(__dir, script), ...args], {
      stdio: 'inherit',
    });
    proc.on('close', (code) => {
      resolve({ name, code: code ?? 1 });
    });
  });
}

const results = [];
for (const c of checks) {
  console.log(`\n=== ${c.name} ===`);
  results.push(await runOne(c));
}

console.log('\n--- summary ---');
let failed = 0;
for (const r of results) {
  console.log(`  ${r.code === 0 ? 'OK  ' : 'FAIL'} ${r.name}`);
  if (r.code !== 0) failed++;
}
process.exit(failed === 0 ? 0 : 1);
