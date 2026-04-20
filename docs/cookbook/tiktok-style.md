# TikTok-style short video

The TikTok / Douyin caption rhythm: a new keyword every 2 seconds, strong visual contrast, bold + outline, exaggerated entrance animation.

Full code: [`examples/03-tiktok-keyword-highlight`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/03-tiktok-keyword-highlight) and [`examples/05-keyframe-zoom-in`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/05-keyframe-zoom-in).

## Five caption rules

1. **≤ 12 characters per line**, no longer than 2 seconds
2. **One highlighted keyword per line**, color fixed to 1-2 across the whole video
3. **White text + 1px black outline** — always legible
4. **Use "向上滑入" (slide up) or "弹入跳动" (bounce in)** as entrance, never plain fade (too slow)
5. **Position `--transform-y -0.55`** — slightly higher than the traditional bottom caption (avoids TikTok UI)

## Template

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"今天教大家一个秘密","start":0,"end":2000000,
   "keyword":"秘密","keywordColor":"#FFD600",
   "inAnimation":"弹入跳动","inAnimationDuration":350000},
  {"text":"用这个方法效率翻倍","start":2000000,"end":4000000,
   "keyword":"翻倍","keywordColor":"#FF3A6E",
   "inAnimation":"弹入跳动","inAnimationDuration":350000},
  {"text":"记得点赞收藏","start":4000000,"end":6000000,
   "keyword":"点赞收藏","keywordColor":"#FF6600",
   "inAnimation":"弹入跳动","inAnimationDuration":350000,
   "outAnimation":"渐隐","outAnimationDuration":250000}
]' --font-size 9 --bold --text-color "#FFFFFF" \
   --border-color "#000000" --border-width 1 --transform-y -0.55
```

## Visuals: image + keyframe push-zoom

Pair each caption with an image, animate scale 1.0 → 1.15:

```bash
cutcli images add "$DRAFT_ID" --image-infos '[
  {"imageUrl":"...","width":1080,"height":1920,"start":0,"end":2000000},
  {"imageUrl":"...","width":1080,"height":1920,"start":2000000,"end":4000000},
  {"imageUrl":"...","width":1080,"height":1920,"start":4000000,"end":6000000}
]'

# Push-zoom for each image
SEGS=$(cutcli images list "$DRAFT_ID" | jq -r '.[].segmentId')
for SEG in $SEGS; do
  cutcli keyframes add "$DRAFT_ID" --keyframes "[
    {\"segmentId\":\"$SEG\",\"property\":\"scale_x\",\"offset\":0,\"value\":1.0},
    {\"segmentId\":\"$SEG\",\"property\":\"scale_x\",\"offset\":2000000,\"value\":1.15},
    {\"segmentId\":\"$SEG\",\"property\":\"scale_y\",\"offset\":0,\"value\":1.0},
    {\"segmentId\":\"$SEG\",\"property\":\"scale_y\",\"offset\":2000000,\"value\":1.15}
  ]"
done
```

## Picking BGM

TikTok hits usually have a strong drop. When picking, line up the **drop** with **the moment your first keyword appears** (typically 0.5-1 s in) — that "beat-sync" gives the video extra punch.

```bash
cutcli audios add "$DRAFT_ID" --audio-infos '[
  {"audioUrl":"...","duration":6000000,"start":0,"end":6000000,"volume":0.7}
]'
```

## Bilingual variant (CN + EN simultaneously)

Another viral pattern: same time range, two captions, one Chinese and one English, offset on the Y axis:

```json
[
  {"text":"今天分享一个秘密","start":0,"end":2000000,
   "keyword":"秘密","keywordColor":"#FFD600",
   "fontSize":9,"transform_y":-0.5},
  {"text":"Today's little secret","start":0,"end":2000000,
   "keyword":"secret","keywordColor":"#FFD600",
   "fontSize":7,"transform_y":-0.6}
]
```

> Note: `transform_y` is a per-caption JSON field; the global flag is `--transform-y` (kebab-case).

## Full code

- Keyword captions: [`examples/03-tiktok-keyword-highlight`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/03-tiktok-keyword-highlight)
- Keyframe push-zoom: [`examples/05-keyframe-zoom-in`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/05-keyframe-zoom-in)
