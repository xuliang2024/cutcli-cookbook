#!/usr/bin/env node
/**
 * Garbage-collect orphan objects in the cutcli-docs R2 bucket.
 *
 * An object is considered orphan when its key does not correspond to any
 * file currently present in `docs/.vitepress/dist/`.
 *
 * Usage:
 *   node scripts/r2-gc.mjs [--bucket cutcli-docs] [--dist docs/.vitepress/dist] [--dry-run] [--yes]
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { walk, exists } from './_lib/walk.mjs';

const __filename = fileURLToPath(import.meta.url);
const __root = path.resolve(path.dirname(__filename), '..');

function parseArgs(argv) {
  const out = { bucket: 'cutcli-docs', dist: 'docs/.vitepress/dist', dryRun: false, yes: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--bucket') out.bucket = argv[++i];
    else if (a === '--dist') out.dist = argv[++i];
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--yes' || a === '-y') out.yes = true;
  }
  return out;
}

async function listKeys(bucket) {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!token || !account) {
    throw new Error('CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must be set');
  }
  const out = [];
  let cursor = null;
  do {
    const url = new URL(
      `https://api.cloudflare.com/client/v4/accounts/${account}/r2/buckets/${bucket}/objects`,
    );
    url.searchParams.set('per_page', '1000');
    if (cursor) url.searchParams.set('cursor', cursor);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`R2 list failed: ${res.status} ${await res.text()}`);
    const data = await res.json();
    for (const o of data.result ?? []) out.push(o.key);
    cursor = data.result_info?.cursor || null;
  } while (cursor);
  return out;
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: 'inherit' });
    proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
    proc.on('error', reject);
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const distDir = path.resolve(__root, args.dist);

  if (!(await exists(distDir))) {
    console.error(`Dist not found: ${distDir}. Run 'npm run docs:build' first.`);
    process.exit(1);
  }

  const localKeys = new Set(
    (await walk(distDir)).map((f) => path.relative(distDir, f).split(path.sep).join('/')),
  );
  const remoteKeys = await listKeys(args.bucket);
  const orphans = remoteKeys.filter((k) => !localKeys.has(k) && k !== '404.html');

  console.log(`Local: ${localKeys.size}, remote: ${remoteKeys.length}, orphan: ${orphans.length}`);
  if (orphans.length === 0) {
    console.log('Nothing to delete.');
    return;
  }

  for (const k of orphans) console.log(`  orphan: ${k}`);

  if (args.dryRun) {
    console.log('Dry run; nothing deleted.');
    return;
  }
  if (!args.yes) {
    console.log('\nRe-run with --yes to actually delete.');
    return;
  }

  for (const k of orphans) {
    process.stdout.write(`del ${k} ... `);
    await run('npx', ['-y', 'wrangler@3', 'r2', 'object', 'delete', `${args.bucket}/${k}`]);
    console.log('ok');
  }
  console.log(`\nDeleted ${orphans.length} orphans.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
