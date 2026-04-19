# Make a vlog

Rebuild the classic "a day in my life" vlog template with cutcli, targeting 30 s and reusable across episodes.

Full code: [`examples/30-vlog-day-in-life`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/30-vlog-day-in-life).

## Breakdown

| Time | Content | Visual technique |
|---|---|---|
| 0-2 s | Centered "My day" title fade-in | Caption entrance |
| 2-10 s | Morning scene + "AM 7:00 · Coffee" | Ken Burns push-in |
| 10-20 s | Noon scene + "PM 1:00 · Lunch" | Wipe transition |
| 20-28 s | Evening scene + "PM 8:00 · Walk" | Wipe transition |
| 28-30 s | "See you tomorrow ✨" pop-in | Bounce-in |
| Throughout | Light BGM at volume 0.55 | Airy mood |

## Three steps

### 1. Skeleton

```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "vlog" | jq -r '.draftId')
```

### 2. Add the images (with wipe transitions)

Three images covering 0-10 / 10-20 / 20-30, the first two using `transition: "向右擦除"` (wipe right):

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

### 3. Time-stamp captions

```bash
cutcli captions add "$DRAFT_ID" --captions @captions.json \
  --font-size 9 --bold --transform-y -0.7
```

Each caption uses a different `keywordColor` to match the morning / noon / evening mood (yellow / orange / pink).

## Key techniques

- **Wipes feel more vlog-ish**: snappier than crossfades, page-turn vibe
- **Captions at -0.7**: leaves more room for the visual, fits a slower vlog rhythm
- **First Ken Burns**: start with motion so viewers immediately feel the scene

## Scaling to many variants

Swap `images.json` for `images-summer.json` / `images-winter.json` / `images-trip.json` and reuse `run.sh`:

```bash
bash run.sh images-summer.json
# Inside run.sh: cutcli images add ... --image-infos "@${1:-images.json}"
```

Producing 7 themed vlogs in a week becomes trivial.

## Full code

[`examples/30-vlog-day-in-life`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/30-vlog-day-in-life)
