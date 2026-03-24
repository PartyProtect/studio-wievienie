# Technique Reference — Anti-Slop CSS Patterns

Complete code snippets for every technique referenced in the main skill. Organized by the five design decision categories. Each pattern includes the CSS, what it replaces, and when to use it.

## Table of Contents

1. [Typography](#typography)
2. [Color Systems](#color-systems)
3. [Motion & Animation](#motion--animation)
4. [Surface & Depth](#surface--depth)
5. [Layout & Shape](#layout--shape)
6. [Interaction Patterns](#interaction-patterns)
7. [The Slop-to-Technique Replacement Map](#replacement-map)

---

## Typography

### Font Pairing Strategy

Never use a single font. Pair a **display** font (headings, hero text) with a **body** font (paragraphs, UI).

```css
/* Editorial: Serif + Clean Sans */
--font-display: 'Instrument Serif', 'Playfair Display', Georgia, serif;
--font-body: 'DM Sans', 'Source Sans 3', system-ui, sans-serif;

/* Brutalist: Mono + Humanist */
--font-display: 'JetBrains Mono', 'Space Mono', monospace;
--font-body: 'Atkinson Hyperlegible', 'Nunito', sans-serif;

/* Luxury: Thin Serif + Refined Sans */
--font-display: 'Cormorant Garamond', 'Libre Baskerville', serif;
--font-body: 'Outfit', 'Sora', sans-serif;

/* Playful: Round Display + Soft Body */
--font-display: 'Fraunces', 'Syne', cursive;
--font-body: 'Nunito', 'Quicksand', sans-serif;

/* Technical: Wide Geometric + Tight Mono */
--font-display: 'Unbounded', 'Chakra Petch', sans-serif;
--font-body: 'IBM Plex Mono', 'Fira Code', monospace;
```

**Replaces**: Inter, Roboto, Open Sans, Arial, system-ui (Slop S1)

### Fluid Typography with clamp()

```css
h1 { font-size: clamp(2.5rem, 6vw, 5rem); }
h2 { font-size: clamp(1.8rem, 4vw, 3rem); }
p  { font-size: clamp(0.95rem, 1.5vw, 1.15rem); }
```

### Text Box Trim (Optical Centering)

```css
h1, button, .badge {
  text-box: trim-both cap alphabetic;
}
```

Trims whitespace above cap height and below baseline for pixel-perfect vertical centering in buttons and badges.

---

## Color Systems

### Single-Hue OKLCH Palette

Derive an entire palette from one `--hue` variable. Change the hue → change the whole theme.

```css
:root {
  --hue: 220; /* Change this one value to retheme everything */

  /* Backgrounds */
  --bg:           oklch(97% 0.005 var(--hue));
  --bg-card:      oklch(94% 0.01 var(--hue));
  --bg-elevated:  oklch(100% 0 var(--hue));

  /* Text */
  --text:         oklch(18% 0.03 var(--hue));
  --text-muted:   oklch(45% 0.04 var(--hue));

  /* Brand */
  --primary:      oklch(55% 0.22 var(--hue));
  --primary-light:oklch(75% 0.12 var(--hue));
  --primary-dark: oklch(35% 0.18 var(--hue));

  /* Accent (offset hue by 60°) */
  --accent:       oklch(65% 0.18 calc(var(--hue) + 60));

  /* Complement (opposite hue) */
  --complement:   oklch(60% 0.15 calc(var(--hue) + 180));
}

/* Dark mode: flip lightness values */
@media (prefers-color-scheme: dark) {
  :root {
    --bg:           oklch(12% 0.015 var(--hue));
    --bg-card:      oklch(16% 0.02 var(--hue));
    --bg-elevated:  oklch(20% 0.025 var(--hue));
    --text:         oklch(90% 0.02 var(--hue));
    --text-muted:   oklch(60% 0.04 var(--hue));
  }
}
```

**Replaces**: Hardcoded hex palettes, purple defaults (Slop S2)

### color-mix() Tinting

```css
/* Generate tints and shades without new variables */
.hover-state {
  background: color-mix(in oklch, var(--primary) 85%, white);
}
.pressed-state {
  background: color-mix(in oklch, var(--primary) 80%, black);
}
.disabled {
  background: color-mix(in oklch, var(--primary) 30%, gray);
}
```

### Tinted Neutrals (Never Flat Gray)

```css
/* WRONG — flat gray, disconnected from palette */
color: #888;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);

/* RIGHT — hue-tinted, feels integrated */
color: oklch(55% 0.03 var(--hue));
box-shadow:
  0.5px 1px 1px hsl(var(--hue) 40% 10% / 0.5),
  2px 4px 4px hsl(var(--hue) 40% 10% / 0.3),
  4px 8px 8px hsl(var(--hue) 40% 10% / 0.15);
```

**Replaces**: `rgba(0,0,0,0.1)` gray shadows (Slop S5)

### light-dark() for Theming

```css
:root { color-scheme: light dark; }

body {
  background: light-dark(#faf9f6, #0c0c0f);
  color: light-dark(#1a1a1a, #e8e6e1);
}

.card {
  border-color: light-dark(#e0ddd8, rgba(255,255,255,0.06));
}
```

### @property Animated Hue

```css
@property --hue {
  syntax: "<number>";
  inherits: false;
  initial-value: 220;
}

.aurora-bg {
  background: oklch(60% 0.18 var(--hue));
  animation: hueShift 10s ease-in-out infinite alternate;
}

@keyframes hueShift {
  0%   { --hue: 160; }
  33%  { --hue: 260; }
  66%  { --hue: 40; }
  100% { --hue: 340; }
}
```

---

## Motion & Animation

### Staggered Entry with sibling-index()

```css
li {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.4s, transform 0.4s;
  transition-delay: calc((sibling-index() - 1) * 80ms);
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

@starting-style {
  li {
    opacity: 0;
    transform: translateY(20px);
  }
}
```

**Replaces**: No animation / uniform fade-in (Slop S8)

### Scroll-Driven Progress Bar

```css
.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transform-origin: left;
  animation: grow linear;
  animation-timeline: scroll();
}

@keyframes grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

### View-Triggered Reveal

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

### Clip-Path Cinematic Reveal

```css
.wipe-in {
  clip-path: inset(0 100% 0 0);
  animation: wipeReveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

/* Directional variants */
@keyframes wipeReveal   { to { clip-path: inset(0 0 0 0); } }
@keyframes wipeFromTop  { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0); } }
@keyframes curtainOpen  { from { clip-path: inset(0 50% 0 50%); } to { clip-path: inset(0); } }
@keyframes circleReveal { from { clip-path: circle(0% at 50% 50%); } to { clip-path: circle(75% at 50% 50%); } }
```

### Motion Path Animation

```css
.traveler {
  offset-path: path('M10,80 C60,10 100,10 150,80 S240,150 280,80');
  offset-rotate: auto 90deg; /* Face direction of travel */
  animation: travel 3s ease-in-out infinite alternate;
}

@keyframes travel {
  from { offset-distance: 0%; }
  to   { offset-distance: 100%; }
}
```

### Timing Function Personality

```css
/* NEVER just use 'ease'. Pick a personality: */

--ease-snappy: cubic-bezier(0.22, 1, 0.36, 1);     /* Quick start, gentle land */
--ease-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Slight overshoot */
--ease-dramatic: cubic-bezier(0.7, 0, 0.3, 1);       /* Slow start, slow end */
--ease-sharp: cubic-bezier(0.4, 0, 0, 1);            /* Aggressive out */
```

**Replaces**: `ease` on everything (Slop S15)

### Reduced Motion Respect

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

Always include this. Non-negotiable.

---

## Surface & Depth

### SVG Noise Grain Overlay

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03; /* Subtle! 0.02–0.05 range */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 180px;
}
```

**Replaces**: Flat backgrounds with no texture (Slop S9, S10)

### Mesh Gradient (Aurora Background)

```css
.mesh-bg {
  background:
    radial-gradient(at 0% 0%, oklch(60% 0.22 var(--hue) / 0.5) 0%, transparent 50%),
    radial-gradient(at 100% 0%, oklch(65% 0.2 calc(var(--hue) + 120) / 0.4) 0%, transparent 50%),
    radial-gradient(at 50% 100%, oklch(70% 0.18 calc(var(--hue) + 240) / 0.4) 0%, transparent 50%),
    radial-gradient(at 80% 50%, oklch(55% 0.25 calc(var(--hue) + 60) / 0.25) 0%, transparent 40%);
  background-color: var(--bg);
}
```

### Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
```

Use sparingly — navbars, modals, hero panels. Not every card.

### Layered Shadows (Hue-Tinted)

```css
/* Define shadow color from your hue */
--shadow-color: var(--hue) 40% 10%;

--shadow-sm:
  0.5px 1px 1px hsl(var(--shadow-color) / 0.6);

--shadow-md:
  1px 2px 2px hsl(var(--shadow-color) / 0.35),
  2px 4px 4px hsl(var(--shadow-color) / 0.25),
  4px 8px 8px hsl(var(--shadow-color) / 0.15);

--shadow-lg:
  1px 2px 2px hsl(var(--shadow-color) / 0.2),
  2px 4px 4px hsl(var(--shadow-color) / 0.15),
  4px 8px 8px hsl(var(--shadow-color) / 0.12),
  8px 16px 16px hsl(var(--shadow-color) / 0.08),
  16px 32px 32px hsl(var(--shadow-color) / 0.05);
```

**Replaces**: `box-shadow: 0 2px 8px rgba(0,0,0,0.1)` (Slop S5)

### Neon Glow (Dark Themes)

```css
.neon {
  text-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px var(--primary),
    0 0 82px var(--primary),
    0 0 92px var(--primary);
}
```

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent), var(--complement));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

/* Animated variant */
.shimmer-text {
  background-size: 200% 200%;
  animation: shimmer 4s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
```

### Gradient Border with border-radius

```css
.gradient-border {
  border: 2px solid transparent;
  border-radius: 14px;
  background:
    linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
    linear-gradient(135deg, var(--primary), var(--accent)) border-box;
}
```

### Conic Gradient Patterns

```css
/* Checkerboard */
.check {
  background: conic-gradient(var(--bg-elevated) 25%, var(--primary) 25% 50%, var(--bg-elevated) 50% 75%, var(--primary) 75%);
  background-size: 24px 24px;
  opacity: 0.08;
}

/* Sunburst */
.sunburst {
  background: repeating-conic-gradient(var(--primary) 0deg 10deg, transparent 10deg 20deg);
}
```

### Blend Mode Effects

```css
/* Cutout text: text that reveals the gradient behind */
.cutout {
  background: var(--bg);
  color: white;
  mix-blend-mode: multiply;
}

/* Duotone image: gradient overlay with color blend */
.duotone-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, oklch(60% 0.25 200), oklch(55% 0.2 340));
  mix-blend-mode: color;
}

/* CRITICAL: Use isolation on containers */
.blend-container {
  isolation: isolate;
}
```

### Mask Fade-Out

```css
.fade-bottom {
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}
```

---

## Layout & Shape

### Container Queries (Portable Components)

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: flex;
  flex-direction: column;
}

@container card (min-width: 400px) {
  .card {
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
  }
}
```

### The "Has Me" Auto-Container Pattern

```css
/* Each component registers its own container requirement */
.card {
  :has(> &) {
    container-type: inline-size;
  }
}
```

### Shape-Outside Text Flow

```css
.float-circle {
  float: left;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  shape-outside: circle(50%);
  shape-margin: 16px;
}
```

### Anchor Positioning (No-JS Tooltips)

```css
.trigger {
  anchor-name: --trigger;
}

.tooltip {
  position: fixed;
  position-anchor: --trigger;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;
  position-try-fallbacks: flip-block, flip-inline;
}
```

### Clip-Path Shape Morphing

```css
.hexagon {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: clip-path 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.hexagon:hover {
  clip-path: circle(50% at 50% 50%);
}
```

### corner-shape: squircle (Chrome 139+)

```css
.premium-card {
  border-radius: 24px;
  corner-shape: squircle; /* The iOS superellipse curve */
}

/* Per-corner mixing */
.badge {
  border-radius: 16px;
  corner-shape: scoop round bevel notch;
}

/* Animatable */
.morph-box {
  border-radius: 30px;
  transition: corner-shape 0.4s;
}
.morph-box:hover {
  corner-shape: superellipse(2.5);
}
```

---

## Interaction Patterns

### :has() Parent Selector

```css
/* Style card based on child content */
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.card:not(:has(img)) {
  text-align: center;
}

/* Form validation styling */
form:has(input:invalid) {
  border-left: 3px solid oklch(60% 0.25 25);
}
```

### The "All-But-Me" Spotlight

```css
.grid:has(.item:hover) .item:not(:hover) {
  opacity: 0.35;
  filter: saturate(0.3);
  transform: scale(0.95);
}

.item {
  transition: opacity 0.35s, filter 0.35s, transform 0.35s;
}
```

**Replaces**: JavaScript event delegation for dimming siblings

### Scroll-State Queries

```css
/* Shadow on sticky header when stuck */
.header {
  position: sticky;
  top: 0;
  container-type: scroll-state;
}

@container scroll-state(stuck) {
  .header-inner {
    box-shadow: var(--shadow-md);
    backdrop-filter: blur(12px);
  }
}

/* Scale snapped carousel item */
@container scroll-state(snapped) {
  .carousel-item {
    scale: 1.05;
    opacity: 1;
  }
}
```

### Animated Rotating Border Glow

```css
.glow-card {
  position: relative;
  overflow: hidden;
}

.glow-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: conic-gradient(from 0deg, transparent, var(--primary), transparent, var(--accent), transparent);
  opacity: 0;
  transition: opacity 0.4s;
  animation: rotateBorder 4s linear infinite;
}

.glow-card:hover::before { opacity: 1; }

.glow-card::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: inherit;
  background: var(--bg-card);
}

@keyframes rotateBorder { to { transform: rotate(360deg); } }
```

---

## Replacement Map

Quick lookup: slop pattern → technique to use instead.

| Slop Pattern | Replace With |
|---|---|
| Inter / Roboto / system-ui | Context-specific font pairing (see Typography) |
| Purple gradient | OKLCH single-hue system with intentional hue choice |
| 3-column icon grid | Asymmetric grid, bento layout, or overlapping composition |
| Flat gray shadows | Layered hue-tinted shadows (3–5 layers) |
| Cards inside cards | Flat hierarchy with visual distinction via color/shadow/border |
| `rgba(0,0,0,0.1)` | `hsl(var(--hue) 40% 10% / 0.15)` tinted shadow |
| No animation | One staggered reveal OR scroll-driven effect |
| Flat white background | Grain overlay + warm tint OR mesh gradient |
| `ease` everywhere | Snappy (`0.22,1,0.36,1`) or bouncy (`0.34,1.56,0.64,1`) |
| Hero → 3 cards → CTA | Magazine layout, diagonal section, or editorial flow |
| Evenly-weighted palette | 60-30-10 rule: dominant, secondary, accent |
| Generic outline icons | Custom SVG or typographic elements as visuals |
| `border-radius: 8px` everywhere | Varied radii by element type; squircle for premium feel |
| Space Grotesk (convergence) | Different font every project — consult pairing list |
| Template page structure | Ask: what would a magazine art director do? |
