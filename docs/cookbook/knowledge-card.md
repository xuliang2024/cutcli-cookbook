# Knowledge science card

The "3 minutes to learn X" portrait knowledge video. Three principles: **legible captions, steady pacing, visuals that don't compete**.

Full code: [`examples/20-knowledge-science-card`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/20-knowledge-science-card).

## Structure

| Time | Content |
|---|---|
| 0-2s | Title "3 minutes to learn: X" |
| 2-12s | Point 1: one sentence + image + Ken Burns |
| 12-30s | Point 2 |
| 30-50s | Point 3 |
| 50-60s | Recap + CTA |

## The signature visual: caption background card

The defining look for educational portrait video is the **semi-transparent black rounded caption card**. cutcli does it in one CLI flag set:

```bash
cutcli captions add "$DRAFT_ID" --captions @captions.json \
  --font-size 9 --bold --text-color "#FFFFFF" \
  --bg-color "#000000" --bg-alpha 0.55 --bg-style 1 --bg-round 8 \
  --transform-y -0.6
```

| Flag | Meaning |
|---|---|
| `--bg-style 1` | Enable background fill (0 = none) |
| `--bg-color "#000000"` | Background color |
| `--bg-alpha 0.55` | Alpha (0-1) |
| `--bg-round 8` | Corner radius |

## Auto Ken Burns on every image

Each image gets its own zoom. Build the keyframes JSON dynamically in bash:

```bash
SEGMENTS=$(cutcli images list "$DRAFT_ID" | jq -r '.[].segmentId')
KFS="["
i=0
for SEG in $SEGMENTS; do
  if [ $i -gt 0 ]; then KFS="${KFS},"; fi
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_x\",\"offset\":0,\"value\":1.0},"
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_x\",\"offset\":10000000,\"value\":1.15},"
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_y\",\"offset\":0,\"value\":1.0},"
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_y\",\"offset\":10000000,\"value\":1.15}"
  i=$((i + 1))
done
KFS="${KFS}]"
cutcli keyframes add "$DRAFT_ID" --keyframes "$KFS"
```

## Adding voice-over

Knowledge videos almost always have a real voice-over or AI TTS:

```bash
cutcli audios add "$DRAFT_ID" --audio-infos '[
  {"audioUrl":"https://your-cdn/bgm.mp3","duration":60000000,"start":0,"end":60000000,"volume":0.25},
  {"audioUrl":"https://your-cdn/narration.mp3","duration":60000000,"start":0,"end":60000000,"volume":1.0}
]'
```

BGM down to 0.25 so the narration owns the mix.

## Full code

[`examples/20-knowledge-science-card`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/20-knowledge-science-card)
