# 坐标系与位置

理解 cutcli 的坐标系，可以让你精确控制字幕、图片、贴纸的位置。

## 归一化坐标

cutcli 使用**归一化坐标**：屏幕中心为原点 `(0, 0)`，X 正方向向右，Y 正方向向上。整个画布映射到 `[-1, 1]` × `[-1, 1]`。

```text
            (0, 1)        ← 屏幕最上
              ↑
              |
(-1, 0) ←   (0,0)   → (1, 0)
              |
              ↓
            (0, -1)       ← 屏幕最下
```

举几个具体位置：

| 位置 | transformX | transformY |
|---|---|---|
| 屏幕正中 | 0 | 0 |
| 顶部居中 | 0 | 0.8 |
| 底部居中 | 0 | -0.8 |
| 左下角 | -0.8 | -0.8 |
| 右上角 | 0.8 | 0.8 |

> 不要把值设到 `±1`，那是画布边界，元素会被部分裁切。常用 `±0.7 ~ ±0.9`。

## 字幕示例

把字幕固定在底部 1/4 位置（短视频常见的位置）：

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"底部居中字幕","start":0,"end":3000000}
]' --transform-y -0.7 --font-size 8
```

## 图片示例

把图片缩到 50%、放到屏幕右上角：

```bash
cutcli images add "$DRAFT_ID" --image-infos '[
  {
    "imageUrl":"https://cutcli.com/assets/demo/logo.png",
    "width":400,"height":400,
    "start":0,"end":3000000,
    "transformX":0.6,
    "transformY":0.7,
    "scaleX":0.5,
    "scaleY":0.5
  }
]'
```

## 缩放与旋转

| 字段 | 含义 | 默认 |
|---|---|---|
| `scaleX` | X 方向缩放，1.0 = 原始 | 1.0 |
| `scaleY` | Y 方向缩放 | 1.0 |
| `rotation` | 顺时针旋转角度（度） | 0 |

> 想等比缩放，X 与 Y 同时设为相同值。

## 不同画布的注意事项

归一化坐标不依赖具体分辨率：

- 在 1080×1920（竖屏）画布上 `(0, -0.8)` 是底部居中
- 在 1920×1080（横屏）画布上 `(0, -0.8)` 同样是底部居中

但**像素尺寸**（`width` / `height`）需要根据画布比例自己换算，cutcli 不会自动缩放。

## 关键帧中的位置动画

关键帧的 `position_x` / `position_y` 也用同一套归一化坐标：

```bash
cutcli keyframes add "$DRAFT_ID" --keyframes '[
  {"segmentId":"...","property":"position_x","offset":0,"value":-0.5},
  {"segmentId":"...","property":"position_x","offset":2000000,"value":0.5}
]'
```

效果：图片 2 秒内从屏幕左侧滑到右侧。

## 进阶：与剪映 UI 中的"位置"对照

剪映 UI 上显示的位置是**像素坐标**（参考画布左上角为原点）。换算关系：

```text
ui_x = (transformX + 1) / 2 * canvasWidth
ui_y = (1 - transformY) / 2 * canvasHeight    ← 注意 Y 翻转
```

举例：画布 1080×1920，cutcli 中 `(transformX=0, transformY=-0.7)` 在剪映 UI 上显示约 `(540, 1632)`。

## 下一步

- [关键帧详解](/reference/keyframes)
- [字幕完整参数表](/reference/captions)
