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

**Direction: Quiet Editorial.**

Inspired by how Prada, Acne Studios, and fashion editorial magazines present work — the photography leads, the design breathes, nothing screams. Warm, light, confident. Not dark. Not neon. Not carnival.

For the full creative decision-making framework, see `.claude/rules/principles.md`.

**The core question for every visual element:** does this let Wievien's work shine — or does it compete with it?

**Our position:** Between over-designed (website as art, competing with the work) and under-designed (generic template). We want a distinctive creative space that serves the work, not itself. The design should feel like opening a well-made fashion magazine — generous whitespace, considered typography, restrained color.

**What we avoid:**
- Dark/neon aesthetics (no glows, no aurora effects)
- Gradient text, shimmer text, neon text shadows
- Heavy animations (clip-paths, blur reveals, bouncy easings)
- Glass panels, backdrop-blur cards
- Stock photography, corporate minimalism, cluttered marketplace aesthetic
- Anything that feels like TV sales or startup landing pages

**What we embrace:**
- Warm cream backgrounds (paper-like)
- High-contrast serif headings (editorial, fashion magazine)
- Generous whitespace — let sections breathe
- Thin, quiet dividers between sections
- Photography as the hero — large, unhurried
- Subtle grain overlay for tactile, handmade feel
- Restrained motion (fade up only, no gimmicks)

---

## Design Vocabulary

### Colors

**Palette: Quiet Editorial — warm cream, muted earth tones.**

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#FAF7F2` | Page background — warm cream, paper-like |
| `--bg-card` | `#F3EEE7` | Card/section background — slightly warmer |
| `--bg-elevated` | `#EDE7DE` | Elevated surfaces, hover states |
| `--bg-contrast` | `#1A1714` | Dark sections (rare, for editorial contrast) |
| `--text` | `#1A1714` | Primary text — near-black, warm |
| `--text-mid` | `#6B635A` | Secondary text — descriptions, metadata |
| `--text-light` | `#9B938A` | Tertiary text — captions, labels |
| `--accent` | `#8B6D5C` | Primary accent — warm terracotta, quiet |
| `--accent-hover` | `#6E5648` | Accent on hover — deeper |
| `--accent-bg` | `#F0E8E0` | Subtle tint for accent areas |
| `--border` | `#E4DDD5` | Dividers, card borders — barely there |
| `--border-dark` | `#CFC6BB` | Stronger dividers when needed |

All text meets WCAG 2.1 AA contrast (4.5:1 for normal text, 3:1 for large text ≥18px bold).

### Typography

**Heading font: Cormorant Garamond** — a high-contrast display serif with dramatic thick-thin transitions. Editorial, fashion-magazine quality. Free via Google Fonts, available in WOFF2 for self-hosting.

**Body font: DM Sans** — clean, modern sans-serif. Comfortable at 17px for long descriptions. Good Latin Extended support.

**Status:** Currently using system fallback fonts. WOFF2 files need to be downloaded and added to `/site/public/fonts/` with proper `@font-face` declarations. Both fonts are free and support Latin Extended (Dutch characters: ë, ö, ü, etc.).

**Font stacks:**
- `--font-heading: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif`
- `--font-body: 'DM Sans', 'Inter', system-ui, sans-serif`

**Typography scale:**

| Element | Size | Weight | Line height |
|---------|------|--------|-------------|
| Page title (H1) | clamp(2.5rem, 6vw, 4.5rem) | 400 | 1.05 |
| Section heading (H2) | clamp(1.75rem, 3.5vw, 2.75rem) | 500 | 1.15 |
| Card title (H3) | clamp(1.25rem, 2.2vw, 1.625rem) | 500 | 1.25 |
| Body text | 17px | 400 | 1.7 |
| Product details | 15px | 400 | 1.5 |
| Labels, metadata | 11px | 600 | — |
| Small UI text | 11px | 700 | — |

**Key typographic choices:**
- Headings use lighter weights (400-500) — the serif's contrast provides visual impact without needing bold
- Body text at 17px with 1.7 line-height for comfortable reading
- Labels/metadata use uppercase + wide letter-spacing (0.12em+) for editorial feel
- Minimal letter-spacing on headings (-0.01em to -0.02em)

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
| Labels, metadata | 11px | Material info, technique tags |
| Readable content | 14px | Product details, dates |
| Navigation | 13px | Header links, footer links |
| Body prose | 17px | Descriptions, about text |

#### Spacing

| Element | Spacing |
|---------|---------|
| Paragraph spacing | 20px |
| List item spacing | 10px |
| Card gap (grid) | 20px |
| Section spacing | 80px (var(--space-xl)) |
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

