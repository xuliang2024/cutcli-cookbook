#!/usr/bin/env node
/**
 * Walk every example dir, read meta.json, and emit a single
 * `docs/public/gallery.json` consumed by the docs site home page.
 *
 * Usage: node scripts/build-gallery.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exists } from './_lib/walk.mjs';

const __filename = fileURLToPath(import.meta.url);
const __root = path.resolve(path.dirname(__filename), '..');

async function* iterCases(root) {
  const entries = await fs.readdir(root, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isDirectory() || e.name.startsWith('.')) continue;
    if (e.name === '99-community') {
      const handles = await fs.readdir(path.join(root, e.name), { withFileTypes: true });
      for (const h of handles) {
        if (!h.isDirectory() || h.name.startsWith('.')) continue;
        const cases = await fs.readdir(path.join(root, e.name, h.name), { withFileTypes: true });
        for (const c of cases) {
          if (c.isDirectory() && !c.name.startsWith('.')) {
            yield {
              dir: path.join(root, e.name, h.name, c.name),
              kind: 'community',
            };
          }
        }
      }
      continue;
    }
    yield { dir: path.join(root, e.name), kind: 'official' };
  }
}

async function main() {
  const examples = path.join(__root, 'examples');
  const list = [];
  for await (const { dir, kind } of iterCases(examples)) {
    const metaPath = path.join(dir, 'meta.json');
    if (!(await exists(metaPath))) continue;
    const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'));
    list.push({
      ...meta,
      kind,
      path: path.relative(__root, dir).replace(/\\/g, '/'),
    });
  }

  list.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'official' ? -1 : 1;
    return String(a.id).localeCompare(String(b.id));
  });

  const outDir = path.join(__root, 'docs', 'public');
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, 'gallery.json');
  await fs.writeFile(outFile, JSON.stringify(list, null, 2) + '\n');

  console.log(`Wrote ${list.length} entries to ${path.relative(__root, outFile)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
