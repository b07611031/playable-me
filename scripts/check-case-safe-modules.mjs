import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, dirname, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Vite resolves extensionless imports differently on case-insensitive file systems.
// Codex.tsx + codex.ts silently passed Linux CI, but loaded the wrong module on Windows.
const src = fileURLToPath(new URL('../src/', import.meta.url))
const candidates = new Map()
const moduleExt = new Set(['.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs'])
const collisions = []
const sourceFiles = []
function scan(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) scan(path)
    else if (entry.isFile() && moduleExt.has(extname(path))) {
      sourceFiles.push(path)
      const ext = extname(path)
      const moduleStem = path.slice(0, -ext.length)
      const key = moduleStem.toLowerCase()
      const prev = candidates.get(key)
      if (prev && prev !== moduleStem) collisions.push([prev, moduleStem])
      else if (prev) collisions.push([prev, moduleStem])
      else candidates.set(key, moduleStem)
    }
  }
}
scan(src)
assert.equal(collisions.length, 0,
  'Ambiguous extensionless import on Windows/macOS: ' +
  collisions.map(pair => pair.map(p => relative(src, p)).join(' vs ')).join(', '))

for (const file of sourceFiles) {
  const text = readFileSync(file, 'utf8')
  // Check static imports; ignore bare imports and explicit stylesheet assets.
  const imports = [...text.matchAll(/from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]/g)]
    .map(match => match[1] || match[2])
    .filter(spec => spec.startsWith('.') && !extname(spec))
  for (const spec of imports) {
    const target = resolve(dirname(file), spec).toLowerCase()
    const matches = [...candidates.keys()].filter(key => key === target)
    assert.ok(matches.length <= 1, 'Ambiguous import: ' + file + ' -> ' + spec)
  }
}
console.log('Case-safe module paths OK: ' + sourceFiles.length + ' source files, no case-insensitive module stem collisions.')
