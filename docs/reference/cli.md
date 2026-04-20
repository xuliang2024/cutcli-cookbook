---
title: "CLI cheatsheet"
description: "Top-level cutcli command index. Use cutcli docs <topic> for live, in-terminal help."
editLink: false
footer: false
lastUpdated: true
---

# CLI cheatsheet

> Authoritative parameter tables live in the binary itself: run `cutcli <command> --help`. This page is a curated quick reference.

## Global options

```bash
cutcli [global options] <command> [subcommand options]
```

| Option | Notes |
|---|---|
| `--env-file <path>` | Load a specific `.env` |
| `--pretty` | Pretty-print JSON output |
| `-V, --version` | Print version |
| `-h, --help` | Print help |

## Commands by category

### Draft management

| Command | Purpose |
|---|---|
| `cutcli draft create [--width N] [--height N]` | Create a draft |
| `cutcli draft list` | List all drafts |
| `cutcli draft info <draftId>` | Show info for a draft |
| `cutcli draft easy <draftId> --audio-url <url>` | Auto-fit assets to the audio length |
| `cutcli draft zip <draftId> [--output <path>]` | Zip the draft |
| `cutcli draft upload <draftId>` | Zip + upload, returns a download URL |

### Adding content

| Command | Purpose | Detail |
|---|---|---|
| `cutcli captions add` | Add captions | [More](./captions.md) |
| `cutcli images add` | Add images | [More](./images.md) |
| `cutcli videos add` | Add videos | [More](./videos.md) |
| `cutcli audios add` | Add audios | [More](./audios.md) |
| `cutcli effects add` | Add effects | [More](./effects.md) |
| `cutcli filters add` | Add filters | [More](./filters.md) |
| `cutcli sticker add` | Add a sticker | [More](./stickers.md) |
| `cutcli keyframes add` | Add keyframes | [More](./keyframes.md) |
| `cutcli masks add` | Add masks | [More](./masks.md) |

### Querying

| Command | Purpose |
|---|---|
| `cutcli query audio-duration --url <url>` | Get a remote audio's duration |
| `cutcli query image-animations [--type in\|out\|loop]` | Available image animations |
| `cutcli query text-animations [--type in\|out\|loop]` | Available text animations |
| `cutcli query stickers --action search\|categories\|list` | Stickers |
| `cutcli query effects --action search\|categories\|list` | Effects |
| `cutcli query filters --action search\|categories\|list` | Filters |
| `cutcli query transitions --action search\|categories\|list` | Transitions |
| `cutcli query huazi --action list\|search\|categories` | Decorative text styles ("huazi") |

### Config and integrations

| Command | Purpose |
|---|---|
| `cutcli config show [--pretty]` | Show current config |
| `cutcli config set-dir <path>` | Set the draft output directory |
| `cutcli setup <tool> [--force]` | Install AI tool integration (`cursor` / `claude` / `openclaw` / `all`) |
| `cutcli docs [topic]` | Show built-in offline docs |
| `cutcli docs open` | Open `https://docs.cutcli.com` in your browser |

## A typical workflow

```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')

# Add a background image
cutcli images add "$DRAFT_ID" --image-infos '[
  {"imageUrl":"https://cutcli.com/assets/demo/scene-01.jpg",
   "width":1080,"height":1920,"start":0,"end":5000000}
]'

# Add a caption
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"Hello","start":0,"end":3000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold

# Add background music
cutcli audios add "$DRAFT_ID" --audio-infos '[
  {"audioUrl":"https://cutcli.com/assets/demo/bgm-light.mp3",
   "duration":5000000,"start":0,"end":5000000,"volume":0.5}
]'

# Inspect
cutcli draft info "$DRAFT_ID" --pretty
```

## Where the full reference lives

For exhaustive parameter tables and edge cases:

- Run `cutcli <command> --help` — always up to date for your installed version
- Or run `cutcli docs <topic>` — colorized offline manual
- The Chinese full reference at [`/zh/reference/cli`](/zh/reference/cli) (auto-synced from the source repo)
- Subcommand pages on this site have JSON field tables: see the side navigation
