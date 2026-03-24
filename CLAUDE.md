# CLAUDE.md — Studio Wievien

## What This Project Is

Studio Wievien is the creative practice of Wievien — a multi-discipline maker specializing in embroidery (borduurwerk), with her own clothing line Fancy Boogers. The site serves as exhibition, portfolio, and shop: showing everything Wievien makes while enabling direct sales.

**Disciplines:**
- **Borduurwerk** (core) — custom embroidery on clients' garments (caps, jackets, hoodies, any suitable fabric), plus original embroidery designs
- **Fancy Boogers** — Wievien's own clothing line
- **Workshops** — freelance creative workshops
- **Curated work** — past exhibitions and curated projects (part of the about/CV section)

**Brand:** Studio Wievien. Bilingual: Dutch (primary) + English.

---

## Creative Philosophy

**Voice:** Creative, direct, warm. "je/jij" in Dutch, casual in English. The work speaks first — words support, never overshadow. Front-load what matters. Kill filler.

**Visual-first:** This is a creative studio. Photography and process images lead. Text is secondary to the visual experience. Every page should feel like walking into a well-curated studio space.

**Framework:** Show (the work) → Tell (the story behind it) → Invite (to commission, buy, or attend).

**Scannability:** Bold key details. One idea per section. Let images breathe. Minimal text blocks — when text appears, it earns its space.

---

## Tech Stack

Astro (static, zero JS default) + Tailwind CSS + CSS custom properties. React islands only for interactive elements (shop cart, contact forms). Astro Content Collections for portfolio pieces and products. Self-hosted WOFF2 fonts. Image-heavy with aggressive optimization (AVIF/WebP, lazy loading, responsive srcset).

**Astro project root:** `studio-wievien/site/`

**Dev/build:** `cd site && npm run dev` (localhost:4321) | `npm run build` (static output to `dist/`)

---

## Content Collections

### Portfolio (werk/work)

```yaml
titel: "..."
titelEN: "..."
slug: "..."
categorie: "borduurwerk|fancy-boogers|workshop|curatie"
datum: 2026-03-01
afbeeldingen:
  - src: "..."
    alt: "..."
    altEN: "..."
    isPrimary: true
beschrijving: "..."                # NL
beschrijvingEN: "..."              # EN
technieken: ["handborduuren", "machine", "mixed-media"]
materialen: ["katoen", "denim", "wol"]
beschikbaar: true                  # For sale or not
prijs: 95.00                       # Optional — only if for sale
```

### Products (winkel/shop)

```yaml
naam: "..."
naamEN: "..."
slug: "..."
lijn: "fancy-boogers|borduurwerk|accessoires"
prijs: 65.00
afbeeldingen:
  - src: "..."
    alt: "..."
    altEN: "..."
maten: ["S", "M", "L", "XL"]      # If applicable
materiaal: "..."
beschrijving: "..."
beschrijvingEN: "..."
beschikbaar: true
voorraad: 5                        # Stock count
```

### Workshops

```yaml
titel: "..."
titelEN: "..."
slug: "..."
datum: 2026-04-15
locatie: "..."
plaatsen: 12
prijsPerPersoon: 45.00
beschrijving: "..."
beschrijvingEN: "..."
afbeelding: "..."
vol: false
```

---

## Design System

See `docs/visual-design-system.md` for the complete reference. Summary below.

**Colors:** To be defined — should feel creative, tactile, handmade. Not corporate. Not generic fashion-brand minimal. Think: the warmth of thread on fabric, studio light, raw materials.

**Typography:** To be selected — one expressive font for headings (personality, craft), one clean font for body (readability). Self-hosted WOFF2. See design system document for full requirements and CSS technique catalog.

**Imagery:** The centerpiece. High-quality photography of:
- Finished embroidery work (detail shots + full garment)
- Process shots (hands working, thread selection, machine close-ups)
- Fancy Boogers clothing (lookbook style + detail)
- Workshop atmosphere
- Studio environment

**Image optimization:** AVIF primary, WebP fallback, responsive `srcset`, lazy loading below the fold, blur-up placeholders. Target: no single image >200KB delivered. See `docs/visual-design-system.md` for performance budgets.

**Principles:** The work is the hero. Design supports, never competes. Craft feeling over corporate polish. Progressive disclosure — overview first, detail on demand.

---

## URL Architecture

```
/                              ← Homepage (featured work + latest)
/nl/                           ← Dutch root (if language prefix needed)
/en/                           ← English root

/werk/                         ← Portfolio overview (NL)
/work/                         ← Portfolio overview (EN)
/werk/{slug}/                  ← Individual piece (NL)
/work/{slug}/                  ← Individual piece (EN)

/fancy-boogers/                ← Clothing line overview
/fancy-boogers/{slug}/         ← Individual product

/borduurwerk/                  ← Embroidery services landing (NL)
/embroidery/                   ← Embroidery services landing (EN)

/workshops/                    ← Upcoming workshops
/workshops/{slug}/             ← Individual workshop

/winkel/                       ← Shop (NL)
/shop/                         ← Shop (EN)

/over-wievien/                 ← About + CV + exhibitions (NL)
/about/                        ← About (EN)
/contact/                      ← Contact
```

