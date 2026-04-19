# docs-cutcli worker

为 `docs.cutcli.com` 提供 R2 反向代理，做 SPA 风格的路径回退。

## 资源

- R2 bucket：`cutcli-docs`
- Worker：`docs-cutcli`
- Route：`docs.cutcli.com/*` → 此 worker
- 部署后访问 `https://docs.cutcli.com/`

## 路径解析

```text
/                  -> index.html
/foo/              -> foo/index.html
/foo/bar.html      -> foo/bar.html
/foo/bar           -> foo/bar.html  -> foo/bar/index.html
miss               -> 404.html (status 404)
```

## 本地开发

```bash
npm install
npm run dev
```

## 首次部署

```bash
# 1. 创建 R2 bucket（仅首次）
npm run r2:create

# 2. 上传文档构建产物（仓库根目录跑）
cd .. && npm run docs:build && npm run r2:upload

# 3. 部署 worker
cd worker && npm run deploy

# 4. 在 Cloudflare Dashboard:
#    - 给 worker 加自定义域名 docs.cutcli.com（会自动建 DNS 记录）
#    - 或在 wrangler.toml 已声明的 routes 上启用
```

## 缓存策略

- `assets/<hash>.{js,css}` —— `public, max-age=31536000, immutable`
- 其他文件（含 `.html`）—— `public, max-age=3600, must-revalidate`

VitePress 在 `assets/` 下生成的文件名都带 hash，可以放心长缓存；
其他 HTML 改了就立刻重新部署，1 小时内全球缓存失效。

## 监控

```bash
npm run tail
```

实时查看 worker 日志。Cloudflare Dashboard → Workers & Pages → docs-cutcli → Logs / Analytics 可看错误率与 p95。
