# 10 · Product Promo (30s)

> 30-second ecommerce product promo: opening title → 3-image product carousel → 3 selling-point captions with keyword highlight → closing CTA.

[English](README.md) · [简体中文](README.zh.md)

![preview](preview.gif)

> `preview.gif` is not committed yet — CI will require it.

## When to use

- Ecommerce homepage product video, detail-page banner
- TikTok / Douyin / RedBook ad creatives
- Any "30 seconds to pitch one product" template need

## Run it

```bash
bash run.sh
```

## Key parameters

| Parameter | Value | Why |
|---|---|---|
| Total length 30 s | `end: 30000000` | Maxes out most ad-platform limits |
| 0-3 s opening | Title + first image | Hook in the first 3 seconds |
| 3-12 s middle | 3 images × 3 s with crossfade | Show the product from multiple angles |
| 12-24 s late middle | 3 selling-point captions, keyword highlight | 4 s each — slow enough to read |
| 24-30 s closing | CTA | 6 s for the call-to-action to land |
| `volume: 0.5` | BGM 50 % | Leaves room for voice-over later |
| Caption `--transform-y -0.55` | 55 % below center | Avoids the TikTok bottom UI |
| Border 1 + black | Always legible | Works on any background |
| Highlight colors `#FFD600` / `#FF3A6E` | High contrast | Pick 1-2 brand colors and stay consistent |

## Customize

### Want a 60-second version?

Double every `start` / `end` and add 2-3 more images and selling-point captions.

### Swap assets

Replace `imageUrl` in `data/images.json` with your own product images (must be public HTTPS, with `width` / `height` matching the actual pixel size).

### Add a unifying filter

```bash
cutcli filters add "$DRAFT_ID" --filter-infos '[
  {"filterId":"REPLACE_BY_QUERY","start":0,"end":30000000,"intensity":60}
]'
```

Find the filter ID first via `cutcli query filters --action search --keyword "warm" --pretty`.

### Add a product logo sticker

Borrow from [05-keyframe-zoom-in](../05-keyframe-zoom-in/) — drop a logo in the top-right corner with a keyframe animation.

## cutcli features used

- `cutcli draft create` — portrait canvas
- `cutcli images add` — multiple images + transitions + entrance animations
- `cutcli captions add` — multiple captions + keyword highlight + entrance animation
- `cutcli audios add` — BGM volume control
- File + JSON workflow (`--captions @data/captions.json`)
