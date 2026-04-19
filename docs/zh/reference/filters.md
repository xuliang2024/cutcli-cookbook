# 滤镜 (filters)

> 占位文档，W2 由同步脚本填充完整参数表。

## 命令

```bash
cutcli filters add <draftId> --filter-infos <json>
cutcli query filters --action search --keyword <kw>
```

## 主要字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `filterId` | string | 是 | 滤镜 ID |
| `start` | number | 是 | 开始时间（μs） |
| `end` | number | 是 | 结束时间（μs） |
| `intensity` | number | 否 | 滤镜强度 (0-100) |
