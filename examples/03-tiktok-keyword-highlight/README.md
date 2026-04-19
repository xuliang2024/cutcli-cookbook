# 03 · TikTok Keyword Highlight

> TikTok / Douyin-style sequential captions with keyword highlights and entrance animations.

[English](README.md) · [简体中文](README.zh.md)

![preview](preview.gif)

> `preview.gif` is not committed yet (CI will require it).

## When to use

- Short-video creators using the "say it in three lines" template
- Knowledge / beauty / cooking tutorials
- Any scenario needing fast-paced captions with a highlighted keyword

## Run it

```bash
bash run.sh
```

## Key parameters

| Parameter | Value | Why |
|---|---|---|
| 2 s per caption | `start`/`end` 2,000,000 μs apart | TikTok pace: 1 keyword per 2 s |
| `keyword: "secret"` | Keyword field | cutcli auto-styles the keyword in the keyword color, no manual splitting |
| `keywordColor: "#FFD600"` | Yellow | High contrast vs. white body, paired with red as the only emphasis |
| `inAnimation: "向上滑入"` | Common Douyin entrance | Matches a snappy rhythm |
| `inAnimationDuration: 300000` | 0.3 s | Short = punchy; > 0.5 s feels sluggish |
| `--border-color "#000000"` `--border-width 1` | Black border | Stays legible on any background |
| `--transform-y -0.55` | 55 % below center | Slightly higher than the traditional bottom, avoids the Douyin UI |

## Customize

### Multiple keywords

```json
{"text":"This trick is a real game-changer",
 "keyword":"trick|game-changer",
 "keywordColor":"#FF6600"}
```

`keyword` accepts `|` to separate multiple keywords.

### Different colors per keyword

cutcli supports one `keywordColor` per caption. Split into multiple captions for multiple colors.

### Bilingual variant (CN + EN)

```json
[
  {"text":"今天教大家一个秘密","start":0,"end":2000000,
   "keyword":"秘密","keywordColor":"#FFD600","fontSize":9,
   "transform_y":-0.5},
  {"text":"This is a secret","start":0,"end":2000000,
   "keyword":"secret","keywordColor":"#FFD600","fontSize":7,
   "transform_y":-0.6}
]
```

> Two captions sharing the same start/end stack on screen, separated by `transform_y`.

### Loop animation for "breathing" captions

```json
"loopAnimation": "心跳",
"loopAnimationDuration": 800000
```

## cutcli features used

- `cutcli captions add` — multi-caption + keyword field + entrance / exit animations
- Global styling: border, bold, position offset
