# 贴纸 (stickers)

> 占位文档，W2 由同步脚本填充完整参数表。

## 命令

```bash
cutcli sticker add <draftId> --sticker-id <id> --start N --end N [--scale N]
cutcli sticker list <draftId>
cutcli query stickers --action search --keyword <kw>
```

## 主要参数

| 选项 | 说明 |
|---|---|
| `--sticker-id` | 贴纸 ID（用 `cutcli query stickers` 查询） |
| `--start <μs>` | 开始时间（μs） |
| `--end <μs>` | 结束时间（μs） |
| `--scale <n>` | 缩放比例 |
