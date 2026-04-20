# images

> Stub — full reference will be filled in by the sync script (W2).

## Commands

```bash
cutcli images add <draftId> --image-infos <json> [options]
cutcli images list <draftId>
```

## Main fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `imageUrl` | string | yes | Image URL (auto-downloaded) |
| `width` | number | yes | Width (px) |
| `height` | number | yes | Height (px) |
| `start` | number | yes | Start time (μs) |
| `end` | number | yes | End time (μs) |
| `transformX` / `transformY` | number | no | Position (-1 to 1) |
| `scaleX` / `scaleY` | number | no | Scale (1.0 = original) |
| `rotation` | number | no | Rotation (deg) |
| `inAnimation` / `outAnimation` | string | no | Entrance / exit animation |
| `transition` | string | no | Transition to the next segment |

Full list: `cutcli images add --help`.