Clean editorial grid showing portfolio pieces.
- Primary image per piece (4:5 portrait aspect ratio — editorial standard)
- Title below image
- Category in small uppercase text
- Hover state: subtle scale on image (1.03) + all-but-me fade
- Filter by category (borduurwerk, Fancy Boogers, workshops)

**The "All-But-Me" Spotlight (hover):**
```css
.grid:has(.item:hover) .item:not(:hover) {
  opacity: 0.4;
}
.item {
  transition: opacity 0.4s var(--ease-out);
}
```

### Product Cards (Shop)

- Product image (4:5 portrait, consistent across cards)
- Product name (serif heading)
- Price
- Availability indicator
- Size options (if applicable)
- Hover: subtle image scale

### Workshop Cards

- Workshop image
- Title
- Date + location (uppercase label style)
- Price per person
- Spots remaining
- CTA: "Inschrijven" or "Meer info"
- Card with thin border, slight shadow on hover

---

## CSS Techniques Catalog

All CSS techniques used or planned for Studio Wievien. Each technique is marked with its implementation status:

- **LIVE** — implemented and active in production code
- **READY** — CSS exists as a utility class, not yet applied to a component
- **PLANNED** — documented pattern, not yet implemented

Source files: `site/src/styles/global.css` (global utilities), `site/src/pages/index.astro` (homepage-scoped styles).

---

### Typography Techniques

#### Fluid Typography with clamp() — LIVE

Used on all headings and hero subtitle. Scales smoothly from mobile to desktop without breakpoints.

```css
h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); }
h2 { font-size: clamp(1.75rem, 3.5vw, 2.75rem); }
h3 { font-size: clamp(1.25rem, 2.2vw, 1.625rem); }
```

**Where:** `global.css` lines 206-208, hero h1 override in `index.astro`.

#### Font Pairing (Cormorant Garamond + DM Sans) — LIVE

Editorial serif for headings, clean sans for body. The serif's high contrast provides visual weight without needing bold weights.

```css
--font-heading: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
--font-body:    'DM Sans', 'Inter', system-ui, sans-serif;
```

**Where:** `global.css` :root, applied to `h1-h6` and `html`.

**Status:** Currently using system fallback fonts. WOFF2 files need to be downloaded and self-hosted.

#### Text Box Trim (Optical Centering) — PLANNED

```css
.badge, .price-tag {
  text-box: trim-both cap alphabetic;
}
```

For badges, price tags, and other small elements where vertical centering needs to be optically perfect.

---

### Color Techniques

#### color-mix() for Tinting — LIVE

Used in multiple places for dynamic color calculations without hard-coded hex values.

```css
/* Hover shadow with accent tint */
box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 15%, transparent);

/* Section fade with partial transparency */
background: color-mix(in srgb, var(--section-fade-to) 30%, transparent);

/* Duotone gradient stops */
background: color-mix(in srgb, var(--accent) 80%, #1A1714);
```

**Where:** `.img-hover:hover`, `.section-fade-bottom::after`, `.duotone-wrap::after` in `global.css`.

#### Tinted Warm Shadows — LIVE

All shadows use warm hue (hsl 30°) — never cold gray or pure black. Three tiers.

```css
--shadow-sm:  0 1px 2px hsl(30 20% 20% / 0.06), 0 1px 3px hsl(30 20% 20% / 0.04);
--shadow-md:  0 2px 4px hsl(30 20% 20% / 0.05), 0 4px 12px hsl(30 20% 20% / 0.06);
--shadow-lg:  0 4px 6px hsl(30 20% 20% / 0.04), 0 10px 24px hsl(30 20% 20% / 0.08), 0 20px 48px hsl(30 20% 20% / 0.06);
```

**Where:** `global.css` :root custom properties. Applied to `.ws-card`, `.img-hover`.

---

### Motion Techniques

#### Scroll-Driven Progress Bar — LIVE

Thin accent-colored line at the top of the viewport that grows as you scroll. Pure CSS, no JS.

```css
.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 2px; width: 100%;
  background: var(--accent);
  transform-origin: left;
  animation: growProgress linear;
  animation-timeline: scroll();
}
```

**Where:** `global.css`, applied via `<div class="scroll-progress">` in `index.astro`.

#### View-Triggered Reveals with Stagger — LIVE

