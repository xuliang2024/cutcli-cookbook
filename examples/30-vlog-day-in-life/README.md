# 30 · Vlog: A Day in My Life (30s)

> 30 秒 Vlog "我的一天" 模板：早 → 午 → 晚 三段，配时间标签字幕。

![preview](preview.gif)

> `preview.gif` 暂未提交，CI 会强制要求。

## 适用场景

- 个人 Vlog "我的一天 / 我的一周" 系列
- 旅行 / 美食日常
- 任何"按时间线串场景"的内容

## 一行运行

```bash
bash run.sh
```

## 关键参数解释

| 参数 | 值 | 为什么 |
|---|---|---|
| 三段时间标签 | `AM 7:00 / PM 1:00 / PM 8:00` | Vlog 经典节奏：早 → 午 → 晚 |
| 转场 `向右擦除` | 替代叠化 | 给 Vlog 加一点节奏感，类似翻页 |
| 第一段 Ken Burns 1.0 → 1.1 | 10s 内 | 开场画面有动感 |
| 字幕 `--transform-y -0.7` | 偏下 70% | 比短视频字幕更靠下，留出画面欣赏空间 |
| 关键词色 黄/橙/粉 | 跟早/午/晚气氛 | 早=黄(暖)、午=橙(活力)、晚=粉(柔) |

## 进阶改造

### 全部三段都加 Ken Burns

把 `run.sh` 中的 `SEG_FIRST` 替换为 for 循环，对每个 segmentId 都加关键帧（参考 [`20-knowledge-science-card`](../20-knowledge-science-card/) 的写法）。

### 加节拍贴纸 / 装饰

```bash
cutcli query stickers --action search --keyword "时钟" --pretty
cutcli sticker add "$DRAFT_ID" --sticker-id "<id>" --start 0 --end 30000000 --scale 0.6
```

### 一键多版

把 run.sh 复制成 `run-summer.sh` / `run-winter.sh`，只换 `data/images.json` 中的素材 URL，结构完全复用。

## 用到的 cutcli 能力

- `cutcli draft create` — 竖屏
- `cutcli images add` — 多图 + 擦除转场
- `cutcli keyframes add` — Ken Burns 推近
- `cutcli captions add` — 时间标签 + 关键词高亮
- `cutcli audios add` — BGM
