/**
 * docs-cutcli — Cloudflare Worker that reverse-proxies the `cutcli-docs` R2
 * bucket for docs.cutcli.com, with SPA-style path resolution.
 *
 * Resolution order for an incoming request path P:
 *   /                  -> index.html
 *   /foo/              -> foo/index.html
 *   /foo/bar.html      -> foo/bar.html  (direct hit)
 *   /foo/bar           -> foo/bar.html  -> foo/bar/index.html
 *   none of the above  -> 404.html (status 404)
 */

export interface Env {
  DOCS: R2Bucket;
}

const HASHED_ASSET_DIR = 'assets/';
const LONG_CACHE = 'public, max-age=31536000, immutable';
const SHORT_CACHE = 'public, max-age=3600, must-revalidate';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const method = request.method.toUpperCase();
    if (method !== 'GET' && method !== 'HEAD') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD' },
      });
    }

    const url = new URL(request.url);
    const candidates = resolveCandidates(url.pathname);

    for (const key of candidates) {
      const obj = await env.DOCS.get(key);
      if (obj) {
        return buildResponse(obj, key, 200, method === 'HEAD');
      }
    }

    const notFound = await env.DOCS.get('404.html');
    if (notFound) {
      return buildResponse(notFound, '404.html', 404, method === 'HEAD');
    }

    return new Response('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  },
};

function resolveCandidates(pathname: string): string[] {
  let p = decodeURIComponent(pathname);
  if (p.startsWith('/')) p = p.slice(1);
  if (p === '') return ['index.html'];
  if (p.endsWith('/')) return [`${p}index.html`];

  const last = p.slice(p.lastIndexOf('/') + 1);
  const hasExtension = last.includes('.');

  if (hasExtension) return [p];

  return [`${p}.html`, `${p}/index.html`];
}

function buildResponse(
  object: R2ObjectBody,
  key: string,
  status: number,
  headOnly: boolean,
): Response {
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set(
    'Cache-Control',
    key.startsWith(HASHED_ASSET_DIR) ? LONG_CACHE : SHORT_CACHE,
  );

  if (key.endsWith('.html')) {
    headers.set('Content-Type', 'text/html; charset=utf-8');
  } else if (key.endsWith('.json')) {
    headers.set('Content-Type', 'application/json; charset=utf-8');
  } else if (key.endsWith('.svg')) {
    headers.set('Content-Type', 'image/svg+xml; charset=utf-8');
  } else if (key.endsWith('.css')) {
    headers.set('Content-Type', 'text/css; charset=utf-8');
  } else if (key.endsWith('.js') || key.endsWith('.mjs')) {
    headers.set('Content-Type', 'text/javascript; charset=utf-8');
  } else if (key.endsWith('.woff2')) {
    headers.set('Content-Type', 'font/woff2');
  }

  return new Response(headOnly ? null : object.body, { status, headers });
}
