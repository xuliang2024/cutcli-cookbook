# Templates

[English](README.md) · [简体中文](README.zh.md)

Reusable JSON snippets, organized by cutcli command. Pass them straight into a command via `--captions @path/to/template.json`.

## Subdirectories

| Directory | Purpose |
|---|---|
| [`captions/`](captions/) | Caption presets (animations + keyword highlight + position) |
| [`animations/`](animations/) | Image / video animation combos (entrance + exit + loop) |
| [`filters/`](filters/) | Filter combos (used with `--filter-infos`) |

## How to use

```bash
DRAFT_ID=$(cutcli draft create | jq -r '.draftId')
cutcli captions add "$DRAFT_ID" --captions @templates/captions/cinematic-title.json
```

Note: `start` / `end` in templates are placeholders (default 0 → 5,000,000 μs). Adjust to your scene.

## Contributing a template

1. Create `templates/<category>/<name>.json`
2. Add `"_comment": "one-line description"` to the first item so others know what it is
3. Open a PR
