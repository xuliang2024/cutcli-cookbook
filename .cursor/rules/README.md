# `.cursor/rules/` 总索引

> Cursor IDE 在打开 cutcli-cookbook 时会自动加载这些规则。AI 助手按 `globs` 和 `alwaysApply` 决定何时注入。

## 规则清单

| 文件 | 范围 | 内容速查 |
|---|---|---|
| [`project-info.mdc`](project-info.mdc) | always | 项目元信息、GitHub 地址、本地路径、域名、关系图、与 jy_cli 的关系 |
| [`directory-index.mdc`](directory-index.mdc) | always | 仓库每个目录放什么，改谁影响什么 |
| [`commands.mdc`](commands.mdc) | always | npm / git / gh / wrangler / cutcli 全套命令速查 |
| [`commit-flow.mdc`](commit-flow.mdc) | always | Conventional Commits、PR 流程、CI 必过线、分支保护 |
| [`open-source-boundary.mdc`](open-source-boundary.mdc) | always | **安全关键**：禁止从闭源 jy_cli 复制源码到本仓的四条铁律 |
| [`deploy.mdc`](deploy.mdc) | `worker/**` `.github/workflows/**` | R2 + Worker 部署、CF API Token 权限、回滚步骤、监控 |
| [`example-spec.mdc`](example-spec.mdc) | `examples/**` | 案例目录结构、meta.json schema、README 章节、URL 白名单 |
| [`docs-style.mdc`](docs-style.mdc) | `docs/**` | VitePress 写作风格、链接规则、自动生成区域提醒 |
| [`cursor-loop.mdc`](cursor-loop.mdc) | always | (用户级) Cursor Loop MCP 配置 — 不要改 |

## 速找索引

### 我想知道...

- **GitHub 仓库地址在哪？** → `project-info.mdc` § 核心地址
- **怎么改文档？** → `docs-style.mdc`
- **怎么加新案例？** → `example-spec.mdc`
- **commit 怎么写？** → `commit-flow.mdc`
- **怎么部署到 docs.cutcli.com？** → `deploy.mdc`
- **能不能引用 jy_cli/src 的代码？** → `open-source-boundary.mdc`（**不能**）
- **`docs/reference/cli.md` 我能直接改吗？** → 不能，看 `docs-style.mdc` § 自动生成区域
- **wrangler 命令在哪？** → `commands.mdc` § Cloudflare wrangler
- **CI 不过怎么排查？** → `commit-flow.mdc` § CI 必过线
- **R2 bucket 叫什么？** → `project-info.mdc` § 部署架构
- **CF Token 要什么权限？** → `deploy.mdc` § CF API Token 权限

### 我要做...

- **加一个 case** → `example-spec.mdc` + 跑 `npm run new:example my-case`
- **改文档站样式** → `docs-style.mdc` + `docs/.vitepress/config.mts`
- **改 worker 路径回退逻辑** → `deploy.mdc` + `worker/src/index.ts`
- **同步闭源仓最新文档** → `commands.mdc` § docs/reference 同步
- **手动触发 CI deploy** → `gh workflow run deploy-docs.yml`
- **回滚一个 bug** → `deploy.mdc` § 回滚

## 如何修改 / 添加规则

```bash
# 编辑现有规则
edit .cursor/rules/<name>.mdc

# 加新规则
cat > .cursor/rules/<topic>.mdc <<EOF
---
description: "..."
globs:
  - "<path-pattern>/**"
alwaysApply: false
---

# 标题
...
EOF

# 提交（视为 docs 类）
git add .cursor/rules/<topic>.mdc
git commit -m "docs(rules): add <topic>"
```

字段说明：

- `description` — 一句话说明，会出现在 Cursor 规则面板
- `globs` — 匹配某些文件路径时自动注入这条规则
- `alwaysApply: true` — 总是注入，不论文件路径

## 这些规则不是

- ❌ 不是 GitHub Wiki，不能给社区外部贡献者读 — 那个职责在 [`CONTRIBUTING.md`](../../CONTRIBUTING.md)
- ❌ 不是发布操作手册 — 那个在 [`.github/RELEASE_GUIDE.md`](../../.github/RELEASE_GUIDE.md)
- ❌ 不是详细教程 — 那个在 [`docs/`](../../docs/)

它们是**给 AI 助手的项目上下文**，让你说一句"加个新案例"就能直接产出符合规范的代码。
