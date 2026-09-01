# Visual Design Guidance — Studio Wievien

There is intentionally **no single visual design system for every Studio Wievien project**.

The site is one technical and editorial framework that may contain multiple visual worlds. Read `AGENTS.md` first. This document defines the boundary between what should be shared and what should remain open for each project.

## The principle

Shape the canvas before deciding what goes on it.

The global layer should make the website coherent to use: sound semantics, navigation, responsive behavior, accessibility, image handling, performance, metadata and dependable technical primitives.

It should not decide in advance that every future project uses the same palette, typeface, grid, crop, animation vocabulary, corner radius, spacing rhythm or atmosphere.

A project-specific visual system is encouraged when the work has enough identity to support one.

## What may be global

Global choices need a functional cross-site reason. Examples:

- base reset and browser normalization
- accessibility behavior and focus expectations
- semantic layout helpers that do not impose an art direction
- metadata and SEO infrastructure
- image loading/optimization utilities
- analytics and consent infrastructure
- truly shared parent-site components
- performance and reduced-motion behavior
- structural tokens whose meaning genuinely survives across visual worlds

Even shared components should prefer behavioral or semantic reuse over forced visual sameness.

## What should usually stay local

Treat the following as project-level decisions unless there is a specific reason to share them:

- color palette
- display and body typefaces
- typographic scale
- grid/composition rules
- image aspect ratios and crop behavior
- border radii and decorative shapes
- motion language and easing
- cursors and project-specific interaction devices
- local navigation presentation
- texture, grain, shadows, gradients and other atmosphere
- product-card or gallery appearance

A local choice can later become shared if multiple independent contexts genuinely benefit from it. Do not globalize it merely because the first implementation was successful.

## Studio Wievien parent layer

The parent Studio Wievien experience may have its own recognizable visual language. That language is allowed to be calm, theatrical, editorial, graphic or something else as the work evolves.

Its job is to introduce the practice and make the different worlds discoverable. It does not need to visually absorb those worlds.

## Project worlds

A substantial project, collection or label may establish a local visual system inside its route subtree.

Fancy Boogers is the first explicit example. Its supplied direction uses a near-black/purple base, acid green and pink signals, bold grotesque typography, mono metadata, fashion photography and shop behavior. Those decisions belong to Fancy Boogers because they fit that label and its commercial function.

They are **not** defaults for the next project.

Likewise, the quieter Studio Wievien experiments are not defaults for Fancy Boogers or another future project.

## Visual continuity

Different project worlds do not need matching aesthetics to feel related.

Continuity can come from:

- the fact that Studio Wievien clearly contains and links them
- accurate credits and project information
- recurring authorship and voice
- dependable navigation and an understandable return path
- consistent quality of implementation
- responsive and accessible behavior
- deliberate transitions between the parent site and a project world

If a visual motif naturally recurs across Wievien’s work, it may become a useful connective element. Discover that recurrence rather than inventing one for consistency’s sake.

## Typography

Do not choose one permanent font stack for all project worlds.

Load fonts per route/project where practical so unrelated pages do not pay the network cost. Keep fallback stacks robust and minimize the number of weights/files actually required.

Readability remains non-negotiable even when typography becomes expressive. Test real text at real viewport sizes rather than relying on nominal CSS sizes.

## Photography

Photography is source material, not a standardized card asset.

Inspect each set before designing around it: resolution, orientation, compression, focal point, crop tolerance, consistency and provenance all matter.

Use responsive image variants. Do not upscale weak social-media or PDF-derived images into large desktop placements just because a template expects them. Conversely, do not shrink strong campaign photography into timid cards merely to preserve a global grid.

## Motion

No global animation style is required.

Motion can be absent, subtle or central depending on the project. When used, it should have a compositional job and a clear end state. Prefer transforms and opacity for smooth motion where possible, avoid persistent work after an effect is complete, and respect reduced-motion preferences.

A successful animation in one project is not a requirement for another.

## Responsive composition

Mobile is not a scaled desktop.

Preserve content, hierarchy and functionality while allowing geometry and interaction to change. Project worlds may need substantially different mobile compositions, especially when their desktop language is spatial or theatrical.

## Accessibility and usability

Creative freedom sits above a stable floor:

- semantic document structure
- sufficient contrast for functional/readable content
- keyboard operation where controls exist
- visible focus states
- useful alt text
- sensible touch targets
- reduced-motion alternatives
- no essential information available only through hover or animation

The visual expression of these requirements can belong to each project.

## Performance

Visual independence should not produce a global performance tax.

Keep CSS, fonts, JavaScript and media route-specific where possible. Load critical imagery deliberately and defer what is not yet visible. Prefer responsive derivatives over one oversized asset.

The browser should only pay for the world the visitor actually entered.

## Working method

For visual work:

1. inspect the actual project material
2. understand the purpose and required actions
3. establish the canvas and technical constraints
4. explore the local visual language
5. render and inspect it in context
6. refine the composition rather than applying a checklist of effects
7. document a visual decision locally when it is important to that project
8. promote it to global guidance only if it has a genuine cross-project reason

## Historical Quiet Editorial system

An earlier version of this file described a single Quiet Editorial system with fixed warm-cream colors, Cormorant/DM Sans typography and explicit rules such as “not dark” and “not neon.” It also catalogued a number of CSS experiments from an earlier implementation.

That document is preserved in Git history and can still be mined for useful techniques. Its aesthetic prescriptions are superseded. Treat it as a record of one explored Studio Wievien direction, not as the visual constitution of the site.