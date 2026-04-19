# Images

> Placeholder. The full parameter table will be filled in by the sync script in W2.

## Commands

```bash
cutcli images add <draftId> --image-infos <json> [options]
cutcli images list <draftId>
```

## Main fields

| Field | Type | Required | Description |
|---|---|---|---|
| `imageUrl` | string | yes | Image URL (auto-downloaded) |
| `width` | number | yes | Width (pixels) |
| `height` | number | yes | Height (pixels) |
| `start` | number | yes | Start time (μs) |
| `end` | number | yes | End time (μs) |
| `transformX` / `transformY` | number | no | Position (-1 to 1) |
| `scaleX` / `scaleY` | number | no | Scale (1.0 = original) |
| `rotation` | number | no | Rotation in degrees |
| `inAnimation` / `outAnimation` | string | no | Entrance / exit animation |
| `transition` | string | no | Transition into the next segment |

Full list: `cutcli images add --help`.
