#!/usr/bin/env node
/**
 * Fail when any documentation/script in the public repo uses the bare
 * `cut` command (which collides with the Unix util) instead of `cutcli`.
 *
 * Usage: node scripts/check-command-name.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { walk } from './_lib/walk.mjs';

const __filename = fileURLToPath(import.meta.url);
const __root = path.resolve(path.dirname(__filename), '..');

const SCAN_DIRS = ['docs', 'examples', 'templates', 'prompts', 'showcase', 'README.md', 'README.zh.md'];
const SKIP_DIR = new Set(['node_modules', 'dist', '.vitepress', '.wrangler']);
const TEXT_EXT = new Set(['.md', '.sh', '.json', '.mjs', '.ts', '.txt', '.html', '.yml', '.yaml']);

const BAD_PATTERNS = [
  // command-line invocation: `cut ` or `$ cut ` or `> cut ` followed by a known subcommand
  /(?<![a-zA-Z_])cut\s+(draft|captions|images|videos|audios|effects|filters|sticker|stickers|keyframes|masks|text-style|query|setup|config|docs)\b/g,
];

async function gatherFiles() {
  const out = [];
  for (const target of SCAN_DIRS) {
    const full = path.join(__root, target);
    let stat;
    try {
      stat = await fs.stat(full);
    } catch {
      continue;
    }
    if (stat.isFile()) {
      out.push(full);
    } else if (stat.isDirectory()) {
      out.push(
        ...(await walk(full, (f) => {
          const parts = f.split(path.sep);
          if (parts.some((p) => SKIP_DIR.has(p))) return false;
          return TEXT_EXT.has(path.extname(f));
        })),
      );
    }
  }
  return out;
}

async function main() {
  const files = await gatherFiles();
  const violations = [];
  for (const f of files) {
    if (path.basename(f) === 'check-command-name.mjs') continue;
    const text = await fs.readFile(f, 'utf8');
    for (const re of BAD_PATTERNS) {
      const matches = text.matchAll(re);
      for (const m of matches) {
        const before = text.slice(0, m.index);
        const line = before.split('\n').length;
        violations.push({ file: path.relative(__root, f), line, snippet: m[0] });
      }
    }
  }
  if (violations.length > 0) {
    console.error('Bare `cut <subcommand>` usage detected; use `cutcli` instead:\n');
    for (const v of violations) {
      console.error(`  ${v.file}:${v.line}  ${v.snippet}`);
    }
    process.exit(1);
  }
  console.log(`OK: no bare 'cut' command found in ${files.length} files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
