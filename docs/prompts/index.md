# Prompts library

Prompts you can drop into Cursor / Claude Code / ChatGPT / Gemini to drive cutcli.

## Core prompts

| Type | Purpose | File |
|---|---|---|
| System | "You are a cutcli expert" — fits ChatGPT custom instructions | [`prompts/system/cutcli-expert.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/system/cutcli-expert.md) |
| Cursor | One-line generation of a product promo inside Cursor | [`prompts/cursor/make-promo-video.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/cursor/make-promo-video.md) |
| Claude | Auto-storyboarding then cutcli command emission | [`prompts/claude/auto-storyboard.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/claude/auto-storyboard.md) |

## Usage

### Cursor / Claude Code

No copy-paste required, just run:

```bash
cutcli setup cursor   # or claude / openclaw / all
```

Details: [AI tools integration](/guide/ai-integration).

### ChatGPT / Gemini / generic LLM

Copy the full content of [`prompts/system/cutcli-expert.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/system/cutcli-expert.md) into the model's "system prompt" or "custom instructions". You can then ask freely: "Make me a 5-second caption with fade-in" — the model will produce a runnable cutcli command.

### Inside an automation script

Wire it into an OpenAI / Anthropic API call as the system message:

```python
import anthropic, pathlib

system_prompt = pathlib.Path("prompts/system/cutcli-expert.md").read_text()
client = anthropic.Anthropic()
resp = client.messages.create(
    model="claude-sonnet-4",
    system=system_prompt,
    messages=[{"role": "user", "content": "Build me a 5-second Hello World caption."}],
)
print(resp.content)
```

## Contributing prompts

Add new prompts under `prompts/<tool>/<scenario>.md` with the following frontmatter:

```yaml
---
title: One-line title
author: your-handle
target: cursor | claude | chatgpt | gemini | openai-api
tags: [marketing, vlog, ...]
license: MIT
---
```

Open a PR — CI will validate the format.
