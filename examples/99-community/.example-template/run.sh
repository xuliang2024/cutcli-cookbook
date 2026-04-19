#!/usr/bin/env bash
# <案例 ID>: <一句话描述>
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

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

cutcli draft info "$DRAFT_ID" --pretty
