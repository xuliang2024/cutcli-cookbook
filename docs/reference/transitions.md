# transitions

> Stub — full reference will be filled in by the sync script (W2).

## Commands

```bash
cutcli query transitions --action categories
cutcli query transitions --action search --keyword <kw>
cutcli query transitions --action list --category <cat>
```

Transitions aren't a standalone command — they're a `transition` field per segment in `images add` / `videos add`.

## In images / videos

```json
[
  {"imageUrl":"...","width":1080,"height":1920,
   "start":0,"end":3000000,
   "transition":"叠化",
   "transitionDuration":500000}
]
```
