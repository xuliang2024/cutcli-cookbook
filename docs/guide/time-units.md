# Time units (microseconds)

Every time-related parameter in cutcli is in **microseconds (μs)** — captions, images, audios, keyframes, the lot.

## Conversion

```text
1 second = 1,000,000 microseconds
```

| Desired duration | Value |
|---|---|
| 0.1 s | `100000` |
| 0.5 s | `500000` |
| 1 s | `1000000` |
| 3 s | `3000000` |
| 10 s | `10000000` |
| 1 min | `60000000` |

## Why microseconds?

- Matches CapCut's internal storage format with no precision loss
- Keyframes / transitions / animations stay sample-accurate
- No floating-point drift across platforms

## Understanding `start` and `end`

```text
Timeline →
0           3,000,000           6,000,000        (microseconds)
[ caption 1 ][   caption 2     ]
start=0    end=3M  start=3M    end=6M
```

`start` is when the segment begins on the **global timeline**; `end` is when it stops. Their difference is the segment duration.

::: warning No overlap on the same track
Within the same caption / video / audio track, the `start` of the next segment must be ≥ the previous segment's `end`. Overlapping segments confuse CapCut.
:::

## Handy helpers

Convert seconds to microseconds in bash:

```bash
to_us() { echo $(( $1 * 1000000 )); }

START=$(to_us 0)        # 0
END=$(to_us 3)          # 3000000
echo "Caption from $START to $END"
```

Convert decimals like `3.5` (3 s 500 ms):

```bash
to_us_decimal() { python3 -c "print(int(float('$1') * 1000000))"; }
to_us_decimal 3.5    # 3500000
```

## Common mistakes

| Symptom | Likely cause |
|---|---|
| Caption flashes for one frame | Wrote ms by mistake: `{"start":0,"end":3000}` should be `3000000` |
| Keyframe animation finishes too fast | Same μs / ms confusion — keyframe `offset` is also in μs |
| Entrance animation longer than the segment | `inAnimationDuration` + `outAnimationDuration` must be ≤ `end - start` |

## More

- [Coordinate system & positioning](./coordinate-system.md)
