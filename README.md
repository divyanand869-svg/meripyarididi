# For Her Birthday — A Friendship Archive

A handcrafted, cinematic birthday website built with Next.js, TypeScript,
Tailwind, Framer Motion, GSAP, and Lenis smooth scroll.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Required media files (add these before deploying)

Place your files in these exact locations:

```
public/images/portrait.jpg       — individual portrait photo (any orientation)
public/images/group.jpg          — group photo (any orientation)
public/screenshots/chat-01.jpg   — conversation screenshot 1
public/screenshots/chat-02.jpg   — conversation screenshot 2
public/screenshots/chat-03.jpg   — conversation screenshot 3
public/screenshots/chat-04.jpg   — conversation screenshot 4
public/screenshots/chat-05.jpg   — conversation screenshot 5
public/screenshots/chat-06.jpg   — conversation screenshot 6
public/audio/theme.mp3           — background music track
```

Images are displayed using `AdaptiveFrame`, which detects portrait vs.
landscape orientation automatically and uses `object-fit: contain` inside a
matching frame — so no face or important content is ever cropped. Just drop
in your files with the exact filenames above (any reasonable resolution,
.jpg/.png both work — update the extension in the component if needed).

## Customizing content

Each section is its own component in `/components`:

- `Hero.tsx` — name, title, role words
- `Resume.tsx` — achievement cards
- `Timeline.tsx` — timeline entries (edit the `events` array; add more anytime)
- `Observations.tsx` — "Things I Learned About You" (18 entries)
- `RoastArchive.tsx` — 20 roast/evidence cards
- `ChatArchive.tsx` — screenshot gallery + captions
- `OpenWhen.tsx` — envelope messages
- `AchievementWall.tsx` — museum exhibit wall + group photo
- `MemoryVault.tsx` — password-protected section (change `PASSCODE` constant;
  this is a client-side atmosphere lock, not real security)
- `TheLetter.tsx` — the main letter (1200–1800 words)
- `FuturePredictions.tsx` — prediction cards
- `FinalSection.tsx` — closing screen

## Notes

- Music never autoplays — it unlocks after the first click/keypress anywhere
  on the page (per the intro screen's "click anywhere to begin").
- The custom cursor (gold dot + ring + ripple + particle trail) is desktop
  only; mobile falls back to the native cursor automatically.
- Reduced-motion preferences are respected globally.
- Deploy to Vercel: `vercel deploy` from the project root, or connect the repo
  in the Vercel dashboard.
