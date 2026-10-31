# Playable Me — Three-World Mini-Games (Gameplay v0.3)

## Scope and user feedback

The existing v0.2 SpaceQuest showed a meteor lane change but no visible downward travel, so players couldn't visually tell whether they had dodged it. The user requested a visibly scrolling vertical dodge game and game-first interaction in Game Room. They also proposed a Pac-Man-like maze with Yun avoiding a shark in Quest Field and a timed clicking challenge unlocking more content in AI Lab.

## Implemented

### 1. Game Room — Spaceship Dodge

- Meteors visibly descend from above over ~2.1 seconds rather than teleport between top and bottom.
- A dashed impact line indicates the danger zone. Success can be observed as the meteor continues past the ship in a different lane.
- HUD: HP (3), DODGED count, waves (10). Left/right keyboard and touch controls.
- **Three story cards are hidden on entering Game Room**. Once the visitor explicitly starts the game, the cards are shown. Winning is optional.
- Clear skip-to-stories option for accessibility, busy recruiters or users who prefer reading.

### 2. Quest Field — Yun's Ocean Maze

- Original tile-maze chasing game evoking classic arcade maze gameplay. No proprietary Pac-Man characters, sprites, level designs or sounds are used.
- Player: Yun 🧑🏻. Pursuer: shark 🦈. Objective: collect three pearls 🫧.
- Each two player steps, shark moves one tile toward Yun through the maze using shortest path.
- HP 3, move via arrow/WASD keys or touch pad; retry and skip.
- Quest Field story cards are revealed on starting a game, not gated on winning.

### 3. AI Lab — Power-Up Clicker

- A 12-second tap game, with 5/12/22 taps unlocking 1/2/3 story cards.
- Tiers accumulate within the current visit so replay cannot regress access.
- A clear "Read all stories instead" button bypasses timing/physical ability barriers.
- No game outcome restricts resume, GitHub or LinkedIn.

## Notes and limitations

- This is **gameplay development**, not the deferred UI redesign; Taste-Skill and Impact-Cable remain unverified and unapplied.
- The optional mini-game completion state is session-only; existing local story completion remains browser-local.
- Original graphic style remains emoji/CSS pixel-art. Final asset polish comes later.
- CI `npm run build` checks TypeScript/Vite but not interactive browser behavior.
- The maze is *inspired by* classic tile-chase mechanics. Avoid using official Pac-Man branding or copyrighted graphics in public assets.

## Manual QA checklist

- [ ] Game Room first entry: no story cards until Start or Read All Stories shortcut.
- [ ] Meteor descends smoothly; dodge changes DODGED score, collisions reduce HP, retry resets all state.
- [ ] On mobile, spaceship buttons and tap interactions register without page scrolling.
- [ ] Ocean maze is solvable; Yun moves, shark advances each second move, pearls count, collisions remove HP, retry works.
- [ ] Keyboard arrows/WASD function in both games; Escape/close does not leak event listeners.
- [ ] AI Lab timer counts down 12 seconds; unlocks exactly at 5/12/22 taps and tier persists across replay.
- [ ] AI Lab story objects/cards only appear up to unlocked tier, unless Read All Stories was chosen.
- [ ] All three locations allow non-playing visitors to get the same professional information.
- [ ] Story dialogs must be read to the end before global badge counts increment.
- [ ] English and Traditional Chinese text and mobile 390×844 / desktop 1440×900 layout verified manually.
- [ ] Capture comparable screenshots and recordings of MVP, v0.2 and this build before any UI polish.

## Planned follow-up

After validating gameplay, freeze this as baseline B. Then verify the exact GitHub identities, licenses and permissions of Taste-Skill and Impact-Cable; apply any approved UI optimization to separate branch C and record controlled before/after evidence.
