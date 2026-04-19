# Coordinate system & positioning

Understanding cutcli's coordinate system lets you place captions, images, and stickers exactly where you want.

## Normalized coordinates

cutcli uses **normalized coordinates**: the screen center is the origin `(0, 0)`, X grows to the right, Y grows up. The whole canvas maps to `[-1, 1]` × `[-1, 1]`.

```text
            (0, 1)        ← top of screen
              ↑
              |
(-1, 0) ←   (0,0)   → (1, 0)
              |
              ↓
            (0, -1)       ← bottom of screen
```

Concrete positions:

| Position | transformX | transformY |
|---|---|---|
| Dead center | 0 | 0 |
| Top center | 0 | 0.8 |
| Bottom center | 0 | -0.8 |
| Bottom-left corner | -0.8 | -0.8 |
| Top-right corner | 0.8 | 0.8 |

> Don't push values to `±1` — that's the canvas edge and elements get clipped. Stick to `±0.7 ~ ±0.9`.

## Caption example

Pin a caption to the bottom quarter (the typical short-video position):

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"Caption near the bottom","start":0,"end":3000000}
]' --transform-y -0.7 --font-size 8
```

## Image example

Scale an image to 50 % and place it in the top-right corner:

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

## Scale & rotation

| Field | Meaning | Default |
|---|---|---|
| `scaleX` | X scale, 1.0 = original | 1.0 |
| `scaleY` | Y scale | 1.0 |
| `rotation` | Clockwise rotation in degrees | 0 |

> For uniform scaling, set `scaleX` and `scaleY` to the same value.

## Different canvas sizes

Normalized coordinates are resolution-independent:

- On a 1080×1920 portrait canvas, `(0, -0.8)` is bottom-center
- On a 1920×1080 landscape canvas, `(0, -0.8)` is also bottom-center

But **pixel sizes** (`width` / `height`) need to be sized for your canvas — cutcli doesn't auto-rescale them.

## Position keyframes

Keyframe `position_x` / `position_y` use the same normalized scale:

```bash
cutcli keyframes add "$DRAFT_ID" --keyframes '[
  {"segmentId":"...","property":"position_x","offset":0,"value":-0.5},
  {"segmentId":"...","property":"position_x","offset":2000000,"value":0.5}
]'
```

Effect: the image slides from the left to the right of the screen over 2 s.

## Mapping to CapCut UI's pixel position

CapCut's UI shows positions in **pixels** (origin = top-left of canvas). Conversion:

```text
ui_x = (transformX + 1) / 2 * canvasWidth
ui_y = (1 - transformY) / 2 * canvasHeight    ← Y is inverted
```

Example: on a 1080×1920 canvas, `transformX=0, transformY=-0.7` corresponds to roughly `(540, 1632)` in the CapCut UI.

## Next

- [Keyframes deep dive](/reference/keyframes)
- [Caption parameter reference](/reference/captions)
