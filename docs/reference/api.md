---
title: "Node.js SDK overview"
description: "Top-level overview of the cut_cli Node.js SDK. Full method tables live in the source repo and the Chinese mirror."
editLink: false
footer: false
lastUpdated: true
---

# Node.js SDK overview

`cut_cli` ships an npm package alongside the standalone binary. Most users only need the binary (install via `curl -s https://cutcli.com/cli | bash`) — but if you're building automation in JavaScript / TypeScript, the SDK exposes the same operations as plain functions.

## Install

```bash
npm install cut_cli
```

## Minimal example

```typescript
import { createDraft, addCaptions, addImages, addAudios } from 'cut_cli';

const draft = await createDraft({ width: 1080, height: 1920 });

await addCaptions({
  draftId: draft.draftId,
  captions: [{ text: 'Hello', start: 0, end: 3000000 }],
  fontSize: 8,
  bold: true,
});

await addImages({
  draftId: draft.draftId,
  imageInfos: [{
    imageUrl: 'https://cutcli.com/assets/demo/scene-01.jpg',
    width: 1080,
    height: 1920,
    start: 0,
    end: 3000000,
  }],
});

await addAudios({
  draftId: draft.draftId,
  audioInfos: [{
    audioUrl: 'https://cutcli.com/assets/demo/bgm-light.mp3',
    duration: 3000000,
    start: 0,
    end: 3000000,
    volume: 0.5,
  }],
});
```

## Available functions

The SDK mirrors the CLI surface 1:1. Function names are camelCase versions of the CLI subcommands:

| CLI | SDK |
|---|---|
| `cutcli draft create` | `createDraft({ width, height, name? })` |
| `cutcli draft list` | `listDrafts()` |
| `cutcli draft info` | `getDraftInfo({ draftId })` |
| `cutcli draft easy` | `easyCreateMaterial({ draftId, audioUrl, imgUrl?, videoUrl?, text? })` |
| `cutcli draft zip` | `zipDraft({ draftId, output? })` |
| `cutcli draft upload` | `uploadDraft({ draftId })` |
| `cutcli captions add` | `addCaptions({ draftId, captions, ...style })` |
| `cutcli captions list` | `getCaptions({ draftId })` |
| `cutcli images add` | `addImages({ draftId, imageInfos })` |
| `cutcli images list` | `getImages({ draftId })` |
| `cutcli videos add` | `addVideos({ draftId, videoInfos })` |
| `cutcli videos list` | `getVideos({ draftId })` |
| `cutcli audios add` | `addAudios({ draftId, audioInfos })` |
| `cutcli audios list` | `getAudios({ draftId })` |
| `cutcli effects add` | `addEffects({ draftId, effectInfos })` |
| `cutcli effects list` | `getEffects({ draftId })` |
| `cutcli sticker add` | `addSticker({ draftId, stickerId, start, end, scale? })` |
| `cutcli sticker list` | `getStickers({ draftId })` |
| `cutcli keyframes add` | `addKeyframes({ draftId, keyframes })` |
| `cutcli keyframes list` | `getKeyframes({ draftId, segmentId })` |
| `cutcli masks add` | `addMasks({ draftId, segmentIds, ...options })` |
| `cutcli masks list` | `getMasks({ draftId, segmentId? })` |
| `cutcli filters add` | `addFilters({ draftId, filterInfos })` |
| `cutcli text-style` | `addTextStyle({ text, keyword, ...style })` |

## Field shapes

The JSON shapes accepted by the SDK are exactly the same as the CLI's `--captions` / `--image-infos` / etc. arrays. See:

- [captions](./captions.md)
- [images](./images.md)
- [videos](./videos.md)
- [audios](./audios.md)
- [keyframes](./keyframes.md)

## TypeScript types

```typescript
import type {
  Caption,
  ImageInfo,
  VideoInfo,
  AudioInfo,
  EffectInfo,
  Keyframe,
  // ... and so on
} from 'cut_cli';
```

## Where the full per-function reference lives

The exhaustive parameter tables (every option, default value, error case) live in:

- [`/zh/reference/api`](/zh/reference/api) — full Chinese reference, auto-synced from the source repo
- TypeScript declaration files inside the npm package: `node_modules/cut_cli/dist/index.d.ts`
- Source on the closed-source repo (request access via the maintainer)

Or simply:

```bash
node -e "console.log(Object.keys(require('cut_cli')))"
```

to see every exported name.
