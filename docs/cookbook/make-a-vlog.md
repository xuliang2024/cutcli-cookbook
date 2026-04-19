# 做一个 Vlog

把"我的一天 / 我的一周"类 Vlog 模板用 cutcli 重新做一遍，目标 30 秒，能批量复用。

参考完整代码：[`examples/30-vlog-day-in-life`](https://github.com/m007/cutcli-cookbook/tree/main/examples/30-vlog-day-in-life)。

## 需求拆解

| 时段 | 内容 | 视觉手法 |
|---|---|---|
| 0-2s | 标题"我的一天"居中渐显 | 字幕入场 |
| 2-10s | 早晨场景 + "AM 7:00 · 早咖啡" | Ken Burns 推近 |
| 10-20s | 中午场景 + "PM 1:00 · 午餐时光" | 擦除转场 |
| 20-28s | 傍晚场景 + "PM 8:00 · 晚风散步" | 擦除转场 |
| 28-30s | "明天见 ✨" 弹入 | 弹入跳动 |
| 全程 | 轻 BGM volume=0.55 | 轻盈氛围 |

## 三步写出来

### 1. 起骨架

```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "vlog" | jq -r '.draftId')
```

### 2. 加图（带擦除转场）

把 3 张图按 0-10 / 10-20 / 20-30 切，前两段加 `transition: "向右擦除"`：

```bash
cutcli images add "$DRAFT_ID" --image-infos @images.json
```

`images.json`：

```json
[
  {"imageUrl":"...","width":1080,"height":1920,"start":0,"end":10000000,
   "transition":"向右擦除","transitionDuration":500000},
  ...
]
```

### 3. 加时间标签字幕

```bash
cutcli captions add "$DRAFT_ID" --captions @captions.json \
  --font-size 9 --bold --transform-y -0.7
```

每段字幕带不同 `keywordColor` 对应早 / 午 / 晚气氛（黄 / 橙 / 粉）。

## 关键技巧

- **擦除转场更有 Vlog 感**：比叠化更具节奏，类似翻页
- **字幕偏下到 -0.7**：给画面更多展示空间，符合 Vlog 慢节奏审美
- **第一段 Ken Burns**：Vlog 开场要有动感，让用户立刻进入场景

## 想批量出多版？

把 `images.json` 改成 `images-summer.json` / `images-winter.json` / `images-trip.json`，run.sh 整体复用：

```bash
bash run.sh images-summer.json
# run.sh 里改 cutcli images add ... --image-infos "@${1:-images.json}"
```

一周做 7 个不同主题 Vlog 不是问题。

## 完整代码

[`examples/30-vlog-day-in-life`](https://github.com/m007/cutcli-cookbook/tree/main/examples/30-vlog-day-in-life)
