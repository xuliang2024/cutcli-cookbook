#!/usr/bin/env bash
# 20-knowledge-science-card: 竖屏知识科普卡片 (3 分钟讲懂 X 风格)
#   0-2s    标题
#   2-50s   3 个要点 + 配图（Ken Burns 推近）
#   50-60s  总结 + CTA
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

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "knowledge-science-card" | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

cutcli images   add "$DRAFT_ID" --image-infos "@$HERE/data/images.json"

# 给每段图加 Ken Burns 推近
SEGMENTS=$(cutcli images list "$DRAFT_ID" | jq -r '.[].segmentId')
KFS="["
i=0
for SEG in $SEGMENTS; do
  if [ $i -gt 0 ]; then KFS="${KFS},"; fi
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_x\",\"offset\":0,\"value\":1.0},"
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_x\",\"offset\":10000000,\"value\":1.15},"
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_y\",\"offset\":0,\"value\":1.0},"
  KFS="${KFS}{\"segmentId\":\"$SEG\",\"property\":\"scale_y\",\"offset\":10000000,\"value\":1.15}"
  i=$((i + 1))
done
KFS="${KFS}]"

cutcli keyframes add "$DRAFT_ID" --keyframes "$KFS"

cutcli captions add "$DRAFT_ID" --captions "@$HERE/data/captions.json" \
  --font-size 9 --bold --text-color "#FFFFFF" \
  --bg-color "#000000" --bg-alpha 0.55 --bg-style 1 --bg-round 8 \
  --transform-y -0.6

cutcli audios add "$DRAFT_ID" --audio-infos "@$HERE/data/audio.json"

cutcli draft info "$DRAFT_ID" --pretty

cat <<EOF

Done. Draft "knowledge-science-card" 已生成 (60s, 竖屏).
Draft ID: $DRAFT_ID
EOF
