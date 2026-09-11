# Shamrat — Web3 Services Website

[![Live](https://img.shields.io/badge/Live-GitHub%20Pages-2563EB)](https://shamratx.github.io/web3-services-website/)

Static single-page site for **Shamrat** (`@ShamratX`) — Smart Contract Engineer and Full-Stack Web3 Developer. Plain HTML, CSS, and JavaScript. No build step, no npm dependencies.

**Live:** https://shamratx.github.io/web3-services-website/

## Features

- Services, filterable portfolio, chains, process, FAQ, contact
- Sticky header, mega-menu, mobile nav, scroll reveals
- SEO: meta, Open Graph, sitemap, robots, PWA icons
- Content remains visible if JavaScript is disabled

## How it works

Static files served as-is. `main.js` enhances navigation, reveals, counters, portfolio filters (`data-cat`), and builds a `mailto:` contact draft. No backend API.

## Requirements

- Modern browser
- Optional: Python 3 or any static file server

## Quick start

```bash
git clone https://github.com/ShamratX/web3-services-website.git
cd web3-services-website
python -m http.server 4321
```

Open http://localhost:4321 — or open `index.html` directly.

## Deploy

Host the repo root on GitHub Pages, Cloudflare Pages, Netlify, etc. `.nojekyll` is included for GitHub Pages.

Custom domain: update canonical / `og:url` / JSON-LD / `robots.txt` / `sitemap.xml` URLs after DNS + `CNAME`.

## Project structure

| File | Purpose |
|------|---------|
| `index.html` | Markup + SEO / JSON-LD |
| `styles.css` | Theme + responsive layout |
| `main.js` | UI behavior |
| `404.html` | Not-found page |
| `manifest.webmanifest` | PWA metadata |
| Media / icons | `og-image.png`, `team-*.jpg`, favicons |

Portfolio categories: `contracts`, `presale`, `tokens`, `dapps`, `tools`.

## Limitations

- Contact depends on the visitor’s email client (`mailto`).
- Marketing copy in HTML is editorial, not computed metrics.
- Canonical URLs currently assume the GitHub Pages path unless you change them.

## License

Content and assets for Shamrat’s public services site.