---

## Repository Structure

```
studio-wievien/
├── CLAUDE.md                  ← This file
├── .claude/rules/
│   └── principles.md          ← Creative decision-making framework
│
├── docs/
│   ├── visual-design-system.md    ← Design system (colors, typography, imagery, CSS techniques)
│   ├── seo-strategy.md            ← SEO strategy for creative portfolio + e-commerce
│   ├── google-search-central-reference.md  ← Google docs extraction (universal)
│   ├── tested-workflows.md        ← Lighthouse, Playwright, image optimization workflows
│   └── project-reference.md       ← Project structure, content pipeline, TODOs
│
└── site/                      ← Astro project root (to be created)
    ├── astro.config.mjs
    ├── tailwind.config.mjs
    ├── package.json
    │
    ├── public/
    │   ├── fonts/             ← Self-hosted WOFF2 fonts
    │   └── images/            ← Optimized portfolio/product images
    │
    └── src/
        ├── content.config.ts  ← Content Collection schemas (Zod)
        ├── content/
        │   ├── werk/          ← Portfolio pieces (.md)
        │   ├── producten/     ← Shop products (.md)
        │   └── workshops/     ← Workshop listings (.md)
        │
        ├── styles/global.css  ← @font-face, CSS custom properties, base resets
        │
        ├── layouts/
        │   ├── BaseLayout.astro       ← HTML shell, meta, OG, fonts, schema, i18n
        │   ├── WerkLayout.astro       ← Portfolio piece layout (image gallery + details)
        │   ├── ProductLayout.astro    ← Product page layout (images + buy)
        │   └── WorkshopLayout.astro   ← Workshop page layout
        │
        ├── components/
        │   ├── Header.astro, Footer.astro
        │   ├── ImageGallery.astro     ← Responsive image gallery with lightbox
        │   ├── LanguageSwitcher.astro ← NL/EN toggle
        │   ├── SchemaMarkup.astro     ← JSON-LD schema generation
        │   ├── WerkCard.astro         ← Portfolio piece card (grid item)
        │   ├── ProductCard.astro      ← Shop product card
        │   └── WorkshopCard.astro     ← Workshop listing card
        │
        └── pages/
            ├── index.astro            ← Homepage
            ├── nl/                    ← Dutch pages
            │   ├── werk/
            │   ├── borduurwerk.astro
            │   ├── workshops/
            │   ├── winkel/
            │   ├── over-wievien.astro
            │   └── contact.astro
            └── en/                    ← English pages
                ├── work/
                ├── embroidery.astro
                ├── workshops/
                ├── shop/
                ├── about.astro
                └── contact.astro
```

---

## Key Reference Files

| Need | Read |
|------|------|
| Design system: colors, typography, imagery, CSS techniques, readability | `docs/visual-design-system.md` |
| SEO strategy, schema markup, topical authority | `docs/seo-strategy.md` |
| Google Search Central official docs, extracted | `docs/google-search-central-reference.md` |
| Lighthouse/Playwright/image optimization workflows | `docs/tested-workflows.md` |
| Project structure, file tree, content pipeline, TODOs | `docs/project-reference.md` |

---

## Image Pipeline

Images are the core content. The pipeline must be rigorous:

1. **Source:** High-resolution photography (minimum 2400px on longest edge)
2. **Process:** Generate AVIF + WebP + fallback JPEG via build script
3. **Sizes:** Generate responsive variants (400w, 800w, 1200w, 1600w)
4. **Metadata:** Every image needs `alt` text in both NL and EN
5. **Loading:** Above-fold images eager-loaded, everything else lazy with blur-up placeholder
6. **Budget:** No delivered image >200KB. Hero images max 150KB. Thumbnails max 30KB.

---

## Internationalization (i18n)

Bilingual NL/EN with:
- Separate URL paths (`/nl/werk/` vs `/en/work/`)
- `hreflang` tags linking equivalent pages
- Content Collections with NL and EN fields
- Language switcher component on every page
- Default language: Dutch (homepage `/` redirects to `/nl/` or shows NL)

---

## Schema Markup

| Page type | Schema | Purpose |
|-----------|--------|---------|
| Homepage | `Organization` + `WebSite` | Brand identity |
| Portfolio pieces | `CreativeWork` or `VisualArtwork` | Individual works |
| Products | `Product` + `Offer` | E-commerce visibility |
| Workshops | `Event` + `Offer` | Event discovery |
| About | `Person` + `Organization` | Creator identity |
| All pages | `BreadcrumbList` | Navigation structure |
