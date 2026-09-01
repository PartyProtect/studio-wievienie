# Studio Wievien

Website for Studio Wievien, the creative practice of Wievien Alberts in Maastricht.

The site is built with Astro and deployed on Netlify. Dutch is the primary language.

## Current state

The site currently has a designed homepage, a real `/werk/` overview and a custom 404 page. Fancy Boogers, Borduurwerk, Workshops and Over still live primarily on the homepage until there is enough real material to justify deeper pages.

The design direction is calm, image-led and typographically precise, with interaction used selectively rather than throughout the entire interface.

Current photography is temporary public reference material and must be replaced with owned or properly licensed source images before final launch.

## Content

Known work and project metadata lives in `site/src/data/content.ts`.

The homepage and `/werk/` read from that same source so titles, years, context and credits do not drift between pages. Add or correct known material there before duplicating it inside page templates.

## Development

```bash
cd site
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Project guidance

Read `AGENTS.md` before making creative or structural changes.

Files under `docs/` contain research and project history. They are useful references, but some describe older directions or features that were never implemented.
