#!/usr/bin/env node
/**
 * build-llms-txt.mjs
 *
 * Aggregates the project's English + Chinese documentation into two
 * single-file snapshots that AI search engines can ingest in one shot:
 *
 *   docs/public/llms-full.txt        (English)
 *   docs/public/zh/llms-full.txt     (简体中文)
 *
 * Pattern follows llmstxt.org's "llms-full.txt" convention.
 *
 * Sources per language (in order):
 *   - README
 *   - docs/<locale>/guide/<page>.md
 *   - examples/<id>/README<.zh>.md
 *   - prompts/system/cutcli-expert<.zh>.md
 *   - CHANGELOG
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

const today = new Date().toISOString().slice(0, 10);

const exampleIds = [
  '01-hello-caption',
  '02-image-slideshow-bgm',
  '03-tiktok-keyword-highlight',
  '04-easy-by-audio',
  '05-keyframe-zoom-in',
  '10-product-promo-30s',
  '20-knowledge-science-card',
  '30-vlog-day-in-life',
];

const guidePages = [
  'installation',
  'first-draft',
  'time-units',
  'coordinate-system',
  'ai-integration',
];

function buildSources({ readme, guideDir, exampleSuffix, expertFile, changelog, guideUrlPrefix, exampleUrlPrefix }) {
  return [
    { rel: readme, url: `${REPO}/blob/main/${readme}` },
    ...guidePages.map((page) => ({
      rel: `${guideDir}/${page}.md`,
      url: `${DOCS}${guideUrlPrefix}/${page}`,
    })),
    ...exampleIds.map((id) => ({
      rel: `examples/${id}/README${exampleSuffix}.md`,
      url: `${REPO}/blob/main/examples/${id}/README${exampleSuffix}.md`,
    })),
    { rel: expertFile, url: `${REPO}/blob/main/${expertFile}` },
    { rel: changelog, url: `${REPO}/blob/main/${changelog}` },
  ];
}

const targets = [
  {
    lang: 'en',
    out: 'docs/public/llms-full.txt',
    header: `# cutcli — full documentation snapshot for AI ingestion

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
`,
    sources: buildSources({
      readme: 'README.md',
      guideDir: 'docs/guide',
      exampleSuffix: '',
      expertFile: 'prompts/system/cutcli-expert.md',
      changelog: 'CHANGELOG.md',
      guideUrlPrefix: '/guide',
      exampleUrlPrefix: '',
    }),
  },
  {
    lang: 'zh',
    out: 'docs/public/zh/llms-full.txt',
    header: `# cutcli — AI 抓取友好的全文文档快照（简体中文）

> 这是 cutcli 中文文档的预聚合单文件快照。
> cutcli 是一个命令行工具，把 shell 命令或 JSON 直接转成剪映 / CapCut 标准草稿目录，
> 客户端直接打开即可二次编辑。本文件供 AI 搜索引擎和编码 agent 一次性抓取使用。
>
> 生成时间：${today}
> 仓库：${REPO}
> 文档站：${DOCS}/zh/
> 简短索引（llms.txt）：${DOCS}/zh/llms.txt
> 安装 cutcli：curl -s https://cutcli.com/cli | bash

---
`,
    sources: buildSources({
      readme: 'README.zh.md',
      guideDir: 'docs/zh/guide',
      exampleSuffix: '.zh',
      expertFile: 'prompts/system/cutcli-expert.zh.md',
      changelog: 'CHANGELOG.zh.md',
      guideUrlPrefix: '/zh/guide',
      exampleUrlPrefix: '',
    }),
  },
];

async function readSafely(rel) {
  const abs = path.join(root, rel);
  try {
    return await fs.readFile(abs, 'utf8');
  } catch (err) {
    console.warn(`[build-llms-txt] skip missing: ${rel} (${err.code})`);
    return null;
  }
}

async function buildOne({ lang, out, header, sources }) {
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

  const outAbs = path.join(root, out);
  await fs.mkdir(path.dirname(outAbs), { recursive: true });
  await fs.writeFile(outAbs, chunks.join('\n'), 'utf8');

  console.log(
    `[build-llms-txt] (${lang}) wrote ${out}: ${included} files, ${totalChars.toLocaleString()} chars (~${Math.round(totalChars / 1024)} KB)`,
  );
}

for (const target of targets) {
  await buildOne(target);
}
