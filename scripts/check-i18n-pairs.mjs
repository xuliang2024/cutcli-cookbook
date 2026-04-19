#!/usr/bin/env node
/**
 * Verify that bilingual file pairs stay in sync:
 *   - Every example README.md must have a sibling README.zh.md (and vice versa).
 *   - Every page under docs/<section>/*.md must have a sibling docs/zh/<section>/*.md
 *     (closed-source-sync files cli/api/concepts.md are excluded).
 *   - Every root governance doc (README, CONTRIBUTING, CHANGELOG) must have its .zh.md.
 *
 * The check only enforces *existence*, not content equivalence.
 *
 * Usage: node scripts/check-i18n-pairs.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { walk, exists } from './_lib/walk.mjs';

const __filename = fileURLToPath(import.meta.url);
const __root = path.resolve(path.dirname(__filename), '..');

const SKIP_DIR = new Set(['node_modules', '.vitepress', '.wrangler', '.git', 'dist']);

// Files that the closed-source sync script (jy_cli/scripts/sync-to-cookbook.mjs) writes.
// These are skipped here; the sync script will eventually write both languages.
const SYNC_GENERATED = new Set(['cli.md', 'api.md', 'concepts.md']);

async function findExampleDirs() {
  const root = path.join(__root, 'examples');
  const out = [];
  const top = await fs.readdir(root, { withFileTypes: true });
  for (const e of top) {
    if (!e.isDirectory() || e.name.startsWith('.')) continue;
    if (e.name === '99-community') {
      const handles = await fs.readdir(path.join(root, e.name), { withFileTypes: true });
      for (const handle of handles) {
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
    out.push(path.join(root, e.name));
  }
  return out;
}

async function checkExamples(missing) {
  for (const dir of await findExampleDirs()) {
    const en = path.join(dir, 'README.md');
    const zh = path.join(dir, 'README.zh.md');
    const enExists = await exists(en);
    const zhExists = await exists(zh);
    if (enExists && !zhExists) {
      missing.push({ have: rel(en), need: rel(zh) });
    } else if (!enExists && zhExists) {
      missing.push({ have: rel(zh), need: rel(en) });
    }
  }
}

async function checkDocs(missing) {
  const docsRoot = path.join(__root, 'docs');
  const docsZh = path.join(docsRoot, 'zh');

  const rootDocs = await walk(docsRoot, (f) => {
    const parts = f.split(path.sep);
    if (parts.some((p) => SKIP_DIR.has(p))) return false;
    if (parts.includes('zh')) return false;
    return f.endsWith('.md');
  });

  for (const enPath of rootDocs) {
    const base = path.basename(enPath);
    if (SYNC_GENERATED.has(base)) continue;
    const relPath = path.relative(docsRoot, enPath);
    const zhPath = path.join(docsZh, relPath);
    if (!(await exists(zhPath))) {
      missing.push({ have: rel(enPath), need: rel(zhPath) });
    }
  }

  if (await exists(docsZh)) {
    const zhDocs = await walk(docsZh, (f) => f.endsWith('.md'));
    for (const zhPath of zhDocs) {
      const base = path.basename(zhPath);
      if (SYNC_GENERATED.has(base)) continue;
      const relPath = path.relative(docsZh, zhPath);
      const enPath = path.join(docsRoot, relPath);
      if (!(await exists(enPath))) {
        missing.push({ have: rel(zhPath), need: rel(enPath) });
      }
    }
  }
}

async function checkRootGovernance(missing) {
  const pairs = [
    ['README.md', 'README.zh.md'],
    ['CONTRIBUTING.md', 'CONTRIBUTING.zh.md'],
    ['CHANGELOG.md', 'CHANGELOG.zh.md'],
  ];
  for (const [a, b] of pairs) {
    const aPath = path.join(__root, a);
    const bPath = path.join(__root, b);
    const aExists = await exists(aPath);
    const bExists = await exists(bPath);
    if (aExists && !bExists) missing.push({ have: a, need: b });
    if (!aExists && bExists) missing.push({ have: b, need: a });
  }
}

function rel(p) {
  return path.relative(__root, p);
}

async function main() {
  const missing = [];
  await checkExamples(missing);
  await checkDocs(missing);
  await checkRootGovernance(missing);

  if (missing.length > 0) {
    console.error('Missing i18n counterpart(s):\n');
    for (const m of missing) {
      console.error(`  have: ${m.have}\n  need: ${m.need}\n`);
    }
    process.exit(1);
  }
  console.log('OK: every bilingual pair has both files.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
