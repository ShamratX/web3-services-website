# Shamrat — Web3 Services Website

Static single-page site for **Shamrat** (`@ShamratX`) — Smart Contract Engineer and Full-Stack Web3 Developer. Plain HTML, CSS, and JavaScript. No build step, no npm dependencies.

**Live:** https://shamratx.github.io/web3-services-website/

## Features

- Service cards, filterable portfolio, chain highlights, FAQ, contact
- Sticky header, mega-menu, mobile nav, scroll reveals
- SEO basics: meta, Open Graph, sitemap, robots, PWA icons
- Works with JS disabled (content stays visible)

## Requirements

- Any modern browser
- Optional: Python 3 (local static server) or any static host

## Quick start

```bash
git clone https://github.com/ShamratX/web3-services-website.git
cd web3-services-website
python -m http.server 4321
```

Open http://localhost:4321

Or open `index.html` directly in a browser.

## Deploy

Deploy the repo root as a static site (GitHub Pages, Cloudflare Pages, Netlify, etc.).

GitHub Pages tip: `.nojekyll` is already included so assets are served as-is.

### Custom domain

Canonical URL today: `https://shamratx.github.io/web3-services-website/`

1. Add a `CNAME` file with your domain and point DNS at GitHub Pages.
2. Update the URL in:
   - `index.html` — canonical, `og:url`, JSON-LD `@id` / `url`
   - `robots.txt` — `Sitemap:`
   - `sitemap.xml` — `<loc>`

## Project structure

| File | Purpose |
|------|---------|
| `index.html` | Page markup + meta / JSON-LD |
| `styles.css` | Theme + responsive layout |
| `main.js` | Nav, reveals, filters, contact |
| `404.html` | Not-found page |
| `manifest.webmanifest` | PWA metadata |
| `robots.txt` / `sitemap.xml` | Crawlers |
| `og-image.png` / `team-*.jpg` / icons | Media |

Portfolio cards use `data-cat` on `.project` articles. Groups: `contracts`, `presale`, `tokens`, `dapps`, `tools` (space-separated; a card can belong to several).

## Notes

- Animations respect `prefers-reduced-motion`.
- Edit copy and images in `index.html` / asset files — no framework rebuild needed.
