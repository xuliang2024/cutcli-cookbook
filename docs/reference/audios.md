# audios

> Stub — full reference will be filled in by the sync script (W2).

## Commands

```bash
cutcli audios add <draftId> --audio-infos <json>
cutcli audios list <draftId>
```

## Main fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `audioUrl` | string | yes | Audio URL (auto-downloaded) |
| `duration` | number | yes | Audio duration (μs) |
| `start` | number | yes | Start time (μs) |
| `end` | number | yes | End time (μs) |
| `volume` | number | no | Volume (0-1) |
| `audioEffect` | string | no | Audio effect name |

## Tip: query a remote audio's duration

```bash
cutcli query audio-duration --url https://example.com/bgm.mp3
```
