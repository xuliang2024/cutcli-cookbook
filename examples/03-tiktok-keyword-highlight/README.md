# 03 · TikTok Keyword Highlight

> TikTok / 抖音风格的多段字幕：关键词彩色高亮 + 入场动画。

![preview](preview.gif)

> `preview.gif` 暂未提交（CI 会强制要求）。

## 适用场景

- 短视频博主"3 句话讲完一件事"模板
- 知识科普 / 美妆 / 美食教程
- 任何需要快节奏字幕、关键词突出的场景

## 一行运行

```bash
bash run.sh
```

## 关键参数解释

| 参数 | 值 | 为什么 |
|---|---|---|
| 每条字幕 2 秒 | `start`/`end` 间隔 2,000,000μs | 抖音节奏：每条信息密度 = 1 关键词 / 2 秒 |
| `keyword: "秘密"` | 关键词字段 | cutcli 会自动给该词 + 关键词颜色，无需手动拆 |
| `keywordColor: "#FFD600"` | 黄色 | 高对比度，主体白色 + 强调黄/红 |
| `inAnimation: "向上滑入"` | 抖音常见入场 | 配合短促节奏 |
| `inAnimationDuration: 300000` | 0.3 秒 | 短才有力度；超过 0.5 秒会显得拖沓 |
| `--border-color "#000000"` `--border-width 1` | 黑描边 | 无论背景什么颜色都能看清 |
| `--transform-y -0.55` | 偏下 55% | 比传统字幕位置稍高，避开抖音底部 UI |

## 进阶改造

### 多个关键词

```json
{"text":"今天分享一个超好用的技巧",
 "keyword":"超好用|技巧",
 "keywordColor":"#FF6600"}
```

`keyword` 字段用 `|` 分隔多个词。

### 不同关键词不同颜色

cutcli 一条字幕只支持一种 keywordColor。需要不同色就拆成多条。

### 改成抖音爆款的"双语"风格

```json
[
  {"text":"今天教大家一个秘密","start":0,"end":2000000,
   "keyword":"秘密","keywordColor":"#FFD600","fontSize":9,
   "transform_y":-0.5},
  {"text":"This is a secret","start":0,"end":2000000,
   "keyword":"secret","keywordColor":"#FFD600","fontSize":7,
   "transform_y":-0.6}
]
```

> 两条字幕同 start/end，叠在一起，靠 `transform_y` 错开位置。

### 加循环动画让字幕"呼吸"

```json
"loopAnimation": "心跳",
"loopAnimationDuration": 800000
```

## 用到的 cutcli 能力

- `cutcli captions add` — 多条字幕 + 关键词字段 + 入/出场动画
- 全局样式：描边、加粗、位置偏移
