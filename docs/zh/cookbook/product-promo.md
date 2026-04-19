# 产品宣传片（30 秒）

电商首页 / 详情页 banner / 抖音投流常用的 30 秒产品宣传片模板。

参考完整代码：[`examples/10-product-promo-30s`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/10-product-promo-30s)。

## 黄金 30 秒结构

```text
0────3────────12────────24────30  (秒)
[标题][产品轮播 ×3][卖点 ×3   ][CTA]
```

| 时段 | 内容 |
|---|---|
| 0-3s | 产品名标题，渐显 |
| 3-12s | 3 张产品图轮播，叠化转场 |
| 12-24s | 3 句卖点字幕，每句 4s，关键词高亮 |
| 24-30s | "立即了解 → cutcli.com" CTA，弹入跳动 |
| 全程 | BGM 0.5 音量 |

## 命令组合

```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')

cutcli images   add "$DRAFT_ID" --image-infos @images.json
cutcli captions add "$DRAFT_ID" --captions    @captions.json \
  --font-size 9 --bold --text-color "#FFFFFF" \
  --border-color "#000000" --border-width 1 --transform-y -0.55
cutcli audios   add "$DRAFT_ID" --audio-infos @audio.json
```

## 关键参数解释

| 参数 | 选择 | 为什么 |
|---|---|---|
| 黑描边宽 1 + 白色字 | `--border-color "#000" --border-width 1` | 不论背景什么色都清晰 |
| 关键词色 黄 + 红粉 | `#FFD600` / `#FF3A6E` | 高对比度，全片只用 1-2 种主色 |
| 字幕 `--transform-y -0.55` | 偏下 55% | 避开抖音底部 UI |
| BGM 0.5 | 音量 | 给后期加旁白留空间 |
| 卖点字幕 4s/句 | `start`/`end` 间隔 4M μs | 比 TikTok 节奏稍慢，便于看完信息 |

## 进阶变体

### 60 秒版

把所有时间 ×2，再加 2-3 张图、2-3 句卖点。结构完全不变。

### 横屏 16:9 版（适合 B 站 / YouTube）

```bash
cutcli draft create --width 1920 --height 1080
```

字幕位置改 `--transform-y -0.4`（横屏字幕传统更靠下）。

### 加滤镜统一色调

```bash
cutcli query filters --action search --keyword "暖色" --pretty
cutcli filters add "$DRAFT_ID" --filter-infos '[
  {"filterId":"<id-from-query>","start":0,"end":30000000,"intensity":60}
]'
```

## 完整代码

[`examples/10-product-promo-30s`](https://github.com/xuliang2024/cutcli-cookbook/tree/main/examples/10-product-promo-30s)
