# 02 · Image Slideshow with BGM

> 3 张图竖屏轮播，每张 3 秒，叠化 / 推移转场，配背景音乐。

![preview](preview.gif)

> `preview.gif` 暂未提交（CI 会强制要求）。

## 适用场景

- 旅行 / 美食 / 风景 类相册短视频
- 产品图轮播（电商首页）
- 任何"图 + 配乐"的场景模版

## 一行运行

```bash
bash run.sh
```

## 关键参数解释

| 参数 | 值 | 为什么 |
|---|---|---|
| 每张图 3 秒 | `start`/`end` 间隔 3,000,000μs | 短视频常见单图停留时长 |
| `transition: "叠化"` | 第 1→2 张 | 默认温和，适合相册流 |
| `transition: "推移"` | 第 2→3 张 | 节奏稍微变化，避免单调 |
| `transitionDuration: 500000` | 0.5 秒 | 转场不能超过最短片段时长的 1/3 |
| `volume: 0.6` | 60% | BGM 不抢戏，给后期可能加的旁白留空间 |

## 进阶改造

### 想要更快的节奏？

把每张图改成 2 秒：

```json
"start": 0, "end": 2000000
"start": 2000000, "end": 4000000
"start": 4000000, "end": 6000000
```

记得同步把 `audio.json` 的 `duration` 和 `end` 也改成 `6000000`。

### 想加图 Ken Burns 缩放效果？

参考 [`05-keyframe-zoom-in`](../05-keyframe-zoom-in/) — 用关键帧给每张图加 `scale_x` / `scale_y` 的缓慢变化。

### 想用自己的图？

把 `data/images.json` 中的 `imageUrl` 换成你的 CDN 链接。注意：
- 必须是公开可访问的 HTTPS URL
- `width` / `height` 要填你图片的真实尺寸（cutcli 不会自动检测）
- 推荐 CDN：jsdelivr / GitHub Raw / 自建 R2

## 用到的 cutcli 能力

- `cutcli draft create` — 创建竖屏画布
- `cutcli images add` — 批量加图、配置时间和转场
- `cutcli audios add` — 加 BGM、设音量
