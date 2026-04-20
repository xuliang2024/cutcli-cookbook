---
title: 'Stop hand-writing CapCut JSON: how cutcli + Claude Code generates editable drafts from one prompt'
description: 'Why writing CapCut / Jianying (剪映) draft JSON by hand is a dead end in the AI agent era — and how cutcli turns one natural-language prompt into a fully editable draft you can keep tweaking by hand.'
date: 2026-04-20
author: m007
---

# Stop hand-writing CapCut JSON: how cutcli + Claude Code generates editable drafts from one prompt

> **TL;DR** — CapCut and Jianying (剪映) drafts are JSON folders. Writing them by hand is brittle and slow. `cutcli` is a single-binary CLI that exposes a stable surface (`cutcli draft create`, `captions add`, `audios add`, `keyframes add`, …), so any AI coding agent — Cursor, Claude Code, ChatGPT, Gemini, OpenClaw, MCP — can drive video production from one natural-language prompt. The output is a real CapCut draft, opened directly by the desktop app and still 100% editable.

## The problem: a CapCut draft is a JSON minefield

If you've ever opened `~/Movies/CapCut/User Data/Projects/com.lveditor.draft/<some-uuid>/draft_content.json`, you know the shape of the trap:

- **Microsecond timestamps** everywhere — `3000000` means 3 seconds, not 3 milliseconds.
- **Normalized 0..1 coordinates** for visual positioning, mixed with pixel sizes for canvas.
- **Undocumented enums** — animation names like `渐显` ("fade in") and `轻微放大` ("subtle zoom"), with no published list.
- **Half a dozen sibling files** that must stay in sync: `draft_content.json`, `draft_meta_info.json`, `draft_settings.json`, the `resources/` folder, `cover.jpg`, …
- **Versions drift** — a draft that loads in CapCut 4.x silently breaks in 5.x because a single field renamed.

People hit this wall and reach for ad-hoc Python scripts that reverse-engineer the format. Those scripts work for one CapCut release and rot at the next. The format isn't a public API.

## Why this matters in 2026: AI agents need a stable surface

Most short-video producers in 2026 don't open IDEs anymore. They tell Cursor, Claude Code, or an MCP-enabled assistant:

> "Take these three product shots, add a 6-second TikTok-style caption track that highlights the keywords, drop my BGM under it, and give me an editable CapCut draft."

For an LLM to deliver on that prompt reliably, it needs three things:

1. A **stable command surface** that doesn't change under it.
2. **Outputs that survive a CapCut version bump.**
3. **Round-trip editability** — the user must be able to open the draft and keep tweaking, or AI loses the long tail.

JSON-as-API gives you none of that. CLI-as-API gives you all three.

## What `cutcli` actually is

`cutcli` is a single static binary you install with one command:

```bash
curl -s https://cutcli.com/cli | bash
```

It exposes a small, stable command surface:

```bash
cutcli draft create --width 1080 --height 1920
cutcli captions add "$DRAFT_ID" --captions '[...]'
cutcli images add   "$DRAFT_ID" --image-infos '[...]'
cutcli audios add   "$DRAFT_ID" --audio-infos '[...]'
cutcli keyframes add "$DRAFT_ID" --keyframes '[...]'
cutcli draft easy   --by-audio audio.mp3 --captions '[...]'
cutcli draft upload "$DRAFT_ID"
```

Behind the scenes it writes the actual CapCut/Jianying draft folder, normalizes coordinates, stamps the right `draft_meta_info.json`, downloads remote assets into `resources/`, and tracks CapCut version differences. The result lands in your draft list, ready to edit.

## The comparison no one wants to write but everyone needs

| Approach | Time to first frame | Survives CapCut update | AI-driveable | Editable in CapCut after |
|---|---|---|---|---|
| Hand-written `draft_content.json` | hours, then breaks | no | barely | yes (until you re-edit and break it) |
| Reverse-engineered Python scripts | days, then breaks | no | yes, but fragile | yes |
| FFmpeg / MoviePy | minutes | yes | yes | **no** — output is a flat MP4 |
| **`cutcli`** | seconds | yes | yes | **yes — full draft** |

The last column is the one nobody else gives you. FFmpeg can render an MP4 from a prompt; it can't produce something a creator opens in CapCut and tweaks the captions on. cutcli does.

## Concrete example: one Claude Code prompt → editable draft

After `cutcli setup claude` (or the same for Cursor / OpenClaw), drop this into Claude Code:

> Build a 9-second slideshow from `cover.jpg`, `feature.jpg` and `cta.jpg`. Add fade transitions, drop `bgm-light.mp3` under it at 50% volume, and add a TikTok-style caption that says "新品上线" with the words "上线" highlighted in #ff5a36.

Claude Code emits roughly:

```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')

cutcli images add "$DRAFT_ID" --image-infos '[
  {"imageUrl":"file:///abs/path/cover.jpg",  "width":1080,"height":1920,"start":0,       "end":3000000,"inAnimation":"轻微放大","inAnimationDuration":600000},
  {"imageUrl":"file:///abs/path/feature.jpg","width":1080,"height":1920,"start":3000000,"end":6000000,"inAnimation":"轻微放大","inAnimationDuration":600000},
  {"imageUrl":"file:///abs/path/cta.jpg",    "width":1080,"height":1920,"start":6000000,"end":9000000,"inAnimation":"轻微放大","inAnimationDuration":600000}
]'

cutcli transitions add "$DRAFT_ID" --auto fade --duration 400000

cutcli audios add "$DRAFT_ID" --audio-infos '[
  {"audioUrl":"file:///abs/path/bgm-light.mp3","duration":9000000,"start":0,"end":9000000,"volume":0.5}
]'

cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"新品上线","start":500000,"end":8500000,
   "inAnimation":"渐显","inAnimationDuration":400000,
   "highlights":[{"keyword":"上线","color":"#ff5a36","bold":true}]}
]' --font-size 9 --bold
```

Run it. Open CapCut. The draft is in your list, with three image segments, fades, BGM, and a highlight caption — all individually editable on the timeline.

The same prompt against an FFmpeg-based tool gives you a flat MP4 you can no longer touch. That's the whole story.

## Get started in 60 seconds

```bash
# 1. Install cutcli
curl -s https://cutcli.com/cli | bash

# 2. Wire it into your AI tool
cutcli setup all

# 3. Run the simplest example
git clone https://github.com/xuliang2024/cutcli-cookbook.git
cd cutcli-cookbook/examples/01-hello-caption && bash run.sh
```

Then open CapCut / 剪映 — the new draft is already in your list.

## Where to go next

- [Build your first draft in 30 minutes](/guide/first-draft) — the unhurried walkthrough.
- [AI tools integration](/guide/ai-integration) — `cutcli setup` details for Cursor / Claude Code / OpenClaw.
- [Examples gallery](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples) — eight runnable patterns from "hello caption" to a full 30-second product promo.
- [Prompts library](https://github.com/xuliang2024/cutcli-cookbook/tree/main/prompts) — drop-in system prompts for ChatGPT, Gemini, Claude API and OpenAI-compatible endpoints.
- 简体中文版本：[别再手写剪映 JSON 了](/zh/blog/why-cutcli)

cutcli is MIT-licensed. Source: [github.com/xuliang2024/cutcli-cookbook](https://github.com/xuliang2024/cutcli-cookbook).
