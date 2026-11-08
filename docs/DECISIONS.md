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
| Public career details remain high-level and non-confidential | earlier | A site shared by QR code is public; avoid confidential customer, infrastructure, employee, client or unapproved project details. |
