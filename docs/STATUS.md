# Playable Me — Current Project Status

**Updated:** 2026-11-17
**Product:** public mobile-first interactive personal portfolio for Yun Lin
**Priority:** P0 and P1 completed → P2 QR / <10 trial postcards and P3 scoped UX refinement.

## Releases and live status

- Repository: https://github.com/b07611031/playable-me
- **P0 COMPLETE:** v0.4.0 release PR [#6](https://github.com/b07611031/playable-me/pull/6) was squash-merged into `main`; release SHA: `e51c8046c666580b75451e7f74661fdb306e9536`.
- Includes three Stations, three mini-games, nine-role YUN CODEX, achievement preview returning to Station, bilingual text, GitHub/LinkedIn and browser smoke tests.
- **P1 COMPLETE:** [GitHub Pages successful deployment](https://github.com/b07611031/playable-me/actions/runs/42492540289) has **build** and **deploy** jobs both completed successfully. Site availability is also confirmed by the owner. The initial unsuccessful workflow remains in history as a resolved setup issue.
- **Resolved:** [Issue #7 — Enable GitHub Pages source](https://github.com/b07611031/playable-me/issues/7) is closed after the successful Pages deployment.
- Published free-site URL: `https://b07611031.github.io/playable-me/` (owner confirmed P1 complete; deploy workflow succeeded). Test QR scanning on real devices before printing.
- **Verified 2026-11-17 (T0.5):** latest Deploy run [44021884636](https://github.com/b07611031/playable-me/actions/runs/44021884636) (PR #11 merge, `0218ef9`): build + deploy succeeded. Opened `https://b07611031.github.io/playable-me/` in desktop Chrome (Windows): page renders, JS/CSS return 200 and match the local `0218ef9` build hashes, no console errors, World Map shows 3 Stations, Professional links dialog shows GitHub + LinkedIn. Not yet checked on a real phone (mobile Chrome / Safari) — do that before encoding the QR.
- Release workflow: `.github/workflows/deploy.yml` triggers on main; CI: `.github/workflows/ci.yml`.

## Workstreams

| Priority | Task | Status / evidence |
|---|---|---|
| P0 | Stable v0.4 mainline release | **Complete**, PR #6 merged |
| P1 | Free github.io HTTPS site | **Complete**, latest Deploy run #44021884636, desktop browser check 2026-11-17 (T0.5); real-phone check pending |
| P2 | QR / physical postcard experiment | Not started; **fewer than 10 cards**, after verified public URL |
| P3 | Game / UX enhancements | [PR #9](https://github.com/b07611031/playable-me/pull/9) (Station story-first, Issue #8) and [PR #11](https://github.com/b07611031/playable-me/pull/11) (character↔story guided tour, Issue #10) **merged 2026-11-17** |
| P3 | Architecture + game-design optimization backlog | **Ready to start.** Analysis in [`docs/OPTIMIZATION_PLAN.md`](OPTIMIZATION_PLAN.md); execution order, owner decisions and status in [`docs/TASKS.md`](TASKS.md). Step 0: #9 and #11 merged; plan re-verified (T0.4, see plan §0.1). Next: Wave 0 (G2, G3, G4). O2/O4/O8 decided 2026-11-17; O1, O3, O5–O7 open. |
| P4 | UI skill survey + before/after | Later (U1 in `docs/TASKS.md`). Skills verified and scanned: use `impeccable` + `frontend-design`; taste-skill not used. |

## Active principles

- Repository and GitHub Issues/PRs are the cross-session record; read `AGENTS.md`, `docs/PRODUCT.md`, `docs/DECISIONS.md`, and `docs/DEPLOYMENT.md` before changes.
- Public product; do not add private employer/client/internal data or unknown personal links.
- Stories and professional links remain accessible without finishing mini-games.
- Public deployment was confirmed by the user and GitHub Pages success; future releases still require successful deploy checks and real-device acceptance.
- The old Draft PRs #1–#5 are development history; **start new features from main**, not those stacked branches.

## Current UX acceptance / dependent changes

- Station UX refinement [PR #9](https://github.com/b07611031/playable-me/pull/9) and character-story guided journey [PR #11](https://github.com/b07611031/playable-me/pull/11) are merged into `main` (2026-11-17).
- New character-story guided journey: [Issue #10](https://github.com/b07611031/playable-me/issues/10), [spec](character-story-guided-ux-v042.md).
- After any earned character, guide to a named original story, with a clear opt-out. Story-reading and gameplay unlocking remain independent.
