# Changelog

[English](CHANGELOG.md) · [简体中文](CHANGELOG.zh.md)

All notable changes to this project are recorded in this file, following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] - 2026-04-20

### Added
- **Internationalization (i18n)**: docs.cutcli.com now defaults to English, with Chinese mirrored under `/zh/`. README, CONTRIBUTING, CHANGELOG, every example, every subpackage README, and the GitHub issue/PR templates are bilingual.
- VitePress `locales` config with separate nav / sidebar / footer / search per language.
- `examples/<id>/README.md` (English) plus `README.zh.md` (Chinese); five required H2 sections per language.
- `meta.json` schema accepts an optional `description_zh` for keeping the Chinese summary alongside the English one.
- `scripts/validate-example.mjs` enforces both English and Chinese README section sets when both files exist.
- `scripts/new-example.mjs` scaffolds bilingual READMEs by default.
- New lint `scripts/check-i18n-pairs.mjs` (run via `npm run lint:i18n`) enforces that bilingual file pairs stay in sync.
- **SEO / GEO**: GitHub repository topics, Open Graph card (`docs/public/og.png`), README hero image, FAQ section structured for AI search engines, and full `og:image` / `twitter:card` meta on the docs site.

### Initial scaffolding (W1)
- Repo skeleton: README / LICENSE / CONTRIBUTING / CODE_OF_CONDUCT / Issue + PR templates.
- VitePress doc site skeleton with 4 starter guides (installation / first-draft / time-units / coordinate-system).
- 5 P0 examples (hello-caption / image-slideshow-bgm / tiktok-keyword-highlight / easy-by-audio / keyframe-zoom-in).
- Lightweight docs Worker (R2 reverse proxy + SPA path fallback).
- GitHub Actions CI (lint + example validation + VitePress build + R2 upload + Worker deploy).
- `scripts/validate-example.mjs` validator and `scripts/new-example.mjs` scaffold.
- Caption / animation template presets.
- Cursor / Claude / system-level cutcli prompts.
