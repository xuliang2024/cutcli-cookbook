# 遮罩 (masks)

> 占位文档，W2 由同步脚本填充完整参数表。

## 命令

```bash
cutcli masks add <draftId> --segment-ids <ids> [--name <type>] [选项]
cutcli masks list <draftId>
```

## 主要参数

| 选项 | 说明 |
|---|---|
| `--segment-ids` | 片段 ID 列表，逗号分隔 |
| `--name` | 遮罩类型：线性/镜面/圆形/矩形/星形/爱心 |
| `--width` / `--height` | 尺寸 |
| `--feather` | 羽化值 |
| `--rotation` | 旋转角度 |
| `--invert` | 反转遮罩 |
