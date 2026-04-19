---
title: Claude — auto storyboard then cutcli
author: m007
target: claude
tags: [storyboard, auto, vlog]
license: MIT
---

# Claude — auto storyboard → cutcli commands

[English](auto-storyboard.md) · [简体中文](auto-storyboard.zh.md)

> Made for Claude Code or Claude Desktop. Give a one-liner; Claude first lays out a storyboard table, then emits a runnable script.

## Prompt

I'll give you a one-line requirement. Play two roles:

### Step 1: Storyboard

Output the markdown table below — don't skip any columns.

| Shot | Time | Visual | Caption | Music / SFX | Transition |
|---|---|---|---|---|---|
| 1 | 0:00-0:03 | ... | ... | ... | ... |
| 2 | 0:03-0:08 | ... | ... | ... | ... |

### Step 2: cutcli script

Translate the storyboard into `run.sh`:

- Command name `cutcli`
- Times are integer microseconds
- Pull complex JSON into `data/*.json`
- Start with `set -euo pipefail`
- Use `DRAFT_ID=$(cutcli draft create ... | jq -r '.draftId')`
- Echo a one-line comment before each `add` command for easier debugging

### Step 3: Self-review

After the script runs, list "3 things I might want to tweak" (font, duration, filter, …) along with how to change them.

### My requirement

> {Drop your requirement here, e.g. "Make a 15-second coffee-shop opening promo, warm tone, with emoji stickers"}

## Quick capability cheatsheet

- Caption animation names: `cutcli query text-animations --type in|out|loop`
- Transition names: `cutcli query transitions --action search --keyword <kw>`
- Filter names: `cutcli query filters --action search --keyword <kw>`
- Docs: <https://docs.cutcli.com>

Begin.
