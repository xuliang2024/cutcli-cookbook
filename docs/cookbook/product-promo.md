# Product promo (30s)

The 30-second product promo template you'll see on e-commerce home pages, detail page banners, and TikTok ads.

Full code: [`examples/10-product-promo-30s`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/10-product-promo-30s).

## Golden 30 seconds

```text
0────3────────12────────24────30  (seconds)
[title][product loop x3][benefits x3][CTA]
```

| Time | Content |
|---|---|
| 0-3s | Product name title, fade in |
| 3-12s | 3 product images cycling, dissolve transitions |
| 12-24s | 3 benefit captions, 4 s each, keyword highlight |
| 24-30s | "Learn more → cutcli.com" CTA, bouncy entrance |
| Whole | BGM at 0.5 volume |

## Command set

```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')

cutcli images   add "$DRAFT_ID" --image-infos @images.json
cutcli captions add "$DRAFT_ID" --captions    @captions.json \
  --font-size 9 --bold --text-color "#FFFFFF" \
  --border-color "#000000" --border-width 1 --transform-y -0.55
cutcli audios   add "$DRAFT_ID" --audio-infos @audio.json
```

## Why these parameters

| Choice | Rationale |
|---|---|
| Black 1px border + white text | Readable on any background |
| Highlight `#FFD600` and `#FF3A6E` | High-contrast accent, only 1-2 colors across the whole video |
| Caption `--transform-y -0.55` | Slightly above bottom — avoids TikTok UI |
| BGM 0.5 | Leaves headroom if you add VO in post |
| 4 s per benefit caption | Slower than TikTok pacing — viewer has time to absorb |

## Variants

### 60 s edition

Double every `start` / `end` value. Add 2-3 more images and 2-3 more benefits. Structure unchanged.

### 16:9 landscape (Bilibili / YouTube)

```bash
cutcli draft create --width 1920 --height 1080
```

Move captions to `--transform-y -0.4` (landscape captions sit further down).

### Add a unifying filter

```bash
cutcli query filters --action search --keyword "暖色" --pretty
cutcli filters add "$DRAFT_ID" --filter-infos '[
  {"filterId":"<id-from-query>","start":0,"end":30000000,"intensity":60}
]'
```

## Full code

[`examples/10-product-promo-30s`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/10-product-promo-30s)
