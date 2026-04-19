#!/usr/bin/env bash
# 03-tiktok-keyword-highlight: multiple captions + keyword highlight
# Usage: bash run.sh
set -euo pipefail

if ! command -v cutcli >/dev/null 2>&1; then
  echo "cutcli not found. Install: curl -s https://cutcli.com/cli | bash" >&2
  exit 1
fi
if ! command -v jq >/dev/null 2>&1; then
  echo "jq not found." >&2
  exit 1
fi

HERE="$(cd "$(dirname "$0")" && pwd)"

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "tiktok-keyword-highlight" | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

cutcli captions add "$DRAFT_ID" \
  --captions "@$HERE/data/captions.json" \
  --font-size 9 \
  --bold \
  --text-color "#FFFFFF" \
  --border-color "#000000" \
  --border-width 1 \
  --transform-y -0.55

cutcli draft info "$DRAFT_ID" --pretty

cat <<EOF

Done. Draft "tiktok-keyword-highlight" generated.
Draft ID: $DRAFT_ID
EOF