Elements fade in and rise as they enter the viewport. CSS-only via `animation-timeline: view()`. Children stagger with incremental delays.

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: fadeIn linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
  }

  .reveal-stagger > *:nth-child(1) { animation-delay: 0ms; }
  .reveal-stagger > *:nth-child(2) { animation-delay: 60ms; }
  /* ... up to :nth-child(6) at 300ms */
}
```

**Where:** `global.css`. Applied to `.work-card.reveal` within `.work-grid.reveal-stagger` in `index.astro`.

#### Per-Section Scroll-Driven Transitions — LIVE

Each section type has a distinct entry animation tied to scroll position:

| Class | Animation | Used on |
|-------|-----------|---------|
| `.transition-fade-scale` | Fade in + scale from 0.96 | Intro section |
| `.transition-rise` | Rise 60px + clip-path reveal | Featured work |
| `.transition-wipe` | Clip-path wipe from left | Fancy Boogers (dark) |
| `.transition-float` | Rise 30px + scale + blur clear | Workshops |

```css
.transition-wipe {
  animation: enterWipe linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 50%;
}
```

**Where:** `global.css` keyframes, applied as classes on `<section>` elements in `index.astro`.

#### Parallax-Lite Drift — LIVE

Images drift upward slightly slower than scroll, creating subtle depth.

```css
.parallax-img {
  animation: parallaxDrift linear both;
  animation-timeline: view();
  animation-range: entry 0% exit 100%;
}
/* from translateY(30px) → to translateY(-30px) */
```

**Where:** `global.css`, applied to hero image placeholder in `index.astro`.

#### Scroll-Snap Page Turns — LIVE

Magazine-style vertical snapping. One flick = one section, no skipping.

**Desktop:** `mandatory` — every scroll action lands on a section. Combined with `scroll-snap-stop: always` to prevent overshooting multiple sections on fast scrolls. The browser's own snap animation provides a natural ~200ms cooldown between section transitions.

**Mobile (≤768px):** Falls back to `proximity` because sections can exceed viewport height. With `mandatory` on tall content, users could get trapped in a section they can't scroll past.

**Header offset:** `scroll-padding-top: 85px` ensures snap targets account for the sticky header — sections snap so their content starts below the header, not behind it.

```css
html {
  scroll-snap-type: y mandatory;
  scroll-padding-top: 85px;       /* Sticky header height */
}

.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;       /* Stop at every section, no skip */
  min-height: 100dvh;
}

/* Mobile: relax to proximity — sections may exceed viewport */
@media (max-width: 768px) {
  html { scroll-snap-type: y proximity; }
  .snap-section { scroll-snap-stop: normal; }
}
```

**Where:** `global.css` for `html` and `.snap-section` rules, mobile override at end of file. Each major homepage section gets `.snap-section` in `index.astro`.

**Design rationale:** `proximity` felt blokkerig — you had to keep scrolling through a dead zone between sections where nothing snapped. `mandatory` + `always` creates the feeling of clicking through slides in a presentation, which matches the editorial magazine metaphor.

#### Timing Function Personality — LIVE

Two custom easings that feel unhurried and confident:

```css
--ease-out:     cubic-bezier(0.22, 1, 0.36, 1);    /* Most interactions */
--ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);       /* Scroll hint pulse */
```

We do NOT use bouncy easings, dramatic easings, or spring-like timing.

#### Reduced Motion (Non-Negotiable) — LIVE

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

**Where:** `global.css`, final rule. Kills all animation and transition for users who prefer reduced motion.

---

### Surface & Texture Techniques

#### Subtle Grain Overlay — LIVE

SVG noise texture fixed over the entire page. Adds tactile, paper-like quality.

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.018;
  background-image: url("data:image/svg+xml,...feTurbulence...");
  background-size: 180px;
}
```

**Where:** `global.css`. Opacity is deliberately very low — barely perceptible but adds warmth.

#### Mask Fade-Out Between Sections — LIVE

Sections dissolve into the next via a gradient pseudo-element. Each section targets the next section's background color through a CSS custom property.

```css
.section-fade-bottom::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 180px;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    color-mix(in srgb, var(--section-fade-to, var(--bg)) 30%, transparent) 40%,
    var(--section-fade-to, var(--bg)) 100%
  );
}
```

