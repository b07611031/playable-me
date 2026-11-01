import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { setTimeout as pause } from 'node:timers/promises'
import { chromium } from 'playwright'

const HOST = 'http://127.0.0.1:5173'
const server = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '5173', '--strictPort'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, BROWSER: 'none' },
  detached: true,
})
let serverOutput = ''
server.stdout.on('data', b => { serverOutput += b.toString() })
server.stderr.on('data', b => { serverOutput += b.toString() })

let browser
try {
  let ready = false
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error('Vite quit early: ' + serverOutput)
    try {
      const response = await fetch(HOST + '/')
      if (response.ok && (await response.text()).includes('/src/main.tsx')) { ready = true; break }
    } catch {}
    await pause(150)
  }
  assert.ok(ready, 'Vite root failed to serve index.html: ' + serverOutput)
  browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })

  for (const viewport of [{width:1440,height:900},{width:390,height:844}]) {
    const context = await browser.newContext({ viewport })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', err => errors.push(err.message))
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
    const response = await page.goto(HOST + '/', { waitUntil:'networkidle', timeout:30000 })
    assert.equal(response?.status(), 200, 'Local dev root must respond OK')
    await page.locator('h1').first().waitFor({state:'visible',timeout:10000})
    assert.match(await page.locator('h1').first().innerText(), /THE STORY/i, 'Homepage title should render')
    await page.getByRole('button', {name: /start exploring/i}).click()
    await page.getByRole('heading', {name:/WORLD MAP/i}).waitFor()
    await page.getByRole('button', {name:/open nine-character codex/i}).click()
    await page.getByRole('heading', {name:/YUN CODEX/i}).waitFor()
    assert.equal(await page.locator('.codex-card').count(), 9, 'Should display 9 role cards')
    assert.equal(await page.locator('.codex-locked').count(), 9, 'Fresh profile starts locked')

    // A locked role must ask before navigating; cancel leaves Codex in place.
    await page.locator('.codex-locked').first().click()
    await page.getByText(/GO TO THE UNLOCK STATION/i).waitFor()
    await page.getByRole('button', {name:/NOT NOW/i}).click()
    await page.getByRole('heading',{name:/YUN CODEX/i}).waitFor()
    await page.locator('.codex-locked').first().click()
    await page.getByRole('button',{name:/GO TO AI LAB/i}).click()
    await page.locator('.zone-heading h1').filter({hasText:/AI LAB/i}).waitFor()

    // A full AI Lab run reveals appearances only, then returns to station stories.
    await page.getByRole('button',{name:/PLAY MINI GAME/i}).click()
    await page.getByRole('button',{name:/START 12-SECOND RUN/i}).click()
    const tap=page.getByRole('button',{name:/Tap to generate energy/i})
    for(let i=0;i<22;i++)await tap.click()
    await page.getByRole('button',{name:/SUCCESS! SEE UNLOCKED CHARACTERS/i}).click()
    await page.getByRole('dialog',{name:/CHARACTERS UNLOCKED/i}).waitFor()
    assert.equal(await page.locator('.unlock-preview-character').count(),3,'AI Lab should preview 3 characters')
    assert.equal(await page.locator('.codex-modal').count(),0,'Victory must not open Codex detail')
    await page.getByRole('button',{name:/GOT IT — BACK TO STORIES/i}).click()
    assert.equal(await page.locator('.unlock-preview').count(),0,'Acknowledge closes preview')
    await page.locator('.zone-heading h1').filter({hasText:/AI LAB/i}).waitFor()
    assert.equal(await page.locator('.story-card:not(.story-locked)').count(),3,'Return to unlocked station stories')

    // Locked Gamer and Learner characters should navigate to their respective stations.
    await page.getByRole('button',{name:/Open nine-character codex/i}).click()
    await page.getByRole('button',{name:/GAMER 0\\/3/i}).click()
    await page.locator('.codex-locked').first().click()
    await page.getByRole('button',{name:/GO TO GAME ROOM/i}).click()
    await page.locator('.zone-heading h1').filter({hasText:/GAME ROOM/i}).waitFor()
    await page.getByRole('button',{name:/Open nine-character codex/i}).click()
    await page.getByRole('button',{name:/LEARNER 0\\/3/i}).click()
    await page.locator('.codex-locked').first().click()
    await page.getByRole('button',{name:/GO TO QUEST FIELD/i}).click()
    await page.locator('.zone-heading h1').filter({hasText:/QUEST FIELD/i}).waitFor()

    await page.reload({waitUntil:'networkidle'})
    assert.equal(await page.locator('h1').count(),1,'App should survive reload')
    assert.deepEqual(errors,[], 'Browser console or runtime errors')
    console.log('Browser smoke OK:',viewport.width+'x'+viewport.height,'local /, home, map, codex, reload')
    await context.close()
  }
} finally {
  if (browser) await browser.close()
  // npm runs Vite as a child; terminate the entire process group to avoid CI hanging.
  try { process.kill(-server.pid, 'SIGTERM') } catch { server.kill('SIGTERM') }
  server.stdout.destroy()
  server.stderr.destroy()
}
