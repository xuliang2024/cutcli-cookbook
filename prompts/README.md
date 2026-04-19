# Prompts

[English](README.md) · [简体中文](README.zh.md)

Ready-to-use cutcli prompts for various AI tools.

## Index

| Tool | Use |
|---|---|
| [`system/cutcli-expert.md`](system/cutcli-expert.md) | Generic "cutcli expert" system prompt — works in any model that takes system messages (ChatGPT / Gemini / Claude API) |
| [`cursor/`](cursor/) | cutcli helper prompts inside Cursor IDE |
| [`claude/`](claude/) | cutcli helper prompts inside Claude Code |

## Recommended usage

### Cursor / Claude Code

You don't need to copy prompts manually — run:

```bash
cutcli setup cursor   # or claude / openclaw / all
```

cutcli writes the SKILL config into the right directory for each tool.

### ChatGPT / Gemini / generic LLMs

Copy the full content of [`system/cutcli-expert.md`](system/cutcli-expert.md) into the model's "custom instructions" / "system message".

### In automation scripts

Send the prompt as a system message via the OpenAI / Anthropic API:

```python
import anthropic, pathlib

system_prompt = pathlib.Path("prompts/system/cutcli-expert.md").read_text()
client = anthropic.Anthropic()
resp = client.messages.create(
    model="claude-sonnet-4",
    system=system_prompt,
    messages=[{"role": "user", "content": "Make me a 5-second caption animation that says Hello World"}],
)
print(resp.content)
```

## Contributing

New prompts must include a frontmatter block:

```yaml
---
title: One-line title
author: your-handle
target: cursor | claude | chatgpt | gemini | openai-api
tags: [marketing, vlog, ...]
license: MIT
---
```
