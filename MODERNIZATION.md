# Portfolio Modernization & Redesign

This document records every major change to the portfolio, why it was made, and the best practices behind it, so it can be used as a learning reference.

| Part | What | Commit |
|---|---|---|
| 0 | Bug fixes, mobile layout, image compression | `3bd7b73` |
| 1 | [Create React App → Vite + React 19](#part-1--create-react-app--vite--react-19) | `f77b547` |
| 2 | [Visual redesign with open-license photos](#part-2--visual-redesign) | (this commit) |
| — | [Best practices reference](#best-practices-reference) | |

---

# Part 1 — Create React App → Vite + React 19

This part moved the portfolio off Create React App (CRA) and onto a current toolchain.

## Summary

| | Before | After |
|---|---|---|
| Build tool | Create React App (`react-scripts` 5, deprecated in 2025) | Vite 8 |
| React | 16.13 | 19 |
| Node.js | 16.15 | 26 (LTS), pinned with `.node-version` |
| Scroll animations | `react-animate-on-scroll` + `animate.css` | Small built-in `Reveal` component (no dependencies) |
| Icons | Font Awesome 4.7 (2016) | Font Awesome 6.5 |
| Linting | CRA's built-in ESLint config | ESLint 9 flat config with React Hooks rules |
| Dependencies | ~1,500 packages, many with security advisories | React + react-dom, plus 7 dev tools (0 advisories) |
| Output folder | `build/` | `build/` (unchanged, so existing deploys keep working) |

## Step 1 — Upgrade Node.js

Vite 8 needs Node 20.19 or newer, and the machine had Node 16.15.

- Installed the current LTS release (Node 26) with **fnm**, which was already installed. The system-wide Node 16 in `C:\Program Files\nodejs` was left in place.
- Added a `.node-version` file containing `26`. fnm (and most other version managers) switch to it automatically inside this folder.
- Added `"engines": { "node": ">=20.19" }` to `package.json` so npm warns if someone uses an older Node.

> **Note:** fnm made Node 26 its default. In terminals where fnm is active, `node` is now v26. In terminals where it isn't, `node` is still the system v16. Run `node -v` to check before working on the project.

To use it in a new terminal:

```bash
fnm use
```

If `fnm` isn't on your terminal's PATH, see the [fnm shell setup](https://github.com/Schniz/fnm#shell-setup).

## Step 2 — Replace Create React App with Vite

1. **Removed** `react-scripts`, the `@testing-library/*` packages (there were no tests), `react-animate-on-scroll` and `animate.css`. Deleted `node_modules` and `package-lock.json` and reinstalled from scratch.
2. **Installed** `react@19`, `react-dom@19`, `vite@8` and `@vitejs/plugin-react@6`.
3. **Added `vite.config.js`** with the React plugin and `build.outDir: 'build'`, so the output lands in the same folder CRA used.
4. **Moved `public/index.html` to the project root as `index.html`.** Vite uses it as the entry point. Removed the `%PUBLIC_URL%` placeholders (Vite serves `public/` from `/`) and added `<script type="module" src="/src/main.jsx">`.
5. **Renamed component files from `.js` to `.jsx`.** Vite only parses JSX in `.jsx` files. The data files in `src/data/` contain no JSX, so they stay `.js`.
6. **Replaced the npm scripts:**

   | Script | Command | Purpose |
   |---|---|---|
   | `npm run dev` (or `npm start`) | `vite` | Dev server with instant reload at http://localhost:5173 |
   | `npm run build` | `vite build` | Production build into `build/` |
   | `npm run preview` | `vite preview` | Serve the production build locally |
   | `npm run lint` | `eslint .` | Check the code |

7. **Deleted the `.env` file.** It worked around a React 19 install in the parent folder (`D:\Projects\node_modules`) leaking into the CRA build. The project now has its own React 19, so the workaround isn't needed.

## Step 3 — Upgrade to React 19

- `src/index.js` became `src/main.jsx` and uses the `createRoot` API. The old `ReactDOM.render` was removed in React 19.
- The app is wrapped in `<StrictMode>`, which warns about unsafe patterns during development.
- Removed the `import React from 'react'` lines. The modern JSX transform no longer needs them.
- `About` was already converted to hooks in the earlier cleanup, so no class components remain.

## Step 4 — Replace the scroll-animation library

`react-animate-on-scroll` hasn't been updated in years and doesn't support React 18+. It was replaced with a small component:

- **`src/Reveal.jsx`** uses the browser's built-in `IntersectionObserver` to detect when a section first scrolls into view, then adds an `is-visible` class.
- **`src/Reveal.css`** handles the fade and slide with CSS transitions. Directions: `up`, `down`, `left`, `right`.
- People who turn on **"reduce motion"** in their OS settings see the content without animation (`prefers-reduced-motion`).
- Each `Reveal` renders a `<section>`, and `App` wraps everything in `<main>`. The page now has proper landmarks for screen readers.

Usage:

```jsx
<Reveal from="left" className="page-section">
  <Projects />
</Reveal>
```

## Step 5 — Icons, links and page metadata

- **Font Awesome 4.7 → 6.5** (loaded from cdnjs). The class names changed (`fa fa-github` → `fa-brands fa-github`), so `src/data/social.js` and `src/App.css` were updated.
- **Twitter → X:** new icon and an `x.com` link. Remove that entry from `src/data/social.js` if you no longer use the account.
- **Social icons:** each icon now has its own `.social-icon` class and a hover effect. This also fixed a CSS ordering bug that kept the small-screen icon sizes from applying.
- **Project links:** the raw GitHub URL was replaced with a "View on GitHub" button.
- **`index.html`:**
  - The default "Web site created using create-react-app" description was replaced with a real one.
  - Open Graph tags were added, so links shared on LinkedIn or Slack show a proper title and description.
  - The fonts load with `preconnect` hints.
- **Explicit light theme:** the page sets its own white background and `color-scheme: light`, so browsers in dark mode don't show a dark background behind black text.

## Step 6 — Linting

Added `eslint.config.js` (the ESLint 9 "flat config" format) with:

- the recommended JavaScript rules
- `eslint-plugin-react-hooks`, which catches mistakes in `useEffect` dependencies and hook usage
- `eslint-plugin-react-refresh`, which keeps Vite's hot reload working

`npm run lint` currently passes with no warnings.

## Step 7 — Removed files

| File | Why |
|---|---|
| `src/serviceWorker.js` | CRA boilerplate; never registered |
| `src/setupTests.js` | No tests used it |
| `src/logo.svg` | The default React logo; unused |
| `src/assets/Me.jpg` | Replaced earlier by `MeUpdated.jpg`; unused |
| `public/manifest.json`, `public/logo192.png`, `public/logo512.png` | CRA's default "React App" install manifest with React logos |
| `.env` | See Step 2 |

`/dist` was added to `.gitignore` in case Vite's default output folder is ever used.

## Verification

- `npm run lint`: passes, no warnings
- `npm run build`: succeeds in under a second; JS is 70 KB gzipped
- `npm audit`: 0 vulnerabilities
- Checked in a browser at phone width (375px), plus a quick look at a narrow desktop window: all sections render and animate in, there's no sideways scrolling, and there are no console errors.

## Deploying

The build still goes to `build/`, so whatever currently serves that folder should keep working. Two things to check on your host:

1. **The host's build environment needs Node 20.19 or newer.** Netlify, Vercel and Cloudflare Pages read `.node-version` automatically. For GitHub Actions, set `node-version-file: .node-version` in `actions/setup-node`.
2. **If the build command was hard-coded**, `npm run build` still works. If it pointed at `react-scripts build`, change it to `npm run build`.

---

# Part 2 — Visual redesign

**Goal:** make the site look modern and professional, swap the old images for openly licensed photos, and keep it fast, accessible and easy to edit.

## Before → after

| Area | Before | After | Why |
|---|---|---|---|
| Theme | White page, purple/orange banner, serif title | Dark navy theme with a violet→blue accent gradient | Dark themes with one accent color look cleaner and make photos and color stand out. A single accent keeps the page from feeling busy. |
| Fonts | Jost + Trirong (italic serif) | **Space Grotesk** (headings) + **Inter** (body) | Inter is built for screens and stays readable at small sizes. Space Grotesk gives headings personality. Two fonts with different jobs is the usual limit. |
| Navigation | None | Sticky top bar: logo + About / Projects / Contact | Visitors (often recruiters) scan; nav lets them jump straight to what they want. |
| Hero | Photo stretched over a banner, centered text | Full-screen hero: starry mountain photo, dark overlay, photo in a gradient ring, rotating title, two call-to-action buttons | The first screen decides whether people keep reading. It now says who you are, what you do, and what to click next. |
| About | Four centered paragraphs | A card with the bio plus three "quick facts" | Shorter, scannable chunks. The facts answer "where / what / background" at a glance. |
| Projects | Inline blocks with a raw URL | Cards with a photo, description, tech tags and "View on GitHub →" | Cards are the standard pattern for showing work: they group related info and invite a click. Tags show your skills without extra reading. |
| Contact | Four colored circles labeled "Follow me" | "Get in touch" section with a main **Say hello** button and simple icon links | One clear primary action (email) beats four equal choices. Matching monochrome icons look more polished than brand colors. |
| Footer | None | © year + photographer credits | Unsplash asks for credit, and a footer signals the page is finished. |
| Images | Local JPGs of unknown origin | Unsplash photos (free license), loaded responsively from Unsplash's CDN | Clear licensing, better quality, and the CDN serves each visitor the right size and format (WebP/AVIF). |

## New and changed files

| File | Role |
|---|---|
| `src/Nav.jsx` | Sticky header. Adds a background once you scroll. |
| `src/Hero.jsx` | Full-screen intro (moved out of `About`). Owns the rotating-title timer. |
| `src/About.jsx` | Bio card + quick facts. Now a simple component with no state. |
| `src/Projects.jsx` | Project cards with responsive images and tags. |
| `src/SocialMedia.jsx` | Contact section. |
| `src/Footer.jsx` | Copyright and photo credits, generated from `photos.js`. |
| `src/data/photos.js` | **New.** One place for every photo's ID, photographer and links. |
| `src/data/projects.js` | Now uses `photos.js` and has `tags`. |
| `src/index.css` | Theme settings (colors, fonts, radius) as CSS variables, plus base styles. |
| `src/App.css` | All section styles, grouped by section. |
| Removed | `About.css`, `Projects.css`, `banner.jpg`, `galaxy.jpg`, `CatBox.jpg`, `laptop.jpg` |

## Photo credits

All photos are from [Unsplash](https://unsplash.com/license), which allows free commercial and personal use without permission. Credit is appreciated, so it's shown in the footer.

| Used for | Photographer |
|---|---|
| Hero background | Benjamin Voros, "snow mountain under stars" |
| Fullstack project | Arnold Francisca, laptop with code |
| Cat adoption project | Aleesha Wood, cats sleeping on a couch |
| REST APIs project | Jordan Harrison, network cables |

To swap a photo: open it on unsplash.com, copy the `photo-…` ID from the image address, and update the entry in `src/data/photos.js`. The footer credit updates automatically.

## Verification

- `npm run lint` and `npm run build` pass.
- Ran on `npm run dev` (http://localhost:5173) and checked at 1280px desktop and 375px phone widths. Every section renders, all five images load, there's no sideways scrolling on phones, and there are no console errors.

---

# Best practices reference

Each practice below is used in this codebase. The **Where** line points to the code so you can see it in action.

## 1. Styling and layout

**Use CSS custom properties (variables) as design tokens.**
Colors, fonts and radii are defined once in `:root` and reused everywhere (`var(--accent)`). Changing the whole theme means editing a handful of lines, and nothing drifts out of sync.
*Where:* top of `src/index.css`.

**Use fluid sizes with `clamp()` instead of many media queries.**
`font-size: clamp(2.75rem, 9vw, 5rem)` means "scale with the screen, but never below 2.75rem or above 5rem." One line replaces several breakpoints.
*Where:* `.hero-name`, `.section-title`, `.hero-photo-ring`.

**Let the grid decide the number of columns.**
`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` fits as many 280px+ cards as there's room for: three on desktop, one on a phone, with no media query.
*Where:* `.project-grid`.

**Reserve image space with `aspect-ratio` + `object-fit: cover`.**
The box keeps its shape before the image loads, so the page doesn't jump (this is called *layout shift*, and Google measures it). `object-fit: cover` fills the box without stretching the photo.
*Where:* `.project-media`, `.hero-photo-ring`, `.hero-bg`.

**Use `box-sizing: border-box` everywhere.**
Padding and borders count inside an element's width, so `width: 100%` plus padding doesn't overflow.
*Where:* `*, *::before, *::after` in `src/index.css`.

**Put an overlay between photos and text.**
Text on a busy photo is hard to read. A dark gradient over the image keeps the white text legible on any background.
*Where:* `.hero-overlay`.

**Make anchor links clear the sticky header.**
`scroll-padding-top: var(--nav-h)` stops the fixed nav from covering section headings when you click a nav link.
*Where:* `html` in `src/index.css`.

**Keep visual hierarchy simple.**
One accent color, two fonts, a consistent spacing scale (multiples of 4/8px), and one primary button per section. Restraint is most of what makes a design look "sleek."

## 2. Performance

**Serve responsive images.**
`srcSet` lists several widths and `sizes` tells the browser how wide the image will display. A phone downloads an 800px image instead of a 2400px one.
*Where:* `Hero.jsx`, `Projects.jsx`, `src/data/photos.js`.

**Load the hero image first and everything else later.**
`fetchPriority="high"` on the hero image (the biggest thing on the first screen) and `loading="lazy"` on project images, which only download when you scroll near them.

**Connect early to other servers.**
`<link rel="preconnect">` for Google Fonts and Unsplash starts the network handshake before those files are requested.
*Where:* `index.html`.

**Animate only `transform` and `opacity`.**
The browser can animate these on the GPU without recalculating layout, so animations stay smooth. Avoid animating `width`, `top` or `margin`.
*Where:* `.reveal`, `.project-card:hover`, `.title-in` / `.title-out`.

**Use `IntersectionObserver` instead of scroll listeners for "is it visible?"**
The browser tells you when an element enters the screen, instead of your code running on every scroll event.
*Where:* `src/Reveal.jsx`.

**When you do need a scroll listener, make it passive.**
`{ passive: true }` promises you won't block scrolling, so the browser can keep it smooth.
*Where:* `src/Nav.jsx`.

## 3. Accessibility

**Use semantic HTML landmarks.**
`<header>`, `<nav>`, `<main>`, `<section>`, `<article>` and `<footer>` let screen-reader users jump between parts of the page, and help search engines understand it.

**Give icon-only links a name.**
A link that's just an icon reads as "link" with no context. `aria-label="GitHub"` fixes that, and `aria-hidden="true"` on the `<i>` stops the icon itself from being read.
*Where:* `SocialMedia.jsx`, `Nav.jsx` (logo).

**Use empty `alt=""` for decorative images and real `alt` for meaningful ones.**
The hero background and project photos are decoration: the text next to them carries the meaning, so `alt=""` tells screen readers to skip them. Your portrait has real alt text.

**Warn when a link opens a new tab.**
Visually hidden text, "(opens in a new tab)", is read aloud but not shown.
*Where:* `.visually-hidden` in `src/index.css`, used in `Projects.jsx`.

**Announce changing text politely.**
`aria-live="polite"` on the rotating title lets screen readers announce new titles without interrupting.
*Where:* `Hero.jsx`.

**Keep visible focus styles.**
`:focus-visible` shows an outline for keyboard users only, not on mouse clicks. Never remove focus outlines without replacing them.

**Respect "reduce motion."**
`@media (prefers-reduced-motion: reduce)` turns off the reveal animations and smooth scrolling for people who get motion sickness.
*Where:* `src/Reveal.css`, `src/index.css`.

**Check contrast.**
Body text (`#e7e9f2` on `#0b0d17`) and muted text (`#9aa3ba`) both pass WCAG AA contrast. Check new colors with a contrast checker.

## 4. React patterns

**Always clean up effects.**
Every `useEffect` that starts something (a timer, a listener, an observer) returns a function that stops it. Otherwise it keeps running after the component is gone, which leaks memory and can cause errors. This was the original bug in the title rotator.
*Where:* `Hero.jsx` (timers), `Nav.jsx` (scroll listener), `Reveal.jsx` (observer).

**Use functional state updates when the new value depends on the old one.**
`setIndex(prev => (prev + 1) % TITLES.length)` always uses the latest value. Reading `index` directly inside a timer can use a stale value.

**Keep content separate from components.**
Projects, social links, titles and photos live in `src/data/`. You can add a project without touching any JSX, and the components only care about *how* to display it.

**Keep components small, with one job each.**
`Nav`, `Hero`, `About`, `Projects`, `SocialMedia`, `Footer` and `Reveal` each do one thing and are easy to find. The old `About` mixed the hero, a timer and the bio.

**Give list items stable keys.**
`key={project.id}` (not the array index) lets React track items correctly when the list changes.

**Derive instead of duplicating.**
The footer credits are generated from `photos.js`, so they can't drift out of sync with the images actually used.

## 5. Security and links

**Use `rel="noopener noreferrer"` with `target="_blank"`.**
Without it, the opened page can access your page through `window.opener`. Modern browsers default to `noopener`, but being explicit is the safe habit.

**Don't open `mailto:` links in a new tab.**
They open the visitor's mail app, so a blank extra tab would just be clutter.

## 6. Licensing and attribution

**Know the license of every asset you ship.**
Unsplash photos are free to use, and the license is documented in the code and in this file. Fonts (Google Fonts, SIL Open Font License) and icons (Font Awesome Free: icons CC BY 4.0, code MIT) are also open-licensed.

**Credit creators even when it isn't required.**
It's good practice, and it shows care to anyone reviewing your work.

## 7. Workflow

**Verify in a real browser at several widths.**
Lint and build passing doesn't mean the page looks right. Every change here was checked at desktop and phone widths, and the console was checked for errors.

**Keep commits focused, with messages that explain why.**
Cleanup, migration and redesign are separate commits, so each can be reviewed or reverted on its own.

**Don't commit machine-specific files.**
`.claude/launch.json` (local dev-server config) and unrelated personal files stay out of the repo.

---

## Suggested next steps

- Replace the 2018–2020 learner projects with more recent work, and keep the `tags` accurate.
- Add a résumé link (a PDF in `public/` linked from the nav).
- Add an `og:image` (a 1200×630 screenshot of the hero) so link previews show a picture.
- Optionally download the Unsplash photos into `src/assets/` so the site doesn't depend on Unsplash's CDN.
- Review the open Dependabot branches on GitHub. Most are for packages removed in Part 1, so they can be closed.
