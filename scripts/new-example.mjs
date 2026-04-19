#!/usr/bin/env node
/**
 * Scaffold a new community example.
 *
 * Usage:
 *   node scripts/new-example.mjs <case-slug> [--author <handle>] [--id <id>]
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'node:url';
import { exists } from './_lib/walk.mjs';

const __filename = fileURLToPath(import.meta.url);
const __root = path.resolve(path.dirname(__filename), '..');

function parseArgs(argv) {
  const out = { positional: [], opts: {} };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      out.opts[a.slice(2)] = argv[i + 1];
      i++;
    } else {
      out.positional.push(a);
    }
  }
  return out;
}

async function ask(rl, question, fallback) {
  const ans = (await rl.question(`${question}${fallback ? ` [${fallback}]` : ''}: `)).trim();
  return ans || fallback || '';
}

async function main() {
  const { positional, opts } = parseArgs(process.argv.slice(2));
  const slug = positional[0];

  if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    console.error('Usage: new-example.mjs <case-slug> [--author <handle>] [--id <id>]');
    console.error('  slug must be lowercase letters, digits, hyphens; start with letter or digit');
    process.exit(2);
  }

  const rl = readline.createInterface({ input, output });
  const author = opts.author ?? (await ask(rl, 'Your GitHub handle', 'your-handle'));
  const title = await ask(rl, 'Case title', slug.replace(/-/g, ' '));
  const description = await ask(rl, 'One-line description', 'TODO');
  const tags = (await ask(rl, 'Tags (comma separated)', 'community')).split(',').map((t) => t.trim()).filter(Boolean);
  const duration = Number(await ask(rl, 'Estimated duration (seconds)', '5')) || 5;
  const resolution = await ask(rl, 'Resolution', '1080x1920');
  rl.close();

  const id = opts.id ?? slug;
  const targetDir = path.join(__root, 'examples', '99-community', author, slug);

  if (await exists(targetDir)) {
    console.error(`Already exists: ${targetDir}`);
    process.exit(1);
  }

  await fs.mkdir(path.join(targetDir, 'data'), { recursive: true });

  const meta = {
    id,
    title,
    tags,
    author,
    duration,
    resolution,
    gif: 'preview.gif',
    description,
    level: 1,
  };
  await fs.writeFile(path.join(targetDir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');

  await fs.writeFile(
    path.join(targetDir, 'run.sh'),
    `#!/usr/bin/env bash
# ${id}: ${description}
# Usage: bash run.sh
set -euo pipefail

if ! command -v cutcli >/dev/null 2>&1; then
  echo "cutcli not found. Install: curl -s https://cutcli.com/cli | bash" >&2
  exit 1
fi
if ! command -v jq >/dev/null 2>&1; then
  echo "jq not found." >&2
  exit 1
fi

HERE="$(cd "$(dirname "$0")" && pwd)"

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "${id}" | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

# TODO: add your content
# cutcli captions add "$DRAFT_ID" --captions "@$HERE/data/captions.json"
# cutcli images   add "$DRAFT_ID" --image-infos "@$HERE/data/images.json"
# cutcli audios   add "$DRAFT_ID" --audio-infos "@$HERE/data/audio.json"

cutcli draft info "$DRAFT_ID" --pretty
`,
  );

  await fs.chmod(path.join(targetDir, 'run.sh'), 0o755);

  await fs.writeFile(
    path.join(targetDir, 'README.md'),
    `# ${title}

> ${description}

[English](README.md) · [简体中文](README.zh.md)

![preview](preview.gif)

> Record \`preview.gif\` (3-8 s, ≤ 3 MB) before opening a PR.

## When to use

- TODO

## Run it

\`\`\`bash
bash run.sh
\`\`\`

## Key parameters

| Parameter | Value | Why |
|---|---|---|
| TODO | TODO | TODO |

## Customize

### Want X?

TODO

## cutcli features used

- \`cutcli draft create\`
- TODO
`,
  );

  await fs.writeFile(
    path.join(targetDir, 'README.zh.md'),
    `# ${title}

> ${description}

[English](README.md) · [简体中文](README.zh.md)

![preview](preview.gif)

> 录好 \`preview.gif\` (3-8s, ≤3MB) 后再提 PR。

## 适用场景

- TODO

## 一行运行

\`\`\`bash
bash run.sh
\`\`\`

## 关键参数解释

| 参数 | 值 | 为什么 |
|---|---|---|
| TODO | TODO | TODO |

## 进阶改造

### 想要 X？

TODO

## 用到的 cutcli 能力

- \`cutcli draft create\`
- TODO
`,
  );

  await fs.writeFile(path.join(targetDir, 'data', '.gitkeep'), '');

  console.log('\nScaffolded:');
  console.log(`  ${path.relative(__root, targetDir)}/`);
  console.log('\nNext steps:');
  console.log(`  1. Edit examples/99-community/${author}/${slug}/run.sh`);
  console.log(`  2. bash examples/99-community/${author}/${slug}/run.sh`);
  console.log(`  3. Record preview.gif (3-8s, ≤3MB) into the same folder`);
  console.log(`  4. node scripts/validate-example.mjs examples/99-community/${author}/${slug}`);
  console.log(`  5. git add . && git commit -m "feat(examples): add ${id}"`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
