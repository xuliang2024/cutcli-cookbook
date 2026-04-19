# 特效 (effects)

> 占位文档，W2 由同步脚本填充完整参数表。

## 命令

```bash
cutcli effects add <draftId> --effect-infos <json>
cutcli effects list <draftId>
cutcli query effects --action search --keyword <kw>
```

## 主要字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `effectId` | string | 是 | 特效 ID（用 query 查询） |
| `start` | number | 是 | 开始时间（μs） |
| `end` | number | 是 | 结束时间（μs） |
| `segmentId` | string | 否 | 应用到指定片段 |
