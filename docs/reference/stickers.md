# Stickers

> Placeholder. The full parameter table will be filled in by the sync script in W2.

## Commands

```bash
cutcli sticker add <draftId> --sticker-id <id> --start N --end N [--scale N]
cutcli sticker list <draftId>
cutcli query stickers --action search --keyword <kw>
```

## Main parameters

| Option | Description |
|---|---|
| `--sticker-id` | Sticker ID (look it up via `cutcli query stickers`) |
| `--start <μs>` | Start time (μs) |
| `--end <μs>` | End time (μs) |
| `--scale <n>` | Scale factor |
