#!/usr/bin/env node
/**
 * Validate one example directory or every example.
 *
 * Usage:
 *   node scripts/validate-example.mjs examples/01-hello-caption
 *   node scripts/validate-example.mjs --all
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { walk, exists } from './_lib/walk.mjs';
import {
  META_SCHEMA,
  REQUIRED_README_SECTIONS,
  URL_WHITELIST_PATTERNS,
} from './_lib/example-schema.mjs';

const __filename = fileURLToPath(import.meta.url);
const __root = path.resolve(path.dirname(__filename), '..');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateMeta = ajv.compile(META_SCHEMA);

const URL_REGEX = /(https?:\/\/[^\s"'<>)]+)/g;

async function findAllExamples() {
  const root = path.join(__root, 'examples');
  const out = [];
  const entries = await fs.readdir(root, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (e.name === '99-community') {
      const sub = await fs.readdir(path.join(root, e.name), { withFileTypes: true });
      for (const handle of sub) {
        if (!handle.isDirectory() || handle.name.startsWith('.')) continue;
        const cases = await fs.readdir(path.join(root, e.name, handle.name), {
          withFileTypes: true,
        });
        for (const c of cases) {
          if (c.isDirectory() && !c.name.startsWith('.')) {
            out.push(path.join(root, e.name, handle.name, c.name));
          }
        }
      }
      continue;
    }
    if (e.name.startsWith('.')) continue;
    out.push(path.join(root, e.name));
  }
  return out;
}

async function validateOne(dir) {
  const errors = [];
  const rel = path.relative(__root, dir);

  for (const f of ['run.sh', 'README.md', 'meta.json']) {
    if (!(await exists(path.join(dir, f)))) {
      errors.push(`missing required file: ${f}`);
    }
  }

  if (await exists(path.join(dir, 'run.sh'))) {
    const stat = await fs.stat(path.join(dir, 'run.sh'));
    if (!(stat.mode & 0o111)) {
      errors.push('run.sh is not executable (chmod +x run.sh)');
    }
    const content = await fs.readFile(path.join(dir, 'run.sh'), 'utf8');
    if (!content.startsWith('#!')) {
      errors.push('run.sh missing shebang on first line');
    }
    if (!/set\s+-[euxo]+/.test(content)) {
      errors.push('run.sh should use `set -euo pipefail` near the top');
    }
    if (/\bcut\s+(?!.*cli)\w+/.test(content) && !/cutcli/.test(content)) {
      errors.push("run.sh seems to call `cut` (system util); use `cutcli` instead");
    }
  }

  if (await exists(path.join(dir, 'meta.json'))) {
    let meta;
    try {
      meta = JSON.parse(await fs.readFile(path.join(dir, 'meta.json'), 'utf8'));
    } catch (err) {
      errors.push(`meta.json invalid JSON: ${err.message}`);
      meta = null;
    }
    if (meta && !validateMeta(meta)) {
      for (const e of validateMeta.errors ?? []) {
        errors.push(`meta.json ${e.instancePath || '/'}: ${e.message}`);
      }
    }
  }

  if (await exists(path.join(dir, 'README.md'))) {
    const md = await fs.readFile(path.join(dir, 'README.md'), 'utf8');
    for (const section of REQUIRED_README_SECTIONS) {
      if (!md.includes(section)) {
        errors.push(`README.md missing section header "${section}"`);
      }
    }
    if (/[A-Za-z]:\\Users\\|\/Users\/[a-z0-9_]+\//.test(md)) {
      errors.push('README.md contains absolute local path (privacy leak)');
    }
  }

  const dataDir = path.join(dir, 'data');
  if (await exists(dataDir)) {
    const jsons = await walk(dataDir, (f) => f.endsWith('.json'));
    for (const f of jsons) {
      try {
        JSON.parse(await fs.readFile(f, 'utf8'));
      } catch (err) {
        errors.push(`data/${path.relative(dataDir, f)} invalid JSON: ${err.message}`);
      }
    }
  }

  const filesToScan = [
    path.join(dir, 'run.sh'),
    ...(await walk(dataDir, (f) => f.endsWith('.json'))),
  ];
  for (const f of filesToScan) {
    if (!(await exists(f))) continue;
    const text = await fs.readFile(f, 'utf8');
    const urls = text.match(URL_REGEX) ?? [];
    for (const url of urls) {
      if (url.startsWith('http://')) {
        errors.push(`${path.basename(f)}: HTTP url not allowed: ${url}`);
        continue;
      }
      const ok = URL_WHITELIST_PATTERNS.some((re) => re.test(url));
      if (!ok) {
        errors.push(
          `${path.basename(f)}: url not in CDN whitelist: ${url} ` +
            '(see CONTRIBUTING.md#素材使用规范)',
        );
      }
    }
  }

  return { dir: rel, errors };
}

async function main() {
  const argv = process.argv.slice(2);
  const isAll = argv.includes('--all');
  const targets = isAll
    ? await findAllExamples()
    : argv.filter((a) => !a.startsWith('--')).map((a) => path.resolve(__root, a));

  if (targets.length === 0) {
    console.error('Usage: validate-example.mjs <example-dir> | --all');
    process.exit(2);
  }

  const results = [];
  for (const t of targets) {
    if (!(await exists(t))) {
      results.push({ dir: path.relative(__root, t), errors: ['directory not found'] });
      continue;
    }
    results.push(await validateOne(t));
  }

  let ok = 0;
  let fail = 0;
  for (const r of results) {
    if (r.errors.length === 0) {
      ok++;
      console.log(`PASS  ${r.dir}`);
    } else {
      fail++;
      console.log(`FAIL  ${r.dir}`);
      for (const e of r.errors) console.log(`        - ${e}`);
    }
  }

  console.log(`\nSummary: ${ok} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
