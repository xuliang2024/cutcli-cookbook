# Product promo (30 seconds)

A 30-second product promo template for ecommerce homepages, detail-page banners, and TikTok ads.

Full code: [`examples/10-product-promo-30s`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/10-product-promo-30s).

## The 30-second structure

```text
0────3────────12────────24────30  (seconds)
[title][3 product shots][3 selling pts][CTA]
```

| Time | Content |
|---|---|
| 0-3 s | Product name title, fade-in |
| 3-12 s | 3 product shots, crossfade transitions |
| 12-24 s | 3 selling-point captions, 4 s each, keyword highlight |
| 24-30 s | "Learn more → cutcli.com" CTA, bounce-in |
| Throughout | BGM at volume 0.5 |

## Command sketch

```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')

cutcli images   add "$DRAFT_ID" --image-infos @images.json
cutcli captions add "$DRAFT_ID" --captions    @captions.json \
  --font-size 9 --bold --text-color "#FFFFFF" \
  --border-color "#000000" --border-width 1 --transform-y -0.55
cutcli audios   add "$DRAFT_ID" --audio-infos @audio.json
```

## Why these parameters

| Parameter | Choice | Reason |
|---|---|---|
| Black border + white text | `--border-color "#000" --border-width 1` | Stays legible on any background |
| Highlight colors yellow + pink | `#FFD600` / `#FF3A6E` | High contrast, only 1-2 brand colors |
| Caption `--transform-y -0.55` | Below center but above the bottom | Avoids TikTok's bottom UI |
| BGM at 0.5 | Volume | Leaves room for voice-over |
| 4 s per selling-point caption | `start`/`end` 4 M μs apart | Slower than TikTok pace, easier to read |

## Variants

### 60-second cut

Double every duration, add 2-3 more shots and selling points. Same structure.

### Landscape 16:9 (Bilibili / YouTube)

```bash
cutcli draft create --width 1920 --height 1080
```

Move captions to `--transform-y -0.4` (a bit lower for landscape).

### Add a unifying filter

```bash
cutcli query filters --action search --keyword "暖色" --pretty
cutcli filters add "$DRAFT_ID" --filter-infos '[
  {"filterId":"<id-from-query>","start":0,"end":30000000,"intensity":60}
]'
```

## Full code

[`examples/10-product-promo-30s`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/10-product-promo-30s)
