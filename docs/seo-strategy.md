## SEO Strategy — Studio Wievien

### Topical Authority Through Visual Niche Ownership

Studio Wievien targets a specific niche: handmade embroidery and custom clothing in the Netherlands. The SEO strategy is built on owning this niche completely — being the most comprehensive, most visual, and most authentic source for anyone searching for custom embroidery, embroidered clothing, or creative textile workshops in Dutch.

**Our advantage:** Original photography of real handmade work. No competitor can replicate this with AI-generated content or stock photography. Every portfolio piece is unique. Every process shot is real. This is the hardest content for content farms to fake — and exactly what Google's `contentEffort` signal rewards.

**Our twist:** Unlike information sites that compete on text quality, we compete on visual quality and authentic maker identity. Google Images and Google Discover are potentially bigger traffic channels than traditional Search for a visual portfolio.

---

### Core Concepts We Use

**Visual-first topical authority.** Our portfolio, products, and process photography create a visual semantic map of the embroidery craft niche. Each image is metadata-rich (descriptive alt text, structured data, responsive formats) — making the visual content as discoverable as text.

**One intent per page.** Portfolio overview = browsing/discovery intent. Individual piece = detail/appreciation intent. Product page = purchase intent. Workshop page = booking intent. Services page = inquiry intent. No page tries to serve multiple intents.

**Original content advantage.** Every piece of work is original. Every photograph is original. Every product description comes from the maker. This is content effort that can't be synthesized. Google's original content systems, contentEffort signal, and reviews system all reward exactly this.

**E-commerce structured data.** Product + Offer schema on shop items. Event schema on workshops. These generate rich results in Search — price, availability, dates — giving us visual SERP real estate that text-only competitors don't get.

---

### Content Architecture

```
/                              ← Homepage: featured work + latest additions
/nl/werk/                      ← Portfolio hub: all work, filtered by category
/nl/werk/{slug}/               ← Individual piece: photos + story + techniques
/nl/fancy-boogers/             ← Clothing line overview
/nl/fancy-boogers/{slug}/      ← Individual product
/nl/borduurwerk/               ← Embroidery services landing page
/nl/workshops/                 ← Workshop overview
/nl/workshops/{slug}/          ← Individual workshop
/nl/winkel/                    ← Shop: all purchasable items
/nl/over-wievien/              ← About: maker story + CV + exhibitions
/nl/contact/                   ← Contact
/en/...                        ← English equivalents
```

### Internal Linking (Contextual Bridges)

- Homepage → featured work + latest additions (discovery)
- Portfolio overview → individual pieces (hub-to-spoke)
- Individual pieces → related work from same category (spoke-to-spoke)
- Individual pieces → shop if piece is for sale (content-to-commerce)
- Product pages → portfolio pieces showing technique/style (commerce-to-content)
- Services page → portfolio examples (services-to-proof)
- Workshop pages → related portfolio work (event-to-content)
- All pages → relevant category overviews via navigation

### Schema Markup

| Page type | Schema | Rich result potential |
|-----------|--------|---------------------|
| Homepage | `Organization` + `WebSite` | Sitelinks, knowledge panel |
| Portfolio pieces | `CreativeWork` / `VisualArtwork` | Image results, Discover |
| Products | `Product` + `Offer` | Price, availability, product rich results |
| Workshops | `Event` + `Offer` | Event discovery, date, price |
| About | `Person` + `Organization` | Knowledge panel potential |
| All pages | `BreadcrumbList` | Navigation breadcrumbs (desktop) |

---

### Image SEO (Critical for Studio Wievien)

Images are our primary content. Image SEO is not secondary — it's core strategy.

**File naming:** Descriptive slugs in Dutch. `borduurwerk-denim-jas-detail.avif` not `IMG_4521.avif`. File names are a ranking signal for Google Images.

**Alt text:** Every image gets descriptive alt text in both NL and EN. Describes what's visible: "Handgeborduurd bloemmotief op donkerblauwe denim jas, close-up van steekdetail." Not keyword-stuffed, not generic.

**Responsive images:** `srcset` with 400w, 800w, 1200w, 1600w variants. Correct `sizes` attribute so the browser picks the right size. AVIF primary format (smallest filesize, best quality, confirmed supported by Google since August 2024).

**`og:image`:** Set on every page. Google confirmed (March 2026) it uses `og:image` alongside `schema.org` markup for thumbnails in Search and Discover.

**Schema.org `image`:** Include `image` property in all structured data (Product, Event, CreativeWork).

**Google Images traffic:** Portfolio sites can get significant traffic from Google Images. Optimize for this by ensuring:
- Images are in `<img>` tags with `src` attributes (Google extracts from these only)
- Images are not blocked by robots.txt
- Each image has unique, descriptive content around it on the page
- Sitemap includes image information

