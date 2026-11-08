# Playable Me — Agent Working Agreement

## Project and audience

Playable Me — The Story of Yun is a public, mobile-first, bilingual (English / Traditional Chinese) retro pixel-RPG portfolio. The visitor should understand Yun's **AI Builder / Fast Learner / Passionate Gamer** identity within ~60–90 seconds. Games and nine unlockable original Yun characters are a way to discover real stories, not a barrier to reading them. The project supports professional introductions, job applications including Garena MAP, and eventually an experimental printed postcard with a QR code.

**Primary objective now:** ship and maintain a stable public site on the free GitHub Pages URL. Domain ownership and a full UI aesthetic redesign are deferred.

## Read first, in order

1. `docs/STATUS.md` — current release, blockers, next priorities.
2. `docs/PRODUCT.md` — product goal, core stories, experience rules.
3. `docs/DECISIONS.md` — decisions and tradeoffs that must not be silently reversed.
4. The relevant feature spec in `docs/` and the current GitHub Issue / PR.

If these contradict the code, inspect both, report the discrepancy and update the source of truth in the same PR.

## Code map

- React 19 + TypeScript + Vite, static output in `dist/`.
- `src/App.tsx`: sections, navigation, bilingual 9-story content, local progress.
- `src/SpaceQuest.tsx`: falling-meteor spaceship game.
- `src/SharkMaze.tsx`: fixed, tested ocean maze, Yun outfit items.
- `src/LabClicker.tsx`: 12-second AI clicker; early finish at 22 taps.
- `src/CharacterCodex.tsx`: nine-role gallery, locked-character destination confirmation.
- `src/CharacterUnlockPreview.tsx`: appearance-only unlock reward, then return to Station stories.
- `src/CharacterSprite.tsx`, `src/characters.json`, `src/codex.ts`: original CSS character art, metadata, unlocks.
- `vite.config.ts`: development base /, production base /playable-me/.
- `.github/workflows/ci.yml`: validation; `deploy.yml`: deployment from main.

## Workflow

- Prefer a small GitHub Issue for each discrete change with problem, acceptance criteria and test plan.
- Create a feature branch from the current `main` after the public release; do not develop against the old stacked Draft PR branches.
- Open a PR with screenshot/recording evidence for UI changes and explicit manual QA. Do not merge or deploy an unreviewed gameplay/UI change.
- Keep `docs/STATUS.md` concise and current, update `docs/DECISIONS.md` only for meaningful decisions.
- Do not invent public-facing career facts, metrics, links or any personal contact details. Check before adding client/project specifics.
- Use original artwork/CSS assets; do not reproduce copyrighted Pac-Man, League of Legends or CS2 sprites or official logos.
- Keep GitHub / LinkedIn links accessible without playing. No mandatory game completion, login or account.
- Preserve EN and zh-TW translations, keyboard and mobile interaction, reduced-motion preference and non-confidential storytelling.
- Avoid creating any analytics, trackers, accounts, backend or paid hosting without explicit approval.
- Node.js/npm project; avoid introducing conda or an unrelated Python toolchain. No `npm ci` until a committed matching lockfile exists.

## Tests / release checks

```bash
npm install
npm run test:maze
npm run test:case
npm run test:codex
npm run build
```

CI additionally runs `node scripts/browser-smoke.mjs` in Chromium for 1440x900 and 390x844; it requires Playwright as installed by workflow. For release, verify actual HTTPS Pages URL, asset loads, 3 Stations, story access, LinkedIn, unlocked-character Codex and mobile interaction. Distinguish CI success from real-user device acceptance.

GitHub Pages setting may require a one-time owner action: **Settings → Pages → Source: GitHub Actions**. Do not claim the site is live until the deployment run succeeds and a public URL returns the expected website.

## Release and handoff expectations

PR description should include: scope, branch, tests performed/results, risks, follow-ups, and whether the live URL changed. Output a short handoff referencing a repo path, Issue or PR—never rely on chat history alone.
