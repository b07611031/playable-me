# Free GitHub Pages deployment — Playable Me

## Goal

Publish the current verified Vite/React portfolio at:

**https://b07611031.github.io/playable-me/**

This is the expected project URL, **not proof that the site is already enabled**.

No custom domain in v1. Trial postcard batch is fewer than 10 pieces; do not print a QR code until the HTTPS URL has passed independent phone scanning and navigation checks.

## One-time GitHub owner setup

1. Open [Repository Settings → Pages](https://github.com/b07611031/playable-me/settings/pages).
2. Under **Build and deployment**, choose **Source = GitHub Actions** (not Deploy from a branch).
3. Ensure Actions permissions and Pages deployment are allowed by repo settings / account.
4. After the release PR is merged into `main`, go to [Actions](https://github.com/b07611031/playable-me/actions) and inspect **Deploy Playable Me to GitHub Pages**.
5. Check that the **deploy** job ends with success, then open the published URL from a non-logged-in browser.

If this setting is unavailable or the deployment fails at `configure-pages` / `deploy-pages`, the owner must check Pages permissions. The connected GitHub coding integration may not be allowed to modify repository Pages settings. Do not claim publication based only on successful Vite build.

## CI and deployment workflow

- `.github/workflows/ci.yml`: static build, maze/codex/Windows-safe module checks, Chromium browser smoke test.
- `.github/workflows/deploy.yml`: runs on pushes to `main` or manual invocation from Actions, builds `dist/`, uploads a Pages artifact and deploys it.
- Only `main` is allowed to publish the public site. The `github-pages` deployment environment may be created by GitHub automatically.
- Vite `base` for production is `/playable-me/`; for local dev it is `/`.

## Public acceptance checklist

- [ ] Deployment job success is confirmed (not simply build success).
- [ ] URL returns rendered home page, not 404, blank page or directory listing.
- [ ] Open URL in private/guest browser; no GitHub login needed.
- [ ] Open on actual iOS Safari and Android Chrome; test portrait, landscape, touch.
- [ ] Verify CSS/JS assets load under `/playable-me/assets/` (DevTools Network).
- [ ] Navigate to all three Stations and the nine-character Codex.
- [ ] Mini-game win → appearance preview → acknowledgement → original Station story cards.
- [ ] Locked Codex character → confirm target Station → arrive correctly.
- [ ] Verify LinkedIn link and GitHub link; Resume remains marked unavailable.
- [ ] Reload after making progress; examine localStorage persistence.
- [ ] Test a QR code pointing to the final HTTPS URL on 2+ phones, with a preview of the postcard physical QR size.

## Failures and recovery

- **404:** check Settings → Pages; latest `main` deployment job; make sure you used the project subpath.
- **Blank screen / missing assets:** check Vite production base `/playable-me/` and browser DevTools.
- **Deployment permissions / Pages not enabled:** enable Pages source as GitHub Actions; inspect step output.
- **Stale content:** confirm Actions run SHA corresponds to `main` and hard-refresh/try incognito.
- **Local Windows white screen:** distinguish `codex.ts` from `CharacterCodex.tsx`; run `npm run test:case`. Remote dev HMR WebSocket trouble is different from production Pages.

## QR and postcard

Initial QR should encode the verified HTTPS URL exactly. For fewer than 10 trial postcards, free github.io is acceptable. Future custom domain or host migration will require either redirect continuity or a new QR unless an intermediary redirect URL was used; accept this tradeoff intentionally. Do not fabricate a permanent link.
