---
layout: home

hero:
  name: cutcli
  text: One command to a CapCut draft
  tagline: CapCut / Jianying draft CLI - script drafts locally, then upload and render in the cloud
  image:
    src: /hero.svg
    alt: cutcli
  actions:
    - theme: brand
      text: Get started in 30 minutes
      link: /guide/first-draft
    - theme: alt
      text: Install
      link: /guide/installation
    - theme: alt
      text: GitHub
      link: https://github.com/xuliang2024/cutcli-cookbook

features:
  - icon: ⚡️
    title: One-line install
    details: "curl -s https://cutcli.com/cli | bash"
  - icon: 🎬
    title: Standard drafts
    details: Generates draft folders that the CapCut / Jianying desktop app opens directly — no plugins.
  - icon: 🧩
    title: Full coverage
    details: Captions / images / videos / audios / effects / filters / stickers / keyframes / masks all scripted.
  - icon: ☁️
    title: Cloud rendering
    details: Authenticate once, upload a draft zip, submit render jobs, and inspect queue/results from the CLI.
  - icon: 🤖
    title: AI-friendly
    details: One-line setup for Cursor / Claude Code / OpenClaw — turn natural language into video.
  - icon: 🌏
    title: Cross-platform
    details: macOS (Intel & Apple Silicon) / Linux / Windows binaries, no Node required.
  - icon: 📚
    title: Cookbook
    details: Ready-to-run examples covering marketing, knowledge cards, vlogs, TikTok-style shorts.
---

## Quick try

```bash
# Install cutcli
curl -s https://cutcli.com/cli | bash

# Run the simplest example
git clone https://github.com/xuliang2024/cutcli-cookbook.git
cd cutcli-cookbook/examples/01-hello-caption
bash run.sh
```

Open CapCut / Jianying — your new draft is already in the list.

Cloud render an existing draft:

```bash
cutcli auth set --api-key cut_live_xxx_yyy
cutcli cloud render <draftId> --pretty
cutcli timer render --count 1 --pretty
```

## Pick a starting point

- New to cutcli? → [Build your first draft in 30 minutes](/guide/first-draft)
- Want runnable examples? → [Cookbook overview](/cookbook/index)
- Looking up a command? → [CLI reference](/reference/cli)
- Automating cloud renders? → [Node.js SDK overview](/reference/api)
- Want AI to write commands for you? → [AI integrations](/guide/ai-integration)

> 中文用户请前往 [docs.cutcli.com/zh/](/zh/)。
