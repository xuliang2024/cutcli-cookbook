# Make a vlog

Re-create the "Day in my life / Week in my life" vlog template with cutcli. Target 30 seconds, ready to clone and tweak.

Full code: [`examples/30-vlog-day-in-life`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/30-vlog-day-in-life).

## Spec

| Time | Content | Visual |
|---|---|---|
| 0-2s | Centered fade-in title "My day" | Caption entrance |
| 2-10s | Morning scene + "AM 7:00 · morning coffee" | Ken Burns zoom |
| 10-20s | Noon scene + "PM 1:00 · lunch break" | Wipe transition |
| 20-28s | Evening scene + "PM 8:00 · evening walk" | Wipe transition |
| 28-30s | "See you tomorrow ✨" pop-in | Bouncy entrance |
| Whole | Light BGM volume 0.55 | — |

## Three steps to write it

### 1. Skeleton

```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "vlog" | jq -r '.draftId')
```

### 2. Add the images (with wipe transitions)

Cut the 3 images into 0-10 / 10-20 / 20-30 segments. The first two get `transition: "向右擦除"` (right wipe):

```bash
cutcli images add "$DRAFT_ID" --image-infos @images.json
```

`images.json`:

```json
[
  {"imageUrl":"...","width":1080,"height":1920,"start":0,"end":10000000,
   "transition":"向右擦除","transitionDuration":500000},
  ...
]
```

### 3. Add the time-label captions

```bash
cutcli captions add "$DRAFT_ID" --captions @captions.json \
  --font-size 9 --bold --transform-y -0.7
```

Each caption uses a different `keywordColor` so morning / noon / evening have distinct moods (yellow / orange / pink).

## Key tricks

- **Wipe transitions feel more "vlog"** than dissolves; they read like a page turn
- **Caption pulled down to -0.7** leaves more screen for the visuals — fits the slower vlog rhythm
- **First scene gets a Ken Burns** so the opening doesn't feel static

## Producing many variants

Rename `images.json` into `images-summer.json` / `images-winter.json` / `images-trip.json`, and reuse the same `run.sh`:

```bash
bash run.sh images-summer.json
# Inside run.sh: cutcli images add ... --image-infos "@${1:-images.json}"
```

Easy to crank out 7 themed vlogs a week.

## Full code

[`examples/30-vlog-day-in-life`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/30-vlog-day-in-life)
