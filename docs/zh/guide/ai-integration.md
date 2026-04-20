# AI 工具集成

cutcli 提供一键集成命令，自动给 Cursor / Claude Code / OpenClaw 安装专用 SKILL 配置。安装后，AI 助手就能在对话中直接帮你写 cutcli 命令。

## 一键安装

```bash
# Cursor IDE
cutcli setup cursor

# Claude Code (CLI 版)
cutcli setup claude

# OpenClaw (龙虾)
cutcli setup openclaw

# 全部
cutcli setup all
```

## 已经安装过？

加 `--force` 覆盖：

```bash
cutcli setup cursor --force
```

## 验证

打开你的 AI 工具，问：

> 帮我用 cutcli 做一个 5 秒的字幕"Hello"，加渐显动画

AI 应该返回类似的命令：

```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"Hello","start":0,"end":5000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold
```

## 自定义提示词

如果你想用 ChatGPT / Gemini 等不在内置列表里的 AI 工具，仓库里 [`prompts/system/cutcli-expert.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/system/cutcli-expert.md) 是一份完整的"cutcli 专家"系统提示词，复制粘贴即可。

更多提示词模板见 [Prompts 库](/zh/prompts/)。

## 工作原理

`cutcli setup` 做的事情很简单：

1. 在 `~/.cursor/skills/cut-draft/`（或 Claude / OpenClaw 对应目录）写入一个 `SKILL.md` 文件
2. 该文件包含 cutcli 的命令清单、参数表、典型用法
3. AI 工具下次启动时会自动加载这个 skill

你可以随时 `cat ~/.cursor/skills/cut-draft/SKILL.md` 查看具体内容。
