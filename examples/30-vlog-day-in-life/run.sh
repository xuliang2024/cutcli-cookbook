#!/usr/bin/env bash
# 30-vlog-day-in-life: 30-second vlog "a day in my life"
#   Three scenes (morning → noon → evening), each with a time-stamped caption and ambient pacing
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

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "vlog-day-in-life" | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

cutcli images add "$DRAFT_ID" --image-infos "@$HERE/data/images.json"

# A subtle push-in on the first image so the opening breathes
SEG_FIRST=$(cutcli images list "$DRAFT_ID" | jq -r '.[0].segmentId')
cutcli keyframes add "$DRAFT_ID" --keyframes "[
  {\"segmentId\":\"$SEG_FIRST\",\"property\":\"scale_x\",\"offset\":0,\"value\":1.0},
  {\"segmentId\":\"$SEG_FIRST\",\"property\":\"scale_x\",\"offset\":10000000,\"value\":1.1},
  {\"segmentId\":\"$SEG_FIRST\",\"property\":\"scale_y\",\"offset\":0,\"value\":1.0},
  {\"segmentId\":\"$SEG_FIRST\",\"property\":\"scale_y\",\"offset\":10000000,\"value\":1.1}
]"

cutcli captions add "$DRAFT_ID" --captions "@$HERE/data/captions.json" \
  --font-size 9 --bold --text-color "#FFFFFF" \
  --border-color "#000000" --border-width 1 \
  --transform-y -0.7

cutcli audios add "$DRAFT_ID" --audio-infos "@$HERE/data/audio.json"

cutcli draft info "$DRAFT_ID" --pretty

cat <<EOF

Done. Draft "vlog-day-in-life" generated (30 s, portrait).
Draft ID: $DRAFT_ID
EOF
