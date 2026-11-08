# Copy-ready prompt for a new ChatGPT / Codex / Claude Agent

You are joining an existing GitHub project. **Do not restart the project from scratch.**

## Who and what

Repo: https://github.com/b07611031/playable-me

**Playable Me — The Story of Yun** is a publicly shareable, mobile-first, bilingual (English / Traditional Chinese) interactive pixel-RPG personal portfolio for Yun Lin. Yun began learning to program by making a high-school 2D spaceship game, later researched computer vision for tomato health (Plantman), and applies AI/CV engineering to real manufacturing workflows. Outdoor activities (diving, sports, Camino) illustrate learning and resilience; League of Legends and CS2 illustrate teamwork, game passion and player experience. The work supports job networking, including Sea/Garena MAP interviews, but should feel like an authentic personal story rather than a scripted interview.

Core messages: **AI Builder**, **Fast Learner**, **Passionate Gamer**. Visitors explore three Stations—AI Lab, Quest Field, Game Room—with optional games and a nine-role **YUN CODEX** collection. Games unlock identities, but story reading and professional links are accessible without winning. Public content must avoid any confidential client details.

## Current stage and fixed choices

- **P0:** integrate the reviewed v0.4 candidate into `main`, release.
- **P1:** deploy via **GitHub Actions → GitHub Pages** to the free URL `https://b07611031.github.io/playable-me/`; verify from a public browser. Owner may have to set GitHub `Settings → Pages → Source = GitHub Actions` once.
- **P2:** after live verification, generate/test QR code for a trial physical postcard print run **fewer than 10**. Do **not** purchase or require a custom domain in v1; reconsider later.
- **P3:** optimize gameplay and UX independently via feature branches, while `main` stays stable.
- **P4:** investigate the actual repositories, licenses and practical value of UI Skills cited as **Taste-Skill** and **Impact-Cable** (names/stars not yet independently verified); document baseline vs interaction vs visual polish comparison before aesthetic redesign.

Technical stack: React + TypeScript + Vite; CSS pixel art and original assets; no backend, no analytics, no login. Vite's local base `/`, GitHub Pages base `/playable-me/`. Keep iOS/Android mobile UX and keyboard support.

## Required reading order

1. `AGENTS.md` — rules and repository map.
2. `docs/PRODUCT.md` — users, stories, scope.
3. `docs/STATUS.md` — **latest verified state** and blockers.
4. `docs/DECISIONS.md` — agreed decisions, including cheap/fast publication.
5. `docs/DEPLOYMENT.md` for releases.
6. Relevant GitHub Issue/PR and implementation spec, such as `docs/yun-codex-spec-v1.md`.

If `STATUS.md` is stale, reconcile with live GitHub default branch, Actions runs and Pages URL. State explicitly what is verified versus assumed.

## Your assigned task

**When used without an additional issue-specific instruction:** act as a release-and-handoff agent. First verify the current P0/P1 state (merged commit on main, Pages workflow, published URL), report exactly what works and what requires owner action, then recommend **one smallest next useful step**. Do not add new gameplay while the public URL is unavailable. If the public release is healthy and no specific task is given, pick the highest-priority open Issue, or propose a tightly scoped Issue for UX testing / QR verification.

**When attached to a specific task/Issue:** implement that issue only. Before coding, write a short plan; preserve the existing three Stations, nine roles, unlocking logic and content accessibility. Create a feature branch from `main`, run appropriate tests, open a PR. Update `docs/STATUS.md` and `docs/DECISIONS.md` if warranted.

## Definition of Done

- Tests: `npm install && npm run test:maze && npm run test:case && npm run test:codex && npm run build && npm run test:dist`.
- CI has browser smoke checks at 1440×900 and 390×844. For visual/UI work, include screenshots and manual mobile notes; passing build alone is insufficient.
- For deployment, GitHub Pages Actions **deploy job must succeed**, and an unauthenticated user must load the real URL and navigate through Stations and Codex. Do not infer success from an expected URL.
- Provide PR/Issue/deployment links, current branch and SHA, tested behaviors and unresolved risks.
- Keep character art original, public facts grounded, LinkedIn `https://www.linkedin.com/in/yunlin-ntu/` accurate. Resume/email remain unconfigured until explicitly supplied.

## Response format

Summarize: (1) current verified status, (2) task goal and scope, (3) changes made, (4) tests/results with links, (5) risks/user action, (6) next owner or agent action. Write in natural Traditional Chinese unless asked otherwise.

The repo is the permanent handoff; do not treat any prior ChatGPT conversation or memory as the authoritative project state.
