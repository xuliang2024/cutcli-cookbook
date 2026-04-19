#!/usr/bin/env bash
# 04-easy-by-audio: use cutcli draft easy to auto-fit assets to the audio length
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

AUDIO_URL="https://cutcli.com/assets/demo/bgm-light.mp3"
IMG_URL="https://cutcli.com/assets/demo/scene-01.jpg"

DRAFT_ID=$(cutcli draft create --width 1080 --height 1920 --name "easy-by-audio" | jq -r '.draftId')
echo "Draft created: $DRAFT_ID"

cutcli draft easy "$DRAFT_ID" \
  --audio-url "$AUDIO_URL" \
  --img-url "$IMG_URL" \
  --text "Welcome — built with cutcli"

cutcli draft info "$DRAFT_ID" --pretty

cat <<EOF

Done. Draft "easy-by-audio" generated; background image + title + BGM all auto-fitted to the audio length.
Draft ID: $DRAFT_ID
EOF
