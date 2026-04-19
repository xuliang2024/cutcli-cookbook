# 01 · Hello Caption

> 最小可运行的 cutcli 案例：一行字幕 + 渐显 / 渐隐动画。

![preview](preview.gif)

> `preview.gif` 暂未提交（CI 会强制要求，本地跑 `bash record.sh` 后录制）。在那之前，参考下方截图想象效果。

## 适用场景

- 第一次跑 cutcli，验证安装是否成功
- 看下"创建草稿 → 加字幕 → 检查"的最小闭环
- 作为更复杂案例的脚手架

## 一行运行

```bash
bash run.sh
```

跑完打开剪映，在草稿列表里找到名为 `hello-caption` 的新草稿。

## 关键参数解释

| 参数 | 值 | 为什么 |
|---|---|---|
| `start: 0` | 从 0 开始 | 时间线起点 |
| `end: 5000000` | 5 秒 | 1 秒 = 1,000,000 微秒，5 秒足够看清入/出场动画 |
| `inAnimation: "渐显"` | 默认入场 | 用 `cutcli query text-animations --type in` 列出所有可选 |
| `inAnimationDuration: 500000` | 0.5 秒 | 入场出场各 0.5s，剩 4s 留给字幕主体显示 |
| `--font-size 9` | 9 号 | cutcli 的字号是相对单位，竖屏推荐 7-10 |
| `--bold` | 加粗 | 短视频字幕几乎都加粗才清晰 |
| `--transform-y -0.6` | 偏下 60% | 短视频字幕传统位置，避开顶部状态栏 |

## 进阶改造

### 改成英文 + 不同字体

```bash
cutcli captions add "$DRAFT_ID" \
  --captions @data/captions.json \
  --font "Times New Roman" \
  --font-size 10 --bold
```

### 改成关键词高亮（看 case 03）

把 `data/captions.json` 改成：

```json
[
  {"text":"Hello cutcli","start":0,"end":5000000,
   "keyword":"cutcli","keywordColor":"#FF6600"}
]
```

### 加循环动画

在 `data/captions.json` 中加：

```json
"loopAnimation": "波浪",
"loopAnimationDuration": 1000000
```

## 用到的 cutcli 能力

- `cutcli draft create` — 创建竖屏 1080×1920 草稿
- `cutcli captions add` — 加字幕、设入场/出场动画
- `cutcli draft info` — 验证草稿内容

## 校验

```bash
node ../../scripts/validate-example.mjs .
```
