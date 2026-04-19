# 10 · Product Promo (30s)

> 30 秒电商产品宣传片：开场标题 → 3 段产品图轮播 → 卖点关键词高亮 → 结尾 CTA。

![preview](preview.gif)

> `preview.gif` 暂未提交，CI 会强制要求。

## 适用场景

- 电商首页产品视频、详情页 banner
- 抖音 / 视频号 / 小红书 投流素材
- 任何"30 秒讲完一个产品"的模板需求

## 一行运行

```bash
bash run.sh
```

## 关键参数解释

| 参数 | 值 | 为什么 |
|---|---|---|
| 总时长 30s | `end: 30000000` | 主流投流平台单条上限刚好够 |
| 开场 0-3s | 标题 + 第一张图 | 黄金 3 秒保留率 |
| 中段 3-12s | 3 张图 ×3s 叠化 | 让用户看清产品多面 |
| 中后段 12-24s | 卖点 ×3 关键词高亮 | 每条 4s，节奏稍慢便于看完 |
| 结尾 24-30s | CTA | 留 6s 让 CTA 信息进脑 |
| `volume: 0.5` | BGM 50% | 给后期可能的旁白留空间 |
| 字幕 `--transform-y -0.55` | 偏下 55% | 避开抖音底部 UI |
| 描边宽 1 + 黑色 | 永远清晰 | 不论背景什么颜色都能看清 |
| 关键词色 `#FFD600` / `#FF3A6E` | 高对比 | 选 1-2 种主色，全片统一 |

## 进阶改造

### 想要 60s 版本？

把所有 `start` / `end` × 2，再加 2-3 张图、2-3 句卖点。

### 替换素材

把 `data/images.json` 中的 `imageUrl` 换成你的产品图（必须公开 https URL，且 `width` / `height` 与图片实际尺寸匹配）。

### 加个滤镜统一色调

```bash
cutcli filters add "$DRAFT_ID" --filter-infos '[
  {"filterId":"REPLACE_BY_QUERY","start":0,"end":30000000,"intensity":60}
]'
```

先 `cutcli query filters --action search --keyword "暖色" --pretty` 找一个适合的滤镜 ID。

### 加产品 Logo 贴纸

参考 [05-keyframe-zoom-in](../05-keyframe-zoom-in/) 加一个右上角 Logo + 关键帧动画。

## 用到的 cutcli 能力

- `cutcli draft create` — 竖屏画布
- `cutcli images add` — 多张图 + 转场 + 入场动画
- `cutcli captions add` — 多段字幕 + 关键词高亮 + 入场动画
- `cutcli audios add` — BGM 音量控制
- 文件 + JSON 协作模式（用 `--captions @data/captions.json`）
