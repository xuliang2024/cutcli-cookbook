# Good First Issues — 想贡献？从这里开始

> 维护者会按这份列表批量在 GitHub 开 issue 并打 `good-first-issue` 标签。
> 每条都已经把范围限定在 1 个目录、1 个 PR 能完成的程度。

---

## 案例类（最容易，0 配置）

### case-001 美食拍照 vlog
- 路径：`examples/99-community/<your-handle>/food-vlog/`
- 时长：10s
- 涉及：`captions`、`images`、`audios`、关键帧 zoom-in
- 参考：`examples/30-vlog-day-in-life`

### case-002 健身教程开场卡
- 路径：`examples/99-community/<your-handle>/fitness-intro/`
- 时长：5s
- 涉及：`captions`（关键词高亮）、`images`、`stickers`（哑铃 emoji）
- 参考：`examples/03-tiktok-keyword-highlight`

### case-003 旅行 Vlog 双语字幕
- 路径：`examples/99-community/<your-handle>/travel-bilingual/`
- 时长：15s
- 涉及：双层字幕（中英文同屏，错位 transformY）
- 参考：`docs/cookbook/tiktok-style.md` 的"双语版"小节

### case-004 教程"对比效果" 分屏字幕
- 路径：`examples/99-community/<your-handle>/before-after/`
- 时长：8s
- 涉及：左右两个图片片段 + 字幕"BEFORE / AFTER"
- 提示：用 `transformX -0.5` / `0.5` 让两张图分屏

### case-005 节日红包贴纸卡
- 路径：`examples/99-community/<your-handle>/festival-redenvelope/`
- 时长：6s
- 涉及：`stickers`（红包/福字）、关键帧旋转
- 提示：先 `cutcli query stickers --action search --keyword "红包"`

---

## 模板类

### tpl-001 字幕预设：电影级开场
- 路径：`templates/captions/movie-opening.json`
- 1 条字幕，含渐显 1.5s + 渐隐 1s + 大字号 + 居中

### tpl-002 字幕预设：粉笔字风格
- 路径：`templates/captions/chalk-style.json`
- 用 `huazi`（花字）效果 + 适合教学场景

### tpl-003 滤镜组合：复古暖
- 路径：`templates/filters/retro-warm.json`
- 找一个复古滤镜 ID，强度 70

---

## 文档类

### doc-001 翻译 `docs/guide/installation.md` 到英文
- 路径：`docs/en/guide/installation.md`
- 提示：保留中文章节顺序

### doc-002 写一篇 "Windows 用户安装指南"
- 路径：`docs/guide/windows-install.md`
- 涉及：powershell 安装命令、PATH 设置

### doc-003 故障排查：剪映显示草稿损坏怎么办
- 路径：`docs/troubleshooting.md`（新建）
- 列 5 个最常见错误 + 修复

---

## 工具类

### util-001 给 `scripts/new-example.mjs` 加 `--type vlog|promo|knowledge` 模板选项
- 不同类型生成不同的初始 `data/*.json`

### util-002 写 `scripts/check-preview-gif.mjs`
- 校验每个案例的 `preview.gif` 是否存在、≤ 3 MB、分辨率 ≥ 480p

### util-003 给文档站加深色 / 浅色主题切换的快捷键提示
- 编辑 `docs/.vitepress/config.mts`

---

## 怎么领取？

在对应 issue 评论 "我来做" 即可。维护者 24h 内 assignee 给你。建议同一时间最多领 1 个。

第一次贡献？先看 [CONTRIBUTING.md](../CONTRIBUTING.md)。
