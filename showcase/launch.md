# 上线发布草稿（W4）

> 这是 cutcli-cookbook 上线发布所需的所有渠道文案与发布检查清单。
> 实际发布时维护者按此 checklist 操作，全部 ✔ 才算 launch。

## 发布检查清单（按顺序）

- [ ] 仓库已 `gh repo create xuliang2024/cutcli-cookbook --public` 且 `git push -u origin main`
- [ ] GitHub Secrets 配置：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`
- [ ] CI（`.github/workflows/ci.yml`）首次运行全绿
- [ ] deploy-docs 自动跑通一次
- [ ] `docs.cutcli.com` 全部页面 200（CI smoke 已验证）
- [ ] cutcli.com 首页 docs 入口可见（已部署）
- [ ] 5 个 P0 案例 + 3 个进阶案例都本地手跑过一次（剪映正常打开）
- [ ] 录 90s demo 视频，放到 README 顶部
- [ ] showcase 月刊第 1 期至少入选 1 个作品（自己用 cutcli 做的也算）
- [ ] 在 cutcli.com banner 加临时通知
- [ ] 发首发帖（见下文）

## 渠道文案

### Twitter / X (英文)

```text
🚀 Launching cutcli-cookbook today!

Open-source examples + templates + docs for cutcli — a CLI that generates standard CapCut/Jianying drafts you can open directly in the desktop app.

✨ One-line install: curl -s https://cutcli.com/cli | bash
📚 Docs: https://docs.cutcli.com
🎬 Cookbook: 8 ready-to-run examples
🤖 First-class Cursor / Claude integration

Code → CapCut draft. No clicking, no plugins.

⭐ https://github.com/xuliang2024/cutcli-cookbook
```

### 小红书 (中文)

```text
【开源】我把"用代码生成剪映草稿"这件事做成了 cutcli + cookbook 🎬

cutcli：一行 bash 装好的命令行工具，写个脚本就能生成可被剪映直接打开的标准草稿
cutcli-cookbook：今天上线的开源仓库，里面 8 个完整可运行案例 + 模板 + AI 提示词

适合谁用？
✅ 有大量重复剪辑模板要做的（短视频博主、知识号）
✅ 想用 AI / Cursor / Claude 一句话生成视频的
✅ 想做产品宣传片、Vlog、TikTok 风格短视频的批量化

文档：docs.cutcli.com（所有命令 + 案例都在这）
GitHub：xuliang2024/cutcli-cookbook

求 star 和投稿你的 cookbook 案例！每月精选发月刊 ✨
```

### V2EX / 即刻 (中文)

```text
[分享创造] cutcli-cookbook —— 用代码生成剪映草稿的 cookbook 来了

最近做的开源项目：
- cutcli：CLI 工具，一行命令把字幕/图片/视频/音频/特效拼成剪映可打开的标准草稿
- cookbook：今天上线，8 个完整案例 + 模板 + Cursor/Claude prompts

工作流就是 bash 一段，剪映里直接打开继续微调。适合做模板化短视频、产品宣传片、知识科普卡片。

文档：https://docs.cutcli.com
仓库：https://github.com/xuliang2024/cutcli-cookbook

社区贡献欢迎，PR 通过的案例会进 monthly showcase。
```

### B 站 / 微信公众号

> 长文，结合 90s demo 视频，结构如下：
>
> 1. 痛点：每月做 100 个相似模板的剪映视频太累
> 2. 解决：cutcli + cookbook 把剪辑流程"代码化"
> 3. demo：跑一遍 examples/10-product-promo-30s
> 4. 入门：5 行命令做出第一个草稿（截图）
> 5. AI 加成：Cursor 里一句话生成（截图）
> 6. 召唤：欢迎贡献 case 到 examples/99-community

## 90 秒 Demo 视频脚本

| 时段 | 内容 |
|---|---|
| 0-5s | 标题"用代码生成剪映草稿" |
| 5-15s | 终端 cast：`curl ... | bash`、`cutcli draft create`、`cutcli captions add` |
| 15-30s | 切到剪映，新草稿已经出现 |
| 30-50s | 终端跑 `examples/10-product-promo-30s/run.sh` 全过程 |
| 50-65s | 切剪映播放生成的 30s 宣传片 |
| 65-80s | Cursor 一句话生成（屏幕录制 AI 对话） |
| 80-90s | CTA：docs.cutcli.com + GitHub star |

录屏工具推荐：
- macOS：QuickTime Player（系统自带）
- 字幕：可以再用 cutcli 自己加！dogfood
- 输出：1080×1920 竖版 + 1920×1080 横版各一份

## 发布后 24h 监控

- [ ] Cloudflare Dashboard → docs-cutcli worker → Logs：错误率 < 0.1%
- [ ] GitHub repo issues / discussions：及时响应（24h 内）
- [ ] R2 流量：观察是否有异常 spike
- [ ] CI 跑通绿色

---

> 完成所有 ✔ 后，把这份 launch.md 移动到 `showcase/2026-04-launch.md` 归档。
