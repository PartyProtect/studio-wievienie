# Studio Wievien

Read `AGENTS.md` first. It is the primary creative and working guide for this repository.

## Current model

The live implementation is the Astro app under `site/`.

Studio Wievien is the parent practice and navigation layer. It is not a visual theme that every project must inherit. Substantial projects or labels may become distinct project worlds with their own local art direction and interaction model. Smaller works can remain focused detail pages.

Fancy Boogers is the first explicit project-world prototype under `/fancy-boogers/`: a clothing label/shop whose identity is intentionally allowed to diverge from the parent Studio Wievien experience.

Do not use Fancy Boogers, the current homepage, or any historical design exploration as the automatic starting style for a new project. Inspect that project’s material and purpose first.

## Stack

- Astro
- static HTML/CSS by default
- authored CSS is preferred where it keeps a project self-contained
- client-side JavaScript only where interaction requires it
- Netlify deployment
- Dutch first; English structure can be added when real translated content exists

## Technical boundary

Share infrastructure, not aesthetic assumptions.

Common helpers may cover semantics, metadata, SEO, images, accessibility, analytics, data and simple navigation behavior. Project-specific fonts, CSS, motion and client code should remain local to the project so unrelated routes do not pay their cost.

A project world should retain an understandable path back to Studio Wievien even if its internal navigation is entirely different.

## Source of truth

Use this order when information conflicts:

1. direct current requirements and real material supplied by Wievien
2. verified facts and source assets
3. the current rendered implementation as evidence of what is working
4. `AGENTS.md`
5. current architecture documentation
6. historical experiments and older planning documents

Never invent missing biography, product facts, prices, claims, dates or artistic meaning to make a page feel complete.

## Working rule

Shape the canvas before choosing what goes on it.

Understand the content, purpose, navigation and technical constraints first. Then prototype the visual answer. Inspect the rendered result on desktop and mobile before turning any local decision into a reusable pattern.

A successful experiment is not automatically a global rule.