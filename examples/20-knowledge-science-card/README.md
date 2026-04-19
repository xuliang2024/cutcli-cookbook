# 20 · Knowledge Science Card (60s)

> 60 秒竖屏知识科普视频：标题 → 3 要点 → 总结。每段配图自动 Ken Burns 推近，字幕带半透明背景卡。

![preview](preview.gif)

> `preview.gif` 暂未提交，CI 会强制要求。

## 适用场景

- "3 分钟讲懂 XX" 类知识博主
- 教程类竖屏内容
- 图文 / 公众号文章衍生短视频

## 一行运行

```bash
bash run.sh
```

## 关键参数解释

| 参数 | 值 | 为什么 |
|---|---|---|
| 总时长 60s | 4 段图 + 5 条字幕 | 知识类视频常见时长 |
| 字幕背景卡 `--bg-color #000 --bg-alpha 0.55 --bg-round 8` | 半透明黑色圆角 | 知识科普标志性视觉，字幕在任何画面都清晰 |
| `--bg-style 1` | 填充 | 0=无背景；1=填充 |
| 图片 Ken Burns 缩放 1.0 → 1.15 | 10s 内 | 防止静态画面无聊；每段图独立计算 segmentId |
| 关键词色 `#FFD600` / `#FF3A6E` | 主题色固定 | 全片只用 1-2 种强调色 |
| `volume: 0.4` | 较低 | 知识类视频通常自配旁白，BGM 不能抢 |

## 进阶改造

### 加旁白

把 `data/audio.json` 改成两条：BGM + 旁白。

```json
[
  {"audioUrl":"https://cutcli.com/assets/demo/bgm-light.mp3","duration":60000000,"start":0,"end":60000000,"volume":0.25},
  {"audioUrl":"https://your-cdn.com/narration.mp3","duration":60000000,"start":0,"end":60000000,"volume":1.0}
]
```

### 字幕换字体

加全局选项：

```bash
cutcli captions add "$DRAFT_ID" --captions @data/captions.json \
  --font "PingFang SC" --font-size 9 ...
```

### 加进度条贴纸

`cutcli sticker add` 加一个底部进度条贴纸 + 关键帧让 `scale_x` 从 0 → 1。

## 用到的 cutcli 能力

- `cutcli draft create` — 竖屏画布
- `cutcli images add` + `images list` — 加图、回查 segmentId
- `cutcli keyframes add` — 多段图独立 Ken Burns
- `cutcli captions add` — 字幕背景卡 + 关键词高亮
- `cutcli audios add` — 多音频混音
- bash 循环动态构造 JSON
