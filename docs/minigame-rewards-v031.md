# Playable Me — Mini-game Rewards & Success UX (v0.3.1)

## Goals

Adjust existing mini-games according to playtest feedback, without applying the deferred visual UI skill redesign.

### AI Power-Up Lab
- 12 seconds is a **maximum time**, not required elapsed time.
- Tapping to the highest goal **22** immediately ends the run as a success.
- Milestones now show their actual unlock contents rather than only tap counts:
  - **5 taps → Plantman**
  - **12 taps → Long-video tracking**
  - **22 taps → SOP Annotator** (current third story is the manufacturing AI workflow story; verify whether its public-facing title should be adjusted).
- Successful runs show **Success! View Achievements** / **成功！查看解鎖成果**, not **Retry**.
- Incomplete runs at the time limit retain a replay option.

### Ocean Maze
- The level is **not random**. It uses a static, hard-coded **11-column × 9-row** maze, with fixed starting positions for Yun, shark, and each collectible.
- Shark pursuit is deterministic BFS shortest-path, moving one tile every two player moves.
- The three pickups are now **dive mask, boxing gloves, explorer shoes**, rather than pearls.
- Yun's maze avatar switches to the most recently collected themed outfit.
- Each item independently unlocks a named character in **THE LEARNER** gallery: **Diver Yun**, **Boxer Yun**, **Explorer Yun**.
- Before obtaining the item, the gallery shows a **dark silhouette with a question mark**, not the actual costume.
- Collected outfits persist in the browser using `localStorage:pm-outfits`, **independent of reading the three stories**, and survive game loss.
- Winning the maze shows **Success! View Achievements** and closes to THE LEARNER gallery, not a retry prompt. Losing all lives still offers Retry.
- A regression script `npm run test:maze` examines the hard-coded map and searches the state space under the same pursuit, movement and life rules for a winning route. CI runs it before building.

### Spaceship Dodge
- Keep existing falling-meteor gameplay unchanged.
- After victory, show **Success! View Achievements** instead of replay. Replay is only prominent after failure.

## Accessibility / recruitment constraint

All stories and professional links remain accessible without beating mini-games. Unlocking a character is an optional game achievement, not a requirement for viewing the portfolio. Clicking **Read all stories instead** never falsely awards a character outfit.

## Later visual work

The avatar uses the current CSS pixel-art character, with accessory overlays and themed colors as an interim representation. Polished full-size sprite artwork and comparison screenshots are intentionally reserved for the future UI redesign phase.

## Manual QA

- [ ] AI tapper immediately stops at 22 taps, displays victory CTA, and records all 3 named project milestones.
- [ ] AI tapper times out at 12 seconds below 22; Retry shown only for non-success.
- [ ] Ocean game has stable layout on reload and can still be won. Run `npm run test:maze`.
- [ ] Collect only one item and exit: that costume is revealed in THE LEARNER; the other two remain dark silhouettes and ?.
- [ ] Re-enter after reload: collected costumes are preserved but game run resets.
- [ ] Pickups change Yun's avatar on the maze board and do not mistakenly award other characters.
- [ ] Victory shows Success! View Achievements, closes to THE LEARNER, and no Retry button.
- [ ] Spaceship victory shows Success! View Achievements; failure still offers Retry.
- [ ] Verify EN/Traditional Chinese, mouse, mobile touch, keyboard navigation and no blocked professional links.
