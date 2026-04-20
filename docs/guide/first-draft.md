# Build your first draft in 30 minutes

After this page you can:

- Create your first CapCut/Jianying draft
- Add a caption, an image, and a music track
- Animate scale with a keyframe
- Pack the draft and share it with someone else

No code required, just `cutcli` commands.

## Prep

Make sure cutcli is installed:

```bash
cutcli --version
```

If that fails, see [Installation](./installation.md).

## Step 1 · Create a draft

```bash
cutcli draft create --width 1080 --height 1920
```

You get something like:

```json
{
  "draftId": "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
  "filePath": "/Users/you/Movies/CapCut/.../a1b2c3d4-..."
}
```

Copy the `draftId`. Every following command uses it. Save it as an env var for convenience:

```bash
DRAFT_ID="a1b2c3d4-e5f6-7890-abcd-1234567890ab"
```

::: tip One-liner to capture draftId
```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')
```
:::

Open CapCut. A new empty draft should now show in the draft list.

## Step 2 · Add a caption

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"My first cutcli draft","start":0,"end":3000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold --text-color "#FFFFFF"
```

Things to know:

- Time is **microseconds**: `3000000` = 3 s, `500000` = 0.5 s. See [Time units](./time-units.md)
- `inAnimation` is the entrance animation name. List options with `cutcli query text-animations --type in --pretty`. The names are Chinese strings (CapCut's native naming, e.g. `渐显` = "fade in")

## Step 3 · Add a background image

```bash
cutcli images add "$DRAFT_ID" --image-infos '[
  {
    "imageUrl":"https://cutcli.com/assets/demo/sunset.jpg",
    "width":1080,
    "height":1920,
    "start":0,
    "end":5000000,
    "inAnimation":"轻微放大",
    "inAnimationDuration":1000000
  }
]'
```

cutcli auto-downloads the image into the draft's `resources/` folder, so CapCut works offline once opened.

## Step 4 · Add background music

```bash
cutcli audios add "$DRAFT_ID" --audio-infos '[
  {
    "audioUrl":"https://cutcli.com/assets/demo/bgm-light.mp3",
    "duration":5000000,
    "start":0,
    "end":5000000,
    "volume":0.5
  }
]'
```

## Step 5 · Add a keyframe scale

First grab the segmentId of that image with `cutcli images list "$DRAFT_ID"`, then:

```bash
SEG_ID="<the segmentId you saw above>"

cutcli keyframes add "$DRAFT_ID" --keyframes "[
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_x\",\"offset\":0,\"value\":1.0},
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_x\",\"offset\":5000000,\"value\":1.3},
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_y\",\"offset\":0,\"value\":1.0},
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_y\",\"offset\":5000000,\"value\":1.3}
]"
```

Refresh the draft in CapCut (close + reopen) — the background image now slowly zooms from 100 % to 130 % across 5 seconds.

## Step 6 · Inspect what you built

```bash
cutcli draft info "$DRAFT_ID" --pretty
```

You should see:

```json
{
  "canvasWidth": 1080,
  "canvasHeight": 1920,
  "duration": 5000000,
  "trackSummary": [...],
  "materialSummary": {
    "videos": 0,
    "audios": 1,
    "texts": 1,
    "images": 1
  }
}
```

## Step 7 · Share with a friend

```bash
cutcli draft upload "$DRAFT_ID"
```

The returned `downloadUrl` is a public zip link. Your friend downloads, unzips into their own CapCut draft directory, and CapCut opens it directly.

## Putting it all together

The same flow as one runnable `run.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')
echo "Draft: $DRAFT_ID"

cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"My first cutcli draft","start":0,"end":3000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold

cutcli images add "$DRAFT_ID" --image-infos '[
  {"imageUrl":"https://cutcli.com/assets/demo/sunset.jpg",
   "width":1080,"height":1920,"start":0,"end":5000000,
   "inAnimation":"轻微放大","inAnimationDuration":1000000}
]'

cutcli audios add "$DRAFT_ID" --audio-infos '[
  {"audioUrl":"https://cutcli.com/assets/demo/bgm-light.mp3",
   "duration":5000000,"start":0,"end":5000000,"volume":0.5}
]'

cutcli draft info "$DRAFT_ID" --pretty
```

## What's next

- Browse fuller [examples](/cookbook/index)
- Read more about [keyframes](/reference/keyframes)
- Let AI write commands for you: [AI tools integration](./ai-integration.md)
