# Transitions

> Placeholder. The full parameter table will be filled in by the sync script in W2.

## Commands

```bash
cutcli query transitions --action categories
cutcli query transitions --action search --keyword <kw>
cutcli query transitions --action list --category <cat>
```

Transitions are not their own command — they're a `transition` field on individual segments inside `images add` / `videos add`.

## Use inside images / videos

```json
[
  {"imageUrl":"...","width":1080,"height":1920,
   "start":0,"end":3000000,
   "transition":"叠化",
   "transitionDuration":500000}
]
```
