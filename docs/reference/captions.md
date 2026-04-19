# 字幕 (captions)

> 本页内容由闭源主仓 `jy_cli/docs/cli.md` 通过同步脚本生成（W2 完成）。在那之前，请用 `cutcli captions add --help` 查看实时参数。

## 命令

```bash
cutcli captions add <draftId> --captions <json> [选项]
cutcli captions list <draftId>
```

## 字幕 JSON 字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `text` | string | 是 | 字幕文本 |
| `start` | number | 是 | 开始时间（μs） |
| `end` | number | 是 | 结束时间（μs） |
| `keyword` | string | 否 | 关键词高亮 |
| `keywordColor` | string | 否 | 关键词颜色 |
| `inAnimation` | string | 否 | 入场动画名 |
| `outAnimation` | string | 否 | 出场动画名 |
| `inAnimationDuration` | number | 否 | 入场动画时长（μs） |
| `outAnimationDuration` | number | 否 | 出场动画时长（μs） |

## 全局样式选项

| 选项 | 说明 |
|---|---|
| `--font-size <n>` | 字号（推荐 6-12） |
| `--text-color <hex>` | 颜色如 `#FFFFFF` |
| `--bold` / `--italic` / `--underline` | 样式 |
| `--alignment <n>` | 对齐 (0=居中, 1=左, 2=右) |
| `--transform-x <n>` | X 位置（-1~1） |
| `--transform-y <n>` | Y 位置（-1~1） |

完整参数见 `cutcli captions add --help`。

## 示例

```bash
cutcli captions add "$DRAFT_ID" --captions '[
  {"text":"Hello","start":0,"end":3000000,
   "inAnimation":"渐显","inAnimationDuration":500000}
]' --font-size 8 --bold
```
