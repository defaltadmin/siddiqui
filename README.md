# Mohammed Ahmed Siddiqui — Story CV Site

A full-screen, keyboard-driven story CV with fluid morph transitions.

## Structure

```
/                     →  siddiqui.mscarabia.com          (base CV)
/hikvision/           →  siddiqui.mscarabia.com/hikvision (tailored page)
/_template/           →  copy & rename for each new company
assets/               →  shared CSS + JS engine
content/profile.js    →  ALL your copy — edit here
assets/logos/         →  drop logo PNGs here
assets/photos/        →  drop event photos here
```

## Navigation

| Key | Action |
|-----|--------|
| `↓` `→` `Space` `Enter` | Next slide |
| `↑` `←` `Backspace` | Previous slide |
| `Home` / `End` | First / last slide |
| `F` | Toggle fullscreen |
| Mouse wheel | Next / prev |
| Touch swipe | Next / prev |
| Dots (right edge) | Jump to slide |
| `#N` in URL | Deep link to slide N |

## Adding your logos

Drop PNG or SVG files into the right subfolder and update `profile.js`:

- `assets/logos/companies/`  → employers (promise.png, nuevo.png, mastt.png …)
- `assets/logos/partners/`   → system integrators (stc-solutions.png …)
- `assets/logos/oems/`       → OEM brands (western-digital.png, seagate.png …)

If an image is missing the engine falls back to a text wordmark automatically.

## Adding photos

Drop JPG/PNG into `assets/photos/` and add entries to the `moments` slide in `profile.js`.

## Creating a company-tailored page

1. `cp -r _template/ companyname/`
2. Edit `companyname/company.js` — paste the real JD, fill in `rows[]`
3. Set `accent` to the company’s brand colour
4. Drop their logo into `assets/logos/companies/companyname.png`
5. Upload the whole site; it’s live at `/companyname/`

## Deployment (cPanel / Netlify / Cloudflare Pages)

### Subdomain on cPanel
1. cPanel → **Subdomains** → create `siddiqui.mscarabia.com` pointing to `public_html/siddiqui/`
2. Upload the entire folder contents via File Manager or FTP into that directory.
3. For company pages: upload `hikvision/` folder; no build step needed.

### Netlify (drag & drop)
1. Go to app.netlify.com → **Add new site → Deploy manually**
2. Drag the `cv-site` folder into the upload zone.
3. Add a custom domain in **Domain settings**.

### Cloudflare Pages
1. Push the folder to a GitHub repo.
2. Cloudflare Pages → Connect repo → no build command, output directory `/`.

## Editing copy

All text lives in `content/profile.js`. Structure:
- `window.PROFILE.slides[]` — each object is one slide
- `id` — used by company pages to override or remove slides
- `morph` key — elements with matching keys animate between slides (Magic Move)

## Adding a new slide type

1. Add your slide object to `slides[]` with a unique `id` and `type`.
2. In `assets/deck.js`, add a renderer function to the `R` object with that type name.
3. The engine handles entrance animations, morph tracking and navigation automatically.
