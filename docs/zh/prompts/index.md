# Prompts 提示词库

为 Cursor / Claude Code / ChatGPT / Gemini 等 AI 工具准备的 cutcli 提示词，复制粘贴即用。

## 核心提示词

| 类型 | 用途 | 文件 |
|---|---|---|
| 系统级 | "你是一位 cutcli 专家"，适合放进 ChatGPT 自定义指令 | [`prompts/system/cutcli-expert.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/system/cutcli-expert.md) |
| Cursor | 在 Cursor 中一句话生成宣传片 | [`prompts/cursor/make-promo-video.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/cursor/make-promo-video.md) |
| Claude | 让 Claude 自动写分镜并生成 cutcli 命令 | [`prompts/claude/auto-storyboard.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/claude/auto-storyboard.md) |

## 怎么用

### Cursor / Claude Code

跑一次 `cutcli setup cursor`（或 `claude`）即可，详见 [AI 工具集成](/zh/guide/ai-integration)。

### ChatGPT / Gemini / 其他

复制 [`prompts/system/cutcli-expert.md`](https://github.com/xuliang2024/cutcli-cookbook/blob/main/prompts/system/cutcli-expert.md) 全文，粘贴到模型的"系统提示"或"自定义指令"中。然后就可以直接说"帮我做一个 5 秒的字幕动画"，模型会输出可运行的 cutcli 命令。

## 贡献你的 Prompt

如果你写出了好用的 cutcli 提示词，欢迎 PR：

1. 文件放到 `prompts/<工具名>/<场景>.md`
2. 文件顶部加 frontmatter：
   ```yaml
   ---
   title: 一句话标题
   author: your-handle
   target: cursor | claude | chatgpt | gemini
   tags: [marketing, vlog, ...]
   ---
   ```
3. 提 PR，CI 会校验格式
