# Contributing

[English](CONTRIBUTING.md) · [简体中文](CONTRIBUTING.zh.md)

Thanks for your interest in cutcli-cookbook! This page collects every way you can help, plus the must-read rules.

## Three most common ways to contribute

### 1. Add a new example (most welcome)

```bash
git clone https://github.com/xuliang2024/cutcli-cookbook.git
cd cutcli-cookbook
node scripts/new-example.mjs my-cool-case
# Answer a few prompts. The scaffold drops files into examples/99-community/<your-github-handle>/my-cool-case/
```

Then:

1. Edit the generated `run.sh` — combine `cutcli` commands to produce the effect you want
2. Run `bash run.sh` in that folder and verify CapCut / Jianying opens it cleanly
3. Record a 3-8 second `preview.gif` (≤ 3 MB)
4. Fill in `meta.json` (the scaffold leaves you a skeleton)
5. Open a PR. CI validates everything; once merged your example shows up on the homepage gallery

Full rules in [§Example specification](#example-specification) below.

### 2. Translate or improve docs

Everything under `docs/` is plain markdown — edit, open a PR. English is the primary language; `docs/zh/` mirrors it in Chinese.

### 3. Submit to the showcase

If you've built a complete piece with cutcli (video / article / tutorial), open an issue using `.github/ISSUE_TEMPLATE/showcase.yml`. We pick 5-10 monthly entries for [showcase/](showcase/).

---

## Example specification

Every example lives at `examples/<id>-<slug>/` and contains:

```text
examples/<id>-<slug>/
├── README.md       # English: 5 H2 sections — When to use / Run it / Key parameters / Customize / cutcli features used
├── README.zh.md    # Chinese mirror with the original 5 sections
├── run.sh          # set -euo pipefail at the top; idempotent
├── data/*.json     # complex JSON pulled out for cleaner diffs
├── meta.json       # {id, title, tags, author, duration, resolution, gif, description, description_zh}
└── preview.gif     # ≤ 3 MB, ≥ 480p, 3-8 s
```

CI runs `node scripts/validate-example.mjs <path>` and checks:

- `run.sh` exists and is executable
- `meta.json` matches the schema
- Every `data/*.json` is valid JSON
- `README.md` has all 5 English H2s; if `README.zh.md` exists, it must contain all 5 Chinese H2s
- No author-specific local paths or private tokens

### `run.sh` template

```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. Create draft, capture draftId
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

# 2. Add content
cutcli captions add "$DRAFT_ID" --captions @data/captions.json --font-size 8 --bold

# 3. Print the final path so the user can open it
cutcli draft info "$DRAFT_ID"
```

### `meta.json` fields

```json
{
  "id": "01-hello-caption",
  "title": "Hello Caption",
  "tags": ["captions", "animation"],
  "author": "your-github-handle",
  "duration": 5,
  "resolution": "1080x1920",
  "gif": "preview.gif",
  "description": "One-line English description",
  "description_zh": "可选的中文一句话描述"
}
```

---

## Asset usage policy

To keep the repo small and protect against link rot:

- **Images / audio / video** must come from a whitelisted CDN:
  - `https://cutcli.com/...` (cutcli's official CDN)
  - `https://*.r2.dev/...`, `https://*.r2.cloudflarestorage.com/...`
  - `https://cdn.jsdelivr.net/...`
  - `https://*.githubusercontent.com/...`
- Disallowed: private OSS, token-required URLs, plain HTTP, personal cloud drives
- GIFs > 3 MB must be compressed before submission

CI scans every URL in `run.sh` and `data/*.json`.

---

## Command name policy

Every command in docs and scripts must be `cutcli` (not `cut`). CI fails if a bare `cut <subcommand>` slips in.

---

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(examples): add 06-cinematic-title
fix(docs): correct image-animations url
docs(guide): translate first-draft to English
chore(ci): bump wrangler-action to v3.5
```

Types: `feat` / `fix` / `docs` / `chore` / `refactor` / `test`

---

## Code of conduct

By participating you agree to abide by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## FAQ

- **Can I use the contributed examples commercially?** The repo is MIT-licensed; you're responsible for any third-party assets your example references. Use CC0 / public-domain / your own assets only.
- **Can I contribute non-Chinese docs?** Yes. Drop them under `docs/<lang>/`.
- **How do I preview the docs locally?** `npm install && npm run docs:dev`, then visit `http://localhost:5173`.
