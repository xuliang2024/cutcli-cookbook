# TikTok 风格短视频

抖音 / TikTok 爆款的字幕节奏：每 2 秒一个关键词、强烈视觉对比、加粗 + 描边、入场动画夸张。

参考完整代码：[`examples/03-tiktok-keyword-highlight`](https://github.com/m007/cutcli-cookbook/tree/main/examples/03-tiktok-keyword-highlight) 与 [`examples/05-keyframe-zoom-in`](https://github.com/m007/cutcli-cookbook/tree/main/examples/05-keyframe-zoom-in)。

## 五条字幕铁律

1. **每条 ≤ 12 字**，不超过 2 秒
2. **必有一个关键词高亮**，颜色固定 1-2 种
3. **白色字 + 黑描边宽 1**，永远清晰
4. **入场动画用"向上滑入"或"弹入跳动"**，避免渐显（太慢）
5. **位置 `--transform-y -0.55`**，比传统底部字幕稍高（避开 UI）

## 命令模板

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"今天教大家一个秘密","start":0,"end":2000000,
   "keyword":"秘密","keywordColor":"#FFD600",
   "inAnimation":"弹入跳动","inAnimationDuration":350000},
  {"text":"用这个方法效率翻倍","start":2000000,"end":4000000,
   "keyword":"翻倍","keywordColor":"#FF3A6E",
   "inAnimation":"弹入跳动","inAnimationDuration":350000},
  {"text":"记得点赞收藏","start":4000000,"end":6000000,
   "keyword":"点赞收藏","keywordColor":"#FF6600",
   "inAnimation":"弹入跳动","inAnimationDuration":350000,
   "outAnimation":"渐隐","outAnimationDuration":250000}
]' --font-size 9 --bold --text-color "#FFFFFF" \
   --border-color "#000000" --border-width 1 --transform-y -0.55
```

## 配视觉：图片 + 关键帧推拉

每段字幕底下配一张图，加 1.0 → 1.15 的关键帧推近：

```bash
cutcli images add "$DRAFT_ID" --image-infos '[
  {"imageUrl":"...","width":1080,"height":1920,"start":0,"end":2000000},
  {"imageUrl":"...","width":1080,"height":1920,"start":2000000,"end":4000000},
  {"imageUrl":"...","width":1080,"height":1920,"start":4000000,"end":6000000}
]'

# 给每张图加缩放
SEGS=$(cutcli images list "$DRAFT_ID" | jq -r '.[].segmentId')
for SEG in $SEGS; do
  cutcli keyframes add "$DRAFT_ID" --keyframes "[
    {\"segmentId\":\"$SEG\",\"property\":\"scale_x\",\"offset\":0,\"value\":1.0},
    {\"segmentId\":\"$SEG\",\"property\":\"scale_x\",\"offset\":2000000,\"value\":1.15},
    {\"segmentId\":\"$SEG\",\"property\":\"scale_y\",\"offset\":0,\"value\":1.0},
    {\"segmentId\":\"$SEG\",\"property\":\"scale_y\",\"offset\":2000000,\"value\":1.15}
  ]"
done
```

## 选 BGM

抖音爆款 BGM 通常节奏感强、有 Drop。挑选时让 Drop 卡在你**第一个关键词出现的位置**（一般 0.5-1s 处），观感会有"卡点"加成。

```bash
cutcli audios add "$DRAFT_ID" --audio-infos '[
  {"audioUrl":"...","duration":6000000,"start":0,"end":6000000,"volume":0.7}
]'
```

## 双语版（中英文同屏）

爆款的另一种玩法：中英文同时呈现。两条字幕同时间段，靠 `transformY` 错开位置：

```json
[
  {"text":"今天分享一个秘密","start":0,"end":2000000,
   "keyword":"秘密","keywordColor":"#FFD600",
   "fontSize":9,"transform_y":-0.5},
  {"text":"Today's little secret","start":0,"end":2000000,
   "keyword":"secret","keywordColor":"#FFD600",
   "fontSize":7,"transform_y":-0.6}
]
```

> 注意：`transform_y` 是单条字幕字段；全局的是 `--transform-y`（kebab-case CLI 风格）。

## 完整代码

- 关键词字幕：[`examples/03-tiktok-keyword-highlight`](https://github.com/m007/cutcli-cookbook/tree/main/examples/03-tiktok-keyword-highlight)
- 关键帧推近：[`examples/05-keyframe-zoom-in`](https://github.com/m007/cutcli-cookbook/tree/main/examples/05-keyframe-zoom-in)
