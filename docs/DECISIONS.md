# Playable Me — Architecture / product decisions

Keep entries concise; append when a decision materially changes shipping, product goals or collaboration.

| Decision | Date | Why / tradeoff |
|---|---|---|
| Host first on free GitHub Pages with Vite | 2026-11-08 | Fast to publish, no recurring hosting bill, appropriate for static React. URL shape: `https://b07611031.github.io/playable-me/`. Custom domain can be considered in v2 or later. |
| First printed postcard batch fewer than 10 | 2026-11-08 | Cheap physical experiment before committing to permanent branding; verify QR on several phones before printing. |
| Publish `main` through Actions only | 2026-11-08 | Feature PRs and local work may be unstable. Production should reflect reviewed commits, not every development branch. |
| Repository files and Issues are the cross-session source of truth | 2026-11-08 | Chat context can become long/incomplete. New agents can read `AGENTS.md`, `docs/PRODUCT.md`, `docs/STATUS.md`, current Issue and PR. |
| Use original retro pixel RPG characters | earlier | Express Yun's interests without copying game IP. |
| Distinguish game reward / story completion | earlier | Playful collection should not gate access to actual portfolio content. |
| Fixed Ocean Maze and solvability regression test | earlier | Avoid accidental unplayable levels; randomness would require procedural validation. |
| Gameplay first, aesthetic skill-based UI polish later | earlier | Controlled before/after comparison; Taste-Skill and Impact-Cable are **unverified candidates**, not installed facts. |
| Stories readable by default; mini-games unlock characters only | 2026-11-17 | Owner decision O2 in `docs/OPTIMIZATION_PLAN.md`. Removes the default "STORIES ARE LOCKED" state and the reload bug G1. Supersedes the story-card unlock behaviour in `docs/minigame-rewards-v031.md` once G4 ships. |
| Third-party agent skills allowed, pinned to scanned commits | 2026-11-17 | Owner decision O4. Use only the skills and commits in `docs/TASKS.md` §3 (SkillSpector-scanned 2026-11-16). `impeccable`: manual copy, no hooks, `DO_NOT_TRACK=1`; owner accepts its engine binary download. Replaces the "unverified candidates" note above. |
| Land PR #9 and #11 before optimization work | 2026-11-17 | Owner decision O8. They already cover part of G7/G8 and touch the same code as Wave 0; re-verify the plan after they merge. |
| Public career details remain high-level and non-confidential | earlier | A site shared by QR code is public; avoid confidential customer, infrastructure, employee, client or unapproved project details. |
| Guide readers from gameplay into corresponding character stories | 2026-11-08 | The gallery and Station stories felt disconnected. Show character + linked story together and make a guided tour the primary reward action; always allow skipping so portfolio links and reading remain accessible. |
