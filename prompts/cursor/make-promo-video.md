---
title: One-liner product promo in Cursor
author: m007
target: cursor
tags: [marketing, promo, cursor]
license: MIT
---

# One-liner product promo in Cursor

[English](make-promo-video.md) · [简体中文](make-promo-video.zh.md)

> Paste the prompt below into Cursor's "Rules for AI" or send it to the agent directly.

## Prompt

I want to make a **30-second product promo** with cutcli. Generate a complete `run.sh` following the structure below.

### 1. Inputs

- Product name: `{product}`
- One-line selling point: `{selling-point}`
- Target audience: `{audience}`
- 3 product image URLs (must be public HTTPS):
  - `{img1}`
  - `{img2}`
  - `{img3}`
- BGM URL: `{bgm}` (fall back to `https://cutcli.com/assets/demo/bgm-light.mp3` if blank)

### 2. Video structure (follow this timeline strictly)

| Time | Content |
|---|---|
| 0-3 s | Title caption: "{product}" centered, large, bold, fade-in |
| 3-12 s | 3 images, 3 s each, crossfade transitions |
| 12-24 s | 3 selling-point captions in sequence with keyword highlight |
| 24-30 s | CTA: "Learn more" + a soft background image |
| Throughout | BGM at volume 0.5 |

### 3. Output requirements

- Full bash script (start with `set -euo pipefail`)
- Pull complex JSON into `data/*.json` files (`--captions @data/...`)
- Emit `meta.json` (per the cutcli-cookbook spec)
- Emit `README.md` (5 sections: Effect / When to use / Run it / Key parameters / Customize)

### 4. Command reference

- The command name is `cutcli` (not `cut`)
- Time unit: microseconds, 1 s = 1,000,000
- Captions: `cutcli captions add` + `--captions <json>` + global style (`--font-size`, `--bold`, `--text-color`, `--transform-y`)
- Images: `cutcli images add` + `--image-infos <json>`, supports `transition` / `transitionDuration`
- Audios: `cutcli audios add` + `--audio-infos <json>`, supports `volume`
- Full reference: <https://docs.cutcli.com/reference/cli>

### 5. Style conventions

- All captions bold, white #FFFFFF + 1 px black border
- Highlight color: pick #FFD600 (yellow) or #FF3A6E (pink) and stay consistent
- Caption position `--transform-y -0.55` (slightly below center)

Generate the code directly — don't ask me follow-up questions first.