---

### Meta Description Strategy

Same principle as MeisterEnergie: answer-first, no filler.

**For portfolio/products:** Lead with what makes the piece special, not generic descriptions.

| Instead of | Write |
|-----------|-------|
| "Bekijk dit handgemaakte borduurwerk van Studio Wievien." | "Handgeborduurd bloemmotief op vintage denim jas. Katoenen draad, 12 uur handwerk. Beschikbaar als opdracht." |
| "Ontdek de Fancy Boogers collectie." | "Fancy Boogers: handgemaakte kleding met borduurwerk. Hoodies, caps en jassen — elk stuk uniek." |

**For workshops:** Lead with what someone learns and when.

| Instead of | Write |
|-----------|-------|
| "Schrijf je in voor een borduurworkshop." | "Leer basisborduurwerk in 3 uur. Zaterdag 15 april, Amsterdam. Alle materialen inbegrepen. €45 p.p., max 12 deelnemers." |

**For services:** Lead with what's possible.

| Instead of | Write |
|-----------|-------|
| "Laat je kleding borduren door Studio Wievien." | "Custom borduurwerk op jouw kleding: petten, jassen, hoodies. Eigen ontwerp of in overleg. Tarieven vanaf €X." |

---

### Theoretical Foundations

The same Google systems documented in `google-search-central-reference.md` apply. The key systems most relevant to a creative portfolio:

**NavBoost (confirmed: DOJ trial 2023 + API leak 2024):** User satisfaction signals determine whether you stay in rankings. For a portfolio site: visitors who browse multiple pieces, spend time on detail pages, and don't bounce back to search are strong positive signals. Beautiful, fast-loading imagery drives this.

**contentEffort (confirmed: API leak 2024):** Google's LLM-based effort estimation rewards content that is "easily identifiable and hard to replicate." Original handmade craft with original photography is the definition of high-effort content. AI farms literally cannot replicate this.

**Chrome clickstream data (confirmed: API leak 2024):** Chrome monitors dwell time and browsing patterns. A portfolio site where visitors explore multiple pages signals quality to Google.

**siteAuthority + siteFocusScore (confirmed: API leak 2024):** Sites focused on a specific topic score higher. A site entirely about handmade embroidery and custom clothing has maximum focus.

**Original content systems:** Google's active ranking system that "elevates original reporting and creators." A maker's own portfolio is the most original content possible.

See `google-search-central-reference.md` for full documentation of all active systems.

---

### AI Overview & AI Mode Strategy

AI Overviews and AI Mode use query fan-out — searching related sub-queries to build comprehensive answers. When someone asks "custom borduurwerk laten maken," the system may fan out to:
- Portfolio examples of custom embroidery
- Pricing and process information
- Workshop availability
- Maker background and expertise

Our site structure naturally maps to these sub-queries. Each page answers one specific intent, giving the AI system clear passages to cite.

**Image citability:** AI Overviews increasingly include images. Our high-quality, well-described portfolio images with structured data are strong candidates for visual citations.

---

### Google Discover Strategy

Google Discover rewards visually rich, original content. Creative portfolio sites are a natural fit:
- Original photography (minimum 1200px wide for Discover eligibility)
- Content that's interesting without being time-sensitive
- Strong `og:image` on every page
- `max-image-preview:large` meta tag (allows Google to show large image previews)

The February 2026 Discover Core Update specifically rewards "locally relevant, in-depth, original content" — handmade craft from a Dutch studio fits this exactly.

---

### Competitive Landscape

Studio Wievien's SEO competitors are:
1. **Other Dutch embroidery artists** — typically Instagram-only, no website or minimal portfolio
2. **Etsy/craft marketplace listings** — product pages without portfolio depth or maker story
3. **Generic fashion brands** — not handmade, no craft authenticity
4. **Workshop platforms** — aggregate listings without individual maker identity

Our advantage: a dedicated website with full portfolio, maker story, process documentation, and e-commerce — something most competitors in the handmade embroidery niche don't have. The bar for topical authority in this niche is low.

---

### Monitoring & KPIs

**Pre-launch:**
- [ ] All pages pass Lighthouse audit (performance ≥90, accessibility ≥95, SEO ≥95)
- [ ] All Product/Event schema validates in Rich Results Test
- [ ] All images have descriptive alt text in NL + EN
- [ ] Sitemap includes image information

**Post-launch:**
- Search Console: impressions and clicks by page, query, and search type (Web, Image, Discover)
- Google Images traffic as separate KPI (expected to be significant)
- Branded search growth ("Studio Wievien", "Fancy Boogers")
- Rich result appearances (Product, Event)
- Core Web Vitals (especially LCP on image-heavy pages)
