# 视频 (videos)

> 占位文档，W2 由同步脚本填充完整参数表。

## 命令

```bash
cutcli videos add <draftId> --video-infos <json> [选项]
cutcli videos list <draftId>
```

## 主要字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `videoUrl` | string | 是 | 视频 URL（自动下载） |
| `width` | number | 是 | 宽度 |
| `height` | number | 是 | 高度 |
| `duration` | number | 是 | 视频原始时长（μs） |
| `start` | number | 是 | 时间线开始（μs） |
| `end` | number | 是 | 时间线结束（μs） |
| `volume` | number | 否 | 音量 (0-1) |
| `transition` | string | 否 | 与下一段的转场 |
