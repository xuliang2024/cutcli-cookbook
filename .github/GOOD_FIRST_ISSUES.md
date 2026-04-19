# Good First Issues — start here

[English](GOOD_FIRST_ISSUES.md) · [简体中文](GOOD_FIRST_ISSUES.zh.md)

> Maintainers open these as GitHub issues with the `good-first-issue` label.
> Every entry is scoped so it can be done in one folder, one PR.

---

## Examples (easiest, zero setup)

### case-001 Food photo vlog
- Path: `examples/99-community/<your-handle>/food-vlog/`
- Length: 10 s
- Touches: `captions`, `images`, `audios`, keyframe zoom-in
- Reference: `examples/30-vlog-day-in-life`

### case-002 Fitness tutorial intro card
- Path: `examples/99-community/<your-handle>/fitness-intro/`
- Length: 5 s
- Touches: `captions` (keyword highlight), `images`, `stickers` (dumbbell emoji)
- Reference: `examples/03-tiktok-keyword-highlight`

### case-003 Travel vlog with bilingual captions
- Path: `examples/99-community/<your-handle>/travel-bilingual/`
- Length: 15 s
- Touches: stacked captions (CN + EN on screen, offset via `transformY`)
- Reference: `docs/cookbook/tiktok-style.md` "bilingual variant" section

### case-004 Tutorial "before / after" split-screen captions
- Path: `examples/99-community/<your-handle>/before-after/`
- Length: 8 s
- Touches: two image segments side by side + captions "BEFORE / AFTER"
- Hint: use `transformX -0.5` / `0.5` to split the screen

### case-005 Festival red-envelope sticker card
- Path: `examples/99-community/<your-handle>/festival-redenvelope/`
- Length: 6 s
- Touches: `stickers` (red envelope / 福), keyframe rotation
- Hint: `cutcli query stickers --action search --keyword "red envelope"`

---

## Templates

### tpl-001 Caption preset: cinematic opening
- Path: `templates/captions/movie-opening.json`
- One caption with 1.5 s fade-in + 1 s fade-out + large size + centered

### tpl-002 Caption preset: chalk style
- Path: `templates/captions/chalk-style.json`
- Use `huazi` (florid) effects, fits teaching scenes

### tpl-003 Filter combo: retro warm
- Path: `templates/filters/retro-warm.json`
- Find a retro filter ID, intensity 70

---

## Docs

### doc-001 Translate `docs/zh/guide/installation.md` to English (or Japanese / French / …)
- Path: `docs/<lang>/guide/installation.md`
- Hint: keep the section order from the Chinese version

### doc-002 Write a "Windows install guide"
- Path: `docs/guide/windows-install.md`
- Touches: PowerShell install, PATH setup

### doc-003 Troubleshooting: CapCut says draft is corrupted
- Path: `docs/troubleshooting.md` (new)
- List 5 most common errors + fixes

---

## Tooling

### util-001 Add `--type vlog|promo|knowledge` template option to `scripts/new-example.mjs`
- Different types generate different starter `data/*.json`

### util-002 Write `scripts/check-preview-gif.mjs`
- Verify each example has `preview.gif`, ≤ 3 MB, ≥ 480p

### util-003 Add a dark / light theme toggle hint to the docs site
- Edit `docs/.vitepress/config.mts`

---

## How do I claim one?

Comment "I'd like to do this" on the corresponding issue. A maintainer assigns it within 24 h. Please claim no more than 1 at a time.

First contribution? Read [CONTRIBUTING.md](../CONTRIBUTING.md) first.
