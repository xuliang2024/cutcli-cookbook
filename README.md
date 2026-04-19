# cutcli-cookbook

> 为 [cutcli](https://cutcli.com) —— 剪映 / CapCut 草稿命令行工具 —— 准备的开源案例库、模板库与文档站。

[![docs](https://img.shields.io/badge/docs-docs.cutcli.com-blue)](https://docs.cutcli.com)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

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
