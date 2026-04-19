# 05 · Keyframe Zoom-in (Ken Burns)

> Image + keyframes on `scale_x` / `scale_y`, slowly zooming from 1.0 to 1.3 over 5 s — the classic Ken Burns effect.

[English](README.md) · [简体中文](README.zh.md)

![preview](preview.gif)

> `preview.gif` is not committed yet (CI will require it).

## When to use

- Make static photos feel "alive" instead of frozen
- Travel / scenery / portrait photo videos
- Documentary intro templates

## Run it

```bash
bash run.sh
```

`run.sh` does:

1. Create a portrait draft
2. Add one 5-second image
3. **Use `cutcli images list` to fetch that image's `segmentId`**
4. Use `jq` to replace `__SEG_ID__` in `keyframes.template.json` with the real ID
5. `cutcli keyframes add` writes the keyframes

## Key parameters

| Parameter | Value | Why |
|---|---|---|
| `property: "scale_x"` + `"scale_y"` | Both required | Otherwise the image distorts |
| `offset: 0, value: 1.0` | Start | Original size |
| `offset: 5000000, value: 1.3` | End | Zoom to 1.3× over 5 s — gentle, doesn't distract |
| Easing | Linear (default) | Linear feels most natural for Ken Burns; tweak via `easing` if you want |

## Why split out `segmentId`?

cutcli keyframes bind to a specific segment, so **you must add the segment first, then add keyframes**. The script automates this with the template + jq trick so you don't manually copy IDs.

## Customize

### "Zoom + pan"

Add `position_x` keyframes:

```json
{"segmentId": "...", "property": "position_x", "offset": 0,       "value": -0.1},
{"segmentId": "...", "property": "position_x", "offset": 5000000, "value":  0.1}
```

The image now zooms while drifting from left to right.

### "Zoom + rotate"

```json
{"segmentId": "...", "property": "rotation", "offset": 0,       "value": 0},
{"segmentId": "...", "property": "rotation", "offset": 5000000, "value": 5}
```

A subtle 5-degree tilt over 5 s adds dynamic tension.

### "Zoom in, then zoom back out"

Add a middle keyframe:

```json
{"segmentId": "...", "property": "scale_x", "offset": 0,       "value": 1.0},
{"segmentId": "...", "property": "scale_x", "offset": 2500000, "value": 1.4},
{"segmentId": "...", "property": "scale_x", "offset": 5000000, "value": 1.0}
```

## cutcli features used

- `cutcli images add` — add image
- `cutcli images list` — fetch the segment ID just created
- `cutcli keyframes add` — add keyframes
- Template + jq replacement pattern (reusable for every keyframe example)
