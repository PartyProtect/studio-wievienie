# CLAUDE.md — Studio Wievien

## What This Project Is

Studio Wievien is the creative practice of Wievien — a multi-discipline maker specializing in embroidery (borduurwerk), with her own clothing line Fancy Boogers. The site serves as exhibition, portfolio, and shop: showing everything Wievien makes while enabling direct sales.

**Disciplines:** Borduurwerk (core), Fancy Boogers (clothing line), Workshops, Curated work (CV/about section).

**Brand:** Studio Wievien. Bilingual: Dutch (primary) + English.

---

## Creative & Visual Direction

**This is not a standard website.** Studio Wievien is a creative studio — the site must feel like walking into that studio. Creative, tactile, handmade. Not corporate, not template-minimal, not generic fashion-brand clean. The photography and craft are the centerpiece; the design amplifies that energy without competing with the work.

**Voice:** Creative, direct, warm. "je/jij" in Dutch, casual in English. The work speaks first — words support, never overshadow.

**Framework:** Show (the work) → Tell (the story behind it) → Invite (to commission, buy, or attend).

**When building any visual component or layout:** Read `docs/visual-design-system.md` first. It contains the aesthetic philosophy, design patterns (gallery, portfolio grid, cards), CSS techniques catalog (grain overlays, staggered animations, color-mix hover states, container queries), typography scale, spacing, and image specs. Don't guess — the design system is the source of truth.

**When making hard creative decisions:** See `.claude/rules/principles.md` for the framework that navigates tensions (visual impact vs. performance, selling vs. showing, creative expression vs. usability).

---

## Tech Stack

Astro (static, zero JS default) + Tailwind CSS + CSS custom properties. React islands only for interactive elements (shop cart, contact forms). Astro Content Collections for portfolio pieces and products. Self-hosted WOFF2 fonts.

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

## Key References

| Need | Read |
|------|------|
| Creative decision-making framework | `.claude/rules/principles.md` |
| Design system: colors, typography, CSS techniques, image specs | `docs/visual-design-system.md` |
| Project structure, content per page, open questions, TODOs | `docs/project-reference.md` |
| SEO strategy, schema markup, internal linking | `docs/seo-strategy.md` |
| Google Search Central official docs | `docs/google-search-central-reference.md` |
| Lighthouse, Playwright, image optimization commands | `docs/tested-workflows.md` |
