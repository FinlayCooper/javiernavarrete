# Client feedback checklist

Source: the client's Google Doc (brief + Feedback tab). `JN Website.pdf` is an older export without the Feedback tab.

## A. Doable now

All code items done (uncommitted). Nothing has been built or run — see Verify.

- [x] **Gold accent** — hover colour `#00a2ff` (a PDF-export artifact) → gold sampled from the client's icons (`#c8b04a`)
- [x] **Footer arrow** — redraw to match their icon: one crossbar, arrowhead left, feathered tail right, gold
- [x] **Opera carousel arrows** — replace the chevrons with the gold arrow (mirrored for "next")
- [x] **Opera photo order** — primera, isabel, costumes, mg-6019, representacion, mg-5898, make-up, drums, ultima
- [x] **Favicon** — replace the default Next.js icon with the flower
- [x] **Footer social links** — real Spotify / Apple Music / YouTube URLs instead of `#`
- [x] **Media → Listen** — rename, move after Contact, `/media` redirects to `/listen`
- [x] **Listen page** — larger Spotify / Apple Music / YouTube links
- [x] **Contact page** — "For all inquiries, contact asianavarretearts@gmail.com"
- [x] **Library intro** — "Two albums available for licensing"
- [x] **Library albums** — always show description, player and links (no expand/collapse)
- [x] **Library titles** — centred
- [x] **Old opera site at /losamantes** — copy `public_html/opera/` into `public/losamantes/` (minus unused high-res gallery, `*_old.jpg`, empty `index_blanco.html`; not the old `robots.txt`)
- [x] **/losamantes redirects** — `/losamantes` → `/losamantes/index.html`; old `/opera/*.html` → `/losamantes/*.html`
- [x] **About photo slot** — pre-wired; shows photo + "Photograph by Jean-Jacques Annaud" once a photo is set

### Not code (Finlay)
- [ ] **"Powered by Netlify" pop-up** — the live site is on cPanel, so this should go away once the client uses the real domain rather than a Netlify URL; confirm with them

## A2. Round 2 (Feedback round 2 + News content)

Done, uncommitted. `npm run build` and `STATIC_EXPORT=true npm run build` pass.

- [x] **News** — "20th Anniversary of Pan’s Labyrinth" post: image under the title, copy verbatim, "official re-release site" linked, "Stream the score" row (YouTube / Spotify / Apple Music)
- [x] **Listen tab cut** — page, nav entry and `backgrounds/media.webp` removed; `/media` and `/listen` redirect to `/`
- [x] **Blue hover** — hovers/focus back to `#00a2ff` (`--color-hover`); gold stays on the icons
- [x] **IndieWire link** — on "2017 IndieWire ranking" in About
- [x] **Keep Listening** — Spotify album link under the player for every film except In a Glass Cage and Raoul Taburin

## B. Doable once you grab a resource

- [x] **Higher-res posters** — In a Glass Cage, Cracks and Wrath of the Titans replaced with larger copies of the same artwork; all eleven posters are now 720px wide
- [x] **Album Spotify / Apple Music links** — added; album links regrouped into a "Listen" row (Spotify, Apple Music) and a "License" row (United States, Rest of world; library name on hover)
- [x] **Album covers** — hooked up from `public/albums/`. They are only 240×240, so they look soft at card size (up to 340px); swap in ≥ 700px versions under the same filenames when you find them

## C. Blocked on the client

- [ ] **About photo** — to be sent as an attachment (one-line change once it arrives, thanks to the pre-wired slot)
- [ ] **News image** — the doc's copy is only 399×501; swap a larger one into `public/news/pans-labyrinth-20th.webp` (update width/height in `site.ts`)
- [ ] **Raoul Taburin placement** — doc says chronological but lists 2018 after 2023

## Verify (you run these)

- [ ] `npm run dev`: footer arrow + gold hovers; `/opera` order, gold arrows, keyboard ←/→; flower tab icon; `/library` all open, titles centred; `/contact` mailto; nav ends `NEWS CONTACT`; blue hovers, gold icons; `/news` post and links; About IndieWire link; `/movies` Keep Listening (9 of 11); `/media` and `/listen` → `/`; `/losamantes` splash, menu, gallery and sub-pages all load; `/opera/gallery.html` → `/losamantes/gallery.html`
- [ ] `npm run build` passes

## Deploy (static export → cPanel)

- [ ] `STATIC_EXPORT=true npm run build`, zip the *contents* of `out/`, upload and extract into `public_html` (overwrite)
- [ ] One-time: delete `public_html/media/` and `public_html/listen/` (cut tab), `public_html/backgrounds/media.webp`, and `public_html/favicon.ico` (old default icon)
- [ ] One-time: add to `public_html/.htaccess`, below the cPanel PHP block:
  ```apache
  ErrorDocument 404 /404.html
  RewriteEngine On
  RewriteRule ^(media|listen)/?$ / [R=301,L]
  ```
- [ ] Check live: `/news/`, `/movies/`, `/about/`, `/contact/`, `/library/`; `/media` and `/listen` → `/`; `/losamantes` loads with images and gallery; flower tab icon
- [ ] Optional: once `/losamantes` is confirmed, remove the old opera files left in `public_html/opera/` (keep the new `index.html`)
