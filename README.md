# Playable Me — The Story of Yun

**Started with Games. Built with AI. Always Learning.**

A mobile-first, bilingual (EN / 繁中), original pixel-RPG interactive portfolio of Yun Lin. Explore AI Lab, Quest Field and Game Room, play three optional mini-games and collect nine story-based Yun characters. Intended for professional introductions, including Garena MAP interviews, and a small trial run of printed QR postcards.

## Website — v0.4 (GitHub Pages)

**Expected public URL:** https://b07611031.github.io/playable-me/

**Deployment status must be checked** in [GitHub Actions](https://github.com/b07611031/playable-me/actions) and [Pages Settings](https://github.com/b07611031/playable-me/settings/pages). The URL is not considered live until GitHub Pages deploy succeeds and the site loads from a guest browser.

Version one uses free `github.io`, **no custom domain**. The first postcard test will print **fewer than 10 cards**, only after real phone/QR verification.

[Deployment instructions](docs/DEPLOYMENT.md) · [Project status](docs/STATUS.md) · [Product overview](docs/PRODUCT.md) · [Agent collaboration rules](AGENTS.md)

## Local development

Node 22+ and npm:

```bash
npm install
npm run dev
```

Local URL: `http://localhost:5173/`. To use a remote/LAN host (e.g. `http://10.0.1.26:5173/`) and resolve HMR host issues, set `VITE_HMR_HOST` to the browser-reachable IP. See [deployment & troubleshooting](docs/DEPLOYMENT.md).

```bash
npm run test:maze
npm run test:codex
npm run test:case
npm run build
npm run test:dist
```

CI also uses Chromium Playwright browser smoke tests. Do not equate a passing build to successful public hosting.

## Visitor experience

- **AI Lab:** Plantman, long-video tracking and building usable AI tools. Tap-power-up milestones unlock Student / Researcher / Engineer Yun.
- **Quest Field:** diving, sports, and Camino experiences. Collect mask, gloves and boots in the fixed shark maze to unlock Diver / Boxer / Explorer Yun.
- **Game Room:** a 2D spaceship coding origin, LoL teamwork and CS2 multiplayer observations. Dodge meteors to unlock Pilot / Shadow Support / Tactical Yun.
- **YUN CODEX:** nine original CSS-pixel characters across three groups. Locked cards are silhouettes; clicking one asks whether to visit its unlock Station.
- Game rewards show each character with its linked real-world story. The primary action starts a **guided reading tour** through unread unlocked characters; **Not now / Skip Story Tour** remains available. Individual Station story cards and the Codex show character → story relationships explicitly. Some partial game attempts unlock stories too.
- Stories and professional links stay accessible without winning. Approved LinkedIn: https://www.linkedin.com/in/yunlin-ntu/ . Résumé/email are deliberately not linked until provided.

## Collaborate across agents / sessions

The repository, not a ChatGPT session, is the shared source of truth. Start with `AGENTS.md`, `docs/PRODUCT.md`, `docs/STATUS.md`, `docs/DECISIONS.md`, then the specific GitHub Issue / PR. For future work create a small feature branch from the currently released `main`, validate, then open a PR. Never bypass the reviewed release flow for changes to the public website.

Project specs: [YUN CODEX](docs/yun-codex-spec-v1.md), [gameplay acceptance](docs/minigame-rewards-v031.md), [future UI review and comparison](docs/roadmap-ui-experiment.md).

## Privacy and assets

No sign-in, backend, analytics or local tracking server. Game and language progress is stored in the visitor's own browser. Illustrations use original CSS pixel art rather than copied sprites from commercial games. Avoid publishing confidential customer details or unsupported career claims. Fonts may be requested from Google Fonts.
