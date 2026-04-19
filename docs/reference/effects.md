# Effects

> Placeholder. The full parameter table will be filled in by the sync script in W2.

## Commands

```bash
cutcli effects add <draftId> --effect-infos <json>
cutcli effects list <draftId>
cutcli query effects --action search --keyword <kw>
```

## Main fields

| Field | Type | Required | Description |
|---|---|---|---|
| `effectId` | string | yes | Effect ID (look it up via `query`) |
| `start` | number | yes | Start time (μs) |
| `end` | number | yes | End time (μs) |
| `segmentId` | string | no | Apply to a specific segment |
