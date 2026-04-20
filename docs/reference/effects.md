# effects

> Stub — full reference will be filled in by the sync script (W2).

## Commands

```bash
cutcli effects add <draftId> --effect-infos <json>
cutcli effects list <draftId>
cutcli query effects --action search --keyword <kw>
```

## Main fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `effectId` | string | yes | Effect ID (look up via `query`) |
| `start` | number | yes | Start time (μs) |
| `end` | number | yes | End time (μs) |
| `segmentId` | string | no | Apply to a specific segment |
