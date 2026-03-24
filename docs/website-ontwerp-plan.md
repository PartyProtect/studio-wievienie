# Website Ontwerp Plan — Studio Wievien

*Vastgelegd: 24 maart 2026. Dit document bevat alle beslissingen die al genomen zijn en dient als basis voor het ontwerp en de bouw van de site.*

---

## Wie is Studio Wievien?

Studio Wievien is de roepnaam voor alle disciplines die Wievien aanlevert. Het is een creatieve praktijk met meerdere pijlers:

### Hoofddiscipline: Borduurwerk
- Custom borduurwerk op kleding van klanten (petten, jassen, hoodies, truien — alles waar het materiaal het toelaat)
- Eigen borduurontwerpen — zowel designs maken als uitvoeren
- Welke types kleding precies geschikt zijn: **nog te bepalen**

### Eigen kledinglijn: Fancy Boogers
- Wievien's eigen merk/lijn
- Wordt getoond en verkocht via de site

### Freelance werk
- Workshops (creatief, borduur-gerelateerd)
- Dit is een actief onderdeel van het aanbod

### CV / Achtergrond
- Heeft een tentoonstelling gecureerd — dit is CV-materiaal, geen beeldmateriaal
- Past in de "Over Wievien" sectie, niet als apart portfolio-onderdeel
- Andere freelance projecten kunnen hier ook bij

---

## Beslissingen die al genomen zijn

| Beslissing | Keuze | Toelichting |
|------------|-------|-------------|
| **Type site** | Tentoonstelling + verkoop | Visueel tonen van al het werk, met mogelijkheid om te kopen |
| **Taal** | Tweetalig NL/EN | Aparte URL-paden per taal |
| **Visuele richting** | Creatief, niet minimalistisch | "Echt creatief" — geen standaard fashion-minimal. Veel afbeeldingen. |
| **Afbeeldingen** | Centraal in het ontwerp | Fotografie is de kern. Technische optimalisatie is belangrijk vanwege de hoeveelheid beelden. |
| **Tech stack** | Astro + Tailwind CSS | Zelfde bewezen stack als MeisterEnergie, statisch met React islands waar nodig |
| **CSS technieken** | Overgenomen uit MeisterEnergie docs | Volledige CSS technique catalog beschikbaar (clamp(), color-mix(), scroll animations, container queries, etc.) |
| **Curatie/tentoonstelling** | Onderdeel van Over Wievien | Geen apart portfolio-item — is meer CV-achtig, geen beeldmateriaal |

---

## Sitemap / Pagina-overzicht

### Nederlands
```
/                          ← Homepage (uitgelicht werk + laatste toevoegingen)
/nl/werk/                  ← Portfolio overzicht (alle disciplines)
/nl/werk/{slug}/           ← Individueel werk (foto's + verhaal)
/nl/fancy-boogers/         ← Kledinglijn overzicht
/nl/fancy-boogers/{slug}/  ← Individueel product
/nl/borduurwerk/           ← Borduurwerk diensten (wat kan, hoe werkt het, tarieven)
/nl/workshops/             ← Overzicht aankomende workshops
/nl/workshops/{slug}/      ← Individuele workshop
/nl/winkel/                ← Shop (alle producten)
/nl/over-wievien/          ← Over + CV + tentoonstellingen + achtergrond
/nl/contact/               ← Contact
```

### English
```
/en/work/                  ← Portfolio overview
/en/work/{slug}/           ← Individual piece
/en/fancy-boogers/         ← Clothing line
/en/fancy-boogers/{slug}/  ← Individual product
/en/embroidery/            ← Embroidery services
/en/workshops/             ← Workshops overview
/en/workshops/{slug}/      ← Individual workshop
/en/shop/                  ← Shop
/en/about/                 ← About
/en/contact/               ← Contact
```

---

## Content per pagina

### Homepage
- Hero: groot beeld van recent/sterkste werk
- Korte intro: wie is Wievien, wat doet ze (2-3 zinnen max)
- Uitgelicht werk: 3-6 stuks uit alle disciplines
- Laatste toevoegingen
- Link naar Fancy Boogers
- Link naar borduurwerk/opdrachten
- Aankomende workshop (als die er is)

