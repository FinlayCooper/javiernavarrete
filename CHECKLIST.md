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
- [ ] **"Powered by Netlify" pop-up** — likely the Netlify Drawer on deploy-preview / permalink URLs; disable under Site configuration → Deploy Previews, or share the production URL

## B. Doable once you grab a resource

- [x] **Higher-res posters** — In a Glass Cage, Cracks and Wrath of the Titans replaced with larger copies of the same artwork; all eleven posters are now 720px wide
- [x] **Album Spotify / Apple Music links** — added; album links regrouped into a "Listen" row (Spotify, Apple Music) and a "License" row (United States, Rest of world; library name on hover)
- [x] **Album covers** — hooked up from `public/albums/`. They are only 240×240, so they look soft at card size (up to 340px); swap in ≥ 700px versions under the same filenames when you find them

## C. Blocked on the client

- [ ] **About photo** — to be sent as an attachment (one-line change once it arrives, thanks to the pre-wired slot)
- [ ] **News content** — "WORKING ON THIS WILL UPDATE ASAP"
- [ ] **Raoul Taburin placement** — doc says chronological but lists 2018 after 2023

## Verify (you run these)

- [ ] `npm run dev`: footer arrow + gold hovers; `/opera` order, gold arrows, keyboard ←/→; flower tab icon; `/library` all open, titles centred; `/contact` mailto; nav ends `NEWS CONTACT LISTEN`; `/media` → `/listen`; `/losamantes` splash, menu, gallery and sub-pages all load; `/opera/gallery.html` → `/losamantes/gallery.html`
- [ ] `npm run build` passes
- [ ] After deploy: recheck `/losamantes` on the Netlify preview
