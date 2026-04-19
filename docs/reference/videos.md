# Videos

> Placeholder. The full parameter table will be filled in by the sync script in W2.

## Commands

```bash
cutcli videos add <draftId> --video-infos <json> [options]
cutcli videos list <draftId>
```

## Main fields

| Field | Type | Required | Description |
|---|---|---|---|
| `videoUrl` | string | yes | Video URL (auto-downloaded) |
| `width` | number | yes | Width |
| `height` | number | yes | Height |
| `duration` | number | yes | Source duration (μs) |
| `start` | number | yes | Timeline start (μs) |
| `end` | number | yes | Timeline end (μs) |
| `volume` | number | no | Volume (0-1) |
| `transition` | string | no | Transition into the next segment |
