---
title: "Core concepts: draft, time, coordinates"
description: "How cutcli stores drafts, how time is encoded, and how positioning works."
editLink: false
footer: false
lastUpdated: true
---

# Core concepts

## Drafts are folders

Each cutcli draft is a **standard CapCut/Jianying draft folder**. CapCut sees and opens it without any plugin or import step.

```text
{draftId}/
├── draft_content.json          # The main project JSON (always current)
├── draft_info.json             # Same as above
├── draft_meta_info.json        # Metadata (id, name, root_path)
├── draft_agency_config.json    # CapCut config (template)
├── attachment_pc_common.json   # CapCut config (template)
├── template.tmp                # CapCut template
└── resources/                  # Auto-downloaded media
    ├── {uuid}.mp3              # Audio
    ├── {uuid}.mp4              # Video
    └── {uuid}.png              # Image
```

## Default storage path

| OS | Path |
|---|---|
| macOS | `~/Movies/CapCut/User Data/Projects/com.lveditor.draft/` |
| Windows | `%USERPROFILE%\Movies\CapCut\User Data\Projects\com.lveditor.draft\` |
| Linux | `~/.config/CapCut/Projects/com.lveditor.draft/` |

Override via `cutcli config set-dir <path>` or the env var `CUT_DRAFTS_DIR`.

## Auto-download

When you call `cutcli images add` / `videos add` / `audios add`, every URL you pass is downloaded into the draft's `resources/` folder. The project JSON references the local file, not the URL — so CapCut works fully offline once the draft is created.

## Time = microseconds

Every time field is microseconds (μs). `1 second = 1,000,000`.

See [Time units](/guide/time-units) for the full discussion.

## Position = normalized coordinates

`(0, 0)` is screen center, X positive right, Y positive up, range `[-1, 1]`.

See [Coordinate system](/guide/coordinate-system) for examples.

## JSON parameters in the CLI

CLI options that take JSON accept two forms:

- **Inline JSON**: `--captions '[{"text":"hello","start":0,"end":3000000}]'`
- **File reference**: `--captions @captions.json` (reads the file)

For non-trivial JSON, use the file form — your shell escaping life will be much easier.

## Where the original Chinese version lives

[`/zh/reference/concepts`](/zh/reference/concepts) — auto-synced from `jy_cli/docs/README.md`.
