# Installation

cutcli ships as a single binary (recommended, no Node required) and as an npm package.

## Recommended: one-line install

```bash
curl -s https://cutcli.com/cli | bash
```

The script will:

1. Detect your system (macOS Intel / Apple Silicon / Linux x86_64 / Linux arm64 / Windows)
2. Download the matching binary from the CDN
3. Install it to `/usr/local/bin/cutcli` (or an equivalent user path)
4. Verify that `cutcli --version` works

### Platform support

| OS | Architecture | Status |
|---|---|---|
| macOS | Apple Silicon (arm64) | Supported |
| macOS | Intel (x86_64) | Supported |
| Linux | x86_64 | Supported |
| Linux | arm64 | Supported |
| Windows | x86_64 | Supported (use PowerShell or Git Bash) |

## Alternative: npm

If you already have Node.js (≥ 18), you can install the npm package:

```bash
npm install -g cut_cli
```

> Note the naming: the npm package is `cut_cli` (with underscore). The command itself is `cutcli` (no space, no underscore).

## Verify

```bash
cutcli --version
cutcli --help
```

If both print output, you're good.

## Configure the draft directory

By default cutcli writes drafts into the standard CapCut/Jianying draft directory:

| OS | Default path |
|---|---|
| macOS | `~/Movies/CapCut/User Data/Projects/com.lveditor.draft/` |
| Windows | `%USERPROFILE%\Movies\CapCut\User Data\Projects\com.lveditor.draft\` |
| Linux | `~/.config/CapCut/Projects/com.lveditor.draft/` |

Which means **CapCut sees the new draft as soon as you open the app**.

### Custom draft directory

If you want drafts stored elsewhere (e.g. an external drive):

```bash
# Persistent
cutcli config set-dir ~/Desktop/my-drafts

# One-shot via env var (current process only)
export CUT_DRAFTS_DIR=~/Desktop/my-drafts
cutcli draft create
```

Inspect the current config:

```bash
cutcli config show --pretty
```

## Upgrade

Re-run the install script:

```bash
curl -s https://cutcli.com/cli | bash
```

Or via npm:

```bash
npm install -g cut_cli@latest
```

## Uninstall

```bash
sudo rm /usr/local/bin/cutcli
# Or for the npm install
npm uninstall -g cut_cli
```

## What's next

- [Build your first draft in 30 minutes](./first-draft.md)
- [Time units (microseconds)](./time-units.md)
- [AI tools integration (Cursor / Claude / OpenClaw)](./ai-integration.md)

## Troubleshooting

### `curl: command not found`

On Windows use PowerShell:

```powershell
iwr https://cutcli.com/cli -UseBasicParsing | iex
```

Or run the script in Git Bash.

### `command not found: cutcli`

Re-open your terminal, or add it to PATH manually:

```bash
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.zshrc
source ~/.zshrc
```

### CapCut can't see the generated draft

Make sure the path printed by `cutcli config show` matches the "Draft location" in CapCut's settings. If not, fix it with `cutcli config set-dir <path-shown-by-capcut>`.
