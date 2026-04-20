# stickers

> Stub — full reference will be filled in by the sync script (W2).

## Commands

```bash
cutcli sticker add <draftId> --sticker-id <id> --start N --end N [--scale N]
cutcli sticker list <draftId>
cutcli query stickers --action search --keyword <kw>
```

## Main flags

| Flag | Notes |
|---|---|
| `--sticker-id` | Sticker ID (look up via `cutcli query stickers`) |
| `--start <μs>` | Start time (μs) |
| `--end <μs>` | End time (μs) |
| `--scale <n>` | Scale ratio |
