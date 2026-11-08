# Playable Me — Product brief

## Vision

A short, playable, shareable introduction to **Yun Lin**: an AI/ML engineer whose interest in software began with building a 2D spaceship game in high school. Through research in agriculture, real-world AI deployment, sports and travel, Yun learned to turn unfamiliar problems into testable approaches. Playable Me communicates this story through original retro RPG-style exploration, not a conventional résumé screen.

**Audience:** recruiters/interviewers, including Garena / Sea Global MAP, professional contacts, people receiving a small-batch postcard or a shared URL.

**Experience promise:** scan a QR code or open a free URL; learn the essence in ~60–90 seconds; optionally play longer; immediately find professional links. No installation, account or mandatory game gate.

**One-line story:** Started with Games. Built with AI. Always Learning.

## Three pillars / Stations

| Station | Message | Evidence shown | Mini-game |
|---|---|---|---|
| AI Lab — THE BUILDER | Sharp thinking, making AI usable in real settings | Plantman tomato AI research; SAM2 long-video tracking under GPU constraints; human-centered manufacturing AI workflow | 12-second power-up clicker: 5, 12, 22 taps, ends early at 22 |
| Quest Field — THE LEARNER | Fast learning, feedback, resilience | diving/lifesaving; Sanda/fencing/boxing; Camino travel | Fixed 11×9 ocean maze: collect diving mask, gloves, boots while avoiding shark |
| Game Room — THE GAMER | Authentic game passion, teamwork, interest in players | first high-school spaceship game; League of Legends support playstyle; CS2 social play | Falling-meteor spaceship dodge: 2/5 dodges and victory unlock roles |

## YUN CODEX (9 original characters)

Builder: Student Yun / Researcher Yun / Engineer Yun.
Learner: Diver Yun / Boxer Yun / Explorer Yun.
Gamer: Pilot Yun / Shadow Support Yun / Tactical Yun.

Gameplay unlocks identities; finishing story dialogues separately counts as reading progress. Locked characters show a dark silhouette and question mark. Tapping a locked character offers a confirmation to travel to its Station. Successful mini-game opens **appearance-only unlock preview**; **Got it** returns to that same Station to view stories. Full Codex holds optional character detail and real-world evidence. Do not copy copyrighted game artwork.

## Functional requirements

- English and Traditional Chinese.
- Mobile-first, usable with touch + keyboard and screen readers where practical.
- Three Stations with stories that can be read without winning mini-games.
- Persistent browser-local progress, independent of account/device. Browser reset or private mode may clear state.
- Resume remains a visible not-yet-provided placeholder; approved LinkedIn: https://www.linkedin.com/in/yunlin-ntu/ ; approved GitHub: https://github.com/b07611031.
- No backend, user login, analytics or tracking by default; fonts currently use Google Fonts.
- Free `github.io` hosting first; a custom domain is deferred. Print **fewer than 10** trial postcards only after verifying QR and target URL.

## Success criteria

1. Public HTTPS URL loads in regular mobile Chrome and Safari.
2. A first-time visitor can identify who Yun is and access professional links in <=10 seconds (aspirational target; measure, don't assume).
3. 3–5 testers can recall Builder / Learner / Gamer themes after a short visit; note actual results.
4. Game interactions work but do not prevent information access.
5. Release and UX iterations have PRs, reproducible checks, version/date, and before/after comparisons.

## Current non-goals

Custom domain, printing a large postcard batch, high-fidelity sprite art, full joystick movement, a backend, complex game economy or scores, automatic marketing analytics, unverified Taste-Skill / Impact-Cable adoption.

See `docs/yun-codex-spec-v1.md` and `docs/roadmap-ui-experiment.md` for details.
