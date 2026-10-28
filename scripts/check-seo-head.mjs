import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) files.push(path);
  }
}
walk(new URL('../dist', import.meta.url).pathname);
assert(files.length > 100, 'Expected the complete prerendered site');
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || '';
  const titles = [...head.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)];
  assert.equal(titles.length, 1, `${file}: exactly one title`);
  assert(titles[0][1].trim(), `${file}: nonempty title`);
  assert.equal([...head.matchAll(/<meta\b[^>]*name="description"[^>]*>/gi)].length, 1, `${file}: one description`);
  const canonicals = [...head.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/gi)];
  assert.equal(canonicals.length, file.endsWith('/404.html') ? 0 : 1, `${file}: canonical count`);
  const langs = [...head.matchAll(/hreflang="([^"]+)"/gi)].map(m => m[1]);
  assert.equal(new Set(langs).size, langs.length, `${file}: no duplicate hreflang`);
  assert(/name="msvalidate.01"/.test(head), `${file}: Bing verification preserved`);
  assert(/name="naver-site-verification"/.test(head), `${file}: Naver verification preserved`);
  if (!file.endsWith('/404.html')) assert(/application\/ld\+json/.test(head), `${file}: structured data preserved`);
}
console.log(`PASS: ${files.length} static documents have unique nonempty titles, descriptions, canonical and hreflang; verification and schema retained.`);
