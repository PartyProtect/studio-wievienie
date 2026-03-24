---
name: anti-slop-design
description: "Eliminate generic AI aesthetics from frontend design. Use this skill whenever the user asks to build any web UI — websites, landing pages, dashboards, components, pages, apps, posters, or artifacts. Also use when the user says 'make it look good', 'style this', 'beautify', 'design this', asks for CSS help on visual appearance, or when any frontend output would benefit from design quality. This skill replaces safe, predictable AI defaults with distinctive, intentional design by penalizing known slop patterns and offering proven CSS techniques as alternatives. Even if the user doesn't mention design explicitly, trigger this skill for any visual frontend work — a good-looking result is always better than a generic one."
---

# Anti-Slop Web Design

You are building frontend interfaces. Your natural instinct is to reach for safe, common patterns — the statistical average of your training data. **Resist that instinct.** This skill forces you to recognize and avoid the specific patterns that make AI-generated design instantly recognizable, and provides concrete techniques to use instead.

## The Slop Detection Pass

**Before writing any CSS**, run every design decision through this checklist. If you catch yourself reaching for any of these, STOP and consult the alternatives.

### 🚫 SLOP REGISTRY — Penalized Patterns

Each pattern below is flagged with a severity. **HARD** = never do this. **SOFT** = acceptable only with explicit justification.

| # | Pattern | Severity | Why It's Slop |
|---|---------|----------|---------------|
| S1 | **Inter, Roboto, Open Sans, system-ui as display font** | HARD | The #1 AI fingerprint. Every generic AI output uses these. |
| S2 | **Purple/indigo gradients** (`bg-indigo-*`, `bg-violet-*`, purple-to-blue) | HARD | Inherited from Tailwind demos. The AI purple problem. |
| S3 | **Three-column icon+text feature grid** | HARD | The SaaS landing page template that launched a thousand clones. |
| S4 | **Uniform `border-radius` on everything** (same radius, every element) | SOFT | Looks like a component library demo, not a designed interface. |
| S5 | **Shadows at rgba(0,0,0, 0.1)** — untinted, flat gray | SOFT | Real shadows are tinted with the background's hue. |
| S6 | **Cards nested inside cards** | HARD | A layout crutch. Creates visual noise, not hierarchy. |
| S7 | **Gray text on colored backgrounds** with poor contrast | HARD | Fails WCAG AA and looks unfinished. |
| S8 | **No animations at all** or only opacity fades | SOFT | Static interfaces feel dead. One great animation beats none. |
| S9 | **Flat solid-color backgrounds** — no texture, gradient, or depth | SOFT | Looks like a wireframe, not a finished design. |
| S10 | **`bg-white` with colored accents** — the "clean" trap | SOFT | Clean ≠ empty. White backgrounds need texture, grain, or warmth. |
| S11 | **Hero → 3 cards → testimonial → CTA** section order | HARD | The most copy-pasted page structure on the internet. |
| S12 | **Evenly-distributed timid color palette** — all colors equally weighted | SOFT | Strong design has a dominant color with sharp accents. |
| S13 | **Outline icons from generic libraries** as primary visual elements | SOFT | They're filler. Use them sparingly, never as focal points. |
| S14 | **Space Grotesk** or any single font converged on across outputs | HARD | Convergence IS the problem. Vary across every generation. |
| S15 | **`ease` as the only timing function** | SOFT | Real motion has personality: snappy, bouncy, deliberate. |

### ✅ THE REPLACEMENT PROTOCOL

When you detect a slop pattern, replace it with a technique from the catalog below. Read `references/techniques.md` for full code examples and implementation guidance.

---

## Design Decision Framework

Before coding, make **five explicit choices**. Write them down mentally. Do not start CSS until all five are answered.

### 1. TYPEFACE PAIRING
Pick two fonts that have *tension* — a display font with personality and a body font that's quietly excellent. Never the same font for both.

**Technique menu** (consult `references/techniques.md § Typography` for full list):
- Serif display + geometric sans body (editorial, luxury)
- Monospace display + humanist sans body (developer, brutalist)
- Handwritten/display + neutral body (playful, organic)
- Slab serif + thin sans (industrial, bold)
- Variable font with extreme weight range (100 vs 900)

**Anti-slop rule**: If you can't explain *why* this font fits this project, you've defaulted. Pick again.

### 2. COLOR SYSTEM
Build from ONE seed value, not a pre-made palette.

**Technique menu**:
- **OKLCH single-hue system**: `--hue: 220` → derive all colors by varying lightness/chroma. Dark mode = flip lightness. Accent = hue + 60°. Complement = hue + 180°.
- **color-mix() ramps**: `color-mix(in oklch, var(--base) 70%, white)` for tints, `...black)` for shades. Zero hardcoded hex.
- **Tinted neutrals**: Never use `#333` or `#888`. Tint grays with the dominant hue: `oklch(20% 0.02 var(--hue))`.
- **Contrast-aware**: Use `contrast-color()` or manually ensure 4.5:1 on body text, 3:1 on large text.

**Anti-slop rule**: If your palette contains ANY purple/indigo as a primary, you must provide explicit brand justification. The default answer is "pick a different hue."

### 3. MOTION STRATEGY
Choose ONE high-impact animation moment rather than scattering micro-interactions everywhere.

