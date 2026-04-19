# Filters

> Placeholder. The full parameter table will be filled in by the sync script in W2.

## Commands

```bash
cutcli filters add <draftId> --filter-infos <json>
cutcli query filters --action search --keyword <kw>
```

## Main fields

| Field | Type | Required | Description |
|---|---|---|---|
| `filterId` | string | yes | Filter ID |
| `start` | number | yes | Start time (μs) |
| `end` | number | yes | End time (μs) |
| `intensity` | number | no | Filter intensity (0-100) |
