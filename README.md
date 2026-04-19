# cutcli-cookbook

> Open-source examples, templates, and docs for [cutcli](https://cutcli.com), the CapCut / Jianying draft CLI.

[English](README.md) · [简体中文](README.zh.md)

[![docs](https://img.shields.io/badge/docs-docs.cutcli.com-blue)](https://docs.cutcli.com)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

cutcli generates standard CapCut / Jianying drafts that the desktop app can open directly. This repo collects ready-to-run examples, reusable JSON templates, AI prompts, and the official documentation source. Contributions welcome.

---

## 30-second start

```bash
# 1. Install cutcli
curl -s https://cutcli.com/cli | bash

# 2. Run the simplest example
git clone https://github.com/xuliang2024/cutcli-cookbook.git
cd cutcli-cookbook/examples/01-hello-caption
bash run.sh

# 3. Open CapCut / Jianying — the new draft is already in the list
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

## Featured P0 examples

| Example | Demo | Length |
|---|---|---|
| [01-hello-caption](examples/01-hello-caption/) | One caption + entrance animation | 5 s |
| [02-image-slideshow-bgm](examples/02-image-slideshow-bgm/) | 3-image slideshow + transitions + BGM | 9 s |
| [03-tiktok-keyword-highlight](examples/03-tiktok-keyword-highlight/) | Multiple captions with keyword highlight | 6 s |
| [04-easy-by-audio](examples/04-easy-by-audio/) | `cutcli draft easy` auto-fits to audio | adaptive |
| [05-keyframe-zoom-in](examples/05-keyframe-zoom-in/) | Image + keyframe zoom | 5 s |

## Contributing

We welcome every kind of contribution:

- Add a new example (easiest — copy a folder and edit, no setup required)
- Translate or improve docs
- Fix a bug
- Submit your work to `showcase/`

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Links

- Website: <https://cutcli.com>
- Docs: <https://docs.cutcli.com>
- Install: `curl -s https://cutcli.com/cli | bash`
- Discussion: [Issues](https://github.com/xuliang2024/cutcli-cookbook/issues) / [Discussions](https://github.com/xuliang2024/cutcli-cookbook/discussions)

## License

[MIT](LICENSE) © 2026 m007 and cutcli-cookbook contributors
