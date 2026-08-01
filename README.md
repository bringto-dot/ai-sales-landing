# NeuralKinetics

**[Live demo](https://bringto-dot.github.io/ai-sales-landing/)**

*[Читать на русском](README.ru.md)*

A single-page course-sales landing, built as a portfolio piece to practice a
minimal black-and-white aesthetic on top of React: full-viewport video hero,
glassmorphic UI, scroll-driven motion and real i18n, without leaning on a
component library.

The course, the mentors and the curriculum are fictional. The hero clip is
real stock footage, used as the content to design around.

![Hero](docs/preview/01-hero.png)

## What this project demonstrates

- **A hero that survives real content.** Nav, looping background video and
  the bottom copy block are independently positioned (fixed / absolute /
  absolute), so the layout can't collapse into itself on short viewports —
  a bug I hit and fixed during the build.
- **Liquid glass, used sparingly.** `backdrop-filter: blur + saturate` with
  inset highlights on the nav pills, the dropdown menu and a couple of
  cards — not slapped on every surface, just where an iOS-style frosted
  panel reads as an accent rather than noise.
- **Motion with a reason.** A scroll-linked tilt/scale on the program cards
  (`useScroll` + `useTransform` from `motion`), staggered reveal-on-scroll
  for the steps grid, and a menu toggle that morphs a `+` into an `×`
  instead of just showing/hiding text.
- **Real i18n, not a plugin.** Every string lives in one dictionary
  (`src/i18n/translations.js`) keyed by `ru`/`en`; a context provider swaps
  the active language and persists the choice to `localStorage`.
- **Front end that behaves like it has a back end.** The pricing cards open
  a sign-up → payment → success modal flow with real client-side validation,
  even though nothing is wired up server-side (documented below, not
  hidden).

## Screens

| | |
|---|---|
| ![How it works](docs/preview/02-how-it-works.png) | ![Pricing](docs/preview/03-pricing.png) |

## Stack

React 19 + Vite, `motion` (Framer Motion) for animation, plain CSS (no
Tailwind, no component library), `lucide-react` for icons.

```bash
npm install
npm run dev
```

Pushing to `main` runs a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds the app and publishes `dist/`
to GitHub Pages.

## Notes for anyone reading the code

- The checkout modal has no backend. Submitting it walks through
  registration → payment → success client-side; card fields are never sent
  or stored anywhere. Wiring it to a real processor is a matter of
  replacing the two `onSubmit` handlers in `src/components/AuthModal.jsx`.
- `vite.config.js` sets `base: '/ai-sales-landing/'` so built assets resolve
  correctly under the GitHub Pages subpath — expect local dev to live at
  `localhost:5173/ai-sales-landing/`, not the root.
