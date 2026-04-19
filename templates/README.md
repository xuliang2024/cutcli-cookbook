# Templates

可复用的 JSON 片段，按 cutcli 命令分类。直接 `--captions @path/to/template.json` 这样塞进命令行。

## 子目录

| 目录 | 用途 |
|---|---|
| [`captions/`](captions/) | 字幕预设（包含动画 + 关键词高亮 + 位置） |
| [`animations/`](animations/) | 图片/视频动画组合（入场+出场+循环） |
| [`filters/`](filters/) | 滤镜组合（用 `--filter-infos`） |

## 怎么用

```bash
DRAFT_ID=$(cutcli draft create | jq -r '.draftId')
cutcli captions add "$DRAFT_ID" --captions @templates/captions/cinematic-title.json
```

注意：模板里的 `start` / `end` 是占位（默认 0 → 5,000,000μs），按你实际场景改。

## 贡献模板

1. 新建 `templates/<category>/<name>.json`
2. 第一条添加 `"_comment": "一句话说明"` 让别人看懂
3. 提 PR
