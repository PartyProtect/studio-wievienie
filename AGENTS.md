# Studio Wievien

Studio Wievien is the digital home of Wievien’s creative practice: fashion, textile work, embroidery, objects, workshops, projects and Fancy Boogers.

This is a creative studio first and a website second. The site should make the work easy to discover while leaving enough freedom for different bodies of work to become genuinely different experiences.

## The architecture

Studio Wievien is the parent practice, not a single visual theme.

There are three useful scales:

- the Studio Wievien layer introduces the practice, provides overview and wayfinding, and connects the work
- substantial projects, collections or labels may become their own project worlds when they have enough identity, material or function to justify it
- individual works can have focused detail pages without needing an entire mini-site

A project world may use its own typography, palette, layout logic, motion, navigation and interaction model. It does not need to look like the Studio homepage or like another project. Keep a clear route back to Studio Wievien so the visitor understands the larger context.

Consistency should come from authorship, clear information architecture, reliable interaction and shared technical foundations rather than visual sameness.

Fancy Boogers is the first clear example of this model: it can behave as a clothing label and shop inside Studio Wievien while having a visual identity of its own. Treat it as precedent for project autonomy, not as a template for future projects.

## Shape the canvas first

Do not decide a project’s art direction before understanding its material.

Start by looking at the real photographs, objects, writing, purpose and actions the project needs. Establish the useful canvas: content hierarchy, route structure, navigation, responsive behavior, accessibility and technical boundaries. Then explore what visual language belongs on that canvas.

Global guidance should define useful constraints and shared infrastructure, not pre-solve future creative decisions. Do not turn a successful local choice into a repository-wide rule simply because it worked once.

When a project has no clear visual answer yet, prototype more than one possibility and judge the rendered result. The work is allowed to surprise the system.

## The work

Start with what actually exists: photographs, garments, embroidery, objects, exhibitions, process material and real information.

The homepage introduces. Overview pages organize. Detail pages hold depth. Project worlds may go deeper when their content or purpose warrants it. The site should be able to grow from a handful of pieces to hundreds without turning the homepage into an archive.

Photography often carries much of the experience, but do not force every image into one global crop, aspect ratio or presentation pattern. Respect the source material and design the local composition around what is genuinely available.

## Character

Studio Wievien should feel human, but there is no required global aesthetic recipe for achieving that.

Elegance, humour, restraint, noise, oddness, stillness and theatricality are all available when the work earns them. Handmade character should mostly come from the actual work rather than decorative shorthand for “handmade.”

Avoid importing generic fashion, portfolio, e-commerce or agency conventions without asking whether they help this particular project. Familiar patterns are useful when they make something clearer; they are not a visual obligation.

## Writing

Writing should sound like somebody speaking: direct, specific and unforced.

Real information is better than invented brand language. If something started as a joke, that may be more useful than translating it into an abstract artistic statement.

Do not invent Wievien’s biography, motivations, opinions, product details, prices, workshop dates, artistic meaning or production claims. Leave room for the real answer when we do not know it.

Dutch is primary. English should preserve the same personality rather than becoming more formal.

## Interaction

The visitor should never have to wrestle with the design.

Movement, stillness, unusual navigation and conventional controls are all available. Use the interaction model that suits the project, then make it legible and robust. Buying, commissioning, joining a workshop, viewing work or returning to Studio Wievien should never require solving a puzzle.

Motion should have a reason to exist, should stop consuming attention when its job is done, and must have a reduced-motion path.

## Shared plumbing, separate art direction

Share infrastructure where doing so improves reliability: metadata, SEO helpers, image handling, accessibility utilities, data models, analytics, common behavior and small navigation primitives.

Do not make a visual component global merely to reduce duplication. A shared component should usually share behavior or semantics first; its appearance may be exposed to the project rather than imposed on it.

Project-specific CSS, fonts and client-side code should stay project-specific. Entering one project should not make visitors download the visual machinery of every other project.

## Performance

Astro is the current foundation and suits this architecture well. Prefer static HTML and CSS by default and add client-side JavaScript only where interaction needs it.

Keep route costs local. A project should load its own fonts, styles, motion and interactive modules only when visited. Avoid global dependencies for effects used by one project.

Treat images as part of the build rather than inert files: keep good source masters when possible, generate appropriately sized variants, use modern formats when useful, reserve eager loading for genuinely critical imagery and lazy-load work that begins below the fold.

Judge performance in the browser on realistic mobile conditions. Protect layout stability, responsiveness and perceived loading quality rather than chasing clever implementation for its own sake.

## Mobile and accessibility

Mobile is its own canvas, not a squeezed desktop composition. Recompose when necessary. A project may change its layout substantially between desktop and mobile while preserving content hierarchy and purpose.

Readable text, keyboard navigation, visible focus, useful alt text, sensible touch targets, semantic structure and reduced-motion support are part of the design from the beginning.

## Source of truth

Real work, real photographs, real product information and direct requirements from Wievien outrank old design documents and previous experiments.

The current implementation is evidence, not law. The repository contains history; use it to understand what was tried, not to prevent a better answer.

When sources conflict, prefer the newest reliable material and explicit current requirements. Do not silently carry speculative content or abandoned visual assumptions forward.

## Working method

Look before deciding.

Understand the material and the job of the page. Shape the canvas. Make the smallest useful experiment that can answer the open question. Render it on desktop and mobile. Judge the actual result. Keep what earns its place and remove what does not.

Do not write tomorrow’s art direction into today’s infrastructure.