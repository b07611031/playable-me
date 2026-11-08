// Ensure the published bundle is configured for project-level GitHub Pages.
import assert from 'node:assert/strict'
import {readFileSync,readdirSync,statSync} from 'node:fs'
import {resolve} from 'node:path'
const dist=resolve('dist')
const index=readFileSync(resolve(dist,'index.html'),'utf8')
assert.ok(index.includes('Playable Me'), 'Missing expected page title')
assert.ok(index.includes('/playable-me/assets/'), 'Production asset base is not /playable-me/')
assert.ok(!index.includes('/src/main.tsx'), 'Vite did not compile the source entrypoint')
const assets=resolve(dist,'assets')
const files=readdirSync(assets)
assert.ok(files.some(f=>f.endsWith('.js')),'Missing JavaScript bundle')
assert.ok(files.some(f=>f.endsWith('.css')),'Missing CSS asset')
assert.ok(files.every(f=>statSync(resolve(assets,f)).size>0),'Empty compiled asset')
console.log('GitHub Pages bundle OK: project-base /playable-me/, HTML + JS + CSS available.')
