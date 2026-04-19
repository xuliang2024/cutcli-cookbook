# 贡献指南

感谢你对 cutcli-cookbook 的关注！这里收集所有可以贡献的方式与必读规范。

## 三种最常见的贡献方式

### 1. 提一个新案例（最受欢迎）

```bash
git clone https://github.com/xuliang2024/cutcli-cookbook.git
cd cutcli-cookbook
node scripts/new-example.mjs my-cool-case
# 按提示填几个字段，自动生成 examples/99-community/<你的 GitHub handle>/my-cool-case/
```

然后：

1. 编辑生成出的 `run.sh` —— 用 `cutcli` 命令组合出你想要的效果
2. 在该目录下跑 `bash run.sh`，验证剪映能正常打开
3. 录一段 3~8 秒的 `preview.gif`（控制在 3 MB 以内）
4. 填写 `meta.json`（脚手架已经生成好骨架）
5. 提 PR，CI 会自动校验。合并后你的案例会出现在首页 Gallery

详细规范见 [§案例规范](#案例规范)。

### 2. 翻译/补充文档

`docs/` 下都是 markdown，直接改、提 PR 即可。中文为主、英文 fallback。

### 3. 投稿到 showcase

如果你已经用 cutcli 做出了完整作品（视频、文章、教程都行），按 `.github/ISSUE_TEMPLATE/showcase.yml` 开 issue 投稿，每月入选会被收录进 [showcase/](showcase/)。

---

## 案例规范

每个案例都必须放在 `examples/<id>-<slug>/`，包含以下文件：

```text
examples/<id>-<slug>/
├── README.md       # 5 段：效果 / 适用场景 / 一行运行 / 关键参数 / 进阶改造
├── run.sh          # 顶部 set -euo pipefail；可重复运行
├── data/*.json     # 复杂 JSON 拆出来便于 diff
├── meta.json       # {id,title,tags,author,duration,resolution,gif}
└── preview.gif     # ≤ 3 MB，分辨率 ≥ 480p，时长 3~8 s
```

CI 会跑 `node scripts/validate-example.mjs <path>` 校验：

- `run.sh` 存在且可执行
- `meta.json` 通过 schema 校验
- `data/*.json` 都是合法 JSON
- README 5 段齐全
- 不引用作者本地路径或私有 token

### `run.sh` 模板

```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. 创建草稿，捕获 draftId
DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

# 2. 加内容
cutcli captions add "$DRAFT_ID" --captions @data/captions.json --font-size 8 --bold

# 3. 输出最终路径，让用户直接打开
cutcli draft info "$DRAFT_ID"
```

### `meta.json` 字段

```json
{
  "id": "01-hello-caption",
  "title": "Hello Caption",
  "tags": ["captions", "animation"],
  "author": "your-github-handle",
  "duration": 5,
  "resolution": "1080x1920",
  "gif": "preview.gif",
  "description": "一句话描述"
}
```

---

## 素材使用规范

为防止仓库膨胀和外链失效：

- **图片/音频/视频**只能引用以下白名单 CDN：
  - `https://cutcli.com/...`（cutcli 官方 CDN）
  - `https://*.r2.dev/...`、`https://*.r2.cloudflarestorage.com/...`
  - `https://cdn.jsdelivr.net/...`
  - `https://*.githubusercontent.com/...`
- 不允许引用：私有 OSS、需要 token 的 URL、HTTP 明文链接、个人云盘
- 大型 GIF (>3 MB) 请压缩后再提交

CI 会扫描 `run.sh` 和 `data/*.json` 中的所有 URL。

---

## 命令名规范

所有文档与脚本中的命令名必须是 `cutcli`（不是 `cut`）。CI 会 grep 失败。

---

## Commit 信息

遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)：

```text
feat(examples): add 06-cinematic-title
fix(docs): correct image-animations url
docs(guide): translate first-draft to English
chore(ci): bump wrangler-action to v3.5
```

类型：`feat` / `fix` / `docs` / `chore` / `refactor` / `test`

---

## 行为准则

参与本项目即表示同意遵守 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。

---

## 常见问题

- **问：贡献的案例可以商用吗？** 答：本仓库内容采用 MIT，使用者自负。但案例引用的素材请确保你拥有版权或使用了 CC0 / 公共领域素材。
- **问：可以贡献中文以外的文档吗？** 答：欢迎，放到 `docs/<lang>/` 子目录。
- **问：怎么本地预览文档？** 答：`npm install && npm run docs:dev`，访问 `http://localhost:5173`
