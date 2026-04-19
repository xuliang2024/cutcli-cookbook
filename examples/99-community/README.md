# 社区贡献区

这个目录收所有外部贡献者的案例，按 `<github-handle>/<case-slug>/` 组织：

```text
99-community/
├── alice/
│   └── retro-vlog-intro/
│       ├── README.md
│       ├── run.sh
│       ├── data/
│       ├── meta.json
│       └── preview.gif
└── bob/
    └── product-promo-fast/...
```

## 怎么贡献

最简单：

```bash
node scripts/new-example.mjs my-case-name
```

脚手架会引导你填写信息，并自动生成 `99-community/<你的 GitHub handle>/my-case-name/` 目录与所有必需文件骨架。

详细规范见根目录 [`CONTRIBUTING.md`](../../CONTRIBUTING.md)。

## 入选 showcase

合并到 main 后，每月维护者会从社区案例中评选 5-10 个加入 [`showcase/`](../../showcase/) 月刊，并在 cutcli.com / Twitter / 小红书 转发。
