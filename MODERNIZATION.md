# Modernization: Create React App → Vite + React 19

This document records how the portfolio was moved off Create React App (CRA) onto a current toolchain, and why each change was made. It builds on the earlier cleanup commit (`3bd7b73`), which fixed bugs, the mobile layout and the oversized laptop image.

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

## Suggested next steps

- Replace the 2018–2020 learner projects with more recent work.
- Add a résumé link and a small top nav (About / Projects / Contact).
- Add an `og:image` (a 1200×630 screenshot of the site) so link previews show a picture.
- Convert images to WebP/AVIF, or add `vite-imagetools`, for smaller downloads. `galaxy.jpg` is still 400 KB.
- Review the open Dependabot branches on GitHub. Most are for packages that no longer exist after this migration, so they can be closed.
