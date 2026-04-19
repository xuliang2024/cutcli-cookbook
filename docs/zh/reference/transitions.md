# 转场 (transitions)

> 占位文档，W2 由同步脚本填充完整参数表。

## 命令

```bash
cutcli query transitions --action categories
cutcli query transitions --action search --keyword <kw>
cutcli query transitions --action list --category <cat>
```

转场不是独立命令，而是作为 `images add` / `videos add` 中每个片段的 `transition` 字段使用。

## 在图片/视频中使用

```json
[
  {"imageUrl":"...","width":1080,"height":1920,
   "start":0,"end":3000000,
   "transition":"叠化",
   "transitionDuration":500000}
]
```
