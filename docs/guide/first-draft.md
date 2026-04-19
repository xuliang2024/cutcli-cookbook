# Build your first draft in 30 minutes

After this page you'll be able to:

- Create your first CapCut / Jianying draft
- Add a caption, an image, and a piece of background music
- Animate a zoom with keyframes
- Package and share the draft with someone else

No code required — just `cutcli` commands.

## Prerequisites

Confirm cutcli is installed:

```bash
cutcli --version
```

If this errors out, see [Installation](./installation.md).

## Step 1: Create the draft

```bash
cutcli draft create --width 1080 --height 1920
```

Output looks like:

```json
{
  "draftId": "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
  "filePath": "/Users/you/Movies/CapCut/.../a1b2c3d4-..."
}
```

Copy the `draftId`; every subsequent command needs it. Save it as an env var for convenience:

```bash
DRAFT_ID="a1b2c3d4-e5f6-7890-abcd-1234567890ab"
```

::: tip One-liner: capture draftId
```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')
```
:::

Open CapCut / Jianying and you'll see a new empty draft in the list.

## Step 2: Add a caption

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"My first cutcli draft","start":0,"end":3000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold --text-color "#FFFFFF"
```

Notes:

- Time is in **microseconds**: `3000000` = 3 s, `500000` = 0.5 s. See [Time units](./time-units.md).
- `inAnimation` is the entrance animation name. Run `cutcli query text-animations --type in --pretty` to list every option.
- Animation names are Chinese strings shipped with CapCut (`渐显` = fade-in, `轻微放大` = subtle zoom, etc.). They work in every locale.

## Step 3: Add a background image

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

cutcli downloads the image into the draft's `resources/` folder, so the draft works offline once opened.

## Step 4: Add background music

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

## Step 5: Animate a zoom with keyframes

First grab the image's `segmentId` with `cutcli images list "$DRAFT_ID"`, then:

```bash
SEG_ID="<the segmentId you just listed>"

cutcli keyframes add "$DRAFT_ID" --keyframes "[
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_x\",\"offset\":0,\"value\":1.0},
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_x\",\"offset\":5000000,\"value\":1.3},
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_y\",\"offset\":0,\"value\":1.0},
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_y\",\"offset\":5000000,\"value\":1.3}
]"
```

Refresh the draft inside CapCut (close and reopen) — the background slowly scales from 100 % to 130 % over 5 s.

## Step 6: Inspect the result

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

## Step 7: Share the draft

```bash
cutcli draft upload "$DRAFT_ID"
```

The returned `downloadUrl` is a public zip link. The recipient unzips it into their own CapCut drafts directory and opens it directly.

## Full script

Wire all the commands into a single `run.sh`:

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

## Next

- More involved [examples](/cookbook/index)
- More on [keyframes](/reference/keyframes)
- Drive cutcli from AI tools: [AI integrations](./ai-integration.md)
