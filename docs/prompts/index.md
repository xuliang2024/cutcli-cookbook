# Prompt library

Prompts for Cursor, Claude Code, ChatGPT, Gemini, and other AI tools — copy and paste.

## Core prompts

| Type | Use | File |
|---|---|---|
| System | "You are a cutcli expert", great for ChatGPT custom instructions | [`prompts/system/cutcli-expert.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/system/cutcli-expert.md) |
| Cursor | One-line product promo inside Cursor | [`prompts/cursor/make-promo-video.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/cursor/make-promo-video.md) |
| Claude | Let Claude write the storyboard and emit cutcli commands | [`prompts/claude/auto-storyboard.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/claude/auto-storyboard.md) |

## How to use

### Cursor / Claude Code

Run `cutcli setup cursor` (or `claude`) once — see [AI integrations](/guide/ai-integration).

### ChatGPT / Gemini / others

Copy the full content of [`prompts/system/cutcli-expert.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/system/cutcli-expert.md) into the model's "system prompt" / "custom instructions". Then ask things like "make me a 5-second caption animation" and the model emits ready-to-run cutcli commands.

## Contributing prompts

If you've written a great cutcli prompt, open a PR:

1. Drop the file under `prompts/<tool>/<scenario>.md`
2. Add frontmatter:
   ```yaml
   ---
   title: One-line title
   author: your-handle
   target: cursor | claude | chatgpt | gemini
   tags: [marketing, vlog, ...]
   ---
   ```
3. CI checks the format on PR.
