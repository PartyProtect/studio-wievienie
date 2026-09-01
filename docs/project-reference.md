# Project Reference — Studio Wievien

Current structural reference for the Studio Wievien website.

This document describes architecture and technical boundaries. It intentionally does **not** prescribe a palette, font pairing, layout style or motion language for future projects. Read `AGENTS.md` for the working philosophy.

## Core model

Studio Wievien is one website and one creative practice that can contain visually distinct project worlds.

### 1. Parent Studio layer

The parent layer introduces Wievien, provides overview and discovery, and connects the different areas of the practice. Current routes include:

```text
/                 Studio Wievien homepage
/werk/            work overview
```

Future parent-level pages may include workshops, embroidery/services, about and contact when real content warrants them.

### 2. Project worlds

A substantial project, collection or recurring label can own a route subtree and a local experience:

```text
/fancy-boogers/             Fancy Boogers world / shop
/fancy-boogers/...          future product or collection routes if useful
/<future-project>/          another project world if the work warrants one
```

A project world may have its own layout, navigation, fonts, CSS, motion and client-side behavior. It should still provide an understandable route back to Studio Wievien.

Fancy Boogers is the first explicit example because it is both a creative label and a commercial collection. Its shop-like structure is specific to its needs and should not be copied into unrelated projects.

### 3. Individual work pages

Not every work needs a mini-site. Smaller projects can use focused detail pages that present the material clearly. The amount of interface should follow the amount and nature of the work.

## Shared technical layer

Share infrastructure where the benefit is functional rather than aesthetic. Good candidates include:

- document metadata, canonical URLs, social metadata and structured data
- image utilities and responsive image generation
- accessibility helpers and semantic patterns
- analytics and consent infrastructure
- common data types where the information genuinely overlaps
- simple navigation primitives such as a route back to Studio Wievien
- testing, build and deployment workflows

A shared component does not have to impose shared styling. Prefer components that expose composition or project-level styling when visual identity differs.

## Route isolation

Project-specific assets should remain local to their project.

A visitor to `/` should not download Fancy Boogers fonts, shop JavaScript or project-specific motion. A visitor to Fancy Boogers should not automatically receive animation code from the Studio homepage or assets belonging to another project world.

Astro pages and route-specific imports make this the default architecture. Preserve that property as the site grows.

## JavaScript

Static HTML and CSS are the default.

Use client-side JavaScript for behavior that actually needs state or runtime interaction: a cart, filtering that benefits from instant response, a lightbox, a deliberate motion sequence, etc. Keep that code local and remove listeners/animation work when it is finished.

Do not add a site-wide framework or animation dependency merely because one project needs a sophisticated interaction.

## Images

Keep the best available source file and derive web assets from it.

For important photography, record or inspect:

- pixel dimensions
- aspect ratio
- compression quality / visible artifacts
- whether the file is an original, social-media export, PDF extraction or other derivative
- crop tolerance and focal area

Generate multiple display sizes rather than sending the largest file everywhere. Prefer modern formats where they provide a meaningful saving, retain a robust fallback where appropriate, and avoid upscaling weak source files into prominent desktop placements.

Above-the-fold critical imagery may load eagerly. Work farther down the page should generally load lazily. Reserve dimensions/aspect ratio so images do not cause layout shift.

## Fonts and CSS

Fonts are part of a project world’s payload. Do not load every project’s typefaces globally.

Keep global CSS limited to true site infrastructure and intentionally shared parent-site styling. Project-world CSS should live with that project or in a clearly project-scoped stylesheet.

Do not move a local design token into `:root` unless it has a real cross-site meaning.

## Content and data

Known Studio Wievien work metadata currently lives in `site/src/data/content.ts`.

This is useful for information shared by the homepage and `/werk/`. As richer project worlds appear, allow them to own separate data modules or content collections when their schema is genuinely different.

For example, Fancy Boogers may need price, size, availability, production status, material and commerce data that ordinary portfolio work does not need.

Do not invent missing fields to satisfy a schema. Change the schema or leave the information absent until the real source exists.

## Navigation

The parent site should make the practice understandable. Project worlds may change navigation internally, but visitors should not become trapped inside them.

At minimum, a major project world needs an obvious conceptual or literal route back to Studio Wievien. The appearance of that control can belong to the project.

## Responsive design

Desktop and mobile are separate compositions built from the same content and purpose. Recompose rather than merely shrinking.

A desktop project world can use an unusual spatial model while mobile uses a simpler flow. The requirement is continuity of meaning and functionality, not identical geometry.

## Accessibility

Every project world must still provide semantic structure, keyboard access, visible focus, useful alt text, sensible touch targets and reduced-motion handling where motion exists.

Creative independence does not include making essential functions unusable.

## Performance target

Prefer Core Web Vitals in the good range on realistic mobile conditions:

- LCP around or below 2.5 s
- CLS below 0.1
- INP around or below 200 ms

These are outcome targets, not permission to damage a project solely to satisfy a synthetic score. Diagnose the actual bottleneck first, especially image weight, font loading and unnecessary client JavaScript.

## Language

Dutch is currently primary. Do not fabricate English copy simply to complete an imagined bilingual architecture. Add translations when real translated content exists and then implement canonical/hreflang relationships correctly.

## Working sequence

For a new project or substantial section:

1. collect and inspect the real material
2. determine what the visitor needs to understand or do
3. define content hierarchy, routes, navigation and technical constraints
4. decide whether this is a normal page or a project world
5. prototype the visual/interaction language from the material
6. inspect desktop and mobile renders
7. keep project-specific assets local
8. only promote a pattern into shared infrastructure when more than one context genuinely benefits from it

The architecture should create room for design rather than decide the design in advance.

## Historical note

The previous version of this file was a March 2026 plan written before the current Astro implementation existed. It described speculative `/nl/` and `/en/` route trees, a single global shop structure, Tailwind-heavy implementation and phase TODOs that no longer match the repository. That version remains available through Git history for reference.