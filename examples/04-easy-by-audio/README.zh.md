# 04 · Easy by Audio Duration

> 用 `cutcli draft easy` 一行命令，按音频时长自动铺图片 + 字幕 + BGM。

[English](README.md) · [简体中文](README.zh.md)

![preview](preview.gif)

> `preview.gif` 暂未提交（CI 会强制要求）。

## 适用场景

- 旁白先录好，需要快速按旁白时长配视觉
- 念诗 / 读书 / 播客剪辑
- 任何"我有一段音频，给我铺好底图就行"的场景

## 一行运行

```bash
bash run.sh
```

`draft easy` 命令会：

1. 下载音频，自动检测时长
2. 用图片铺满整个时长
3. 字幕铺满整个时长
4. 自动对齐结束时间

## 关键参数解释

| 参数 | 说明 |
|---|---|
| `--audio-url` | 必填，决定整段视频的总时长 |
| `--img-url` | 可选，背景图 |
| `--video-url` | 可选，背景视频（与 img-url 二选一） |
| `--text` | 可选，标题字幕 |

## 进阶改造

### 想要多张图轮播？

`draft easy` 只支持单张图。需要多张请用 `images add`，参考 [`02-image-slideshow-bgm`](../02-image-slideshow-bgm/)。

### 用本地音频

cutcli 也接受本地路径：

```bash
cutcli draft easy "$DRAFT_ID" \
  --audio-url ~/Music/my-narration.mp3 \
  --img-url https://cutcli.com/assets/demo/scene-01.jpg
```

### 把字幕拆成多句

也得换用 `captions add`：

```bash
DURATION=$(cutcli query audio-duration --url "$AUDIO_URL" | jq -r '.duration')
HALF=$((DURATION / 2))

cutcli captions add "$DRAFT_ID" --captions "[
  {\"text\":\"前半段标题\",\"start\":0,\"end\":$HALF},
  {\"text\":\"后半段标题\",\"start\":$HALF,\"end\":$DURATION}
]"
```

## 用到的 cutcli 能力

- `cutcli draft easy` — 一行命令快速铺素材
- `cutcli query audio-duration` — 拿音频时长
