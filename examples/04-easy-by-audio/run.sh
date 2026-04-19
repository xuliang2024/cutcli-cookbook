#!/usr/bin/env bash
# 04-easy-by-audio: 用 cutcli draft easy 按音频时长自动铺素材
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
  --text "欢迎观看，cutcli 出品"

cutcli draft info "$DRAFT_ID" --pretty

cat <<EOF

Done. Draft "easy-by-audio" 已生成，背景图 + 标题 + BGM 全部自动铺满音频时长。
Draft ID: $DRAFT_ID
EOF
