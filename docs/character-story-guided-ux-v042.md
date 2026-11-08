# Character → Story guided journey (UX v0.4.2)

## Why

Observed: after mini-game completion, the character reveal, the YUN CODEX collection and the existing text-only Station stories are disconnected. Visitors who care more about the visual unlock may never read the real experiences behind Yun's roles. In Quest Field, the original story array order (Camino, diving, arena) differed from Codex's role order (Diver, Boxer, Explorer).

Product objective: **the user should quickly discover which real story each playable character represents**. This creates a gently guided experience rather than a mandatory game or reading gate. This is especially important for a short recruiting/portfolio visit.

## Canonical role ↔ story mapping

| Station | Character | Story |
| --- | --- | --- |
| AI Lab | Student Yun | Plantman |
| AI Lab | Researcher Yun | Long-video tracking |
| AI Lab | Engineer Yun | Making ideas usable |
| Quest Field | Diver Yun | Underwater quests |
| Quest Field | Boxer Yun | Practice → competition |
| Quest Field | Explorer Yun | The long road |
| Game Room | Pilot Yun | It began with a game |
| Game Room | Shadow Support Yun | The support player |
| Game Room | Tactical Yun | Friends, games, stories |

Use the existing `src/characters.json` `storyId` mapping to derive ordering. Do not make another independently maintained hardcoded mapping.

## Guided visitor journey

1. Player finishes a mini-game (or reaches its available reward flow).
2. **Character Unlock Preview** includes portrait, name and the *exact story title* for each unlocked role.
3. Main button: **Read N character stories** / **開始閱讀 N 個角色故事**. When all unlocked stories have previously been read, main button becomes **Revisit Character Stories**.
4. Secondary: **Not now — Back to Station**. This does not lock the viewer out of professional links or content.
5. Choosing the main button opens a character-led narrative dialog, with sprite, name, linked story title and a guide progress indicator.
6. Finish the pages of the first story → button **Next Character** (no additional hunting), advancing to the next *unread unlocked* role. Finishing the last story → **Finish Story Tour** → return to Station story list.
7. At any point the user may **Skip Story Tour**, close the dialog, or use Escape. Progress counts only for completed story dialogues.
8. Station story cards use the same sprite + character name + associated story title; YUN CODEX unlocked cards show the title too, and link into the original dialogue. Locked roles remain mystery silhouettes with `???`, including for visitors using the read-all shortcut.
9. A returning visitor sees the same saved unlocks and read state. If no unread unlocked stories remain, guided tour can replay all available unlocked stories without changing the unlock state.
10. Keep professional links available from the header, and never require a game or guided tour for access.

## Technical design

- `src/CharacterUnlockPreview.tsx`: replace old "Got it" primary with story-first CTA, keep non-coercive secondary skip.
- `src/App.tsx`: derive `zoneStories` and `storyTitles` from the shared `roles` and existing `zones` data; start and track a guided story queue; preserve `pm-opened` distinct from `pm-lab-tier`, `pm-game-tier`, `pm-outfits`.
- `src/CharacterCodex.tsx`: label each unlocked character with the linked story title and have a named story-read action.
- `src/codex.css`: small original pixel portraits on Station story cards and story dialogs, reading tour controls responsive at mobile widths.
- `scripts/browser-smoke.mjs`: verify character/story association and full guided reading on 1440×900 desktop and 390×844 mobile. Keep existing maze and build checks.

## Acceptance

- [ ] 9 role-to-story associations resolve to exactly one corresponding story; no changed real-world facts or newly invented achievements.
- [ ] Character-to-story mapping is unmistakable on Station cards, Codex cards, victory preview, and narrative dialog.
- [ ] After AI Lab success, one primary CTA starts three unread stories in the expected order; finishing each moves to next character.
- [ ] A guided tour can be skipped, and linked professional information remains accessible; reading progress counts only stories finished.
- [ ] Quest Field order matches Diver / Boxer / Explorer even though preexisting data is stored in another order.
- [ ] Existing visitors' unlocks remain intact; already-read stories are not re-awarded nor double counted.
- [ ] Desktop/mobile Chromium checks pass. Manually test accessibility, reduced motion and narrative pacing before main merge.

## Dependencies / deployment

This feature branches from the **user-approved but unmerged** Station Story-First PR #9. Merge it after PR #9, not directly into main without rebasing. Public `github.io` stays on v0.4 until reviewed.
