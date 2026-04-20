# captions

> The full table is generated from `jy_cli/docs/cli.md` via the sync script (planned for W2). For now use `cutcli captions add --help` for live parameters.

## Commands

```bash
cutcli captions add <draftId> --captions <json> [options]
cutcli captions list <draftId>
```

## Caption JSON fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `text` | string | yes | Caption text |
| `start` | number | yes | Start time (μs) |
| `end` | number | yes | End time (μs) |
| `keyword` | string | no | Keyword to highlight |
| `keywordColor` | string | no | Keyword color (e.g. `#FF6600`) |
| `inAnimation` | string | no | Entrance animation name |
| `outAnimation` | string | no | Exit animation name |
| `inAnimationDuration` | number | no | Entrance duration (μs) |
| `outAnimationDuration` | number | no | Exit duration (μs) |

## Global style flags

| Flag | Notes |
|---|---|
| `--font-size <n>` | Font size (recommended 6-12) |
| `--text-color <hex>` | e.g. `#FFFFFF` |
| `--bold` / `--italic` / `--underline` | Style toggles |
| `--alignment <n>` | 0=center, 1=left, 2=right |
| `--transform-x <n>` | X position (-1 to 1) |
| `--transform-y <n>` | Y position (-1 to 1) |

Full list: `cutcli captions add --help`.

## Example

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"Hello","start":0,"end":3000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold
```