**How to use:** Add `.section-fade-bottom` to a section and set `style="--section-fade-to: var(--bg-taupe);"` (or whatever the *next* section's background is).

**Where active:**
- Hero → Intro (cream → taupe)
- Intro → Featured (taupe → warm cream)
- Featured → Fancy Boogers (warm cream → dark)

**Design note:** The cream→dark fade is the strongest visual moment — it feels like the page dissolving into shadow.

#### Duotone Blend-Mode Hover — LIVE

Work card images get a warm terracotta tint on hover via a `::after` pseudo-element with `mix-blend-mode: multiply`.

```css
.duotone-wrap {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}
.duotone-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--accent) 80%, #1A1714),
    color-mix(in srgb, var(--accent-light) 70%, #FAF7F2)
  );
  mix-blend-mode: multiply;
  opacity: 0;
  transition: opacity 0.5s var(--ease-out);
  z-index: 1;
}
.duotone-wrap:hover::after { opacity: 0.35; }
```

**Where:** `global.css` utility. Applied to `.work-card-image` in `index.astro`.

**Note:** Effect is subtle on placeholder backgrounds. With real photography, the multiply blend creates a dramatic warm duotone look.

#### Gradient Border (padding-box / border-box) — LIVE

Creates a gradient border without extra wrapper elements. Uses the background-clip trick.

```css
.gradient-border {
  border: 2px solid transparent;
  border-radius: 3px;
  background:
    linear-gradient(var(--bg), var(--bg)) padding-box,
    linear-gradient(135deg, var(--accent), var(--border-dark), var(--accent-light)) border-box;
}
```

**Where:** `global.css` utility. Applied to `.ws-card` (workshop card) in `index.astro`.

**Design note:** The gradient runs from accent (terracotta) through taupe to light accent — matches the warm earth-tone palette. More refined than a solid border.

#### Decorative Accent Line — LIVE

Thin terracotta gradient line used as a section transition marker.

```css
.accent-line {
  height: 2px;
  border: none;
  background: linear-gradient(90deg,
    transparent 5%, var(--accent) 30%,
    var(--accent-light) 50%, var(--accent) 70%,
    transparent 95%
  );
  opacity: 0.6;
}
```

**Where:** `global.css` utility. Positioned at top of workshops section in `index.astro` as `<hr class="accent-line ws-accent">`.

---

### Interaction Techniques

#### :has() All-But-Me Spotlight — LIVE

When hovering one work card, all siblings fade and desaturate. Creates a spotlight effect using `:has()`.

```css
.work-grid:has(.work-card:hover) .work-card:not(:hover) {
  opacity: 0.35;
  filter: saturate(0.6);
  transition: opacity 0.5s var(--ease-out), filter 0.5s var(--ease-out);
}
```

**Where:** `index.astro` scoped styles. Applied to the featured work grid.

#### Image Hover Lift with Tinted Shadow — LIVE

```css
.img-hover:hover {
  transform: translateY(-4px);
  box-shadow:
    0 8px 24px color-mix(in srgb, var(--accent) 15%, transparent),
    0 2px 8px hsl(30 20% 20% / 0.08);
}
```

**Where:** `global.css` utility class.

#### Underline Reveal on Link Hover — LIVE

Editorial-style links where an underline grows from left to right on hover.

```css
.link-subtle::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 1px;
  background: var(--text);
  transition: width 0.4s var(--ease-out);
}
.link-subtle:hover::after { width: 100%; }
```

**Where:** `index.astro` scoped styles. Used on "Meer over Wievien", "Bekijk al het werk", "Alle workshops" links.

---

### Layout Techniques

#### Thin Editorial Divider — LIVE

```css
.divider {
  width: 60px;
  height: 1px;
  background-color: var(--border-dark);
  border: none;
}
```

**Where:** `global.css`. Used in intro section as a subtle rhythm marker.

#### Container Queries — PLANNED

Components that reshape based on their container width. Useful for portfolio cards used in different contexts (sidebar vs. main grid).

```css
.card-wrapper { container-type: inline-size; }
@container card (min-width: 400px) {
  .card { flex-direction: row; }
}
```

#### :has() Parent Styling — READY

Pattern documented for cards with/without images.

```css
.card:has(img)       { display: grid; grid-template-columns: 200px 1fr; }
.card:not(:has(img)) { text-align: center; }
```

#### Shape-Outside for Text Wrapping — PLANNED

For the "Over" (about) page — text wrapping around Wievien's portrait.

```css
.about-portrait {
  float: left;
  shape-outside: circle(50%);
  clip-path: circle(50%);
  margin-right: 2rem;
}
```

---

### Techniques Available for Future Use

These are CSS features that fit the project's aesthetic but haven't been needed yet:

| Technique | Potential use case |
|-----------|--------------------|
| `@starting-style` | Entry animations for dialog/modal lightbox |
| Anchor positioning | Tooltip positioning on product details |
| `scroll-state()` queries | Header style changes based on scroll position |
| `text-box-trim` | Optical centering on price badges |
| `border-image` with gradients | Alternative to padding-box/border-box gradient borders |
| CSS `@scope` | Component-scoped styles without Astro scoping |
| Squircle corners (`paint()`) | Softer card corners (Houdini worklet, limited support) |

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

**Aspect ratios for editorial consistency:**
- Portfolio grid items: 4:5 (portrait, fashion editorial standard)
- Hero images: 3:4 (portrait) or 16:9 (landscape)
- Workshop cards: 16:10 (landscape)
- Product images: 4:5 (portrait)

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

- Critical fonts (heading 400/500, body 400) use `font-display: swap` + `<link rel="preload">`
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
