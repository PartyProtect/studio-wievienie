# Project Reference — Studio Wievien

Reference material for project structure, page content specifications, decisions, and TODOs.

*Last verified: 24 maart 2026.*

---

## Project Structure

```
studio-wievien/
├── CLAUDE.md                          ← Project brief + content collection schemas
├── .claude/rules/
│   └── principles.md                  ← Creative decision-making framework
│
├── docs/
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

## Decisions Already Made

| Decision | Choice | Notes |
|----------|--------|-------|
| **Site type** | Exhibition + shop | Visually show all work, with ability to buy |
| **Language** | Bilingual NL/EN | Separate URL paths per language |
| **Visual direction** | Creative, not minimalist | Not standard fashion-minimal. Lots of images. |
| **Images** | Central to the design | Photography is the core. Technical optimization essential. |
| **Tech stack** | Astro + Tailwind CSS | Static with React islands where needed |
| **Curation/exhibitions** | Part of About page | CV material, not a separate portfolio section |
| **Hosting** | Netlify (preliminary) | Same as MeisterEnergie |

---

## URL Architecture

### Nederlands
```
/                          ← Homepage (uitgelicht werk + laatste toevoegingen)
/nl/werk/                  ← Portfolio overzicht (alle disciplines)
/nl/werk/{slug}/           ← Individueel werk (foto's + verhaal)
/nl/fancy-boogers/         ← Kledinglijn overzicht
/nl/fancy-boogers/{slug}/  ← Individueel product
/nl/borduurwerk/           ← Borduurwerk diensten (wat kan, hoe werkt het, tarieven)
/nl/workshops/             ← Overzicht aankomende workshops
/nl/workshops/{slug}/      ← Individuele workshop
/nl/winkel/                ← Shop (alle producten)
/nl/over-wievien/          ← Over + CV + tentoonstellingen + achtergrond
/nl/contact/               ← Contact
```

### English
```
/en/work/                  ← Portfolio overview
/en/work/{slug}/           ← Individual piece
/en/fancy-boogers/         ← Clothing line
/en/fancy-boogers/{slug}/  ← Individual product
/en/embroidery/            ← Embroidery services
/en/workshops/             ← Workshops overview
/en/workshops/{slug}/      ← Individual workshop
/en/shop/                  ← Shop
/en/about/                 ← About
/en/contact/               ← Contact
```

---

## i18n (Internationalization)

- Separate URL paths: `/nl/werk/` vs `/en/work/`
- `hreflang` tags linking equivalent pages
- Content Collections with NL and EN fields (e.g. `beschrijving` + `beschrijvingEN`)
- Language switcher component on every page
- Default language: Dutch (homepage `/` redirects to or shows NL)

---

## Content Per Page

### Homepage
- Hero: groot beeld van recent/sterkste werk
- Korte intro: wie is Wievien, wat doet ze (2-3 zinnen max)
- Uitgelicht werk: 3-6 stuks uit alle disciplines
- Laatste toevoegingen
- Link naar Fancy Boogers
- Link naar borduurwerk/opdrachten
- Aankomende workshop (als die er is)

### Werk / Portfolio
- Grid/masonry van al het werk, gefilterd op categorie
- Categorieen: borduurwerk, Fancy Boogers, workshops, overig
- Elk item: hoofdfoto + titel + categorie
- Click → individuele pagina met meerdere foto's + verhaal

### Individueel Werk
- Fotogalerij (meerdere beelden, detail + totaal)
- Titel + beschrijving (kort)
- Technieken + materialen
- Beschikbaarheid / koopoptie als van toepassing
- Gerelateerd werk

### Fancy Boogers (kledinglijn)
- Lookbook-achtige presentatie
- Elk kledingstuk als product met meerdere foto's
- Maten, materiaal, prijs
- Koop-optie

### Borduurwerk (diensten)
- Wat kan er geborduurd worden (types kleding/items)
- Hoe werkt het proces (van ontwerp tot aflevering)
- Voorbeelden van eerder werk
- Tarieven / prijsindicatie (nog te bepalen)
- CTA: neem contact op voor een opdracht

### Workshops
- Overzicht met aankomende data
- Per workshop: wat leer je, voor wie, prijs, locatie, aantal plaatsen
- Inschrijfmogelijkheid of contact-link

### Winkel / Shop
- Alle producten (Fancy Boogers + losse borduurwerken te koop)
- Filter op categorie
- Product → detail pagina met foto's, beschrijving, prijs, maten, koop-knop
- **Betaalmethode: nog te bepalen** (Mollie, Stripe, extern, of handmatig)

### Over Wievien
- Wie is Wievien (persoonlijk verhaal)
- Achtergrond en opleiding
- Gecureerde tentoonstelling(en) — als CV-items
- Freelance ervaring
- Eventueel press/media mentions

### Contact
- Contactformulier of directe links (email, Instagram, etc.)
- Voor opdrachten, workshops, samenwerkingen, pers

---

## Build & Development

```bash
cd studio-wievien/site && npm run dev      # localhost:4321
cd studio-wievien/site && npm run build    # outputs to dist/
cd studio-wievien/site && npm run preview  # preview production build
```

---

## Open Questions

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

### Phase 1: Documentation
- [x] CLAUDE.md
- [x] principles.md
- [x] visual-design-system.md
- [x] seo-strategy.md
- [x] google-search-central-reference.md
- [x] tested-workflows.md
- [x] project-reference.md

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
