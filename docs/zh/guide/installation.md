# 安装与配置

cutcli 提供独立二进制（推荐，无需 Node 环境）和 npm 包两种安装方式。

## 推荐：一行脚本安装

```bash
curl -s https://cutcli.com/cli | bash
```

这条命令会：

1. 探测你的系统（macOS Intel / Apple Silicon / Linux x86_64 / Linux arm64 / Windows）
2. 从 CDN 下载对应平台的二进制
3. 安装到 `/usr/local/bin/cutcli`（或同等用户路径）
4. 验证 `cutcli --version` 是否能跑

### 平台覆盖

| 系统 | 架构 | 状态 |
|---|---|---|
| macOS | Apple Silicon (arm64) | 支持 |
| macOS | Intel (x86_64) | 支持 |
| Linux | x86_64 | 支持 |
| Linux | arm64 | 支持 |
| Windows | x86_64 | 支持（请用 PowerShell 或 Git Bash） |

## 备选：npm

如果你已经有 Node.js (≥ 18)，也可以装 npm 包：

```bash
npm install -g cut_cli
```

> 注意命令名：npm 包名为 `cut_cli`（带下划线），命令名为 `cutcli`（无空格、无下划线）。

## 验证安装

```bash
cutcli --version
cutcli --help
```

输出当前版本号和命令列表说明安装成功。

## 草稿目录配置

cutcli 默认把生成的草稿写到剪映桌面端的标准草稿目录：

| 操作系统 | 默认路径 |
|---|---|
| macOS | `~/Movies/CapCut/User Data/Projects/com.lveditor.draft/` |
| Windows | `%USERPROFILE%\Movies\CapCut\User Data\Projects\com.lveditor.draft\` |
| Linux | `~/.config/CapCut/Projects/com.lveditor.draft/` |

也就是说**生成完直接打开剪映就能看见**。

### 自定义草稿目录

如果你想把草稿写到别处（例如外接硬盘）：

```bash
# 一次性设置（永久生效）
cutcli config set-dir ~/Desktop/my-drafts

# 或临时通过环境变量（仅本次进程）
export CUT_DRAFTS_DIR=~/Desktop/my-drafts
cutcli draft create
```

查看当前配置：

```bash
cutcli config show --pretty
```

## 升级到最新版

重新跑安装命令即可：

```bash
curl -s https://cutcli.com/cli | bash
```

或用 npm：

```bash
npm install -g cut_cli@latest
```

## 卸载

```bash
sudo rm /usr/local/bin/cutcli
# npm 安装的话
npm uninstall -g cut_cli
```

## 下一步

- [30 分钟做第一个草稿](./first-draft.md)
- [时间单位（微秒）](./time-units.md)
- [AI 工具集成（Cursor / Claude / OpenClaw）](./ai-integration.md)

## 故障排查

### `curl: command not found`

Windows 用户请用 PowerShell：

```powershell
iwr https://cutcli.com/cli -UseBasicParsing | iex
```

或下载到 Git Bash 中执行。

### `command not found: cutcli`

重新打开终端，或手动加 PATH：

```bash
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.zshrc
source ~/.zshrc
```

### 剪映找不到生成的草稿

确认 `cutcli config show` 输出的目录与剪映「设置 → 草稿位置」一致。如果不一致，用 `cutcli config set-dir <剪映显示的路径>` 修正。