### Werk / Portfolio
- Grid/masonry van al het werk, gefilterd op categorie
- Categorieen: borduurwerk, Fancy Boogers, workshops, overig
- Elk item: hoofdfoto + titel + categorie
- Click → individuele pagina met meerdere foto's + verhaal

### Individueel Werk
- Fotogalerij (meerdere beelden, detail + totaal)
- Titel + beschrijving (kort)
- Technieken + materialen
- Beschikbaarheid / koopoptie als van toepassing
- Gerelateerd werk

### Fancy Boogers (kledinglijn)
- Lookbook-achtige presentatie
- Elk kledingstuk als product met meerdere foto's
- Maten, materiaal, prijs
- Koop-optie

### Borduurwerk (diensten)
- Wat kan er geborduurd worden (types kleding/items)
- Hoe werkt het proces (van ontwerp tot aflevering)
- Voorbeelden van eerder werk
- Tarieven / prijsindicatie (nog te bepalen)
- CTA: neem contact op voor een opdracht

### Workshops
- Overzicht met aankomende data
- Per workshop: wat leer je, voor wie, prijs, locatie, aantal plaatsen
- Inschrijfmogelijkheid of contact-link

### Winkel / Shop
- Alle producten (Fancy Boogers + losse borduurwerken te koop)
- Filter op categorie
- Product → detail pagina met foto's, beschrijving, prijs, maten, koop-knop
- **Betaalmethode: nog te bepalen** (Mollie, Stripe, extern via Etsy/BigCartel, of handmatig via DM/mail)

### Over Wievien
- Wie is Wievien (persoonlijk verhaal)
- Achtergrond en opleiding
- Gecureerde tentoonstelling(en) — als CV-items
- Freelance ervaring
- Eventueel press/media mentions

### Contact
- Contactformulier of directe links (email, Instagram, etc.)
- Voor opdrachten, workshops, samenwerkingen, pers

---

## Visueel ontwerp — richting en uitgangspunten

### Wat al vaststaat
- **Creatief, niet minimalistisch** — dit is geen standaard fashion-brand. Het moet de energie en het handwerk van Wievien uitstralen.
- **Afbeeldingen zijn de kern** — elk onderdeel draait om fotografie. Grote beelden, detail shots, process shots.
- **Technische optimalisatie is essentieel** — veel beelden betekent dat performance-optimalisatie (AVIF/WebP, responsive srcset, lazy loading, blur-up placeholders) vanaf dag 1 ingebouwd moet worden.

### Wat nog bepaald moet worden
- **Kleurenpalet** — moet passen bij de sfeer van het werk. Opties worden uitgewerkt in het visual design system.
- **Typografie** — twee fonts: een expressief font voor koppen (persoonlijkheid, craft) + een helder font voor body (leesbaarheid). Moet het handwerk-gevoel versterken zonder kitscherig te worden.
- **Logo / woordmerk** — heeft Wievien al een logo? Zo niet: moet ontworpen worden.
- **Fotografie stijl** — consistent licht, achtergronden, kleurtemperatuur. Richtlijnen opstellen.

### Designprincipes (overgenomen + aangepast)
1. **Het werk is de held.** Design ondersteunt, concurreert nooit met het werk zelf.
2. **Elke visual moet informatie toevoegen.** Geen decoratieve stockfoto's. Elk beeld toont echt werk.
3. **Craft-gevoel boven corporate polish.** De site mag voelen alsof je de studio binnenloopt.
4. **Performance is een feature.** FCP onder 0.4s. Afbeeldingen geoptimaliseerd. Zero JS waar het niet nodig is.
5. **Consistent visueel vocabulaire.** Kleuren, spacing, typografie — eenmaal vastgelegd, overal consistent.

---

## Technische architectuur

### Overgenomen uit MeisterEnergie (bewezen en herbruikbaar)
- **Astro** — statische site generator, zero JS by default
- **Tailwind CSS** — utility-first CSS met custom properties
- **CSS custom properties** — design tokens voor kleuren, spacing, typografie
- **Self-hosted WOFF2 fonts** — geen externe font-afhankelijkheden
- **Astro Content Collections** — gestructureerde content met Zod schema validatie
- **React islands** — alleen voor interactieve elementen (client:load)
- **Netlify** — hosting met CDN

