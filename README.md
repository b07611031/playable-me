# Playable Me — The Story of Yun

> **Started with Games. Built with AI. Always Learning.**

A mobile-first, original pixel-RPG-style interactive portfolio for recruiting and professional networking. No sign-in, no joystick, no backend.

## Play the MVP

- Welcome screen with English / Traditional Chinese switch
- Choose from three places on the pixel world map: **AI Lab**, **Quest Field**, **Game Room**
- Open three story objects in each zone to earn a badge
- All three badges unlock the ending screen; professional links remain accessible at all times
- Story progress and preferred language are stored **only in the visitor's browser** via localStorage
- Keyboard navigation uses Tab / Enter and Escape to close dialogs. Reduced-motion preferences are respected.

## Develop locally

Requires Node.js 22+.

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deploy to GitHub Pages

The Vite base path is set to `/playable-me/`. After merging the feature PR, enable GitHub Pages with a GitHub Actions deployment workflow or deploy `dist/` via a Pages-capable static host. **This repository has a CI build workflow, but does not automatically publish the website.** If hosting at a custom-domain root, update `base` in `vite.config.ts` to `/`.

## Before public launch

1. Review every story for accuracy and confidentiality. Project descriptions are intentionally high-level; do not publish private customer details or company data.
2. LinkedIn is now linked at https://www.linkedin.com/in/yunlin-ntu/ . Add an approved **resume and email** if desired; keep unconfigured links visibly unavailable.
3. Test mobile Safari, Android Chrome and desktop layouts (320px, 375px, desktop). Verify touch, keyboard and reduced-motion behavior.
4. After verifying HTTPS hosting, generate a QR code pointing at the final URL. Do not distribute the QR code before checking its destination.
5. Gather feedback from 3–5 people: can they recall **Fast Learner**, **AI Builder** and **Passionate Gamer** after a 60–90 second exploration?

## Project structure

- `src/App.tsx` — content model, scenes, navigation, bilingual text, badges and dialogs
- `src/style.css` — original CSS pixel-art scenes and responsive UI
- `src/main.tsx` — React entrypoint
- `vite.config.ts` — static hosting base path
- `.github/workflows/ci.yml` — GitHub Actions build checks

## Privacy and rights

No analytics, tracking cookies or backend. Progress is local. The CSS-based scenes and character are original code, not copied from commercial games. Icons are provided by lucide-react. Fonts are loaded from Google Fonts; consider self-hosting fonts if external font requests are undesirable.

## Next iteration: interactions first, visual polish second

See [the versioned interaction roadmap, saved UI Skill references, and A/B/C comparison plan](docs/roadmap-ui-experiment.md). The named Taste-Skill and Impact-Cable projects have not yet been independently verified or installed. The user-approved MVP remains the comparison baseline.
