# TikTok-style short video

The TikTok / Douyin viral caption rhythm: a new keyword every 2 s, strong visual contrast, bold + bordered text, exaggerated entrance animations.

Full code: [`examples/03-tiktok-keyword-highlight`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/03-tiktok-keyword-highlight) and [`examples/05-keyframe-zoom-in`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/05-keyframe-zoom-in).

## Five caption rules

1. **≤ 12 characters**, no longer than 2 s
2. **Always one keyword highlighted**, color-locked to 1-2 brand colors
3. **White text + black border 1**, always legible
4. **Entrance: slide-up or bounce-in**, never plain fade (too slow)
5. **Position `--transform-y -0.55`**, slightly higher than traditional bottom captions (avoids the UI)

## Command template

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"Today I'\''ll share a secret","start":0,"end":2000000,
   "keyword":"secret","keywordColor":"#FFD600",
   "inAnimation":"弹入跳动","inAnimationDuration":350000},
  {"text":"This trick doubles your output","start":2000000,"end":4000000,
   "keyword":"doubles","keywordColor":"#FF3A6E",
   "inAnimation":"弹入跳动","inAnimationDuration":350000},
  {"text":"Like and save it","start":4000000,"end":6000000,
   "keyword":"Like","keywordColor":"#FF6600",
   "inAnimation":"弹入跳动","inAnimationDuration":350000,
   "outAnimation":"渐隐","outAnimationDuration":250000}
]' --font-size 9 --bold --text-color "#FFFFFF" \
   --border-color "#000000" --border-width 1 --transform-y -0.55
```

## Visuals: image + keyframe push

Pair each caption with an image and a 1.0 → 1.15 zoom keyframe:

```bash
cutcli images add "$DRAFT_ID" --image-infos '[
  {"imageUrl":"...","width":1080,"height":1920,"start":0,"end":2000000},
  {"imageUrl":"...","width":1080,"height":1920,"start":2000000,"end":4000000},
  {"imageUrl":"...","width":1080,"height":1920,"start":4000000,"end":6000000}
]'

# Add a zoom to each image
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

TikTok-style BGM is rhythmic with a clear drop. Time the drop to your **first keyword** (typically 0.5-1 s in) and you get a free sync moment.

```bash
cutcli audios add "$DRAFT_ID" --audio-infos '[
  {"audioUrl":"...","duration":6000000,"start":0,"end":6000000,"volume":0.7}
]'
```

## Bilingual variant (CN + EN on screen)

A different viral pattern: show CN and EN at the same time, offset by `transformY`:

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

> Note: `transform_y` is a per-caption field; the global one is `--transform-y` (kebab-case CLI style).

## Full code

- Keyword captions: [`examples/03-tiktok-keyword-highlight`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/03-tiktok-keyword-highlight)
- Keyframe push: [`examples/05-keyframe-zoom-in`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/05-keyframe-zoom-in)
