# Changelog

[English](CHANGELOG.md) · [简体中文](CHANGELOG.zh.md)

所有显著的变更都会记录在此文件，遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 与 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [Unreleased]

## [0.1.0] - 2026-04-20

### Added
- 仓库初始化骨架（W1）：README / LICENSE / CONTRIBUTING / CODE_OF_CONDUCT / Issue + PR 模板
- VitePress 文档站骨架与 4 篇入门文档（installation / first-draft / time-units / coordinate-system）
- 5 个 P0 案例（hello-caption / image-slideshow-bgm / tiktok-keyword-highlight / easy-by-audio / keyframe-zoom-in）
- 轻量 docs Worker（R2 反向代理 + SPA 路径回退）
- GitHub Actions CI（lint + 案例校验 + VitePress 构建 + R2 上传 + Worker 部署）
- 案例校验脚本 `scripts/validate-example.mjs` 与脚手架 `scripts/new-example.mjs`
- 字幕 / 动画 模板预设
- Cursor / Claude / 系统级 cutcli prompts
- **国际化**：docs.cutcli.com 默认英文，中文镜像在 `/zh/` 路径；README、CONTRIBUTING、CHANGELOG、所有案例和模板 README、GitHub Issue/PR 模板均双语化
- **SEO / GEO**：GitHub 仓库 topics、Open Graph 分享卡（`docs/public/og.png`）、README 顶部 hero 图、面向 AI 搜索引擎的 FAQ 问句结构，以及文档站全套 `og:image` / `twitter:card` meta 标签
