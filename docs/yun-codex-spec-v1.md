# YUN CODEX — 9-role character gallery (v1.0)

## Objective / audience

A playful, mobile-first interactive introduction for **recruiting and professional networking**, including candidates evaluating fit with Garena MAP. Visitors should retain **(1) fast learning, (2) applied AI engineering, and (3) lasting interest in games** without reading a second full résumé.

The nine costumes are **story viewpoints**, not nine literal job titles or independently verified credentials. Each unlock links to a real story in the existing app. Public-facing text is intentionally concise and avoids confidential client details and unverified technical or commercial outcomes.

### Grounding

- Current on-repo story content: `src/App.tsx` (nine existing story IDs).
- Personal background previously supplied during the interview-preparation project: Plantman master's research; SAM2 optimization; manufacturing AI implementation; PADI/AIDA/lifesaving; Sanda/fencing/boxing; Camino; high-school spaceship game; LOL Pyke; CS2 with friends.
- The user-uploaded résumé section supports interests/gaming/activities, not every engineering claim. Verify precise résumé items and project disclosures before public release.
- [Sea 2027 Global MAP Garena official posting](https://career.sea.com/position/J02173157) emphasizes **Passion for Games**, **Sharp Thinking**, **Drive & Resilience**, familiar gameplay/player behavior, AI-to-practical-solutions, and communication.
- [Sea MAP FAQ](https://seagmap.sea.com/faq) emphasizes holistic development, leadership potential, adaptability, teamwork and making a difference with technology.
- These are *design alignments*, not an assertion of hiring panel judgment or an endorsement by Garena.

## Categories and narrative arc

| Group | Character | Linked story | Narrative focus | Unlock |
|---|---|---|---|---|
| THE BUILDER | Student Yun | `plantman` | Curiosity / user-centered AI research | AI Lab 5 taps |
| THE BUILDER | Researcher Yun | `sam` | Resource constraints / optimization | AI Lab 12 taps |
| THE BUILDER | Engineer Yun | `workflow` | Frontline need → usable implementation | AI Lab 22 taps |
| THE LEARNER | Diver Yun | `water` | Preparation / safety / adaptation | Ocean mask pickup |
| THE LEARNER | Boxer Yun | `arena` | Practice / feedback / resilience | Ocean gloves pickup |
| THE LEARNER | Explorer Yun | `camino` | Persistence / pacing / exploration | Ocean boots pickup |
| THE GAMER | Pilot Yun | `spaceship` | Coding journey began with games | Dodge 2 meteors |
| THE GAMER | Shadow Support Yun | `pyke` | Roaming, vision and creating team opportunity | Dodge 5 meteors |
| THE GAMER | Tactical Yun | `cs` | Multiplayer social experience / player perspective | Survive full spaceship game |

**Game Room note:** The three-role thresholds are **gameplay progression mechanics**, not a claim that playing a spaceship game demonstrates ability in LOL/CS2. The unlock *reveals* a true existing story about each persona. This avoids inventing achievements.

**IP note:** Shadow Support is inspired by Yun's preferred support *playstyle*, not a reproduction of the copyrighted League of Legends character Pyke. Tactical Yun is a generic original tactical-game sprite, not a CS2 asset. The names of games may be used in text to describe genuine player experience.

## UI / information architecture

- Global **YUN CODEX** entry in header, mobile navigation, and each world's page. Always accessible.
- Categories: THE BUILDER, THE LEARNER, THE GAMER; filter tabs ALL / BUILDER / LEARNER / GAMER; each category has 3 role cards and completion count.
- Locked: black silhouette, central `?`, name hidden as `???`; click gives only an unlock hint.
- Unlocked: original CSS pixel-art costume, name, tagline; click shows a short bilingual narrative, real-world evidence, learned skill, and an action to read the existing full story.
- Three category arcs: **research → engineering → real use**, **explore → practice → grow**, **play → create → understand players**.
- Complete collection is 9/9; the old 3-badge story-reading progression stays separate.
- After a successful mini-game, **Success! View Achievements** opens the relevant category in YUN CODEX. Exit / Skip still closes the mini-game normally.
- No UI-skill restyling at this stage. Main world screen and game appearance remain as the accepted v0.3.x baseline.

## State & migration

- `pm-outfits` — existing 0-based Ocean outfit array (preserved).
- `pm-lab-tier` — 0..3, new persistent AI Lab milestone.
- `pm-game-tier` — 0..3, new persistent spaceship milestone.
- `pm-opened` — existing read-story IDs, independent of character unlock.
- Old users who already unlocked Ocean outfits keep them. Earlier AI/game play cannot be retroactively reconstructed because previous versions did not persist those exact milestones.
- A new progress display is derived from the three gameplay channels; opening stories, using Read All Stories, or navigating to a linked source does not award costumes.
- Restart Journey resets local progress for the current visitor.

## Acceptance checks

1. Each of 9 roles has bilingual title, class, skill, story narrative, evidence, takeaway, corresponding existing story ID, and correct unlock.
2. All nine cards initially appear locked; a category's three cards unlock solely from its assigned mini-game progression.
3. Dark silhouettes and centered question marks hide names and costume details until acquired.
4. Before unlocking: hints don't reveal the identity; after unlocking: detail includes a link to the right original story.
5. SpaceQuest awards tiers at 2 dodges, 5 dodges, and victory. Awards survive a page reload.
6. AI Lab 5/12/22 and Ocean mask/gloves/boots remain correct and survive reload; a skip-to-stories action does not unlock characters.
7. End screen / headers / mobile navigation always let visitors reach the gallery and professional links.
8. TypeScript, Vite, maze solvability test, and codex metadata test pass.
9. Manual testing: phone/tablet/desktop, English and Chinese, keyboard/touch, 320–390px viewport, dialog scroll and contrast.

## Future UI skill comparison

Freeze this iteration as the gameplay and nine-character content baseline before running any Taste-Skill / Impact-Cable style auditing. The exact skill identity, license and repository URLs still require verification. Capture matching screenshots from the previous baseline and this build before any visual replacement.
