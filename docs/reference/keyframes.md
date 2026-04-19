# Keyframes

> Placeholder. The full parameter table will be filled in by the sync script in W2.

## Commands

```bash
cutcli keyframes add <draftId> --keyframes <json>
cutcli keyframes list <draftId> --segment-id <id>
```

## Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `segmentId` | string | yes | Owning segment ID |
| `property` | string | yes | Property name |
| `offset` | number | yes | Offset within the segment (μs) |
| `value` | number | yes | Property value |

## Supported properties

`position_x`, `position_y`, `scale_x`, `scale_y`, `rotation`, `opacity`

## Example: zoom to 1.5× over 3 seconds

```bash
cutcli keyframes add "$DRAFT_ID" --keyframes '[
  {"segmentId":"<segId>","property":"scale_x","offset":0,"value":1.0},
  {"segmentId":"<segId>","property":"scale_x","offset":3000000,"value":1.5},
  {"segmentId":"<segId>","property":"scale_y","offset":0,"value":1.0},
  {"segmentId":"<segId>","property":"scale_y","offset":3000000,"value":1.5}
]'
```
