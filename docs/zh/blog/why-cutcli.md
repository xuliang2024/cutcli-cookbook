---
title: '别再手写剪映 JSON 了：cutcli 让 Cursor / Claude Code 一句话生成可二次编辑的剪映 / CapCut 草稿'
description: '为什么手写剪映草稿 JSON 在 AI agent 时代是一条死路——以及 cutcli 如何用一句自然语言提示词，生成你打开剪映就能继续二次编辑的真草稿。'
date: 2026-04-20
author: m007
---

# 别再手写剪映 JSON 了：cutcli 让 Cursor / Claude Code 一句话生成可二次编辑的剪映 / CapCut 草稿

> **太长不看** —— 剪映 / CapCut 草稿本质是 JSON 文件夹。手写它脆弱又慢。`cutcli` 是一个单文件 CLI，提供稳定的命令面（`cutcli draft create`、`captions add`、`audios add`、`keyframes add` …），让任何 AI agent —— Cursor、Claude Code、ChatGPT、Gemini、OpenClaw、MCP —— 都能用一句自然语言驱动视频生产。最终产物是一个真正的剪映草稿，客户端打开即可，并且 100% 可继续编辑。

## 痛点：剪映草稿是个 JSON 雷区

如果你打开过 `~/Movies/JianyingPro/User Data/Projects/com.lveditor.draft/<some-uuid>/draft_content.json`，应该见识过这些坑：

- 满屏**微秒时间戳** —— `3000000` 是 3 秒，不是 3 毫秒。
- 视觉位置用**归一化 0..1 坐标**，画布尺寸又是像素，混着用。
- **未文档化的枚举** —— 动画名是中文字符串，比如 `渐显`、`轻微放大`，没有公开列表。
- 必须保持同步的 **6 个兄弟文件**：`draft_content.json`、`draft_meta_info.json`、`draft_settings.json`、`resources/`、`cover.jpg` …
- **版本漂移** —— 一个能在剪映 4.x 打开的草稿，到 5.x 可能因为某个字段改名而无声崩坏。

撞上这堵墙的人会写一些临时性的 Python 脚本去逆向草稿格式。这些脚本能撑过一个剪映版本，下一版就烂掉。这套格式根本不是公开 API。

## 为什么 2026 年这件事变得严重：AI agent 需要稳定的命令面

2026 年的短视频创作者大多数已经不打开 IDE 了。他们直接对 Cursor / Claude Code / 任意 MCP agent 说：

> "拿这三张产品图，加 6 秒 TikTok 风的字幕轨，关键词高亮，把我的 BGM 铺在下面，给我个能二次编辑的剪映草稿。"

LLM 要稳定交付这个 prompt，需要三件东西：

1. **稳定的命令面**，不能在它脚下乱变。
2. **产物能扛住剪映版本升级。**
3. **可往返编辑** —— 用户必须能打开草稿继续调，否则 AI 就丢了长尾。

JSON 当 API：三件全都没有。CLI 当 API：三件全都有。

## `cutcli` 到底是什么

cutcli 是一个静态二进制文件，一行安装：

```bash
curl -s https://cutcli.com/cli | bash
```

它暴露的是一个小而稳定的命令面：

```bash
cutcli draft create --width 1080 --height 1920
cutcli captions add "$DRAFT_ID" --captions '[...]'
cutcli images add   "$DRAFT_ID" --image-infos '[...]'
cutcli audios add   "$DRAFT_ID" --audio-infos '[...]'
cutcli keyframes add "$DRAFT_ID" --keyframes '[...]'
cutcli draft easy   --by-audio audio.mp3 --captions '[...]'
cutcli draft upload "$DRAFT_ID"
```

底层它替你写真正的剪映 / CapCut 草稿目录，把坐标归一化、`draft_meta_info.json` 标得正确、把远程素材下载进 `resources/`、跟踪不同剪映版本的差异。最终草稿落进你的草稿列表，打开即可编辑。

## 一张大家都不愿意写但都需要的对比表

| 方案 | 出第一帧的时间 | 扛剪映升级 | AI 能驱动 | 出片后能在剪映里继续编辑 |
|---|---|---|---|---|
| 手写 `draft_content.json` | 几小时，然后崩 | 否 | 几乎不能 | 能（直到你再编辑一次又崩） |
| 逆向 Python 脚本 | 几天，然后崩 | 否 | 能，但脆弱 | 能 |
| FFmpeg / MoviePy | 几分钟 | 能 | 能 | **不能** —— 输出是平的 MP4 |
| **`cutcli`** | 几秒 | 能 | 能 | **能 —— 完整草稿** |

最后一列是别人都给不了的。FFmpeg 能从 prompt 渲一个 MP4，但渲不出一个剪映里能拖时间轴改字幕的工程文件。cutcli 可以。

## 实战：一个 Claude Code prompt → 可二次编辑的草稿

跑过 `cutcli setup claude`（或同款 cursor / openclaw）之后，丢这段进 Claude Code：

> 把 `cover.jpg`、`feature.jpg`、`cta.jpg` 拼成 9 秒轮播，加淡入淡出转场，下面铺 `bgm-light.mp3`（音量 50%），再加一条 TikTok 风字幕"新品上线"，其中"上线"两字用 #ff5a36 高亮。

Claude Code 会输出大致这样的命令：

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

跑一遍。打开剪映。草稿就在列表里：3 段图片 + 淡入淡出 + BGM + 关键词高亮字幕，每一项都在时间轴上独立可编辑。

同样这个 prompt 喂给基于 FFmpeg 的工具，你拿到的是一个再也改不动的 MP4。整个故事就是这一句话的差异。

## 60 秒上手

```bash
# 1. 装 cutcli
curl -s https://cutcli.com/cli | bash

# 2. 把它接到你的 AI 工具
cutcli setup all

# 3. 跑最简单的案例
git clone https://github.com/xuliang2024/cutcli-cookbook.git
cd cutcli-cookbook/examples/01-hello-caption && bash run.sh
```

打开剪映 / CapCut，新草稿已经在草稿列表里。

## 接下来

- [30 分钟做第一个草稿](/zh/guide/first-draft) —— 不慌不忙的全流程教程。
- [AI 工具集成](/zh/guide/ai-integration) —— `cutcli setup` 在 Cursor / Claude Code / OpenClaw 的细节。
- [案例库](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples) —— 8 个可一键运行的案例，从"一行字幕"到 30 秒产品宣传片。
- [提示词库](https://github.com/xuliang2024/cutcli-cookbook/tree/main/prompts) —— 给 ChatGPT / Gemini / Claude API / OpenAI 兼容端点的开箱即用系统提示词。
- English version: [Stop hand-writing CapCut JSON](/blog/why-cutcli)

cutcli 基于 MIT 协议开源。源码：[github.com/xuliang2024/cutcli-cookbook](https://github.com/xuliang2024/cutcli-cookbook)。
