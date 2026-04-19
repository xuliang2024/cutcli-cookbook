# cutcli-cookbook

> Open-source examples, templates and docs for [cutcli](https://cutcli.com), the CapCut / Jianying draft CLI.

[![docs](https://img.shields.io/badge/docs-docs.cutcli.com-blue)](https://docs.cutcli.com)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

cutcli generates standard CapCut drafts that the desktop app can open directly. This repo collects ready-to-run examples, reusable JSON templates, AI prompts and the official documentation source. Contributions welcome.

---

## 30-second start

```bash
# 1. Install cutcli
curl -s https://cutcli.com/cli | bash

# 2. Run the simplest example
git clone https://github.com/m007/cutcli-cookbook.git
cd cutcli-cookbook/examples/01-hello-caption
bash run.sh

# 3. Open CapCut/Jianying — your new draft is already in the list
```

Full guide: <https://docs.cutcli.com/guide/installation>

## What's inside

| Directory | Purpose |
|---|---|
| [`examples/`](examples/) | One-shot runnable examples (each with `run.sh` + `README.md` + `preview.gif`) |
| [`templates/`](templates/) | Reusable JSON snippets (caption / animation / filter presets) |
| [`prompts/`](prompts/) | Prompts for Cursor / Claude / ChatGPT to drive cutcli |
| [`docs/`](docs/) | VitePress source for docs.cutcli.com |
| [`showcase/`](showcase/) | Monthly community showcase |
| [`worker/`](worker/) | Cloudflare Worker (R2 reverse proxy with SPA fallback) |

## License

[MIT](LICENSE)
