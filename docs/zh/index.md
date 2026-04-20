---
layout: home

hero:
  name: cutcli
  text: 用一行命令生成剪映草稿
  tagline: CapCut / 剪映 草稿命令行工具 — 字幕、图片、视频、音频、特效、关键帧，全部脚本化
  image:
    src: /hero.svg
    alt: cutcli
  actions:
    - theme: brand
      text: 30 分钟上手
      link: /zh/guide/first-draft
    - theme: alt
      text: 安装
      link: /zh/guide/installation
    - theme: alt
      text: GitHub
      link: https://github.com/xuliang2024/cutcli-cookbook

features:
  - icon: ⚡️
    title: 一行安装
    details: "curl -s https://cutcli.com/cli | bash"
  - icon: 🎬
    title: 标准草稿
    details: 生成可被剪映桌面端直接打开的标准草稿文件夹，无需任何插件
  - icon: 🧩
    title: 全场景覆盖
    details: 字幕 / 图片 / 视频 / 音频 / 特效 / 滤镜 / 贴纸 / 关键帧 / 遮罩 全部脚本化
  - icon: 🤖
    title: AI 友好
    details: 一键集成 Cursor / Claude Code / OpenClaw，自然语言生成视频
  - icon: 🌏
    title: 全平台
    details: macOS (Intel & Apple Silicon) / Linux / Windows 二进制开箱即用
  - icon: 📚
    title: 案例库
    details: 即拿即用的 cookbook 案例，覆盖营销、知识、Vlog、TikTok 风格
---

## 快速试一下

```bash
# 安装 cutcli
curl -s https://cutcli.com/cli | bash

# 跑一个最简单的案例
git clone https://github.com/xuliang2024/cutcli-cookbook.git
cd cutcli-cookbook/examples/01-hello-caption
bash run.sh
```

打开剪映，新草稿已经在草稿列表里。

## 选一个起点

- 第一次接触 cutcli？ → [30 分钟做第一个草稿](/zh/guide/first-draft)
- 想看完整可运行的案例？ → [案例总览](/zh/cookbook/index)
- 找命令的具体用法？ → [CLI 命令参考](/zh/reference/cli)
- 想让 AI 帮你写命令？ → [AI 工具集成](/zh/guide/ai-integration)
