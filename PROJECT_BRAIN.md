# PROJECT_BRAIN — web3-services-website

## Purpose

Public marketing / portfolio site for Shamrat Web3 services. Also used as the primary link on the GitHub profile.

## Architecture

- Static trio: `index.html`, `styles.css`, `main.js`
- No bundler; fonts from Google Fonts
- Progressive enhancement: `.js` class + IntersectionObserver reveals; reduced-motion respected
- Contact: client-side `mailto:` (address embedded in JS/HTML — rotate carefully if public abuse occurs)

## Workflow

1. Edit HTML/CSS/JS locally
2. Preview via static server
3. Push to GitHub → Pages serves root
4. When changing domain, rewrite absolute URLs in SEO files

## Related products linked in page

CatIQ (`catiq.xyz`), Web3 Kit (`web3-kit.pages.dev`), GitHub/X profiles.

## Gotchas

- Team/OG images are committed binary assets — keep dimensions consistent for cards.
- Do not add a build pipeline unless intentionally migrating off static hosting.
