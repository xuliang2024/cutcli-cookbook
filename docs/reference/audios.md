# 音频 (audios)

> 占位文档，W2 由同步脚本填充完整参数表。

## 命令

```bash
cutcli audios add <draftId> --audio-infos <json>
cutcli audios list <draftId>
```

## 主要字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `audioUrl` | string | 是 | 音频 URL（自动下载） |
| `duration` | number | 是 | 音频时长（μs） |
| `start` | number | 是 | 开始时间（μs） |
| `end` | number | 是 | 结束时间（μs） |
| `volume` | number | 否 | 音量 (0-1) |
| `audioEffect` | string | 否 | 音效名称 |

## 实用：取得音频时长

```bash
cutcli query audio-duration --url https://example.com/bgm.mp3
```
