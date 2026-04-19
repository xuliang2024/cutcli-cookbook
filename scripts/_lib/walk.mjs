import fs from 'node:fs/promises';
import path from 'node:path';

export async function walk(dir, predicate = () => true) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return out;
    throw err;
  }
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.git')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full, predicate)));
    } else if (entry.isFile() && predicate(full, entry)) {
      out.push(full);
    }
  }
  return out;
}

export async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}
