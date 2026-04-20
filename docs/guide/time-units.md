# Time units (microseconds)

**Every time field in cutcli is microseconds (μs)** — captions, images, audios, keyframes, transitions, animations.

## The conversion

```text
1 second = 1,000,000 microseconds
```

| Wanted duration | Write |
|---|---|
| 0.1 s | `100000` |
| 0.5 s | `500000` |
| 1 s | `1000000` |
| 3 s | `3000000` |
| 10 s | `10000000` |
| 1 min | `60000000` |

## Why microseconds

- Matches CapCut's internal storage format — no precision loss
- Keyframes / transitions / animations can be controlled to the microsecond
- Cross-platform safe, no float rounding

## Reading start / end

```text
timeline →
0           3,000,000           6,000,000        (microseconds)
[caption A  ][   caption B    ]
start=0    end=3M  start=3M    end=6M
```

`start` is when the segment begins on the **overall timeline**; `end` is when it ends. The duration is `end - start`.

::: warning Don't overlap inside a single track
Within one caption / video / audio track, neighboring segments must satisfy `start ≥ previous end`. Otherwise CapCut will render the timeline incorrectly.
:::

## Helpful shell snippets

Convert seconds to microseconds:

```bash
to_us() { echo $(( $1 * 1000000 )); }

START=$(to_us 0)        # 0
END=$(to_us 3)          # 3000000
echo "Caption from $START to $END"
```

Decimal seconds (e.g. "3.5 s"):

```bash
to_us_decimal() { python3 -c "print(int(float('$1') * 1000000))"; }
to_us_decimal 3.5    # 3500000
```

## Common mistakes

| Symptom | Likely cause |
|---|---|
| Caption flashes for one frame | You wrote ms: `{"start":0,"end":3000}` should be `3000000` |
| Keyframe animation is way too fast | Same ms / μs confusion. Keyframe `offset` is also μs |
| Entrance animation longer than the segment | `inAnimationDuration` + `outAnimationDuration` must be ≤ `end - start` |

## More

- [Coordinate system & positioning](./coordinate-system.md)
