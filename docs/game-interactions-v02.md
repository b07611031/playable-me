# Playable Me v0.2 — Game Interactions (Phase 1)

This iteration deliberately **does not redesign the main UI**. Its aim is to improve exploration mechanics while preserving v0.1 as the baseline for later UI Skills review.

## Implemented

1. **Scene objects become clickable**: 3 accessible objects per location (AI Lab / Quest Field / Game Room), with keyboard focus, touch hit targets, hint labels, and discovered-state appearance. All objects open the same existing bilingual stories; the original story list remains a fallback.
2. **Meaningful progress**: merely opening a dialog no longer unlocks a badge. Each story is marked complete only after reaching its final page. A location badge unlocks after all three stories are completed. Existing `pm-opened` local progress is preserved for returning MVP visitors.
3. **Optional spaceship micro-quest**: in Game Room, players can move their ship left/right (touch buttons or Arrow/A/D keyboard keys), see incoming meteors one second before impact, survive 10 waves with 3 HP, and retry or skip at any time. Winning adds an optional on-screen quest-cleared mark; it does not gate the story, professional links, or main achievement count.
4. **Accessibility & convenience**: interactive objects are native buttons with descriptive accessible names; the mini-game includes labels and a Skip/Back button; reduced-motion preference disables the hotspot animations.
5. **Confirmed LinkedIn**: retained from v0.1 follow-up (https://www.linkedin.com/in/yunlin-ntu/).

## Comparison checkpoints

- **A — initial MVP:** `22b246621fb5678887c72b6bed7d2ae6e5d84f63` (before LinkedIn; original UI mechanics).
- **B — game interaction version:** current `feat/game-interactions` branch (based on the approved v0.1 follow-up branch).
- **C — future UI version:** not built. Taste-Skill and Impact-Cable still unverified/not installed; don't apply until after the interaction iteration is evaluated.

## Suggested manual acceptance tests

- [ ] Click each of the 9 objects directly in its scene; all should open their matching story.
- [ ] Close a story early: the item should **not** be counted complete.
- [ ] Finish all pages of a story: its progress indicator should update.
- [ ] Finish 3 stories in one zone: earn that zone's badge. Finish 3 zones: reach ending.
- [ ] Open mini-game on mobile; left/right controls work, impacts happen after meteor warning, retry and skip work.
- [ ] On desktop, use Tab/Enter to open objects and Arrow/A/D to move spaceship.
- [ ] Verify at 390×844 and 1440×900, both English and Traditional Chinese.
- [ ] Check Resume/LinkedIn/GitHub access without any game progression.
- [ ] Confirm screen reader descriptions and prefers-reduced-motion handling.
- [ ] Compare first object discovery time and 3-trait recall after 60–90 seconds between A and B.

## Follow-on issues for later

- Optional lightweight non-arcade interactions in AI Lab and Quest Field (small decisions rather than elaborate quizzes).
- Sound toggle with explicit opt-in; not in v0.2.
- UI review and before/after screenshots **after** interaction changes are accepted.

## Technical note

The browser stores completed story IDs in `localStorage:pm-opened`; the mini-game's clearance is session-only. No game data is sent to a backend. Built with React, TypeScript, and CSS — no additional packages.
