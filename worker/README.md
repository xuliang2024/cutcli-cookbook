# docs-cutcli worker

[English](README.md) · [简体中文](README.zh.md)

R2 reverse proxy for `docs.cutcli.com` with SPA-style path fallback.

## Resources

- R2 bucket: `cutcli-docs`
- Worker: `docs-cutcli`
- Route: `docs.cutcli.com/*` → this worker
- Production URL: `https://docs.cutcli.com/`

## Path resolution

```text
/                  -> index.html
/foo/              -> foo/index.html
/foo/bar.html      -> foo/bar.html
/foo/bar           -> foo/bar.html  -> foo/bar/index.html
miss               -> 404.html (status 404)
```

## Local development

```bash
npm install
npm run dev
```

## First-time deploy

```bash
# 1. Create the R2 bucket (first time only)
npm run r2:create

# 2. Upload the docs build artifacts (run from repo root)
cd .. && npm run docs:build && npm run r2:upload

# 3. Deploy the worker
cd worker && npm run deploy

# 4. In the Cloudflare Dashboard:
#    - Add custom domain docs.cutcli.com (creates the DNS record automatically)
#    - Or rely on the routes already declared in wrangler.toml
```

## Caching

- `assets/<hash>.{js,css}` — `public, max-age=31536000, immutable`
- Anything else (including `.html`) — `public, max-age=3600, must-revalidate`

VitePress puts hashes in every `assets/` file name, so long-lived caches are safe; everything else invalidates within an hour after redeploy.

## Monitoring

```bash
npm run tail
```

Live worker logs. Cloudflare Dashboard → Workers & Pages → docs-cutcli → Logs / Analytics shows error rate and p95.
