# Studio Wievien

Read `AGENTS.md` first. It is the primary guide for the character, design philosophy, writing, interaction and working style of this project.

## Current state

The live design work is in the Astro app under `site/`.

At the moment the homepage is the only real page. The deeper sections such as Werk, Fancy Boogers, Borduurwerk, Workshops and Over still need to be built as proper pages. Do not treat old route plans or documentation as implemented features.

The current homepage direction is intentionally calm and precise: restrained layout, strong typography, real work as the visual focus, and motion used sparingly where it has character or meaning.

## Stack

- Astro
- static HTML/CSS by default
- Tailwind is installed but the current visual system is mostly authored CSS
- Netlify deployment
- Dutch first; English infrastructure exists but English pages do not yet exist

## Source of truth

Use this order when information conflicts:

1. real information and material supplied by Wievien
2. the current working implementation
3. `AGENTS.md`
4. current project requirements
5. supporting docs
6. historical experiments and notes

Files in `docs/` contain useful research and earlier planning, but some of them describe older visual directions or features that were never built. Treat them as reference material, not instructions.

## Working rule

Inspect the rendered result before making broad design changes. Preserve what works. Prefer small, coherent improvements over speculative systems.
