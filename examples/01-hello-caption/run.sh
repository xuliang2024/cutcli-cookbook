#!/usr/bin/env bash
# 01-hello-caption: one caption + entrance animation
# Usage: bash run.sh
set -euo pipefail

if ! command -v cutcli >/dev/null 2>&1; then
  echo "cutcli not found. Install it first: curl -s https://cutcli.com/cli | bash" >&2
  exit 1
fi
if ! command -v jq >/dev/null 2>&1; then
  echo "jq not found. Install jq (macOS: brew install jq)" >&2
  exit 1
fi

HERE="$(cd "$(dirname "$0")" && pwd)"

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "hello-caption" | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

cutcli captions add "$DRAFT_ID" \
  --captions "@$HERE/data/captions.json" \
  --font-size 9 \
  --bold \
  --text-color "#FFFFFF" \
  --transform-y -0.6

cutcli draft info "$DRAFT_ID" --pretty

cat <<EOF

Done. Open CapCut / Jianying — the new draft "hello-caption" is in your draft list.
Draft ID: $DRAFT_ID
EOF
