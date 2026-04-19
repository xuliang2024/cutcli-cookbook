---
title: 用 Cursor 一句话生成产品宣传片
author: m007
target: cursor
tags: [marketing, promo, cursor]
license: MIT
---

# 用 Cursor 一句话生成产品宣传片

[English](make-promo-video.md) · [简体中文](make-promo-video.zh.md)

> 把这段话粘贴到 Cursor 的"Rules for AI"或开一个新会话直接发给 AI。

## Prompt

我要做一个 **30 秒** 的产品宣传片，用 cutcli 实现。请按以下结构帮我生成完整的 `run.sh`：

### 1. 输入

- 产品名：`{产品名}`
- 一句话卖点：`{卖点}`
- 适用人群：`{人群}`
- 3 张产品图 URL（必须是公开 https URL）：
  - `{img1}`
  - `{img2}`
  - `{img3}`
- BGM URL：`{bgm}`（如果没有就用 `https://cutcli.com/assets/demo/bgm-light.mp3`）

### 2. 视频结构（请严格按这个时间轴）

| 时段 | 内容 |
|---|---|
| 0~3s | 标题字幕："{产品名}" 居中、大号、加粗、渐显 |
| 3~12s | 3 张图轮播，每张 3 秒，"叠化"转场 |
| 12~24s | 卖点字幕分 3 句轮流出现，每句关键词高亮 |
| 24~30s | CTA："立即了解" + 浅色背景图 |
| 全程 | BGM 音量 0.5 |

### 3. 输出要求

- 完整 bash 脚本（顶部 `set -euo pipefail`）
- 复杂 JSON 拆到 `data/*.json` 文件（用 `--captions @data/...` 引用）
- 输出 `meta.json`（按 cutcli-cookbook 案例规范）
- 输出 `README.md`（5 段：效果 / 适用场景 / 一行运行 / 关键参数 / 进阶改造）

### 4. 命令参考

- 命令名是 `cutcli`（不是 `cut`）
- 时间单位：微秒，1 秒 = 1,000,000
- 字幕：`cutcli captions add` + `--captions <json>` + 全局样式（`--font-size`、`--bold`、`--text-color`、`--transform-y`）
- 图片：`cutcli images add` + `--image-infos <json>`，支持 `transition` / `transitionDuration`
- 音频：`cutcli audios add` + `--audio-infos <json>`，支持 `volume`
- 详细参数表：<https://docs.cutcli.com/reference/cli>

### 5. 风格约定

- 字幕全部加粗、白色 #FFFFFF + 黑描边宽 1
- 关键词颜色 #FFD600（黄）或 #FF3A6E（红粉）二选一，全片统一
- 字幕位置 `--transform-y -0.55`（偏下）

请直接生成代码，不需要先问我问题。
