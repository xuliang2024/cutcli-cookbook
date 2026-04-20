# AI tools integration

cutcli ships a one-shot `setup` command that drops a SKILL config into Cursor / Claude Code / OpenClaw. Once installed, your AI assistant can write cutcli commands directly in the chat.

## One-line install

```bash
# Cursor IDE
cutcli setup cursor

# Claude Code (CLI)
cutcli setup claude

# OpenClaw
cutcli setup openclaw

# All three
cutcli setup all
```

## Already installed?

Use `--force` to overwrite:

```bash
cutcli setup cursor --force
```

## Verify

Open your AI tool and ask:

> Make me a 5-second caption that says "Hello", with a fade-in.

The model should reply with something like:

```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"Hello","start":0,"end":5000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold
```

## Custom prompts

For models without a built-in skill (ChatGPT, Gemini, etc.), copy [`prompts/system/cutcli-expert.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/system/cutcli-expert.md) into the model's system prompt or "custom instructions" field. It teaches the model the entire cutcli command surface.

More prompt templates: [Prompts library](/prompts/).

## How it works

`cutcli setup <tool>` does very little:

1. Drops a `SKILL.md` into `~/.cursor/skills/cut-draft/` (or the equivalent Claude / OpenClaw directory)
2. That `SKILL.md` describes every cutcli command + parameters + typical usage
3. Next time the AI tool starts, it auto-loads the skill

You can read the file any time with `cat ~/.cursor/skills/cut-draft/SKILL.md`.
