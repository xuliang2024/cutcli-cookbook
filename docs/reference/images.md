# 图片 (images)

> 占位文档，W2 由同步脚本填充完整参数表。

## 命令

```bash
cutcli images add <draftId> --image-infos <json> [选项]
cutcli images list <draftId>
```

## 主要字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `imageUrl` | string | 是 | 图片 URL（自动下载） |
| `width` | number | 是 | 宽度（像素） |
| `height` | number | 是 | 高度（像素） |
| `start` | number | 是 | 开始时间（μs） |
| `end` | number | 是 | 结束时间（μs） |
| `transformX` / `transformY` | number | 否 | 位置（-1~1） |
| `scaleX` / `scaleY` | number | 否 | 缩放（1.0 = 原始） |
| `rotation` | number | 否 | 旋转角度 |
| `inAnimation` / `outAnimation` | string | 否 | 入/出场动画名 |
| `transition` | string | 否 | 与下一段的转场名 |

完整列表 `cutcli images add --help`。
