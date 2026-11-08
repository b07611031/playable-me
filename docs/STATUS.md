# Playable Me — Current Project Status

**Updated:** 2026-11-08
**Product:** public mobile-first interactive personal portfolio for Yun Lin
**Priority:** P0 and P1 completed → P2 QR / <10 trial postcards and P3 scoped UX refinement.

## Releases and live status

- Repository: https://github.com/b07611031/playable-me
- **P0 COMPLETE:** v0.4.0 release PR [#6](https://github.com/b07611031/playable-me/pull/6) was squash-merged into `main`; release SHA: `e51c8046c666580b75451e7f74661fdb306e9536`.
- Includes three Stations, three mini-games, nine-role YUN CODEX, achievement preview returning to Station, bilingual text, GitHub/LinkedIn and browser smoke tests.
- **P1 COMPLETE:** [GitHub Pages successful deployment](https://github.com/b07611031/playable-me/actions/runs/42492540289) has **build** and **deploy** jobs both completed successfully. Site availability is also confirmed by the owner. The initial unsuccessful workflow remains in history as a resolved setup issue.
- **Resolved:** [Issue #7 — Enable GitHub Pages source](https://github.com/b07611031/playable-me/issues/7) is closed after the successful Pages deployment.
- Published free-site URL: `https://b07611031.github.io/playable-me/` (owner confirmed P1 complete; deploy workflow succeeded). Test QR scanning on real devices before printing.
- Release workflow: `.github/workflows/deploy.yml` triggers on main; CI: `.github/workflows/ci.yml`.

## Workstreams

| Priority | Task | Status / evidence |
|---|---|---|
| P0 | Stable v0.4 mainline release | **Complete**, PR #6 merged |
| P1 | Free github.io HTTPS site | **Complete**, Actions run #42492540289, Issue #7 closed |
| P2 | QR / physical postcard experiment | Not started; **fewer than 10 cards**, after verified public URL |
| P3 | Game / UX enhancements | [Issue #8](https://github.com/b07611031/playable-me/issues/8): Station story-first UX, feature branch `feat/station-story-first-ux`, awaiting PR review |
| P4 | UI skill survey + before/after | Later; Taste-Skill / Impact-Cable exact tools unverified |

## Active principles

- Repository and GitHub Issues/PRs are the cross-session record; read `AGENTS.md`, `docs/PRODUCT.md`, `docs/DECISIONS.md`, and `docs/DEPLOYMENT.md` before changes.
- Public product; do not add private employer/client/internal data or unknown personal links.
- Stories and professional links remain accessible without finishing mini-games.
- Public deployment was confirmed by the user and GitHub Pages success; future releases still require successful deploy checks and real-device acceptance.
- The old Draft PRs #1–#5 are development history; **start new features from main**, not those stacked branches.
