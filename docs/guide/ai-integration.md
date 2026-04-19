# AI integrations

cutcli ships a one-line setup command that installs a dedicated SKILL configuration for Cursor, Claude Code, and OpenClaw. Once installed, any of those AI assistants can write cutcli commands for you.

## One-line install

```bash
# Cursor IDE
cutcli setup cursor

# Claude Code (CLI)
cutcli setup claude

# OpenClaw
cutcli setup openclaw

# All of the above
cutcli setup all
```

## Already installed?

Pass `--force` to overwrite:

```bash
cutcli setup cursor --force
```

## Verify

Open your AI tool and ask:

> Make me a 5-second caption that says "Hello" with a fade-in animation, using cutcli.

The assistant should respond with something like:

```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"Hello","start":0,"end":5000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold
```

## Custom prompts

If you use ChatGPT / Gemini or another assistant not in the built-in list, copy the full content of [`prompts/system/cutcli-expert.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/system/cutcli-expert.md) into the model's "system prompt" / "custom instructions".

More prompt templates: [Prompts library](/prompts/).

## How it works

`cutcli setup` is small:

1. Writes a `SKILL.md` file under `~/.cursor/skills/cut-draft/` (or the equivalent for Claude / OpenClaw)
2. The file lists cutcli commands, parameters, and idiomatic usage
3. The AI tool loads the skill the next time it starts

You can always inspect it: `cat ~/.cursor/skills/cut-draft/SKILL.md`.
