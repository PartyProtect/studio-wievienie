# Studio Wievien

Website for Studio Wievien, the creative practice of Wievien Alberts in Maastricht.

The site is built with Astro and deployed on Netlify. Dutch is the primary language.

## Architecture direction

Studio Wievien is the parent site for the practice rather than one visual theme applied to everything.

The parent layer introduces Wievien, organizes the work and provides dependable wayfinding. Substantial projects, collections or labels can become distinct project worlds inside the same site when their material or function warrants it. Smaller works can remain focused detail pages.

The project worlds share technical infrastructure without being required to share art direction. A world may use its own fonts, colors, layouts, motion and interaction model while keeping a clear path back to Studio Wievien.

Fancy Boogers is the first project-world prototype. It functions as a clothing label/shop under `/fancy-boogers/` and intentionally has a different visual and commercial language from the Studio Wievien parent experience.

## Current state

The Astro app currently contains a homepage, `/werk/`, a custom 404 page and the developing `/fancy-boogers/` project world.

Some active design explorations live on separate feature branches. Treat any one branch as an experiment until it is deliberately accepted; do not infer a global visual system from it.

Current public/reference photography is provisional where noted. Replace it with owned or properly licensed source material before final launch. Keep the highest-quality originals available so responsive web derivatives can be generated later.

## Content

Known Studio Wievien work and project metadata currently lives in `site/src/data/content.ts`.

Project worlds may eventually own additional data modules or content collections where their requirements differ substantially from the parent site. Do not force commerce data, project-specific copy or interaction state into one global schema merely for uniformity.

## Performance model

Keep route costs local. Static HTML/CSS is the default; client-side JavaScript is added only where the experience needs it. Project-specific fonts, styles, images and interactive code should load only inside that project.

Use responsive image sizes and lazy loading for non-critical imagery. A visitor to the Studio homepage should not pay the download cost of every project world.

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

Read `AGENTS.md` before making creative or structural changes. It describes the current working philosophy, including the parent-site/project-world model and the principle of shaping the canvas before fixing an art direction.

`docs/project-reference.md` describes the current architecture without prescribing aesthetics. `docs/visual-design-system.md` explains what is genuinely shared and points to historical visual exploration through Git history. Other files under `docs/` are research and project history; useful facts may remain valid even when their old design assumptions do not.