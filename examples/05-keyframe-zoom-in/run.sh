#!/usr/bin/env bash
# 05-keyframe-zoom-in: image + keyframe scaling (Ken Burns effect)
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

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "keyframe-zoom-in" | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

cutcli images add "$DRAFT_ID" --image-infos "@$HERE/data/images.json"

# Fetch the segmentId of the image we just added
SEG_ID=$(cutcli images list "$DRAFT_ID" | jq -r '.[0].segmentId')
echo "Segment ID: $SEG_ID"

# Use jq to replace __SEG_ID__ in the template with the real ID, then hand to cutcli
KEYFRAMES=$(jq --arg seg "$SEG_ID" \
  '[.[] | .segmentId = $seg]' \
  "$HERE/data/keyframes.template.json")

cutcli keyframes add "$DRAFT_ID" --keyframes "$KEYFRAMES"

cutcli draft info "$DRAFT_ID" --pretty

cat <<EOF

Done. Draft "keyframe-zoom-in" generated. Open CapCut / Jianying — the image slowly zooms from 1.0 to 1.3 over 5 s.
Draft ID: $DRAFT_ID
EOF
