#!/usr/bin/env node
/**
 * build-llms-txt.mjs
 *
 * Aggregates the project's English documentation into a single text file:
 *   docs/public/llms-full.txt
 *
 * Following the llmstxt.org "llms-full.txt" pattern: one pre-flattened file
 * that AI search engines (ChatGPT, Claude, Perplexity, Gemini, …) can ingest
 * in one shot, instead of crawling the docs site page by page.
 *
 * Sources (in order):
 *   - README.md
 *   - docs/guide/<page>.md
 *   - examples/<id>/README.md
 *   - prompts/system/cutcli-expert.md
 *   - CHANGELOG.md
 *
 * Run via:  npm run build:llms
 * (auto-invoked by `npm run docs:build`)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dir = path.dirname(__filename);
const root = path.resolve(__dir, '..');

const REPO = 'https://github.com/xuliang2024/cutcli-cookbook';
const DOCS = 'https://docs.cutcli.com';
const OUT = path.join(root, 'docs/public/llms-full.txt');

const sources = [
  { rel: 'README.md', url: `${REPO}/blob/main/README.md` },
  { rel: 'docs/guide/installation.md', url: `${DOCS}/guide/installation` },
  { rel: 'docs/guide/first-draft.md', url: `${DOCS}/guide/first-draft` },
  { rel: 'docs/guide/time-units.md', url: `${DOCS}/guide/time-units` },
  { rel: 'docs/guide/coordinate-system.md', url: `${DOCS}/guide/coordinate-system` },
  { rel: 'docs/guide/ai-integration.md', url: `${DOCS}/guide/ai-integration` },
  { rel: 'examples/01-hello-caption/README.md', url: `${REPO}/blob/main/examples/01-hello-caption/README.md` },
  { rel: 'examples/02-image-slideshow-bgm/README.md', url: `${REPO}/blob/main/examples/02-image-slideshow-bgm/README.md` },
  { rel: 'examples/03-tiktok-keyword-highlight/README.md', url: `${REPO}/blob/main/examples/03-tiktok-keyword-highlight/README.md` },
  { rel: 'examples/04-easy-by-audio/README.md', url: `${REPO}/blob/main/examples/04-easy-by-audio/README.md` },
  { rel: 'examples/05-keyframe-zoom-in/README.md', url: `${REPO}/blob/main/examples/05-keyframe-zoom-in/README.md` },
  { rel: 'examples/10-product-promo-30s/README.md', url: `${REPO}/blob/main/examples/10-product-promo-30s/README.md` },
  { rel: 'examples/20-knowledge-science-card/README.md', url: `${REPO}/blob/main/examples/20-knowledge-science-card/README.md` },
  { rel: 'examples/30-vlog-day-in-life/README.md', url: `${REPO}/blob/main/examples/30-vlog-day-in-life/README.md` },
  { rel: 'prompts/system/cutcli-expert.md', url: `${REPO}/blob/main/prompts/system/cutcli-expert.md` },
  { rel: 'CHANGELOG.md', url: `${REPO}/blob/main/CHANGELOG.md` },
];

const today = new Date().toISOString().slice(0, 10);

const header = `# cutcli — full documentation snapshot for AI ingestion

> Pre-aggregated, single-file snapshot of the cutcli English documentation.
> cutcli turns shell commands or JSON into a standard CapCut / Jianying (剪映)
> draft folder that the desktop app opens directly. This file is intended for
> AI search engines and coding agents to ingest in one shot.
>
> Generated: ${today}
> Source repository: ${REPO}
> Docs site: ${DOCS}
> Short index (llms.txt): ${DOCS}/llms.txt
> Install cutcli: curl -s https://cutcli.com/cli | bash

---
`;

async function readSafely(rel) {
  const abs = path.join(root, rel);
  try {
    return await fs.readFile(abs, 'utf8');
  } catch (err) {
    console.warn(`[build-llms-txt] skip missing: ${rel} (${err.code})`);
    return null;
  }
}

const chunks = [header];
let included = 0;
let totalChars = header.length;

for (const src of sources) {
  const body = await readSafely(src.rel);
  if (body == null) continue;
  const block = [
    '',
    `<!-- ============================================================ -->`,
    `## File: ${src.rel}`,
    `Source: ${src.url}`,
    `<!-- ============================================================ -->`,
    '',
    body.trimEnd(),
    '',
  ].join('\n');
  chunks.push(block);
  included++;
  totalChars += block.length;
}

await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, chunks.join('\n'), 'utf8');

console.log(
  `[build-llms-txt] wrote ${path.relative(root, OUT)}: ${included} files, ${totalChars.toLocaleString()} chars (~${Math.round(totalChars / 1024)} KB)`,
);