### Nieuw voor Studio Wievien
- **i18n setup** — tweetalige content met hreflang tags
- **Image pipeline** — AVIF/WebP generatie, responsive srcset, blur-up placeholders
- **Product schema** — Schema.org Product + Offer markup voor shop items
- **Event schema** — Schema.org Event voor workshops
- **Betaalintegratie** — nog te bepalen (Mollie/Stripe/extern)

### CSS technieken beschikbaar (uit design system)
Volledige catalog overgenomen, inclusief:
- `clamp()` voor fluid typografie
- `color-mix()` voor hover/pressed states
- Scroll-triggered animaties (IntersectionObserver + CSS transitions)
- Staggered entry animaties
- Container queries voor responsive componenten
- `:has()` parent styling
- `text-box: trim-both` voor optische centrering
- Tinted shadows en warm-tinted neutrals
- Grain overlay voor textuur
- Gradient borders
- `prefers-reduced-motion` respecteren (non-negotiable)

---

## SEO aanpak

### Schema markup per paginatype
| Pagina | Schema | Doel |
|--------|--------|------|
| Homepage | `Organization` + `WebSite` | Brand identity |
| Portfolio stukken | `CreativeWork` / `VisualArtwork` | Werk vindbaar in zoekresultaten |
| Producten | `Product` + `Offer` | E-commerce rich results |
| Workshops | `Event` + `Offer` | Event discovery |
| Over Wievien | `Person` + `Organization` | Maker identity |
| Alle pagina's | `BreadcrumbList` | Navigatiestructuur |

### Topical authority strategie
- **Niche:** handgemaakt borduurwerk + custom clothing in Nederland
- **Hub:** portfolio/werk overzicht
- **Spokes:** individuele werkstukken, producten, diensten
- **Deep content:** borduurwerk proces-pagina, Fancy Boogers verhaal
- **Multimodaal:** fotografie als primaire content (Google Images + Discover)

### Afbeelding SEO (cruciaal voor visueel portfolio)
- Beschrijvende `alt` tekst op elk beeld (NL + EN)
- Bestandsnamen met beschrijvende slugs
- Responsive `srcset` met correcte `sizes`
- AVIF als primair formaat (kleinste filesize, beste kwaliteit)
- `og:image` op elke pagina
- Schema.org `image` property op alle structured data

---

## Open vragen / nog te bepalen

| Onderwerp | Status | Notitie |
|-----------|--------|---------|
| Kleurenpalet | Open | Wordt uitgewerkt in visual design system |
| Typografie keuze | Open | Twee fonts selecteren |
| Logo / woordmerk | Open | Heeft Wievien al een logo? |
| Welke kleding precies geschikt voor borduren | Open | "Later nog bepalen" |
| Betaalmethode shop | Open | Mollie, Stripe, Etsy, handmatig? |
| Fotografie richtlijnen | Open | Stijl, licht, achtergronden |
| Prijzen borduurwerk | Open | Tarieven / prijsindicatie |
| Workshop planning | Open | Frequentie, locaties |
| Domein | Open | studiowievien.nl? wievien.nl? |
| Hosting | Netlify (voorlopig) | Zelfde als MeisterEnergie |
| Analytics | Open | Plausible (privacy-friendly) zoals MeisterEnergie? |
| Nieuwsbrief | Open | Wil Wievien een mailinglijst? |
| Instagram integratie | Open | Feed tonen op site? |

---

## Volgende stappen

1. **Visual design system schrijven** — volledige design specificatie met CSS techniques, readability standards, image optimization, en placeholders voor kleur/typografie keuzes
2. **SEO strategy document** — aangepast voor creatief portfolio + e-commerce
3. **Google Search Central reference** — universeel document overnemen
4. **Tested workflows** — Lighthouse/Playwright aangepast voor image-heavy site
5. **Project reference** — technische referentie met content pipeline
6. **Principles** — creatief beslissingskader
7. **Astro project opzetten** — skeleton met layouts, components, content collections
8. **Eerste content** — portfolio stukken + producten invoeren
