# 05 · Keyframe Zoom-in (Ken Burns)

> 图片 + 关键帧 `scale_x` / `scale_y`，5 秒内从 1.0 缓慢放大到 1.3，经典 Ken Burns 效果。

![preview](preview.gif)

> `preview.gif` 暂未提交（CI 会强制要求）。

## 适用场景

- 想让静态照片"动起来"，避免画面无聊
- 旅行 / 风景 / 人像照片视频
- 纪录片片头模板

## 一行运行

```bash
bash run.sh
```

`run.sh` 做的事：

1. 创建竖屏草稿
2. 加一张 5 秒的图
3. **用 `cutcli images list` 查刚才那张图的 segmentId**
4. 用 jq 把 `keyframes.template.json` 中的 `__SEG_ID__` 替换为真实 ID
5. `cutcli keyframes add` 写入关键帧

## 关键参数解释

| 参数 | 值 | 为什么 |
|---|---|---|
| `property: "scale_x"` + `"scale_y"` | 必须同时设 | 否则会变形 |
| `offset: 0, value: 1.0` | 起点 | 原始大小 |
| `offset: 5000000, value: 1.3` | 终点 | 5 秒后放大到 1.3 倍，幅度温和不抢戏 |
| 缓动 | 默认线性 | Ken Burns 用线性最自然；想加缓动改 `easing` 字段 |

## 为什么需要拆 segmentId？

cutcli 的关键帧绑定到具体片段，所以**必须先添加片段再加关键帧**。脚本里我们用模板 + jq 替换的方式自动化这一步，避免你手动复制 ID。

## 进阶改造

### 改成"放大 + 平移"

加 `position_x` 关键帧：

```json
{"segmentId": "...", "property": "position_x", "offset": 0,       "value": -0.1},
{"segmentId": "...", "property": "position_x", "offset": 5000000, "value":  0.1}
```

效果：画面在放大的同时从左轻微平移到右。

### 改成"放大 + 旋转"

```json
{"segmentId": "...", "property": "rotation", "offset": 0,       "value": 0},
{"segmentId": "...", "property": "rotation", "offset": 5000000, "value": 5}
```

效果：缓慢右倾 5 度，给画面加一点动态张力。

### 改成"先放大再缩小"

加中间关键帧：

```json
{"segmentId": "...", "property": "scale_x", "offset": 0,       "value": 1.0},
{"segmentId": "...", "property": "scale_x", "offset": 2500000, "value": 1.4},
{"segmentId": "...", "property": "scale_x", "offset": 5000000, "value": 1.0}
```

## 用到的 cutcli 能力

- `cutcli images add` — 加图片
- `cutcli images list` — 拿到刚才片段的 ID
- `cutcli keyframes add` — 加关键帧
- 模板 + jq 替换技巧（任何关键帧案例都用得上）
