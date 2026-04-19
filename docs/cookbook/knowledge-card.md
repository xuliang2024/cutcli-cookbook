# 知识科普卡片

"3 分钟讲懂 XX" 风格的竖屏知识视频。重点：**字幕清晰、节奏稳、画面不抢戏**。

参考完整代码：[`examples/20-knowledge-science-card`](https://github.com/m007/cutcli-cookbook/tree/main/examples/20-knowledge-science-card)。

## 结构

| 时段 | 内容 |
|---|---|
| 0-2s | 标题 "3 分钟讲懂：XX" |
| 2-12s | 要点 1：一句话 + 配图 + Ken Burns |
| 12-30s | 要点 2 |
| 30-50s | 要点 3 |
| 50-60s | 总结 + CTA |

## 字幕背景卡（关键差异化）

知识类视频的标志性视觉是**半透明黑色圆角字幕背景**，cutcli 一行参数搞定：

```bash
cutcli captions add "$DRAFT_ID" --captions @captions.json \
  --font-size 9 --bold --text-color "#FFFFFF" \
  --bg-color "#000000" --bg-alpha 0.55 --bg-style 1 --bg-round 8 \
  --transform-y -0.6
```

| 参数 | 含义 |
|---|---|
| `--bg-style 1` | 启用背景填充 (0 = 无) |
| `--bg-color "#000000"` | 背景色 |
| `--bg-alpha 0.55` | 背景透明度（0-1） |
| `--bg-round 8` | 圆角 |

## 给每段图自动加 Ken Burns

每段配图独立缩放，让画面有动感。bash 循环动态构造 keyframes JSON：

```bash
SEGMENTS=$(cutcli images list "$DRAFT_ID" | jq -r '.[].segmentId')
KFS="["
i=0
for SEG in $SEGMENTS; do
  if [ $i -gt 0 ]; then KFS="${KFS},"; fi
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_x\",\"offset\":0,\"value\":1.0},"
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_x\",\"offset\":10000000,\"value\":1.15},"
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_y\",\"offset\":0,\"value\":1.0},"
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_y\",\"offset\":10000000,\"value\":1.15}"
  i=$((i + 1))
done
KFS="${KFS}]"
cutcli keyframes add "$DRAFT_ID" --keyframes "$KFS"
```

## 旁白怎么加

知识类视频通常有真人旁白或 AI 配音：

```bash
cutcli audios add "$DRAFT_ID" --audio-infos '[
  {"audioUrl":"https://your-cdn/bgm.mp3","duration":60000000,"start":0,"end":60000000,"volume":0.25},
  {"audioUrl":"https://your-cdn/narration.mp3","duration":60000000,"start":0,"end":60000000,"volume":1.0}
]'
```

BGM 调到 0.25，让旁白主导。

## 完整代码

[`examples/20-knowledge-science-card`](https://github.com/m007/cutcli-cookbook/tree/main/examples/20-knowledge-science-card)
