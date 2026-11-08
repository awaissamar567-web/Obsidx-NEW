# Obsidx homepage – handoff (8 Nov 2026)

**Project:** `E:\obsidx new website` (Next.js). Read `AGENTS.md` first: this Next.js version has breaking changes, so check `node_modules/next/dist/docs/` before using Next APIs.
**Run:** `npm run dev` → http://localhost:3000 (launch config `obsidx-dev` in `.claude/launch.json`).
**Git:** all work is committed and merged into `main` (fast-forward from `homepage-redesign`, redesign commit `2222304`). `main` is pushed to `origin` (GitHub `awaissamar567-web/Obsidx-NEW`).
**Assets:** PNGs in `public/assets` and `New Assets icons` were losslessly recompressed (pixel-identical). The CTA background is now `public/assets/gold-liquid-cta.webp` (lossless).

## What was asked and done

1. **Redesign from references** (Buff Motion, Bindery, We Are Example, Supaste, researched with the Inspo MCP). Dark `#0f0f0f` + gold `#fcba4b` brand kept.
2. **Homepage order now** (`app/page.tsx`):
   Header → Obi pet (`MemberDock`) → hero (big staggered headline only) → product-name marquee (`.trust-rail`, restored) → Opportunity (`ProductFlow`) → `ToolsMarquee` → `ResultsStandard` (`#what-we-build`) → How it works (`ProcessSlides`, sticky 01–04 cards) → Clarity + `PartnerDashboard` (`#about`) → Who we help / What we handle lists → Partner results (placeholders) → "Included in every partnership" tags → Apply card → footer.
3. **Removed at the user's request:** "Our belief" manifesto, hero tagline/paragraph/buttons/stats row, top "22 of 30 seats" announcement bar. Old member box, `ProcessCurve` and the refinery quote are no longer on the page.
4. **Styles:** all new styles live in `app/redesign.css` (imported after `globals.css` in `app/layout.tsx`). It overrides legacy global rules (italic `h1`, `blockquote`, fixed-height `.apply`).
5. **Fonts:**
   - Serif italics use **Apple Garamond** (`public/fonts/apple-garamond/`, `@font-face` at the top of `globals.css`, `--serif`). ⚠️ The font license still needs confirming before launch; EB Garamond Italic is the free fallback.
   - Open Sauce Sans 400, 400-italic and 600-italic are served from `public/fonts/open-sauce-sans/*.woff`, because the `@fontsource` `.woff2` files for those weights are corrupt. Imports for those weights were removed from `layout.tsx`.
6. **Custom cursor:** `public/cursors/arrow.svg` + `arrow-hover.svg` (black arrow, rounded corners, gold outline + glow). Rules are in the "Custom cursor" block of `redesign.css`.
7. **Obi the pixel cat** (`components/MemberDock.tsx`):
   - Sprite `public/pet/obi-sprite.webp` (16 frames, 148×140, shown at 95×90 via `--pet-w` / `--pet-h`). Source sheet `assets-src/pet/obi-sheet-source.webp`. Rebuild:
     `node scripts/build-pet-sprite.js assets-src/pet/obi-sheet-source.webp public/pet/obi-sprite.webp preview.png`
     (bump `?v=` on the sprite URL in `redesign.css` after rebuilding).
   - Frame order: idle, blink, talk, point, wave, think, happy, surprised, love, celebrate, curious, sleepy, walk ×4.
   - Trails the cursor, stops when caught, walk cycle + flips direction, blinks, sleeps after 20 s idle.
   - 11 section tips with matching poses (scroll-based, list at the top of the file).
   - Hover: surprised → happy, and a "22/30 Members" box (10px corners) that ticks once to 23. Click: celebrate, then `/apply`.
   - Touch devices / reduced motion: fixed in the bottom-right corner.
8. **Seat numbers:** `lib/capacity.ts` (`seatsFilled = 22`, `seatsTotal = 30`).

## Open items / next steps

- User feels the page **isn't premium enough yet** and was collecting references. Expect further direction.
- Replace placeholders before launch: partner results (all metrics are "—"), "Who we help" categories, dashboard sample data, social URLs and email in `page.tsx`, seat count.
- Confirm the Apple Garamond license.
- `components/ProcessCurve.tsx` (and its CSS in `globals.css`) is unused now and can be deleted.
- Optional size wins that are not strictly lossless: the favicon/header logo `obsidx-gold-logo.png` is 3375×3375 (1.7 MB) but shown at 54 px; the Apple Garamond TTFs could become WOFF2 (lossless, needs a converter).

## Notes for the next session

- The user prefers short instructions and wants changes made directly, then checked on localhost.
- When testing in the built-in browser, keep the pane visible: a hidden pane throttles animation frames to ~1 fps, which makes the cat and scroll checks look broken.
