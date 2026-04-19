# 案例总览

每个案例都是一个**完整可运行**的脚本，包含 `run.sh`、JSON 数据、截图和说明。直接 `cd examples/<id>/ && bash run.sh` 就能在剪映里看到结果。

## 入门案例（W1）

| 案例 | 演示 | 难度 |
|---|---|---|
| [01-hello-caption](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/01-hello-caption) | 一行字幕 + 入场动画 | ⭐ |
| [02-image-slideshow-bgm](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/02-image-slideshow-bgm) | 3 图轮播 + 转场 + 背景音乐 | ⭐ |
| [03-tiktok-keyword-highlight](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/03-tiktok-keyword-highlight) | 多条字幕 + 关键词高亮 | ⭐ |
| [04-easy-by-audio](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/04-easy-by-audio) | 按音频时长自动铺素材 | ⭐ |
| [05-keyframe-zoom-in](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/05-keyframe-zoom-in) | 图片 + 关键帧缩放 | ⭐⭐ |

## 场景教程

按场景组织的图文教程，从需求出发讲清楚怎么搭：

- [做一个 Vlog](./make-a-vlog.md)
- [产品宣传片（30 秒）](./product-promo.md)
- [知识科普卡片](./knowledge-card.md)
- [TikTok 风格短视频](./tiktok-style.md)

## 投稿你的案例

写好了就提 PR！流程见 [CONTRIBUTING.md](https://github.com/xuliang2024/cutcli-cookbook/blob/main/CONTRIBUTING.md)。

最简单的方式：

```bash
git clone https://github.com/xuliang2024/cutcli-cookbook.git
cd cutcli-cookbook
node scripts/new-example.mjs my-cool-case
# 编辑生成的 examples/99-community/<handle>/my-cool-case/run.sh
```
