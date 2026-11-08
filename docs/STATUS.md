# Playable Me — Current Project Status

**Updated:** 2026-11-08
**Project:** public, interactive personal portfolio for Yun Lin
**Current shipping goal:** P0 (integrate release) → P1 (free GitHub Pages live URL)
**Next goal:** QR-code verification and <10 prototype postcards, then independent gameplay/UX optimization.

## Current source and releases

- Repository: https://github.com/b07611031/playable-me
- Previous development handoff: PR #5 / `feat/yun-codex-nine-roles`; this includes three mini-games, nine-role gallery, Windows path fix, browser tests, and Station-return unlock preview.
- Release candidate: `release/v0.4.0-pages`, derived from the latest PR #5 head.
- Release status: **candidate under verification; publication not yet proven**.
- Expected free GitHub Pages URL: `https://b07611031.github.io/playable-me/`; verify before printing.
- Main deployment trigger: `.github/workflows/deploy.yml` after merge.

## Workstreams

| Priority | Track | Delivery / criteria | Status |
|---|---|---|---|
| P0 | Stable v0.4 release | Merge verified candidate into `main` and keep core stories and gameplay intact | In progress |
| P1 | Free website | GitHub Actions Pages deployment succeeds; HTTPS browser verification | In progress; may require owner settings |
| P2 | QR / first postcards | Test QR on multiple phones; print <10 only after URL accepted | Not started |
| P3 | UX / character improvements | Issues and PRs from updated main, no disruption to public release | Later |
| P4 | UI Skills and controlled A/B | Verify Taste-Skill and Impact-Cable projects, make before/after comparison | Later |

## Critical risks and constraints

- Publishing requires setting GitHub Pages **Source → GitHub Actions** once in repository settings; coding connector may not change this.
- The project is public. Avoid confidential engineering details or unapproved customer information.
- A 404 or unconfigured Pages endpoint must not be described as a live deployment.
- Resume and email links are unconfigured; LinkedIn link is approved.
- Public QR and postcards should be made **after** verified site launch, not from the predicted URL alone.

## New session entry point

Read `AGENTS.md`, `docs/PRODUCT.md`, `docs/DECISIONS.md`, this document, latest open release PR / GitHub Actions run, and current Issue before writing code. Update STATUS when finishing a milestone. Keep this file short and factual; GitHub Issues track task-level details.
