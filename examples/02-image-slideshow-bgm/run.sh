#!/usr/bin/env bash
# 02-image-slideshow-bgm: 3-image slideshow + transitions + BGM
# Usage: bash run.sh
set -euo pipefail

if ! command -v cutcli >/dev/null 2>&1; then
  echo "cutcli not found. Install: curl -s https://cutcli.com/cli | bash" >&2
  exit 1
fi
if ! command -v jq >/dev/null 2>&1; then
  echo "jq not found. Install (macOS): brew install jq" >&2
  exit 1
fi

HERE="$(cd "$(dirname "$0")" && pwd)"

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "image-slideshow-bgm" | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

cutcli images add "$DRAFT_ID" --image-infos "@$HERE/data/images.json"
cutcli audios add "$DRAFT_ID" --audio-infos "@$HERE/data/audio.json"

cutcli draft info "$DRAFT_ID" --pretty

cat <<EOF

Done. Open CapCut / Jianying — draft "image-slideshow-bgm".
Draft ID: $DRAFT_ID
EOF
