# masks

> Stub — full reference will be filled in by the sync script (W2).

## Commands

```bash
cutcli masks add <draftId> --segment-ids <ids> [--name <type>] [options]
cutcli masks list <draftId>
```

## Main flags

| Flag | Notes |
|---|---|
| `--segment-ids` | Comma-separated segment IDs |
| `--name` | Mask type: 线性 / 镜面 / 圆形 / 矩形 / 星形 / 爱心 (linear / mirror / circle / rectangle / star / heart) |
| `--width` / `--height` | Size |
| `--feather` | Feather radius |
| `--rotation` | Rotation (deg) |
| `--invert` | Invert the mask |
