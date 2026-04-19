# Knowledge science card

The "3 minutes to understand X" portrait video format. Priorities: **legible captions, steady pacing, calm visuals**.

Full code: [`examples/20-knowledge-science-card`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/20-knowledge-science-card).

## Structure

| Time | Content |
|---|---|
| 0-2 s | Title "3 minutes to understand X" |
| 2-12 s | Point 1: one sentence + image + Ken Burns |
| 12-30 s | Point 2 |
| 30-50 s | Point 3 |
| 50-60 s | Wrap-up + CTA |

## Caption background card (the signature look)

The signature visual of knowledge cards is the **rounded translucent black caption card**. cutcli covers it in one line:

```bash
cutcli captions add "$DRAFT_ID" --captions @captions.json \
  --font-size 9 --bold --text-color "#FFFFFF" \
  --bg-color "#000000" --bg-alpha 0.55 --bg-style 1 --bg-round 8 \
  --transform-y -0.6
```

| Parameter | Meaning |
|---|---|
| `--bg-style 1` | Enable background fill (0 = none) |
| `--bg-color "#000000"` | Background color |
| `--bg-alpha 0.55` | Background transparency (0-1) |
| `--bg-round 8` | Corner radius |

## Auto-Ken-Burns every image

Every image gets its own zoom for visual energy. Build the keyframes JSON in bash:

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

Knowledge videos usually have a real voice-over or AI narration:

```bash
cutcli audios add "$DRAFT_ID" --audio-infos '[
  {"audioUrl":"https://your-cdn/bgm.mp3","duration":60000000,"start":0,"end":60000000,"volume":0.25},
  {"audioUrl":"https://your-cdn/narration.mp3","duration":60000000,"start":0,"end":60000000,"volume":1.0}
]'
```

BGM goes down to 0.25 to let the narration lead.

## Full code

[`examples/20-knowledge-science-card`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/20-knowledge-science-card)
