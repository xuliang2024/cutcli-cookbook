# cutcli-cookbook

> 为 [cutcli](https://cutcli.com) —— 剪映 / CapCut 草稿命令行工具 —— 准备的开源案例库、JSON 模板、AI 提示词与文档站。让你用代码、Cursor、Claude Code 或任意 MCP agent 生成可二次编辑的视频草稿。

[English](README.md) · [简体中文](README.zh.md)

<p align="center">
  <a href="https://docs.cutcli.com">
    <img src="docs/public/og.png" alt="cutcli —— 剪映 / CapCut 草稿 CLI 案例库，支持 Cursor、Claude Code 与 MCP agent" width="100%" />
  </a>
</p>

[![docs](https://img.shields.io/badge/docs-docs.cutcli.com-blue)](https://docs.cutcli.com)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)
[![GitHub stars](https://img.shields.io/github/stars/xuliang2024/cutcli-cookbook?style=flat&logo=github)](https://github.com/xuliang2024/cutcli-cookbook/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/xuliang2024/cutcli-cookbook)](https://github.com/xuliang2024/cutcli-cookbook/commits/main)
[![Made for AI agents](https://img.shields.io/badge/made%20for-Cursor%20·%20Claude%20Code%20·%20MCP-ff5a36)](prompts/)

cutcli 让你**用一行命令生成可被剪映直接打开的标准草稿**。这个仓库收录所有可一键运行的案例、可复用模板、AI 提示词、官方文档源码，欢迎社区贡献。

---

## 30 秒上手

```bash
# 1. 安装 cutcli
curl -s https://cutcli.com/cli | bash

# 2. 跑一个最简单的案例
git clone https://github.com/xuliang2024/cutcli-cookbook.git
cd cutcli-cookbook/examples/01-hello-caption
bash run.sh

# 3. 打开剪映，案例草稿已自动出现在草稿列表里
```

完整入门：<https://docs.cutcli.com/guide/installation>

## 仓库内容

| 目录 | 内容 |
|---|---|
| [`examples/`](examples/) | 一键可运行的完整案例（每个含 `run.sh` + `README.md` + `preview.gif`） |
| [`templates/`](templates/) | 可复用的 JSON 片段（字幕预设、动画预设、滤镜组合） |
| [`prompts/`](prompts/) | 给 Cursor / Claude / ChatGPT 用的 cutcli 提示词 |
| [`docs/`](docs/) | 官方文档站源码（VitePress，部署到 docs.cutcli.com） |
| [`showcase/`](showcase/) | 社区精选作品月刊 |
| [`worker/`](worker/) | 文档站的 Cloudflare Worker（R2 反向代理 + SPA fallback） |

## P0 案例速览

| 案例 | 演示 | 时长 |
|---|---|---|
| [01-hello-caption](examples/01-hello-caption/) | 一行字幕 + 入场动画 | 5 s |
| [02-image-slideshow-bgm](examples/02-image-slideshow-bgm/) | 3 图轮播 + 转场 + BGM | 9 s |
| [03-tiktok-keyword-highlight](examples/03-tiktok-keyword-highlight/) | 多条字幕 + 关键词高亮 | 6 s |
| [04-easy-by-audio](examples/04-easy-by-audio/) | `cutcli draft easy` 按音频铺素材 | 自适应 |
| [05-keyframe-zoom-in](examples/05-keyframe-zoom-in/) | 图片 + 关键帧缩放 | 5 s |

## 常见问题

### cutcli 是什么？

cutcli 是一个单文件命令行工具，把 shell 命令或 JSON 直接转成**剪映 / CapCut 标准草稿目录**。打开剪映客户端，新草稿已经躺在草稿列表里——字幕、动画、转场、音频、关键帧全都可二次编辑。不是逆向 hack 的草稿格式，也不需要手动改 JSON。

安装：`curl -s https://cutcli.com/cli | bash`

### 这个仓库里有什么？

- [`examples/`](examples/) —— 复制即跑的完整案例（一行字幕、图片轮播、关键词高亮、按音频铺素材、关键帧缩放）
- [`templates/`](templates/) —— 可复用的字幕 / 动画 / 滤镜 JSON 片段
- [`prompts/`](prompts/) —— 给 Cursor / Claude Code / ChatGPT / MCP agent 的系统提示词
- [`docs/`](docs/) —— 文档站源码，部署到 [docs.cutcli.com](https://docs.cutcli.com)
- [`worker/`](worker/) —— 文档站的 Cloudflare Worker（R2 反向代理 + SPA 路径回退）

### 怎么用 Cursor / Claude Code / MCP 调用 cutcli？

cutcli 就是一个 shell 命令，任何 AI 编程助手都能驱动。我们在 [`prompts/`](prompts/) 提供了开箱即用的系统提示词——丢给你的 agent，然后跟它说「在第 1 秒加一段 3 秒淡入字幕」「把这三张图拼成 9 秒带 BGM 的轮播」即可。Agent 会自动生成 `cutcli ...` 命令，跑完直接得到剪映草稿。完整集成指南见 <https://docs.cutcli.com/zh/guide/ai-integration>。

### 同时支持 CapCut 国际版和剪映国内版吗？

支持。两个客户端共享同一套草稿格式，cutcli 生成的草稿目录两边都能直接打开。

### 和手写剪映草稿 JSON 有什么区别？

手写草稿 JSON 要面对：微秒时间戳、未文档化的枚举值、归一化的 0–1 坐标、好几个必须保持同步的兄弟文件。cutcli 全都帮你处理，并提供一套稳定的 CLI（`cutcli draft create` / `captions add` / `draft easy` …），剪映客户端升级也不需要重写脚本。和「用 FFmpeg 而不是手写 MP4 box」是同一个理由。

## 加入贡献

我们欢迎任何形式的贡献：

- 提一个新案例（最简单，0 配置直接复制目录改）
- 翻译文档到英文
- 修一个 bug
- 在 `showcase/` 投稿你的作品

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 相关链接

- 官网：<https://cutcli.com>
- 文档：<https://docs.cutcli.com>
- 安装命令：`curl -s https://cutcli.com/cli | bash`
- 反馈与讨论：[Issues](https://github.com/xuliang2024/cutcli-cookbook/issues) / [Discussions](https://github.com/xuliang2024/cutcli-cookbook/discussions)

## License

[MIT](LICENSE) © 2026 m007 and cutcli-cookbook contributors
