# Examples

[English](README.md) · [简体中文](README.zh.md)

Each subfolder is a **fully runnable** cutcli example.

## How to run one

```bash
# Install cutcli
curl -s https://cutcli.com/cli | bash

# Run an example
cd examples/01-hello-caption
bash run.sh
```

Open CapCut / Jianying — the generated draft is in your draft list.

## Current examples

| ID | Name | Core feature |
|---|---|---|
| 01 | [hello-caption](./01-hello-caption/) | Caption + entrance animation |
| 02 | [image-slideshow-bgm](./02-image-slideshow-bgm/) | Slideshow + transitions + audio |
| 03 | [tiktok-keyword-highlight](./03-tiktok-keyword-highlight/) | Keyword-highlighted captions |
| 04 | [easy-by-audio](./04-easy-by-audio/) | `draft easy` auto-fits assets |
| 05 | [keyframe-zoom-in](./05-keyframe-zoom-in/) | Keyframe zoom |
| 99 | [community](./99-community/) | Community contributions |

## Want to add one?

```bash
node scripts/new-example.mjs my-cool-case
```

See the root [`CONTRIBUTING.md`](../CONTRIBUTING.md).
