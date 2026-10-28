# Daniel Talik — Portfolio

Personal portfolio site built with [React 19](https://react.dev) and [Vite](https://vite.dev).

## Requirements

Node.js 20.19 or newer. The project pins Node 26 in `.node-version`. With [fnm](https://github.com/Schniz/fnm), run `fnm use` in this folder.

## Scripts

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at http://localhost:5173 |
| `npm run build` | Build the production site into `build/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project layout

- `index.html`: page shell, fonts (Inter, Space Grotesk), icons (Font Awesome Free) and metadata
- `src/main.jsx`: app entry point
- `src/App.jsx`: page layout
- `src/Nav.jsx`, `src/Hero.jsx`, `src/About.jsx`, `src/Projects.jsx`, `src/SocialMedia.jsx`, `src/Footer.jsx`: page sections
- `src/Reveal.jsx`: fade-in-on-scroll wrapper
- `src/index.css`: colors, fonts and other theme settings (CSS variables)
- `src/App.css`: section styles
- `src/data/`: edit these to change projects, social links, rotating titles and photos

## Photos

Background and project photos are free to use under the [Unsplash License](https://unsplash.com/license) and load from Unsplash's image CDN. To swap one, find a photo on unsplash.com, copy its `photo-…` ID from the image URL into `src/data/photos.js`, and update the photographer credit. Credits appear in the footer.

See [MODERNIZATION.md](MODERNIZATION.md) for how the project moved from Create React App to Vite.
