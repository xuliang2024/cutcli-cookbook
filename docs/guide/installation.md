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

If you already have Node.js (≥ 18), install via npm:

```bash
npm install -g cut_cli
```

> Note the naming: the npm package is `cut_cli` (with underscore), and the command is `cutcli` (no space, no underscore).

## Verify installation

```bash
cutcli --version
cutcli --help
```

The version number and command list confirm a successful install.

## Drafts directory

By default, cutcli writes drafts to the standard CapCut / Jianying drafts folder:

| OS | Default path |
|---|---|
| macOS | `~/Movies/CapCut/User Data/Projects/com.lveditor.draft/` |
| Windows | `%USERPROFILE%\Movies\CapCut\User Data\Projects\com.lveditor.draft\` |
| Linux | `~/.config/CapCut/Projects/com.lveditor.draft/` |

That means **the draft you generate shows up immediately when you open the desktop app**.

### Customize the drafts directory

If you want to write drafts elsewhere (e.g. an external drive):

```bash
# Persist the change
cutcli config set-dir ~/Desktop/my-drafts

# Or set per-process via env var
export CUT_DRAFTS_DIR=~/Desktop/my-drafts
cutcli draft create
```

Show the current configuration:

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
# If installed via npm
npm uninstall -g cut_cli
```

## Next steps

- [Build your first draft in 30 minutes](./first-draft.md)
- [Time units (microseconds)](./time-units.md)
- [AI integrations (Cursor / Claude / OpenClaw)](./ai-integration.md)

## Troubleshooting

### `curl: command not found`

Windows users — try PowerShell:

```powershell
iwr https://cutcli.com/cli -UseBasicParsing | iex
```

Or run the install script in Git Bash.

### `command not found: cutcli`

Re-open your terminal, or add the install dir to PATH manually:

```bash
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.zshrc
source ~/.zshrc
```

### CapCut can't see the generated draft

Make sure `cutcli config show` returns the same directory as CapCut's "Settings → Draft location". If they differ, run `cutcli config set-dir <path-from-capcut>` to align them.
