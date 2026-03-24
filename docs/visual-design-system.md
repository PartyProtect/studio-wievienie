# Visual Design System — Studio Wievien

A single reference for every visual and CSS decision on Studio Wievien. Combines the project's aesthetic philosophy, design vocabulary, and CSS technique catalog. Read this before creating or modifying any visual component, CSS, or layout.

---

## Table of Contents

1. [Aesthetic Philosophy](#aesthetic-philosophy)
2. [Design Vocabulary](#design-vocabulary) (includes [Readability Standards](#readability-standards))
3. [Design Pattern Guidance](#design-pattern-guidance)
4. [CSS Techniques Catalog](#css-techniques-catalog)
5. [Image Pipeline & Photography](#image-pipeline--photography)
6. [Technical Approach & Performance](#technical-approach--performance)
7. [Workflows](#workflows)

---

## Aesthetic Philosophy

### The Core Question

Every visual element must answer: **does this let Wievien's work shine — or does it compete with it?**

The site is a space for handmade craft. The design should feel like walking into a well-lit studio — not a corporate website, not a generic template, not a cluttered marketplace.

### Our Position

Creative portfolio sites typically fall into two traps:
- **Over-designed** — the website itself tries to be the art, competing with the work it's supposed to showcase
- **Under-designed** — minimal template with no personality, interchangeable with any other portfolio

We occupy the space between: **a distinctive creative space that serves the work, not itself.**

### Five Principles

1. **The work is the hero.** If removing a design element loses no connection to the work, remove it. The embroidery, the clothing, the process — that's the content. Everything else supports.

2. **Craft is felt in the details.** Consistent spacing, thoughtful type, considered color. The same care that goes into stitching should be felt in the digital experience. No sloppy defaults.

3. **Performance is a feature.** Image-heavy doesn't mean slow. AVIF/WebP, responsive srcset, lazy loading, blur-up placeholders. FCP under 0.8s. Every image earns its bytes.

4. **Show texture, not polish.** This isn't a corporate brand. It's a studio. The palette should feel like materials — thread, fabric, wood, paper — not like a SaaS color scheme.

5. **Consistent visual vocabulary.** Once a pattern is established — card style, image treatment, spacing rhythm — it stays consistent everywhere. Consistency builds trust; inconsistency creates noise.

### What We Avoid

- Stock photography (everything is Wievien's actual work)
- Corporate minimalism (this is a creative studio, not a tech company)
- Cluttered marketplace aesthetic (no competing CTAs, no banner ads feeling)
- Over-animated interfaces (let the images breathe)
- Dark mode for its own sake (unless it serves the photography)

---

## Design Vocabulary

### Colors

**Status: TO BE DEFINED.** The palette should feel creative, tactile, handmade. Not corporate. Not generic fashion-brand minimal. Think: the warmth of thread on fabric, studio light, raw materials.

**Requirements for the palette:**
- Warm background tone (not pure white, not cold gray)
- Primary accent color for CTAs and interactive elements
- Secondary accent for supporting UI
- Text colors with clear hierarchy (primary, secondary, tertiary)
- All text must meet WCAG 2.1 AA contrast (4.5:1 for normal text, 3:1 for large text ≥18px bold)

**Placeholder tokens (to be replaced with actual values):**

| Token | Role | Notes |
|-------|------|-------|
| `--bg` | Page background | Warm, paper-like |
| `--bg-card` | Card/section background | Slightly darker than bg |
| `--text` | Primary body text | High contrast, near-black |
| `--text-mid` | Secondary text | Descriptions, metadata |
| `--text-light` | Tertiary text | Captions, small labels |
| `--accent` | Primary accent | CTAs, links, interactive |
| `--accent-bg` | Accent background tint | Subtle background for accent areas |
| `--border` | Divider lines, card borders | Subtle, warm |

### Typography

**Status: TO BE DEFINED.** Two fonts needed:
- **Heading font:** Expressive, with personality. Communicates craft without being kitchy. Serif or display — must have character.
- **Body font:** Clean, readable. Sans-serif. Comfortable at 17px for long descriptions.

**Requirements:**
- Self-hosted WOFF2 (no external font dependencies)
- Latin Extended subset (Dutch characters: ë, ö, ü, etc.)
- Heading font needs weight 600+ for impact
- Body font needs weights 400 (body) and 600 (emphasis)
- Both must render well on screens at intended sizes

**Typography scale (sizes fixed, fonts TBD):**

| Element | Size | Weight | Line height |
|---------|------|--------|-------------|
| Page title | clamp(28px, 4vw, 40px) | 600 | 1.2 |
| Section heading (H2) | clamp(22px, 3vw, 30px) | 600 | 1.25 |
| Card title (H3) | clamp(18px, 2.2vw, 22px) | 600 | 1.3 |
| Body text | 17px | 400 | 1.7 |
| Product details | 15px | 400 | 1.5 |
| Labels, metadata | 13px | 600 | — |
| Small UI text | 11px | 700 | — |

### Readability Standards

*Based on research from Baymard Institute, Smashing Magazine, WCAG 2.1, and PMC legibility studies.*

#### Line length

**Rule: 50–75 characters per line for prose.** Sweet spot is ~65 characters. Enforce with `max-width: 640px` on prose containers.

Applies to: product descriptions, about page text, workshop descriptions, service page copy. Does NOT apply to image grids, cards, or navigation.

#### Minimum font sizes

**Rule: No text below 11px anywhere. All readable content ≥14px.**

| Category | Minimum | Examples |
|----------|---------|---------|
| Small UI elements | 11px | Price badges, status indicators |
| Labels, metadata | 13px | Material info, technique tags |
| Readable content | 14px | Product details, dates |
| Navigation | 15px | Header links, footer links |
| Body prose | 17px | Descriptions, about text |

#### Spacing

| Element | Spacing |
|---------|---------|
| Paragraph spacing | 20px |
| List item spacing | 10px |
| Card gap (grid) | 24px |
| Section spacing | 48–64px |
| Image caption spacing | 8px above caption |

---

## Design Pattern Guidance

### Image Gallery (Portfolio + Product Pages)

The centerpiece component. Must handle:
- Multiple images per piece (detail + full view)
- Lightbox for full-resolution viewing
- Responsive layout (single column mobile, grid desktop)
- Lazy loading with blur-up placeholders
- Keyboard navigation in lightbox

**Pattern:** Primary image large, secondary images as thumbnails below or beside. Click any image for lightbox. Swipe on mobile.

### Portfolio Grid (Overview Pages)

Masonry or uniform grid showing portfolio pieces.
- Primary image per piece
- Title overlay or below
- Category indicator
- Hover state: subtle scale or opacity shift (NOT dramatic)
- Filter by category (borduurwerk, Fancy Boogers, workshops)

**The "All-But-Me" Spotlight (hover):**
```css
.grid:has(.item:hover) .item:not(:hover) {
  opacity: 0.5;
  filter: saturate(0.4);
}
.item {
  transition: opacity 0.35s, filter 0.35s;
}
```

### Product Cards (Shop)

- Product image (consistent aspect ratio across cards)
- Product name
- Price
- Availability indicator
- Size options (if applicable)
- Hover: show "Bekijk" or subtle animation

### Workshop Cards

- Workshop image
- Title
- Date + location
- Price per person
- Spots remaining / "Vol" indicator
- CTA: "Inschrijven" or "Meer info"

---

## CSS Techniques Catalog

Copy-paste-ready patterns relevant to this project's stack (Astro, Tailwind, CSS custom properties, self-hosted WOFF2 fonts).

### Typography Techniques

#### Fluid Typography with clamp()

```css
h1 { font-size: clamp(1.75rem, 4vw, 2.5rem); }
h2 { font-size: clamp(1.375rem, 3vw, 1.875rem); }
p  { font-size: clamp(0.95rem, 1.5vw, 1.0625rem); }
```

#### Text Box Trim (Optical Centering)

```css
.badge, .price-tag {
  text-box: trim-both cap alphabetic;
}
```

### Color Techniques

#### color-mix() for Hover/Pressed States

```css
.btn-hover {
  background: color-mix(in oklch, var(--accent) 85%, white);
}
.btn-pressed {
  background: color-mix(in oklch, var(--accent) 80%, black);
}
```

#### Tinted Shadows

We generally avoid heavy shadows, but where needed (lightbox overlay, elevated cards):

```css
--shadow-sm:
  0.5px 1px 1px hsl(35 40% 10% / 0.6);

--shadow-md:
  1px 2px 2px hsl(35 40% 10% / 0.35),
  2px 4px 4px hsl(35 40% 10% / 0.25),
  4px 8px 8px hsl(35 40% 10% / 0.15);
```

### Motion Techniques

#### Staggered Entry (Portfolio Grid)

Cards appear in sequence when scrolling into view.

```css
.item {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.4s, transform 0.4s;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

.item:nth-child(1) { transition-delay: 0ms; }
.item:nth-child(2) { transition-delay: 80ms; }
.item:nth-child(3) { transition-delay: 160ms; }
.item:nth-child(4) { transition-delay: 240ms; }

.visible .item {
  opacity: 1;
  transform: translateY(0);
}
```

#### View-Triggered Reveal (CSS-Only)

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: fadeSlideIn linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 40%;
  }
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(30px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

#### Timing Functions

```css
--ease-snappy:   cubic-bezier(0.22, 1, 0.36, 1);    /* UI interactions */
--ease-bouncy:   cubic-bezier(0.34, 1.56, 0.64, 1);  /* Playful reveals */
--ease-dramatic: cubic-bezier(0.7, 0, 0.3, 1);        /* Hero transitions */
```

#### Reduced Motion (Non-Negotiable)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Surface Techniques

#### Subtle Grain Overlay

Enhances tactile, studio feeling. Keep opacity very low.

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 180px;
}
```

#### Mask Fade-Out

Useful for image previews or content that fades into background.

```css
.fade-bottom {
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}
```

### Layout Techniques

#### Container Queries

Components that reshape based on their container. Useful for portfolio cards in different contexts.

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
  }
}
```

#### :has() Parent Styling

Style a container based on what it contains.

```css
/* Cards with images get grid layout */
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* Cards without images center text */
.card:not(:has(img)) {
  text-align: center;
}
```

---

## Image Pipeline & Photography

### Photography Guidelines (TO BE DEFINED)

Needs decisions on:
- Consistent lighting style (natural vs. studio)
- Background approach (neutral, contextual, studio environment)
- Color temperature consistency
- Detail shot requirements (minimum close-up distance, thread visibility)
- Full piece shots (styling, context, background)
- Process documentation (what stages to capture)

### Image Optimization

**Formats:** AVIF primary, WebP fallback, JPEG last resort.

**Responsive sizes:**

| Variant | Width | Use case |
|---------|-------|----------|
| Thumbnail | 400w | Grid cards, related items |
| Medium | 800w | Mobile full-width, tablet grid |
| Large | 1200w | Desktop content area |
| Full | 1600w | Lightbox, hero images |
| Placeholder | 20w | Blur-up LQIP |

**Performance budgets:**

| Context | Max delivered size |
|---------|--------------------|
| Hero images | 150KB |
| Portfolio/product images | 200KB |
| Thumbnails/grid items | 30KB |
| Blur-up placeholders | 1KB |

**Responsive image pattern:**

```html
<picture>
  <source
    type="image/avif"
    srcset="img-400w.avif 400w, img-800w.avif 800w, img-1200w.avif 1200w, img-1600w.avif 1600w"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
  <source
    type="image/webp"
    srcset="img-400w.webp 400w, img-800w.webp 800w, img-1200w.webp 1200w, img-1600w.webp 1600w"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
  <img
    src="img-800w.jpg"
    alt="Descriptive alt text in NL"
    loading="lazy"
    decoding="async"
    width="800"
    height="600"
  />
</picture>
```

**Above-fold images:** Use `loading="eager"` and `fetchpriority="high"` instead of lazy. Preload with `<link rel="preload" as="image" type="image/avif">` for hero images.

### Alt Text Guidelines

Every image gets descriptive alt text in both NL and EN.

**Good:** "Handgeborduurd bloemmotief op donkerblauwe denim jas, close-up van steekdetail met rode en gele katoenen draad"

**Bad:** "Borduurwerk" / "Product foto" / "IMG_4521"

**Pattern:** [Technique] + [Subject] + [Material/Color] + [Context/Detail level]

---

## Technical Approach & Performance

### Zero JS Default

Astro ships zero JavaScript by default. Only add `client:load` for:
- Image lightbox (if interactive)
- Shop cart functionality
- Contact form validation
- Language switcher (if client-side)

Everything else is static HTML + CSS.

### Performance Budget

Target: **FCP under 0.8s** (portfolio sites are image-heavier than text sites, so slightly relaxed from MeisterEnergie's 0.4s target).

| Constraint | Budget |
|-----------|--------|
| Astro baseline (HTML + purged Tailwind CSS) | ~15–25KB |
| Above-fold hero image (AVIF) | <150KB |
| Total above-fold weight | <250KB |
| Web fonts (critical weights only) | <100KB |
| Any single page total weight | <1MB |

### Font Loading Strategy

- Critical fonts (heading 600, body 400) use `font-display: swap` + `<link rel="preload">`
- Non-critical weights use `font-display: optional`
- System font fallbacks defined to minimize layout shift

---

## Workflows

### Visual Preview

**Every page must be screenshot-verified before committing.** Build, preview, screenshot, read the screenshot, iterate.

**Quick preview:**
```bash
cd studio-wievien/site && npm run build
npx astro preview --port 4322 &
sleep 3

node -e "
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.route('**/fonts.googleapis.com/**', route => route.abort());
  await page.route('**/fonts.gstatic.com/**', route => route.abort());
  await page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/page-screenshot.png' });
  await browser.close();
})();
"
# Then read /tmp/page-screenshot.png with Read tool
```

### Image Optimization Commands

See `docs/tested-workflows.md` for sharp-cli commands.
