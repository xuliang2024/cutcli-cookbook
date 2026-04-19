# Prompts

[English](README.md) · [简体中文](README.zh.md)

为各类 AI 工具准备的 cutcli 提示词，复制粘贴即用。

## 目录

| 工具 | 用法 |
|---|---|
| [`system/cutcli-expert.md`](system/cutcli-expert.md) | 通用「cutcli 专家」系统提示，适合 ChatGPT / Gemini / 任意可设系统消息的模型 |
| [`cursor/`](cursor/) | Cursor IDE 中的 cutcli 助手提示 |
| [`claude/`](claude/) | Claude Code 中的 cutcli 助手提示 |

## 推荐用法

### Cursor / Claude Code

不用复制提示词，跑：

```bash
cutcli setup cursor   # 或 claude / openclaw / all
```

会自动写入对应工具的 SKILL 配置目录。

### ChatGPT / Gemini / 通用 LLM

复制 [`system/cutcli-expert.md`](system/cutcli-expert.md) 全文，粘贴到模型的「自定义指令」/「系统消息」即可。

### 自动化脚本中

把提示词作为 system message 拼到 OpenAI / Anthropic API 请求里：

```python
import anthropic, pathlib

system_prompt = pathlib.Path("prompts/system/cutcli-expert.md").read_text()
client = anthropic.Anthropic()
resp = client.messages.create(
    model="claude-sonnet-4",
    system=system_prompt,
    messages=[{"role": "user", "content": "帮我做一个 5 秒的字幕动画 Hello World"}],
)
print(resp.content)
```

## 贡献

新增提示词请遵循文件头 frontmatter 规范：

```yaml
---
title: 一句话标题
author: your-handle
target: cursor | claude | chatgpt | gemini | openai-api
tags: [marketing, vlog, ...]
license: MIT
---
```
