# 关键帧 (keyframes)

> 占位文档，W2 由同步脚本填充完整参数表。

## 命令

```bash
cutcli keyframes add <draftId> --keyframes <json>
cutcli keyframes list <draftId> --segment-id <id>
```

## 字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `segmentId` | string | 是 | 所属片段 ID |
| `property` | string | 是 | 属性名 |
| `offset` | number | 是 | 在片段内的时间偏移（μs） |
| `value` | number | 是 | 属性值 |

## 支持的属性

`position_x`, `position_y`, `scale_x`, `scale_y`, `rotation`, `opacity`

## 示例：3 秒内放大到 1.5 倍

```bash
cutcli keyframes add "$DRAFT_ID" --keyframes '[
  {"segmentId":"<segId>","property":"scale_x","offset":0,"value":1.0},
  {"segmentId":"<segId>","property":"scale_x","offset":3000000,"value":1.5},
  {"segmentId":"<segId>","property":"scale_y","offset":0,"value":1.0},
  {"segmentId":"<segId>","property":"scale_y","offset":3000000,"value":1.5}
]'
```
