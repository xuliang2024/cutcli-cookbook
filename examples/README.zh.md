# Examples

[English](README.md) · [简体中文](README.zh.md)

每个目录是一个**完整可运行**的 cutcli 案例。

## 怎么跑

```bash
# 装 cutcli
curl -s https://cutcli.com/cli | bash

# 跑某个案例
cd examples/01-hello-caption
bash run.sh
```

打开剪映就能看到生成的草稿。

## 当前案例

| ID | 名称 | 核心能力 |
|---|---|---|
| 01 | [hello-caption](./01-hello-caption/) | 字幕 + 入场动画 |
| 02 | [image-slideshow-bgm](./02-image-slideshow-bgm/) | 图片轮播 + 转场 + 音频 |
| 03 | [tiktok-keyword-highlight](./03-tiktok-keyword-highlight/) | 关键词高亮字幕 |
| 04 | [easy-by-audio](./04-easy-by-audio/) | `draft easy` 自动铺素材 |
| 05 | [keyframe-zoom-in](./05-keyframe-zoom-in/) | 关键帧缩放 |
| 99 | [community](./99-community/) | 社区贡献区 |

## 想新增？

```bash
node scripts/new-example.mjs my-cool-case
```

详见根目录 [`CONTRIBUTING.md`](../CONTRIBUTING.md)。
