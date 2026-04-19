# 30 · Vlog: A Day in My Life (30s)

> 30-second vlog "a day in my life" template: morning → noon → evening, each with a time-stamped caption.

[English](README.md) · [简体中文](README.zh.md)

![preview](preview.gif)

> `preview.gif` is not committed yet — CI will require it.

## When to use

- Personal vlog "a day in my life / a week in my life" series
- Travel / food daily series
- Any timeline-driven scene chain

## Run it

```bash
bash run.sh
```

## Key parameters

| Parameter | Value | Why |
|---|---|---|
| Three time-stamped captions | `AM 7:00 / PM 1:00 / PM 8:00` | Classic vlog rhythm: morning → noon → evening |
| Transition `wipe right` | Replaces crossfade | Adds page-turn rhythm to the vlog |
| First segment Ken Burns 1.0 → 1.1 over 10 s | Dynamic opening | Movement at the very beginning |
| Caption `--transform-y -0.7` | 70 % below center | Lower than short-video captions, leaves more room for the visual |
| Highlight colors yellow / orange / pink | Match the time-of-day mood | Morning = yellow (warm), noon = orange (vital), evening = pink (soft) |

## Customize

### Apply Ken Burns to all three segments

Replace `SEG_FIRST` in `run.sh` with a `for` loop over every segmentId (see [`20-knowledge-science-card`](../20-knowledge-science-card/) for the pattern).

### Add tempo stickers / decoration

```bash
cutcli query stickers --action search --keyword "clock" --pretty
cutcli sticker add "$DRAFT_ID" --sticker-id "<id>" --start 0 --end 30000000 --scale 0.6
```

### Multiple themes from one script

Copy `run.sh` to `run-summer.sh` / `run-winter.sh` and only swap the asset URLs in `data/images.json` — same structure throughout.

## cutcli features used

- `cutcli draft create` — portrait canvas
- `cutcli images add` — multiple images + wipe transitions
- `cutcli keyframes add` — Ken Burns push-in
- `cutcli captions add` — time-stamp captions + keyword highlight
- `cutcli audios add` — BGM
