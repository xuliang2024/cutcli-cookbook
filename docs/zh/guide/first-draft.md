# 30 分钟做第一个草稿

读完这篇，你能：

- 创建第一个剪映草稿
- 加一行字幕、一张图片、一段背景音乐
- 用关键帧做缩放动画
- 把草稿打包发给别人

全程不需要写代码，只用 `cutcli` 命令。

## 准备

确认 cutcli 已经装好：

```bash
cutcli --version
```

如果报错请先看 [安装与配置](./installation.md)。

## 第 1 步：创建草稿

```bash
cutcli draft create --width 1080 --height 1920
```

输出类似：

```json
{
  "draftId": "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
  "filePath": "/Users/you/Movies/CapCut/.../a1b2c3d4-..."
}
```

复制 `draftId`，下面所有命令都要用它。为了方便，我们把它存成环境变量：

```bash
DRAFT_ID="a1b2c3d4-e5f6-7890-abcd-1234567890ab"
```

::: tip 一行获取 draftId
```bash
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')
```
:::

打开剪映，应该能在草稿列表看到一个新的空白草稿。

## 第 2 步：加一行字幕

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"我的第一个 cutcli 草稿","start":0,"end":3000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold --text-color "#FFFFFF"
```

要点：

- 时间单位是**微秒**：`3000000` 表示 3 秒，`500000` 表示 0.5 秒。详见 [时间单位](./time-units.md)
- `inAnimation` 是入场动画名。可以跑 `cutcli query text-animations --type in --pretty` 列出所有可选名

## 第 3 步：加一张图片背景

```bash
cutcli images add "$DRAFT_ID" --image-infos '[
  {
    "imageUrl":"https://cutcli.com/assets/demo/sunset.jpg",
    "width":1080,
    "height":1920,
    "start":0,
    "end":5000000,
    "inAnimation":"轻微放大",
    "inAnimationDuration":1000000
  }
]'
```

cutcli 会自动把图片下载到草稿的 `resources/` 目录，剪映打开后无需联网即可使用。

## 第 4 步：加背景音乐

```bash
cutcli audios add "$DRAFT_ID" --audio-infos '[
  {
    "audioUrl":"https://cutcli.com/assets/demo/bgm-light.mp3",
    "duration":5000000,
    "start":0,
    "end":5000000,
    "volume":0.5
  }
]'
```

## 第 5 步：用关键帧做缩放

先用 `cutcli images list "$DRAFT_ID"` 拿到刚才那张图片的 `segmentId`，然后：

```bash
SEG_ID="刚才列出来的图片 segmentId"

cutcli keyframes add "$DRAFT_ID" --keyframes "[
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_x\",\"offset\":0,\"value\":1.0},
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_x\",\"offset\":5000000,\"value\":1.3},
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_y\",\"offset\":0,\"value\":1.0},
  {\"segmentId\":\"$SEG_ID\",\"property\":\"scale_y\",\"offset\":5000000,\"value\":1.3}
]"
```

刷新剪映里的草稿（关闭再打开），背景图会出现 5 秒内从 100% 缓慢放大到 130% 的效果。

## 第 6 步：检查成果

```bash
cutcli draft info "$DRAFT_ID" --pretty
```

应该看到：

```json
{
  "canvasWidth": 1080,
  "canvasHeight": 1920,
  "duration": 5000000,
  "trackSummary": [...],
  "materialSummary": {
    "videos": 0,
    "audios": 1,
    "texts": 1,
    "images": 1
  }
}
```

## 第 7 步：打包分享给别人

```bash
cutcli draft upload "$DRAFT_ID"
```

返回的 `downloadUrl` 是一个公开的 zip 下载链接，对方下载后解压到自己的剪映草稿目录就能直接打开。

## 完整脚本版

把所有命令拼成一个 `run.sh`：

```bash
#!/usr/bin/env bash
set -euo pipefail

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')
echo "Draft: $DRAFT_ID"

cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"我的第一个 cutcli 草稿","start":0,"end":3000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold

cutcli images add "$DRAFT_ID" --image-infos '[
  {"imageUrl":"https://cutcli.com/assets/demo/sunset.jpg",
   "width":1080,"height":1920,"start":0,"end":5000000,
   "inAnimation":"轻微放大","inAnimationDuration":1000000}
]'

cutcli audios add "$DRAFT_ID" --audio-infos '[
  {"audioUrl":"https://cutcli.com/assets/demo/bgm-light.mp3",
   "duration":5000000,"start":0,"end":5000000,"volume":0.5}
]'

cutcli draft info "$DRAFT_ID" --pretty
```

## 接下来

- 看更复杂的 [案例](/cookbook/index)
- 学习 [关键帧的更多用法](/reference/keyframes)
- 用 AI 帮你写命令：[AI 工具集成](./ai-integration.md)
