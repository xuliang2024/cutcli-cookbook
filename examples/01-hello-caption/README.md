# 01 · Hello Caption

> The smallest runnable cutcli example: one caption with fade-in / fade-out.

[English](README.md) · [简体中文](README.zh.md)

![preview](preview.gif)

> `preview.gif` is not committed yet (CI will require it once the gif is recorded). Until then, imagine the effect from the screenshots below.

## When to use

- First time running cutcli — verify the install works
- See the minimum loop "create draft → add caption → inspect"
- Use as scaffolding for more complex examples

## Run it

```bash
bash run.sh
```

When it finishes, open CapCut / Jianying — the new draft `hello-caption` is in your draft list.

## Key parameters

| Parameter | Value | Why |
|---|---|---|
| `start: 0` | Start at zero | Timeline origin |
| `end: 5000000` | 5 s | 1 s = 1,000,000 μs; 5 s is enough to see entrance + exit |
| `inAnimation: "渐显"` | Default fade-in | Run `cutcli query text-animations --type in` for every option |
| `inAnimationDuration: 500000` | 0.5 s | 0.5 s in / out leaves 4 s of caption proper |
| `--font-size 9` | Size 9 | cutcli sizes are relative; 7-10 is the sweet spot for portrait |
| `--bold` | Bold | Short-form captions are almost always bold for legibility |
| `--transform-y -0.6` | 60 % below center | Standard short-video position, avoids the top status bar |

## Customize

### Different font and English text

```bash
cutcli captions add "$DRAFT_ID" \
  --captions @data/captions.json \
  --font "Times New Roman" \
  --font-size 10 --bold
```

### Switch to keyword highlight (see case 03)

Update `data/captions.json` to:

```json
[
  {"text":"Hello cutcli","start":0,"end":5000000,
   "keyword":"cutcli","keywordColor":"#FF6600"}
]
```

### Add a loop animation

Append to `data/captions.json`:

```json
"loopAnimation": "波浪",
"loopAnimationDuration": 1000000
```

## cutcli features used

- `cutcli draft create` — create a 1080×1920 portrait draft
- `cutcli captions add` — add a caption with entrance / exit animation
- `cutcli draft info` — inspect the resulting draft

## Validate

```bash
node ../../scripts/validate-example.mjs .
```
