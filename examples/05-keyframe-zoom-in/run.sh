#!/usr/bin/env bash
# 05-keyframe-zoom-in: 图片 + 关键帧缩放 (Ken Burns 效果)
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

# 拿到刚才那张图的 segmentId
SEG_ID=$(cutcli images list "$DRAFT_ID" | jq -r '.[0].segmentId')
echo "Segment ID: $SEG_ID"

# 用 jq 把模板里的 __SEG_ID__ 替换成真实 ID 后传给 cutcli
KEYFRAMES=$(jq --arg seg "$SEG_ID" \
  '[.[] | .segmentId = $seg]' \
  "$HERE/data/keyframes.template.json")

cutcli keyframes add "$DRAFT_ID" --keyframes "$KEYFRAMES"

cutcli draft info "$DRAFT_ID" --pretty

cat <<EOF

Done. Draft "keyframe-zoom-in" 已生成。打开剪映可看到 5 秒内从 1.0 缓慢放大到 1.3。
Draft ID: $DRAFT_ID
EOF
