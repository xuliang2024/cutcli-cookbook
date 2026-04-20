# filters

> Stub — full reference will be filled in by the sync script (W2).

## Commands

```bash
cutcli filters add <draftId> --filter-infos <json>
cutcli query filters --action search --keyword <kw>
```

## Main fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `filterId` | string | yes | Filter ID |
| `start` | number | yes | Start time (μs) |
| `end` | number | yes | End time (μs) |
| `intensity` | number | no | Strength (0-100) |
