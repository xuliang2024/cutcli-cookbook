# Community contributions

[English](README.md) · [简体中文](README.zh.md)

This directory holds every example contributed by the community, organized as `<github-handle>/<case-slug>/`:

```text
99-community/
├── alice/
│   └── retro-vlog-intro/
│       ├── README.md
│       ├── README.zh.md
│       ├── run.sh
│       ├── data/
│       ├── meta.json
│       └── preview.gif
└── bob/
    └── product-promo-fast/...
```

## How to contribute

The fastest path:

```bash
node scripts/new-example.mjs my-case-name
```

The scaffold collects a few fields and creates `99-community/<your-github-handle>/my-case-name/` with all required files (English + Chinese README skeletons, `run.sh`, `meta.json`, `data/`).

See [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for full rules.

## Featured in the showcase

Once merged into main, maintainers pick 5-10 community examples each month for [`showcase/`](../../showcase/), and re-share them on cutcli.com / Twitter / RedBook.
