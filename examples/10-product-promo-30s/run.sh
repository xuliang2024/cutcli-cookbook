#!/usr/bin/env bash
# 10-product-promo-30s: 30 秒电商产品宣传片
#   0-3s   开场标题（产品名）
#   3-12s  3 张产品图轮播（叠化转场）
#   12-24s 卖点字幕分 3 句（关键词高亮）
#   24-30s CTA 卡尾
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

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "product-promo-30s" | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

cutcli images   add "$DRAFT_ID" --image-infos  "@$HERE/data/images.json"
cutcli captions add "$DRAFT_ID" --captions     "@$HERE/data/captions.json" \
  --font-size 9 --bold --text-color "#FFFFFF" \
  --border-color "#000000" --border-width 1 \
  --transform-y -0.55
cutcli audios   add "$DRAFT_ID" --audio-infos  "@$HERE/data/audio.json"

cutcli draft info "$DRAFT_ID" --pretty

cat <<EOF

Done. Draft "product-promo-30s" 已生成 (30s, 竖屏).
Draft ID: $DRAFT_ID
EOF
