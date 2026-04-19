# 02 · Image Slideshow with BGM

> Three portrait images slideshowing 3 s each, crossfade + push transitions, with background music.

[English](README.md) · [简体中文](README.zh.md)

![preview](preview.gif)

> `preview.gif` is not committed yet (CI will require it).

## When to use

- Travel / food / scenic photo-album shorts
- Product image carousel (ecommerce homepage)
- Any "image + music" template scenario

## Run it

```bash
bash run.sh
```

## Key parameters

| Parameter | Value | Why |
|---|---|---|
| 3 s per image | `start`/`end` 3,000,000 μs apart | Common per-image dwell for short video |
| `transition: "叠化"` | image 1 → 2 | Default soft crossfade, fits photo album flow |
| `transition: "推移"` | image 2 → 3 | Slight rhythm change, avoids monotony |
| `transitionDuration: 500000` | 0.5 s | Transition must be ≤ 1/3 of the shorter segment |
| `volume: 0.6` | 60 % | BGM stays in the background, leaving room for voice-over later |

## Customize

### Want a faster pace?

Reduce each image to 2 s:

```json
"start": 0, "end": 2000000
"start": 2000000, "end": 4000000
"start": 4000000, "end": 6000000
```

Update `audio.json` `duration` and `end` to `6000000` to match.

### Want Ken Burns zoom?

See [`05-keyframe-zoom-in`](../05-keyframe-zoom-in/) — use keyframes to slowly tween `scale_x` / `scale_y` per image.

### Use your own images

Replace `imageUrl` in `data/images.json`. Notes:

- Must be a publicly accessible HTTPS URL
- `width` / `height` must match the actual pixel size (cutcli does not auto-detect)
- Recommended CDNs: jsdelivr / GitHub Raw / your own R2 bucket

## cutcli features used

- `cutcli draft create` — portrait canvas
- `cutcli images add` — bulk add images with timing and transitions
- `cutcli audios add` — BGM with volume control
