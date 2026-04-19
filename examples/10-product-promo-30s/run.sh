#!/usr/bin/env bash
# 10-product-promo-30s: 30-second ecommerce product promo
#   0-3s   opening title (product name)
#   3-12s  3 product images with crossfade transitions
#   12-24s 3 selling-point captions with keyword highlight
#   24-30s closing CTA card
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

Done. Draft "product-promo-30s" generated (30 s, portrait).
Draft ID: $DRAFT_ID
EOF
