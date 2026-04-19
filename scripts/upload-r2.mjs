#!/usr/bin/env node
/**
 * Incremental upload of `docs/.vitepress/dist/` to the `cutcli-docs` R2
 * bucket using `wrangler r2 object put`.
 *
 * Strategy:
 *   1. Walk dist and compute sha256 for each file.
 *   2. List existing R2 objects (key + etag) and build a map.
 *   3. Upload only files where sha256 != etag (or key absent).
 *   4. Print a summary.
 *
 * Skipping the GC of orphan keys here on purpose; run `npm run r2:gc` weekly.
 *
 * Requirements:
 *   - wrangler v3+ on PATH (npx wrangler ...)
 *   - CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID in env (or `wrangler login`)
 *
 * Usage:
 *   node scripts/upload-r2.mjs [--bucket cutcli-docs] [--dist docs/.vitepress/dist] [--dry-run]
 */
import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { walk, exists } from './_lib/walk.mjs';

const __filename = fileURLToPath(import.meta.url);
const __root = path.resolve(path.dirname(__filename), '..');

function parseArgs(argv) {
  const out = { bucket: 'cutcli-docs', dist: 'docs/.vitepress/dist', dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--bucket') out.bucket = argv[++i];
    else if (a === '--dist') out.dist = argv[++i];
    else if (a === '--dry-run') out.dryRun = true;
  }
  return out;
}

async function sha256OfFile(p) {
  const buf = await fs.readFile(p);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function contentTypeOf(key) {
  if (key.endsWith('.html')) return 'text/html; charset=utf-8';
  if (key.endsWith('.css')) return 'text/css; charset=utf-8';
  if (key.endsWith('.js') || key.endsWith('.mjs')) return 'text/javascript; charset=utf-8';
  if (key.endsWith('.json')) return 'application/json; charset=utf-8';
  if (key.endsWith('.svg')) return 'image/svg+xml; charset=utf-8';
  if (key.endsWith('.png')) return 'image/png';
  if (key.endsWith('.jpg') || key.endsWith('.jpeg')) return 'image/jpeg';
  if (key.endsWith('.webp')) return 'image/webp';
  if (key.endsWith('.gif')) return 'image/gif';
  if (key.endsWith('.ico')) return 'image/x-icon';
  if (key.endsWith('.woff2')) return 'font/woff2';
  if (key.endsWith('.woff')) return 'font/woff';
  if (key.endsWith('.txt')) return 'text/plain; charset=utf-8';
  if (key.endsWith('.xml')) return 'application/xml; charset=utf-8';
  return 'application/octet-stream';
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: opts.captureStdout ? ['inherit', 'pipe', 'inherit'] : 'inherit', ...opts });
    let stdout = '';
    if (opts.captureStdout && proc.stdout) {
      proc.stdout.on('data', (chunk) => {
        stdout += chunk.toString();
        if (!opts.silent) process.stdout.write(chunk);
      });
    }
    proc.on('close', (code) => (code === 0 ? resolve(stdout) : reject(new Error(`${cmd} exited ${code}`))));
    proc.on('error', reject);
  });
}

async function listExistingKeys(bucket) {
  // wrangler 3.x: `wrangler r2 object get` doesn't list; we use the list API via api token.
  // But there's no built-in "list with etag" wrangler subcommand. We fall back to
  // calling the Cloudflare API directly when env tokens are set.
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!token || !account) {
    console.warn('CLOUDFLARE_API_TOKEN/ACCOUNT_ID not set; skipping incremental diff (full upload).');
    return null;
  }
  const out = new Map();
  let cursor = null;
  do {
    const url = new URL(
      `https://api.cloudflare.com/client/v4/accounts/${account}/r2/buckets/${bucket}/objects`,
    );
    url.searchParams.set('per_page', '1000');
    if (cursor) url.searchParams.set('cursor', cursor);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) {
      console.warn(`R2 list failed (${res.status}); falling back to full upload.`);
      return null;
    }
    const data = await res.json();
    if (!data.success) {
      console.warn(`R2 list non-success; falling back to full upload.`);
      return null;
    }
    for (const o of data.result ?? []) {
      out.set(o.key, (o.etag || '').replace(/^"|"$/g, ''));
    }
    cursor = data.result_info?.cursor || null;
  } while (cursor);
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const distDir = path.resolve(__root, args.dist);
  if (!(await exists(distDir))) {
    console.error(`Dist directory not found: ${distDir}`);
    console.error("Run 'npm run docs:build' first.");
    process.exit(1);
  }

  const files = await walk(distDir);
  console.log(`Discovered ${files.length} files under ${path.relative(__root, distDir)}/`);

  const existing = await listExistingKeys(args.bucket);

  const tasks = [];
  let skipped = 0;
  for (const f of files) {
    const key = path.relative(distDir, f).split(path.sep).join('/');
    const sha = await sha256OfFile(f);
    if (existing && existing.has(key)) {
      // R2 etag for single-part PUT == md5 hex; ours is sha256, so etag-equal isn't reliable.
      // Use a metadata-based skip: if size+name matches AND etag length matches MD5, skip
      // when md5(file) == etag. Cheap approximation: compute md5 for files <= 5 MB.
      const stat = await fs.stat(f);
      if (stat.size <= 5 * 1024 * 1024) {
        const buf = await fs.readFile(f);
        const md5 = crypto.createHash('md5').update(buf).digest('hex');
        if (md5 === existing.get(key)) {
          skipped++;
          continue;
        }
      }
    }
    tasks.push({ key, file: f, sha });
  }

  console.log(`To upload: ${tasks.length}, skip (unchanged): ${skipped}`);
  if (args.dryRun) {
    for (const t of tasks) console.log(`  put ${t.key}`);
    console.log('Dry run; nothing uploaded.');
    return;
  }

  const wranglerBin = path.join(__root, 'worker', 'node_modules', '.bin', 'wrangler');
  const concurrency = Math.max(1, Number(process.env.UPLOAD_CONCURRENCY || 6));
  let done = 0;
  let failed = 0;
  const total = tasks.length;
  const queue = [...tasks];

  async function uploadOne(t) {
    const ct = contentTypeOf(t.key);
    try {
      await run(wranglerBin, [
        'r2',
        'object',
        'put',
        `${args.bucket}/${t.key}`,
        `--file=${t.file}`,
        `--content-type=${ct}`,
      ], { silent: true });
      done++;
      console.log(`[${done}/${total}] ok ${t.key}`);
    } catch (err) {
      failed++;
      console.log(`[${done + failed}/${total}] FAIL ${t.key}`);
      throw err;
    }
  }

  async function worker() {
    while (queue.length > 0) {
      const t = queue.shift();
      if (t) await uploadOne(t);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  console.log(`\nUploaded ${tasks.length} files to r2://${args.bucket}/ (concurrency=${concurrency})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
