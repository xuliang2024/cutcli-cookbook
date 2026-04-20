# Cookbook overview

Each example is a **fully runnable** script with `run.sh`, JSON data, screenshots, and notes. `cd examples/<id>/ && bash run.sh` and the result shows up inside CapCut / Jianying.

## Starter examples (W1)

| Example | Demo | Difficulty |
|---|---|---|
| [01-hello-caption](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/01-hello-caption) | One caption + entrance animation | ⭐ |
| [02-image-slideshow-bgm](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/02-image-slideshow-bgm) | 3-image slideshow + transitions + BGM | ⭐ |
| [03-tiktok-keyword-highlight](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/03-tiktok-keyword-highlight) | Multiple captions with keyword highlight | ⭐ |
| [04-easy-by-audio](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/04-easy-by-audio) | Auto-fit assets to audio length | ⭐ |
| [05-keyframe-zoom-in](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/05-keyframe-zoom-in) | Image + keyframe zoom | ⭐⭐ |

## Scenario tutorials

Step-by-step write-ups grouped by scenario:

- [Make a vlog](./make-a-vlog.md)
- [Product promo (30s)](./product-promo.md)
- [Knowledge science card](./knowledge-card.md)
- [TikTok-style short video](./tiktok-style.md)

## Submit your example

Pull requests welcome. Workflow in [CONTRIBUTING.md](https://github.com/xuliang2024/cutcli-cookbook/blob/main/CONTRIBUTING.md).

The shortest path:

```bash
git clone https://github.com/xuliang2024/cutcli-cookbook.git
cd cutcli-cookbook
node scripts/new-example.mjs my-cool-case
# Edit examples/99-community/<your-handle>/my-cool-case/run.sh
```
