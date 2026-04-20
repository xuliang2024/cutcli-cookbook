# videos

> Stub — full reference will be filled in by the sync script (W2).

## Commands

```bash
cutcli videos add <draftId> --video-infos <json> [options]
cutcli videos list <draftId>
```

## Main fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `videoUrl` | string | yes | Video URL (auto-downloaded) |
| `width` | number | yes | Width (px) |
| `height` | number | yes | Height (px) |
| `duration` | number | yes | Original video duration (μs) |
| `start` | number | yes | Timeline start (μs) |
| `end` | number | yes | Timeline end (μs) |
| `volume` | number | no | Volume (0-1) |
| `transition` | string | no | Transition to the next segment |
