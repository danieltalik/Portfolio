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

- `index.html`: page shell, fonts, icons and metadata
- `src/main.jsx`: app entry point
- `src/App.jsx`: page sections
- `src/About.jsx`, `src/Projects.jsx`, `src/SocialMedia.jsx`: the three sections
- `src/Reveal.jsx`: fade-in-on-scroll wrapper
- `src/data/`: edit these to change projects, social links and rotating titles

See [MODERNIZATION.md](MODERNIZATION.md) for how the project moved from Create React App to Vite.
