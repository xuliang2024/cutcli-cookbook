# 20 · Knowledge Science Card (60s)

> 60-second portrait knowledge video: title → 3 key points → wrap-up. Each image gets an automatic Ken Burns zoom; captions sit on a translucent background card.

[English](README.md) · [简体中文](README.zh.md)

![preview](preview.gif)

> `preview.gif` is not committed yet — CI will require it.

## When to use

- "3 minutes to understand X" knowledge creators
- Tutorial-style portrait content
- Short-video adaptations of articles or newsletters

## Run it

```bash
bash run.sh
```

## Key parameters

| Parameter | Value | Why |
|---|---|---|
| Total length 60 s | 4 image segments + 5 captions | Typical knowledge-card length |
| Caption background card `--bg-color #000 --bg-alpha 0.55 --bg-round 8` | Translucent rounded black | Signature look; captions stay legible on any background |
| `--bg-style 1` | Filled | 0 = none; 1 = filled |
| Ken Burns 1.0 → 1.15 over 10 s per image | Per-segment | Prevents static frames; computes each segmentId individually |
| Highlight colors `#FFD600` / `#FF3A6E` | Two brand colors | Use only 1-2 emphasis colors throughout |
| `volume: 0.4` | Low | Knowledge videos usually carry voice-over; BGM can't compete |

## Customize

### Add voice-over

Update `data/audio.json` to two tracks: BGM + narration.

```json
[
  {"audioUrl":"https://cutcli.com/assets/demo/bgm-light.mp3","duration":60000000,"start":0,"end":60000000,"volume":0.25},
  {"audioUrl":"https://your-cdn.com/narration.mp3","duration":60000000,"start":0,"end":60000000,"volume":1.0}
]
```

### Change the font

Add a global option:

```bash
cutcli captions add "$DRAFT_ID" --captions @data/captions.json \
  --font "PingFang SC" --font-size 9 ...
```

### Add a progress-bar sticker

`cutcli sticker add` a bottom progress bar plus keyframes that take `scale_x` from 0 → 1.

## cutcli features used

- `cutcli draft create` — portrait canvas
- `cutcli images add` + `images list` — add images, then look up segmentIds
- `cutcli keyframes add` — independent Ken Burns per segment
- `cutcli captions add` — caption background card + keyword highlight
- `cutcli audios add` — multi-track audio mix
- bash loop to build JSON dynamically
