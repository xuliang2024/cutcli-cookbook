#!/usr/bin/env node
/**
 * Crawl markdown files and verify that all *internal* links point at an
 * existing file. External http(s) links are skipped.
 *
 * Usage: node scripts/check-links.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { walk, exists } from './_lib/walk.mjs';

const __filename = fileURLToPath(import.meta.url);
const __root = path.resolve(path.dirname(__filename), '..');

const LINK_RE = /\[[^\]]+\]\(([^)]+)\)/g;
const SKIP_DIR = new Set(['node_modules', 'dist', '.vitepress', '.wrangler', '.git']);
const MEDIA_EXT = new Set(['.gif', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.mp4', '.webm', '.mp3']);

async function gather() {
  return walk(__root, (f) => {
    const parts = f.split(path.sep);
    if (parts.some((p) => SKIP_DIR.has(p))) return false;
    return f.endsWith('.md');
  });
}

async function main() {
  const files = await gather();
  const broken = [];
  for (const f of files) {
    const text = await fs.readFile(f, 'utf8');
    const matches = text.matchAll(LINK_RE);
    for (const m of matches) {
      let url = m[1].trim();
      if (!url) continue;
      if (/^https?:\/\//.test(url) || url.startsWith('mailto:')) continue;
      if (url.startsWith('#')) continue;
      url = url.split('#')[0].split('?')[0];
      if (!url) continue;
      const ext = path.extname(url).toLowerCase();
      if (MEDIA_EXT.has(ext)) continue;

      const isVitePressDocs = path.relative(__root, f).startsWith('docs' + path.sep);
      const base = url.startsWith('/')
        ? isVitePressDocs ? path.join(__root, 'docs') : __root
        : path.dirname(f);
      const cleanedUrl = url.replace(/^\//, '');
      const candidates = ext
        ? [path.resolve(base, cleanedUrl)]
        : [
            path.resolve(base, cleanedUrl),
            path.resolve(base, cleanedUrl + '.md'),
            path.resolve(base, cleanedUrl, 'index.md'),
          ];

      let found = false;
      for (const c of candidates) {
        if (await exists(c)) { found = true; break; }
      }
      if (!found) {
        broken.push({ file: path.relative(__root, f), url, target: path.relative(__root, candidates[0]) });
      }
    }
  }
  if (broken.length > 0) {
    console.error('Broken internal links:\n');
    for (const b of broken) {
      console.error(`  ${b.file}\n    -> ${b.url}\n    (resolved: ${b.target})\n`);
    }
    process.exit(1);
  }
  console.log(`OK: all internal links resolve in ${files.length} markdown files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
