# Shamrat — Web3 Service Website

A single-page service website for **Shamrat** (`@ShamratX`), Smart Contract Engineer and Full-Stack Web3
Developer. Content is drawn from the GitHub portfolio: CatIQ, Web3 Kit, Veltrix, DigitX and the ERC20 /
airdrop tooling repositories.

No build step, no dependencies — plain HTML, CSS and JavaScript, so it deploys anywhere static.

## Page sections

Announcement top bar → header with Services mega-menu → hero + stats + tech marquee → 8 service cards →
filterable portfolio → smart contracts by chain → Web3 DApp frontend → process → engagement models →
tech stack → about → FAQ → contact → multi-column footer with CTA banner.

Scroll-reveal animations are gated behind a `.js` class on `<html>`, so the page stays fully visible if
JavaScript is blocked or fails. A 2.5s fallback timer also reveals anything an observer missed.

## Responsive breakpoints

Verified with zero horizontal overflow at 320, 360, 375, 390, 414, 480, 540, 600, 640, 768, 820, 834, 912,
1024, 1180, 1280, 1366, 1440, 1600, 1920 and 2560px.

| Range | Layout |
| --- | --- |
| ≤ 400px | Small phones: reduced type scale, tighter gutters, 40px social buttons |
| ≤ 620px | Phones: single column everywhere, density pass on padding and gaps |
| ≤ 860px | Hamburger nav (with a mobile-only Services link), stats and footer at 2 columns |
| ≤ 899px | Hero stacks with the headline first, cards at 2 columns |
| 900–1180px | Landscape tablets and small laptops: 3-column cards, two-column hero |
| 1181–1699px | Full desktop: 4-column services and chains, 5-column footer |
| ≥ 1700px | Wide shell (1480px) and slightly larger base font |
| ≥ 2200px | Wider still (1640px) for 2K/4K monitors |

Also handled: landscape phones under 520px tall hide the hero visual and top bar, `hover: none` devices drop
hover-only transforms and enforce 44px tap targets, and `prefers-reduced-motion` disables all animation.

Portfolio filtering is driven by the `data-cat` attribute on each `.project` card. Valid groups:
`contracts`, `presale`, `tokens`, `dapps`, `tools` — space-separated, a card can belong to several.
Add a new card by copying an existing `<article class="project reveal">` block and setting its `data-cat`.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All page markup, meta tags and JSON-LD structured data |
| `404.html` | Styled not-found page (GitHub Pages serves it automatically) |
| `styles.css` | Dark Web3 theme, grid glow background, responsive + print layout |
| `main.js` | Sticky header, mega-menu, mobile nav, scroll reveals, stat counters, portfolio filters, contact form |
| `og-image.png` | 1200×630 social preview card |
| `shamrat.jpg` | Locally hosted profile photo |
| `favicon.svg` | Gradient diamond mark |
| `apple-touch-icon.png` | 180×180 iOS home-screen icon |
| `icon-192.png`, `icon-512.png` | PWA icons (512 doubles as maskable) |
| `manifest.webmanifest` | PWA metadata |
| `robots.txt` | Crawler rules + sitemap pointer |
| `sitemap.xml` | Sitemap with image extension |
| `.nojekyll` | Skips Jekyll processing on GitHub Pages |

## Run locally

```bash
cd /Users/shamrat/Desktop/service
python3 -m http.server 4321
```

Then open http://localhost:4321.

**Live:** https://shamratx.github.io/web3-services-website/

## Moving to a custom domain

The canonical URL is currently `https://shamratx.github.io/web3-services-website/`. To switch to your own
domain, add a `CNAME` file containing the domain, point DNS at GitHub Pages, then replace the URL in:

- `index.html` — `<link rel="canonical">`, `og:url`, and every `@id` / `url` inside the JSON-LD block
- `robots.txt` — the `Sitemap:` line
- `sitemap.xml` — the `<loc>` value

Optional polish:

- **Social preview image.** `og:image` and `twitter:image` currently point at your GitHub avatar. A 1200×630
  PNG (e.g. `og-image.png`) will look far better when links are shared.
- **LinkedIn.** Your profile README still has `YOUR_USERNAME` placeholders; once you have the real URL, add it
  to the `sameAs` array in the JSON-LD and to the contact list.
- **Contact form.** It opens the visitor's email client via `mailto:`. For a real inbox submission, point the
  form at Formspree, Web3Forms or a Cloudflare Worker instead.

## Deploy

**Cloudflare Pages** (same host as `web3-kit.pages.dev`) — create a project, connect the repo, leave the build
command empty and set the output directory to `/`.

**GitHub Pages** — push to a repo, then Settings → Pages → deploy from branch `main`, folder `/root`.

**Vercel / Netlify** — drag the folder in, or connect the repo with no build command.

## SEO checklist covered

- `<title>` at 58 characters and meta description at 150 — both inside Google's truncation limits
- Keyword-led `<h2>` per section (smart contract development, Web3 DApp frontend, EVM chains, portfolio, FAQ)
- Open Graph and Twitter cards with a real 1200×630 image, dimensions and alt text
- Canonical URL, `robots` directives, `sitemap.xml` with image extension, `robots.txt`
- JSON-LD: `Person`, `ProfessionalService` with an 8-item `OfferCatalog`, `WebSite`, `FAQPage`
- Semantic landmarks, exactly one `<h1>`, labelled sections, skip link, no duplicate IDs
- All assets self-hosted apart from Google Fonts; only the weights actually used are requested
- Lazy-loaded imagery with explicit dimensions (no layout shift), `font-display: swap`, preconnect hints

## Accessibility

- All text meets WCAG AA contrast (verified: body 16.9:1, secondary 7.6:1, tertiary 5.5:1, accents 7.3–8.2:1)
- 44px minimum tap targets on touch devices
- Keyboard-operable mega-menu (click to open, Escape to close) and visible focus rings
- `prefers-reduced-motion` disables every animation
- Content remains fully visible without JavaScript

## Performance

Critical path is roughly 108KB uncompressed across HTML, CSS and JS — around 25KB gzipped — with no
frameworks, no build step and no third-party scripts or trackers. The social image only loads for crawlers.
