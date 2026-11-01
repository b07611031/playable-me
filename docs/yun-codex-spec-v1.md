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

## UX revision — unlock preview and locked-character routing (2026-11-01)

### Game completion → quick reveal → Station stories
- A successful mini-game keeps its existing victory action, but this action now opens a **compact character appearance preview**, **not the full YUN CODEX**.
- The preview shows only already-unlocked original sprites and character names; no résumé evidence, narrative details, or full story content.
- Primary action: **「我了解了，返回探索故事」 / “GOT IT — BACK TO STORIES”**.
- Confirming closes the preview and returns directly to the **same Station** (AI Lab, Quest Field, or Game Room), where the stories can be read in their original context.
- The full YUN CODEX is available anytime via the global header, Station link or mobile navigation.
- Previously unlocked characters in the current Station are shown together to avoid a misleading one-off award; no locked character's identity is revealed.
- A normal mini-game Close/Skip still returns to the Station without forcing the preview.

### Locked role → confirm Station → enter Station
- Clicking an undiscovered character in the full YUN CODEX opens a confirmation instead of a dead-end unlock hint.
- Show the dark silhouette and question mark, an unlock hint, and the **destination Station name**, but hide character identity and résumé story until unlocked.
- Offer two explicit actions: **Not now** (remain in Codex) or **Go to [Station]** (navigate directly).
- Group → Station mapping: Builder → AI Lab; Learner → Quest Field; Gamer → Game Room.
- No game or achievement unlock is granted by navigation itself. The existing story shortcut remains available for busy visitors.

### Interaction acceptance
- In all three worlds, victory → see unlocked character appearance → acknowledge → Station (no intermediate map or Codex navigation required).
- For each category, clicking locked character → cancel stays in Codex; confirming enters correct Station.
- Full Codex already-unlocked character detail continues to provide its original story link.
- Regression automation exercises AI Lab 22-tap completion and all three Station routing flows on Chromium in desktop and mobile viewports.