**Technique menu**:
- **Staggered entry**: `sibling-index()` × delay + `@starting-style` for cascading reveals
- **Scroll-driven progress**: `animation-timeline: scroll()` for progress bars, parallax, header morphs
- **View-triggered reveals**: `animation-timeline: view()` with `animation-range: entry` for fade-slide-ins
- **Hover personality**: `cubic-bezier(0.22, 1, 0.36, 1)` (snappy), `cubic-bezier(0.34, 1.56, 0.64, 1)` (bouncy)
- **Clip-path reveals**: `inset()` animation for cinematic wipes and directional reveals
- **Motion path**: `offset-path` for elements following curved trajectories
- **@property hue cycling**: Animated `--hue` for shifting gradient backgrounds

**Anti-slop rule**: If you're using `transition: all 0.3s ease` on everything, you have no motion strategy. Be deliberate.

### 4. SURFACE & DEPTH
Every background should have at least two layers of visual interest.

**Technique menu**:
- **Grain overlay**: SVG `feTurbulence` noise at 0.02–0.04 opacity with `mix-blend-mode: overlay`
- **Mesh gradients**: 3–5 stacked `radial-gradient()` with different positions and oklch colors
- **Glassmorphism**: `backdrop-filter: blur()` + semi-transparent bg + subtle border on vivid backgrounds
- **Layered shadows**: 3–5 `box-shadow` layers with increasing offsets, decreasing opacity, HUE-TINTED
- **Conic patterns**: `repeating-conic-gradient()` for geometric background textures
- **Gradient borders**: Double-background `padding-box / border-box` trick with `border-radius`
- **Blend modes**: `mix-blend-mode: multiply` for cutout text, `color` for duotone overlays

**Anti-slop rule**: If your background is a single flat color and your shadows are `rgba(0,0,0,0.1)`, you haven't designed — you've defaulted.

### 5. LAYOUT SIGNATURE
The arrangement of elements should feel intentional, not template-driven.

**Technique menu**:
- **Asymmetric grids**: Unequal column widths, elements that break the grid
- **Overlap & negative margin**: Elements that bleed into each other for depth
- **Container queries**: Components that reshape based on their parent, not the viewport
- **shape-outside**: Text wrapping around circular or polygon shapes
- **Anchor positioning**: Tooltips, popovers, and labels that tether to triggers
- **Diagonal/rotated elements**: `transform: rotate()` on section dividers or decorative elements
- **Generous whitespace**: Give elements room. Cramped = amateur.

**Anti-slop rule**: If your layout is hero → 3-column grid → alternating left-right sections → footer, start over. What layout would a magazine art director use for this content?

---

## The Final Test

Before presenting your output, ask:

> **"If someone saw this and was told AI made it, would they believe it immediately?"**
>
> If YES → you have slop. Go back to the five decisions and strengthen at least two.
>
> If they'd say "wait, really?" → you've succeeded.

A distinctive interface makes someone ask *how* it was made, not *which AI* made it.

---

## Aesthetic Direction Menu

Don't just "make it look good." Commit to a direction. Here are starting points — combine, remix, or invent your own:

| Direction | Typography | Color | Surface | Motion |
|-----------|-----------|-------|---------|--------|
| **Editorial/Magazine** | Serif display, tight leading | Monochrome + 1 accent | Grain texture, paper-warm bg | Smooth scroll reveals |
| **Brutalist/Raw** | Monospace, extreme sizes | Black/white + signal red | Flat, visible grid lines | Harsh cuts, no easing |
| **Luxury/Refined** | Thin serif, generous spacing | Deep neutrals + gold/copper | Subtle gradients, layered shadow | Slow, deliberate transitions |
| **Retro-Futuristic** | Geometric sans, wide tracking | Neon on dark | Scanlines, CRT glow effects | Glitch, flicker |
| **Organic/Natural** | Rounded humanist, variable weight | Earth tones in oklch | Grain, watercolor gradients | Fluid, spring physics |
| **Technical/Developer** | Monospace + system contrast | Terminal green or syntax-theme | Code-block textures, grid dots | Typewriter reveals |
| **Playful/Toy** | Rounded display, bouncy | Saturated primaries | Soft shadows, blob shapes | Bounce, overshoot easing |
| **Dark Premium** | Thin sans, high contrast | Near-black + luminous accent | Glass panels, mesh aurora | Glow pulse, shimmer |
| **Swiss/Grid** | Helvetica-adjacent, strict grid | Limited palette, high contrast | Clean but textured | Precise slide-ins |

---

## Implementation Checklist

After building, verify:

- [ ] No font from the slop registry (S1, S14) is used as a display font
- [ ] Primary color is NOT purple/indigo without explicit brand reason (S2)
- [ ] Layout doesn't follow the 3-card template pattern (S3, S11)
- [ ] Shadows are hue-tinted, not flat gray (S5)
- [ ] At least one purposeful animation exists (S8)
- [ ] Background has depth — grain, gradient, or texture (S9, S10)
- [ ] Color palette has a clear dominant + accent hierarchy (S12)
- [ ] Timing functions go beyond `ease` (S15)
- [ ] `prefers-reduced-motion` is respected
- [ ] Text contrast meets WCAG AA (4.5:1 body, 3:1 large)

---

## Reference

For complete code snippets, CSS patterns, and implementation details for every technique mentioned above:
→ **Read `references/techniques.md`**

This reference contains copy-paste-ready CSS for: OKLCH color systems, layered shadows, grain textures, mesh gradients, glassmorphism, neon glow, gradient text, scroll-driven animations, :has() patterns, container queries, clip-path animations, blend mode effects, motion paths, gradient borders, mask fading, conic patterns, anchor positioning, staggered entry animations, light-dark() theming, and the "all-but-me" hover pattern.
