# 04 · Easy by Audio Duration

> Use `cutcli draft easy` — one command auto-fits an image + caption + BGM to an audio's duration.

[English](README.md) · [简体中文](README.zh.md)

![preview](preview.gif)

> `preview.gif` is not committed yet (CI will require it).

## When to use

- Voice-over already recorded; you need the visuals to match its length
- Poetry / book reading / podcast cuts
- Any "I have an audio, just lay an image under it" scenario

## Run it

```bash
bash run.sh
```

`draft easy` will:

1. Download the audio and detect its duration
2. Stretch the background image to cover the full duration
3. Stretch the caption to cover the full duration
4. Auto-align the end times

## Key parameters

| Parameter | Description |
|---|---|
| `--audio-url` | Required, decides the total video length |
| `--img-url` | Optional, background image |
| `--video-url` | Optional, background video (mutually exclusive with img-url) |
| `--text` | Optional, title caption |

## Customize

### Want multiple images in a slideshow?

`draft easy` only takes one image. Use `images add` instead — see [`02-image-slideshow-bgm`](../02-image-slideshow-bgm/).

### Local audio file

cutcli also accepts local paths:

```bash
cutcli draft easy "$DRAFT_ID" \
  --audio-url ~/Music/my-narration.mp3 \
  --img-url https://cutcli.com/assets/demo/scene-01.jpg
```

### Split the caption into multiple lines

Switch to `captions add`:

```bash
DURATION=$(cutcli query audio-duration --url "$AUDIO_URL" | jq -r '.duration')
HALF=$((DURATION / 2))

cutcli captions add "$DRAFT_ID" --captions "[
  {\"text\":\"First half title\",\"start\":0,\"end\":$HALF},
  {\"text\":\"Second half title\",\"start\":$HALF,\"end\":$DURATION}
]"
```

## cutcli features used

- `cutcli draft easy` — one-shot asset layout
- `cutcli query audio-duration` — fetch an audio's length
