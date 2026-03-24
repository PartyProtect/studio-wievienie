# Project Reference — Studio Wievien

Reference material for project structure, content pipeline, workflows, and TODOs. Read on-demand when needed — not loaded into every session.

*Last verified: 24 maart 2026.*

---

## Project Structure

```
studio-wievien/
├── CLAUDE.md                          ← Project brief + entry point
├── .claude/rules/
│   └── principles.md                  ← Creative decision-making framework
│
├── docs/
│   ├── website-ontwerp-plan.md        ← Design decisions + sitemap + open questions
│   ├── visual-design-system.md        ← Design system (colors, typography, imagery, CSS)
│   ├── seo-strategy.md                ← SEO strategy for portfolio + e-commerce
│   ├── google-search-central-reference.md ← Google docs extraction
│   ├── tested-workflows.md            ← Lighthouse, Playwright, image optimization workflows
│   └── project-reference.md           ← This file
│
└── site/                              ← Astro project root (to be created)
    ├── astro.config.mjs
    ├── tailwind.config.mjs
    ├── package.json
    │
    ├── public/
    │   ├── fonts/                     ← Self-hosted WOFF2 fonts
    │   └── images/                    ← Optimized portfolio/product images
    │
    └── src/
        ├── content.config.ts          ← Content Collection schemas (Zod)
        ├── content/
        │   ├── werk/                  ← Portfolio pieces (.md)
        │   ├── producten/             ← Shop products (.md)
        │   └── workshops/             ← Workshop listings (.md)
        │
        ├── styles/global.css          ← @font-face, CSS custom properties, base resets
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
            │   ├── fancy-boogers/
            │   ├── over-wievien.astro
            │   └── contact.astro
            └── en/                    ← English pages
                ├── work/
                ├── embroidery.astro
                ├── workshops/
                ├── shop/
                ├── fancy-boogers/
                ├── about.astro
                └── contact.astro
```

---

## Content Collections

### Werk (Portfolio)

Each portfolio piece is a `.md` file in `src/content/werk/`. Schema defined in `content.config.ts`.

**Fields:** `titel`, `titelEN`, `slug`, `categorie` (borduurwerk|fancy-boogers|workshop|curatie), `datum`, `afbeeldingen[]` (src, alt, altEN, isPrimary), `beschrijving`, `beschrijvingEN`, `technieken[]`, `materialen[]`, `beschikbaar`, `prijs` (optional).

### Producten (Shop)

Each product is a `.md` file in `src/content/producten/`.

**Fields:** `naam`, `naamEN`, `slug`, `lijn` (fancy-boogers|borduurwerk|accessoires), `prijs`, `afbeeldingen[]`, `maten[]` (if applicable), `materiaal`, `beschrijving`, `beschrijvingEN`, `beschikbaar`, `voorraad`.

### Workshops

Each workshop is a `.md` file in `src/content/workshops/`.

**Fields:** `titel`, `titelEN`, `slug`, `datum`, `locatie`, `plaatsen`, `prijsPerPersoon`, `beschrijving`, `beschrijvingEN`, `afbeelding`, `vol`.

---

## Build & Development

```bash
# Development
cd studio-wievien/site && npm run dev    # localhost:4321

# Production build
cd studio-wievien/site && npm run build  # outputs to dist/

# Preview production build
cd studio-wievien/site && npm run preview
```

---

## Image Pipeline

Source images → optimized outputs. Critical for a photography-heavy site.

1. **Source:** High-resolution photography (minimum 2400px on longest edge)
2. **Process:** Generate AVIF + WebP + fallback JPEG via build script or sharp-cli
3. **Sizes:** Responsive variants at 400w, 800w, 1200w, 1600w
4. **Metadata:** Every image needs `alt` text in both NL and EN
5. **Loading:** Above-fold images eager-loaded, everything else lazy with blur-up placeholder
6. **Budget:** Hero ≤150KB, portfolio/product ≤200KB, thumbnails ≤30KB, placeholders ≤1KB

See `docs/tested-workflows.md` for commands.

---

## i18n (Internationalization)

- Separate URL paths: `/nl/werk/` vs `/en/work/`
- `hreflang` tags linking equivalent pages
- Content Collections with NL and EN fields (e.g. `beschrijving` + `beschrijvingEN`)
- Language switcher component on every page
- Default language: Dutch (homepage `/` redirects to or shows NL)

---

## Schema Markup Plan

| Page type | Schema | Purpose |
|-----------|--------|---------|
| Homepage | `Organization` + `WebSite` | Brand identity |
| Portfolio pieces | `CreativeWork` or `VisualArtwork` | Individual works |
| Products | `Product` + `Offer` | E-commerce rich results |
| Workshops | `Event` + `Offer` | Event discovery |
| About | `Person` + `Organization` | Creator identity |
| All pages | `BreadcrumbList` | Navigation structure |

---

## Open Questions (from website-ontwerp-plan.md)

| Topic | Status |
|-------|--------|
| Color palette | Open |
| Typography selection | Open |
| Logo / wordmark | Open |
| Which clothing types suitable for embroidery | Open |
| Payment method (Mollie, Stripe, external) | Open |
| Photography style guidelines | Open |
| Embroidery pricing | Open |
| Workshop planning (frequency, locations) | Open |
| Domain name | Open |
| Analytics (Plausible?) | Open |
| Newsletter | Open |
| Instagram integration | Open |

---

## TODOs

### Phase 1: Documentation (current)
- [x] CLAUDE.md
- [x] website-ontwerp-plan.md
- [x] google-search-central-reference.md
- [x] principles.md
- [x] tested-workflows.md
- [x] project-reference.md (this file)
- [ ] seo-strategy.md
- [ ] visual-design-system.md

### Phase 2: Design Decisions
- [ ] Select color palette
- [ ] Select typography (2 fonts)
- [ ] Define photography style guidelines
- [ ] Create/obtain logo or wordmark

### Phase 3: Astro Project Setup
- [ ] Initialize Astro project in `site/`
- [ ] Configure Tailwind CSS + custom properties
- [ ] Set up Content Collection schemas (Zod)
- [ ] Create BaseLayout with i18n, meta, OG, schema
- [ ] Create component skeletons
- [ ] Set up image optimization pipeline
- [ ] Self-host selected fonts

### Phase 4: Content & Pages
- [ ] Build homepage
- [ ] Build portfolio overview + individual pages
- [ ] Build Fancy Boogers section
- [ ] Build borduurwerk services page
- [ ] Build workshop pages
- [ ] Build shop
- [ ] Build about + contact pages
- [ ] Enter first portfolio content
- [ ] Enter first products

### Phase 5: Launch Prep
- [ ] Decide payment integration
- [ ] Choose and configure domain
- [ ] Set up Netlify deployment
- [ ] Configure analytics
- [ ] Lighthouse audit all key pages
- [ ] Submit sitemap to Search Console
