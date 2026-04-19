# 仓库发布指南（W4 · 给维护者）

本文档说明 **首次将 cutcli-cookbook 推到 GitHub + 启用 CI** 的所有步骤。

## 0. 前置（已就绪）

- 本地仓库：`/Users/m007/codes/cutcli-cookbook/`
- 远程托管：`docs.cutcli.com` → R2 `cutcli-docs` + Worker `docs-cutcli`（已部署）
- DNS：`docs.cutcli.com` A 192.0.2.1 (proxied) 已生效

## 1. 创建 GitHub repo 并推送

```bash
cd /Users/m007/codes/cutcli-cookbook
git add -A
git commit -m "feat: initial scaffold with W1~W4 deliverables"
gh repo create m007/cutcli-cookbook --public --source . --remote origin --description "Open-source cookbook, templates and docs for cutcli (CapCut/Jianying draft CLI)"
git push -u origin main
```

## 2. 配置 GitHub Secrets

```bash
# 用 gh CLI 直接设
gh secret set CLOUDFLARE_API_TOKEN --body "$CLOUDFLARE_API_TOKEN"
gh secret set CLOUDFLARE_ACCOUNT_ID --body "11c47779f0d4c3d0e69ccc6c484dc589"
```

> 推荐为 cookbook 仓单独建一个**最小权限 token**：
>
> - Account → Workers Scripts → Edit
> - Account → Workers R2 Storage → Edit
> - Zone → Workers Routes → Edit (resource: cutcli.com)
>
> 不要用 Global API Key。

## 3. 验证 CI

```bash
gh run watch
```

预期：
- `CI / Lint` ✔
- `CI / VitePress build` ✔
- `CI / Type-check worker` ✔
- `Deploy docs / Build + R2 upload + Worker deploy` ✔
- 末尾 smoke test 全绿

## 4. 启用分支保护

```bash
gh api repos/m007/cutcli-cookbook/branches/main/protection \
  --method PUT \
  --field required_status_checks[strict]=true \
  --field required_status_checks[contexts][]='Lint (cases + commands + links)' \
  --field required_status_checks[contexts][]='VitePress build' \
  --field enforce_admins=false \
  --field required_pull_request_reviews[required_approving_review_count]=1 \
  --field restrictions=null
```

## 5. 创建 good-first-issues

把 [`.github/GOOD_FIRST_ISSUES.md`](GOOD_FIRST_ISSUES.md) 里每条都开成 GitHub issue：

```bash
# 简化方案：手动逐条复制
gh issue create --title "[Case] 美食拍照 vlog" --body-file <(awk '/case-001/,/case-002/' .github/GOOD_FIRST_ISSUES.md) --label good-first-issue,case-request
# ... 重复其他 14 条
```

## 6. 启用 GitHub Discussions

```bash
gh api repos/m007/cutcli-cookbook --method PATCH --field has_discussions=true
```

## 7. 准备发布

- 录 90s demo 视频，按 [`showcase/launch.md`](../showcase/launch.md) 脚本
- 检查 `showcase/launch.md` 中的 checklist
- 按 launch.md 中的渠道文案发首发帖

## 8. 闭源仓的配套改动

也需要把 `jy_cli` 的下列改动 commit + 发版：

```bash
cd /Users/m007/codes/jy_cli
git add scripts/sync-to-cookbook.mjs scripts/sync.config.json scripts/sync.test.mjs
git add src/docs.ts src/cli.ts worker/src/landing.ts
git commit -m "feat: add cutcli docs open + sync to cookbook + cutcli.com docs entry"
# 视情况 npm version + 发布二进制
```

## 9. 监控 24h

- Cloudflare Dashboard → Workers & Pages → docs-cutcli → Logs
- GitHub repo Issues / Discussions
- R2 流量 / 错误率
