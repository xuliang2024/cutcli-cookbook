# Coordinate system & positioning

Knowing the coordinate system lets you place captions, images, and stickers exactly where you want.

## Normalized coordinates

cutcli uses **normalized coordinates**: the screen center is the origin `(0, 0)`, X is positive going right, Y is positive going up. The entire canvas maps to `[-1, 1] × [-1, 1]`.

```text
            (0, 1)        ← top of screen
              ↑
              |
(-1, 0) ←   (0,0)   → (1, 0)
              |
              ↓
            (0, -1)       ← bottom of screen
```

Common spots:

| Position | transformX | transformY |
|---|---|---|
| Center | 0 | 0 |
| Top-center | 0 | 0.8 |
| Bottom-center | 0 | -0.8 |
| Bottom-left corner | -0.8 | -0.8 |
| Top-right corner | 0.8 | 0.8 |

> Avoid `±1` — that's the canvas edge and elements will be clipped. Use `±0.7 ~ ±0.9` for "near edge".

## Caption example

Pin a caption to the lower quarter (typical short-video position):

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"Bottom caption","start":0,"end":3000000}
]' --transform-y -0.7 --font-size 8
```

## Image example

Scale an image to 50 % and stick it to the top-right:

```bash
cutcli images add "$DRAFT_ID" --image-infos '[
  {
    "imageUrl":"https://cutcli.com/assets/demo/logo.png",
    "width":400,"height":400,
    "start":0,"end":3000000,
    "transformX":0.6,
    "transformY":0.7,
    "scaleX":0.5,
    "scaleY":0.5
  }
]'
```

## Scale and rotation

| Field | Meaning | Default |
|---|---|---|
| `scaleX` | Scale on X axis, 1.0 = original | 1.0 |
| `scaleY` | Scale on Y axis | 1.0 |
| `rotation` | Clockwise rotation, in degrees | 0 |

> For uniform scale set X and Y to the same value.

## Canvases of different ratios

Normalized coordinates are independent of resolution:

- On a 1080×1920 (portrait) canvas, `(0, -0.8)` = bottom-center
- On a 1920×1080 (landscape) canvas, `(0, -0.8)` = bottom-center too

But pixel sizes (`width` / `height`) you must scale yourself; cutcli won't auto-fit.

## Position keyframes

Keyframe properties `position_x` / `position_y` use the same normalized coordinates:

```bash
cutcli keyframes add "$DRAFT_ID" --keyframes '[
  {"segmentId":"...","property":"position_x","offset":0,"value":-0.5},
  {"segmentId":"...","property":"position_x","offset":2000000,"value":0.5}
]'
```

Effect: the image slides from the left edge to the right edge over 2 seconds.

## Cross-reference: CapCut UI "position"

CapCut's UI shows position in **pixel coordinates** with origin at the canvas top-left. Conversion:

```text
ui_x = (transformX + 1) / 2 * canvasWidth
ui_y = (1 - transformY) / 2 * canvasHeight    ← Y flipped
```

Example: 1080×1920 canvas, cutcli's `(transformX=0, transformY=-0.7)` ≈ CapCut UI `(540, 1632)`.

## What's next

- [Keyframes detail](/reference/keyframes)
- [Caption parameter reference](/reference/captions)
