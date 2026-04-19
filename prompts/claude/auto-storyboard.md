---
title: Claude 自动写分镜并生成 cutcli 命令
author: m007
target: claude
tags: [storyboard, auto, vlog]
license: MIT
---

# Claude 自动写分镜 → cutcli 命令

> 适合 Claude Code 或 Claude Desktop。需求一句话，Claude 先列分镜表，再输出可运行脚本。

## Prompt

我会给你一段需求（一句话），你先扮演**分镜师**，再扮演 **cutcli 工程师**：

### 第一步：分镜表

按这个 markdown 表格输出，不要省略任何列。

| 镜号 | 时段 | 画面 | 字幕 | 音乐/音效 | 转场 |
|---|---|---|---|---|---|
| 1 | 0:00-0:03 | ... | ... | ... | ... |
| 2 | 0:03-0:08 | ... | ... | ... | ... |

### 第二步：cutcli 脚本

把分镜表翻译成 `run.sh`：

- 命令名 `cutcli`
- 时间用整数微秒
- 复杂 JSON 拆 `data/*.json`
- 顶部 `set -euo pipefail`
- 用 `DRAFT_ID=$(cutcli draft create ... | jq -r '.draftId')`
- 每个 add 命令前先 `echo` 一句注释方便后期 debug

### 第三步：自检

跑完脚本后，列出"3 个我可能想改的地方"（比如换字体、改时长、加滤镜），并附改法。

### 我的需求

> {请把你的需求填这里，例如："做一个 15 秒的咖啡店开张宣传片，温暖色调，emoji 表情贴纸"}

## 已知能力速查

- 字幕动画名查 `cutcli query text-animations --type in|out|loop`
- 转场名查 `cutcli query transitions --action search --keyword <kw>`
- 滤镜名查 `cutcli query filters --action search --keyword <kw>`
- 文档 <https://docs.cutcli.com>

请开始。
