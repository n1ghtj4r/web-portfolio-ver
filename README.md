# web-portfolio-ver

A one-page portfolio in the "concrete & acid" brutalist style. Hand-written HTML,
CSS and ~4KB of vanilla JavaScript. No framework, no build step, no dependencies,
no trackers. Total weight ~90KB, of which 52KB is the two self-hosted fonts.

## Run it

Any static file server works:

```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

Opening `index.html` directly from disk also works.

## Files

| File | What's in it |
| --- | --- |
| `index.html` | All content, in document order: hero, ticker, work, about, capabilities, contact, footer |
| `styles.css` | Design tokens at the top, then one block per component |
| `main.js` | Invert theme, grid overlay, Berlin clock, copy-email, placeholder-link notice |
| `assets/fonts/` | Anton + Space Mono, latin subsets (woff2) |
| `shots/` | Reference screenshots, not used by the site — safe to delete |

## Swap in your own content

Everything lives in `index.html`. Search for these:

1. **Name** — `<h1 class="hero-name">`, the `<title>`, `.brand`, the footer.
The two lines are separate spans (`NICO` / `VOSS`) so the offset acid block keeps working.
2. **Role, city, status** — the three `.topitem` blocks in the hero, plus `.status-card`.
3. **Work entries** — each `<article class="entry">` holds a `<details>`. Replace the
`<summary>` cells (number, name, discipline, year) and the `.entry-body` copy,
`<dl>` facts and link. Add or remove whole `<article>` blocks freely; renumber the
`.cell-no` values.
4. **About** — `.about-lead` (the big uppercase statement) and the paragraphs below it.
The `.facts` list is a definition list: `<dt>` label, `<dd>` value.
5. **Capabilities** — three `.card` blocks with `<li>` lists.
6. **Contact** — the `mailto:` and the four `.contact-links a` rows. Also update
`data-email` on the copy button so it copies the right address.
7. **Placeholders** — every `href="#"` marked `data-placeholder` is intentionally
unfinished: clicking it shows a notice instead of navigating. Remove the attribute
once you paste a real URL.

## Restyle it

The first 20 lines of `styles.css` are the whole visual identity:

```css
--paper: #f5f4ef;   /* page */
--ink:   #12120f;   /* text, borders, hard shadows */
--acid:  #dfff00;   /* the one loud accent */
--mist:  #e8e6dc;   /* expanded panel background */
```

Change `--acid` to `#2f6bff` for electric blue or `#ff3b1f` for signal red and the
entire site re-skins. Borders are `3px solid var(--ink)`, shadows are always
`Npx Npx 0 var(--ink)` — no blur anywhere, by design. The invert theme is the same
tokens flipped, defined in `html[data-theme="invert"]`.

## Built-in details

- Invert toggle (persisted in `localStorage`), and a grid overlay toggle — press
`Esc` to dismiss the overlay.
- Work entries use native `<details>`, so they open and close without JavaScript and
are keyboard accessible.
- The marquee, blinking status dot and all transitions stop under
`prefers-reduced-motion: reduce`.
- Fonts are self-hosted and preloaded, so nothing calls a third-party CDN.
- Skip link, visible focus rings, semantic headings, AA contrast in both themes.

## Deploying

It is four files and a font folder — drop it on any static host (Netlify, Pages,
S3, Cloudflare). No environment variables, no server code.
												
