# Captions

> The full reference is generated from the closed-source `jy_cli/docs/cli.md` via the sync script. Until then, run `cutcli captions add --help` for live parameter docs.

## Commands

```bash
cutcli captions add <draftId> --captions <json> [options]
cutcli captions list <draftId>
```

## Caption JSON fields

| Field | Type | Required | Description |
|---|---|---|---|
| `text` | string | yes | Caption text |
| `start` | number | yes | Start time (μs) |
| `end` | number | yes | End time (μs) |
| `keyword` | string | no | Highlighted keyword |
| `keywordColor` | string | no | Keyword color |
| `inAnimation` | string | no | Entrance animation name |
| `outAnimation` | string | no | Exit animation name |
| `inAnimationDuration` | number | no | Entrance duration (μs) |
| `outAnimationDuration` | number | no | Exit duration (μs) |

## Global style options

| Option | Description |
|---|---|
| `--font-size <n>` | Font size (recommended 6-12) |
| `--text-color <hex>` | Color, e.g. `#FFFFFF` |
| `--bold` / `--italic` / `--underline` | Style flags |
| `--alignment <n>` | Alignment (0=center, 1=left, 2=right) |
| `--transform-x <n>` | X position (-1 to 1) |
| `--transform-y <n>` | Y position (-1 to 1) |

Full options: `cutcli captions add --help`.

## Example

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"Hello","start":0,"end":3000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold
```
