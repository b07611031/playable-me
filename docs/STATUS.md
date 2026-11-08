# Playable Me — Current Project Status

**Updated:** 2026-11-08
**Product:** public mobile-first interactive personal portfolio for Yun Lin
**Priority:** P0 completed → P1 blocked by one-time GitHub Pages setting → P2 QR / <10 trial postcards.

## Releases and live status

- Repository: https://github.com/b07611031/playable-me
- **P0 COMPLETE:** v0.4.0 release PR [#6](https://github.com/b07611031/playable-me/pull/6) was squash-merged into `main`; release SHA: `e51c8046c666580b75451e7f74661fdb306e9536`.
- Includes three Stations, three mini-games, nine-role YUN CODEX, achievement preview returning to Station, bilingual text, GitHub/LinkedIn and browser smoke tests.
- **P1 NOT YET LIVE:** [initial deploy run](https://github.com/b07611031/playable-me/actions/runs/42488073004) passed build + production path validation but failed at `actions/configure-pages@v5` because the repository's Pages site is not enabled (`Not Found`). `deploy` was skipped.
- **Owner action:** [Issue #7 — Enable GitHub Pages source](https://github.com/b07611031/playable-me/issues/7). Go to [Settings → Pages](https://github.com/b07611031/playable-me/settings/pages), select **Source: GitHub Actions**, then re-run the latest `Deploy Playable Me to GitHub Pages` workflow on main.
- Expected website URL (still **unverified**, do not encode QR before verifying): `https://b07611031.github.io/playable-me/`.
- Release workflow: `.github/workflows/deploy.yml` triggers on main; CI: `.github/workflows/ci.yml`.

## Workstreams

| Priority | Task | Status / evidence |
|---|---|---|
| P0 | Stable v0.4 mainline release | **Complete**, PR #6 merged |
| P1 | Free github.io HTTPS site | **Blocked by owner Pages setting**, Issue #7 |
| P2 | QR / physical postcard experiment | Not started; **fewer than 10 cards**, after verified public URL |
| P3 | Game / UX enhancements | Independent PRs from `main` after baseline |
| P4 | UI skill survey + before/after | Later; Taste-Skill / Impact-Cable exact tools unverified |

## Active principles

- Repository and GitHub Issues/PRs are the cross-session record; read `AGENTS.md`, `docs/PRODUCT.md`, `docs/DECISIONS.md`, and `docs/DEPLOYMENT.md` before changes.
- Public product; do not add private employer/client/internal data or unknown personal links.
- Stories and professional links remain accessible without finishing mini-games.
- Do not describe an unverified URL as publicly live. Production success needs Pages deploy and an unauthenticated browser check.
- The old Draft PRs #1–#5 are development history; **start new features from main**, not those stacked branches.
