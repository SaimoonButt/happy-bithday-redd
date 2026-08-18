# 🎂 Birthday Site

A little birthday page — wishes, confetti, and two deliberately annoying games.
React 19 + Vite + Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Make it theirs

Everything personal lives in **one file**: [src/birthday.config.js](src/birthday.config.js).

- `birthday.name` — the big headline
- `birthday.date` — the pill under the headline; set to `null` to hide it
- `birthday.from` — the signature at the bottom
- `wishes[]` — the cards; add or remove as many as you like, the grid adapts
- `tickerLines[]` — the scrolling red band under the hero

Nothing else needs editing.

## The games

| Game | How it works |
| --- | --- |
| **Catch the Gift** | The gift button flees your cursor (and teleports when tapped on mobile). It surrenders after 12 dodges so nobody is trapped forever. |
| **Candle Chaos** | Blow out every candle *at the same time* — they relight on their own timers. Each level adds a candle and shortens the relight window, up to 9. |

Both fire confetti when you win.

## Structure

```
src/
  birthday.config.js     ← all the personal content
  App.jsx                ← page composition
  components/
    Hero.jsx  Ticker.jsx  WishCard.jsx  Footer.jsx
    games/    RunawayGift.jsx  CandleChaos.jsx
    ui/       Button  Card  Badge  Section  Reveal
              Confetti  FloatingBalloons  GameShell
  hooks/useReducedMotion.js
  lib/cn.js
```

`components/ui/` is the reusable kit — every button, card, badge, section
heading and scroll reveal on the page comes from there, so restyling one
component restyles the whole site.

## Design notes

- **Palette** — red leads (`cherry-*`), warmed with cream and gold so it never
  reads as a wall of red. Mint and plum appear only as small accents.
  All tokens are defined in the `@theme` block of [src/index.css](src/index.css).
- **Responsive** — single column on phones, 2–3 columns from `sm`/`lg` up.
- **Motion** — everything respects `prefers-reduced-motion`; balloons and
  confetti switch off entirely for anyone who asks for calm.
