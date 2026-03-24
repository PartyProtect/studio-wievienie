# Google Search Central Reference — Extracted Knowledge

*Source: Official Google Search Central documentation at [developers.google.com/search](https://developers.google.com/search). All information on this page comes directly from Google's own documentation unless otherwise noted. Inline citations link to the specific Google doc page.*

*Last reviewed: 24 maart 2026.*

---

## Why This Document Exists

Google regularly updates its Search Central documentation — schema deprecations, crawler changes, new AI feature guidance, ranking system updates. Changes happen without announcements. A structured data type you rely on can be deprecated with a doc update, not a blog post.

This document extracts every piece of Google's official documentation that's relevant to Studio Wievien, organized by topic, with source links. It serves as our single reference for what Google has actually said — not what SEO blogs interpret.

**Update cadence:** Review monthly against [the documentation updates log](https://developers.google.com/search/updates)<sup>1</sup> and [the Search Central blog](https://developers.google.com/search/blog)<sup>2</sup>.

---

## Monitoring Checklist

These are the Google pages we should inspect regularly. Ordered by importance for our project.

| Priority | What | URL | Why | Check frequency |
|----------|------|-----|-----|-----------------|
| 1 | Documentation updates log | [developers.google.com/search/updates](https://developers.google.com/search/updates)<sup>1</sup> | Every doc change is timestamped here. Schema deprecations, crawler changes, new guidance. The single most important page. | Monthly |
| 2 | AI features & your website | [developers.google.com/search/docs/appearance/ai-features](https://developers.google.com/search/docs/appearance/ai-features)<sup>3</sup> | Official AI Overview and AI Mode eligibility requirements. Will be updated as AI Mode expands beyond the US. | Monthly |
| 3 | Search Central blog | [developers.google.com/search/blog](https://developers.google.com/search/blog)<sup>2</sup> | Core update announcements, policy changes, new features. | Monthly |
| 4 | Structured data general guidelines | [developers.google.com/search/docs/appearance/structured-data/sd-policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)<sup>4</sup> | Policy changes for schema markup. Deprecation notices appear here. | Quarterly |
| 5 | Product structured data | [developers.google.com/search/docs/appearance/structured-data/product](https://developers.google.com/search/docs/appearance/structured-data/product)<sup>5</sup> | We use Product+Offer on shop items. E-commerce rich results depend on this. | Quarterly |
| 6 | Ranking systems guide | [developers.google.com/search/docs/appearance/ranking-systems-guide](https://developers.google.com/search/docs/appearance/ranking-systems-guide)<sup>6</sup> | Active/retired ranking systems. Helpful Content System was retired into core in March 2024 — this is where you'd learn about similar changes. | Quarterly |
| 7 | Robots meta tags | [developers.google.com/search/docs/crawling-indexing/robots-meta-tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)<sup>7</sup> | Controls for AI Overviews, snippets, and indexing. New AI-specific directives could appear here. | Quarterly |
| 8 | Crawler overview | [developers.google.com/search/docs/crawling-indexing/overview-google-crawlers](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)<sup>8</sup> | New crawlers (e.g. Google-CloudVertexBot was just added). Behavior changes. File size limits. | Quarterly |
| 9 | SEO starter guide | [developers.google.com/search/docs/fundamentals/seo-starter-guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)<sup>9</sup> | Refreshed February 2024. Google's canonical best practices. | Yearly |

---

## AI Features in Google Search

*Source: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)<sup>3</sup>. Published May 2025, updated with AI Mode information.*

### What Google says — verbatim requirements

Google is explicit: **"There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary."**<sup>3</sup> No special markup, no AI-specific files, no machine-readable formats beyond standard SEO.

### AI Overviews

AI Overviews help users "get to the gist of a complicated topic or question more quickly" and provide entry points to explore additional links.<sup>3</sup> They appear only when Google determines they'd be more useful than standard results.

**Eligibility:** A page must be (1) indexed by Google, (2) eligible to be shown in Google Search with a snippet. That's it.<sup>3</sup>

### AI Mode

AI Mode handles queries requiring "exploration, reasoning, or complex comparisons."<sup>3</sup> Users can ask nuanced questions that previously required multiple searches. Same eligibility requirements as AI Overviews.

### Query fan-out

Both AI features use "query fan-out" — issuing multiple related searches across subtopics — enabling display of "a wider and more diverse set of helpful links" than classic Search.<sup>3</sup> This is confirmed by patent US11769017B1 (see `seo-strategy.md`). It means a page doesn't need to rank for the exact query to be cited — it can be surfaced through a sub-query.

**Implication for us:** Our portfolio pieces, products, and services naturally map to sub-queries. A user searching "custom borduurwerk Nederland" triggers fan-out to subtopics (portfolio, workshops, pricing) — where our individual pages live.

### Content controls for AI features

Site owners can limit content appearance in AI features using:<sup>7</sup>

| Directive | Effect | Scope |
|-----------|--------|-------|
| `nosnippet` | Blocks text snippets AND AI Overview/AI Mode use | Full page |
| `data-nosnippet` | Blocks specific text sections from snippets and AI features | Element-level (`<span>`, `<div>`, `<section>`) |
| `max-snippet:[n]` | Limits snippet length; `0` = same as `nosnippet` | Full page |
| `noindex` | Removes page from Search entirely | Full page |
| `Google-Extended` | Blocks use for AI training (Gemini Apps), does NOT affect Search | Site-level (robots.txt) |

**Critical distinction:** `Google-Extended` does not affect Google Search, AI Overviews, or AI Mode. It only controls whether content is used for training Gemini Apps.<sup>8</sup> This was clarified in February 2024.<sup>1</sup>

### Search Console measurement

AI feature traffic appears in Search Console's Performance report under "Web" search type. Google counts clicks from AI Overviews and AI Mode toward overall metrics. AI Mode specifically was added to Search Console counting in June 2025.<sup>1</sup>

---

## Active Ranking Systems

*Source: [Guide to Google Search ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide)<sup>6</sup>. These are the confirmed, currently active systems Google names publicly.*

### Systems most relevant to Studio Wievien

**BERT** — "Allows us to understand how combinations of words express different meanings and intent."<sup>6</sup> This is why natural, descriptive writing works better than keyword-stuffed text. BERT understands meaning, not just word matching.

**Neural matching** — "AI system that Google uses to understand representations of concepts in queries and pages and match them."<sup>6</sup> Works at the concept level, not keyword level. Our semantic coverage of the entire handmade embroidery niche (portfolio, services, products, workshops) is exactly what this system rewards.

**Passage ranking** — "AI system we use to identify individual sections or passages of a web page to better understand relevance."<sup>6</sup> Google doesn't just evaluate whole pages — it evaluates individual passages. Each portfolio piece description, product detail, and service explanation can independently match queries.

**RankBrain** — "Helps us understand how words are related to concepts" enabling relevance even without exact keyword matches.<sup>6</sup> Another reason to write naturally rather than keyword-optimize.

**Original content systems** — "Elevates original reporting and creators; demotes those merely citing original work; supports canonical markup."<sup>6</sup> Our original photography, portfolio of unique handmade work, and process documentation signal originality.

**Reviews system** — "Aims to better reward high quality reviews, content that provides insightful analysis and original research, and is written by experts."<sup>6</sup> Relevant because our content is first-person expert craft documentation — the maker describing their own process and techniques.

**Freshness systems** — "Designed to show fresher content for queries where it would be expected."<sup>6</sup> New portfolio pieces, workshop dates, and product availability change regularly. Keeping content current signals freshness.

**Reliable information systems** — Multiple systems that "elevate authoritative pages, demote low-quality content, elevate quality journalism."<sup>6</sup> Content advisories appear for topics where information is uncertain. Our authentic maker identity and verifiable portfolio demonstrate the kind of trustworthiness these systems reward.

**Link analysis / PageRank** — Still active, evolved since 1998. Evaluates how pages link to determine relevance and authority.<sup>6</sup> Links from exhibition sites, workshop platforms, and creative community sites create knowledge graph connections.

**Site diversity system** — "Generally won't show more than two web page listings from the same site in top results."<sup>6</sup> May treat subdomains as separate sites when relevant. Not a concern for us — we want deep visibility in the handmade embroidery niche.

**SpamBrain** — Google's primary spam detection system. Relevant because it flags "scaled content abuse" — AI-generated content designed to rank rather than inform.<sup>6</sup> Our original photography and handmade portfolio content is the opposite of what this targets.

### Key principle from Google

"Our ranking systems are designed to work on the **page level**" while also considering site-wide signals. Site quality doesn't guarantee uniform performance across all content.<sup>6</sup>

### Retired systems worth knowing about

| System | Active | Retired | Why it matters |
|--------|--------|---------|----------------|
| Helpful Content System | 2022 | March 2024 — "became part of our core ranking systems"<sup>6</sup> | The signal didn't disappear — it was absorbed into core. Helpful content still matters, it's just no longer a separate system. |
| Panda | 2011 | 2015 — integrated into core<sup>6</sup> | Same pattern. Site quality scoring didn't go away, it became foundational. |
| Penguin | 2012 | 2016 — integrated into core<sup>6</sup> | Link spam detection is now a core function, not a separate overlay. |

**Pattern:** Google retires named systems by absorbing them into core ranking. The signal gets stronger, not weaker. When the Helpful Content System was retired in March 2024, it meant content quality became a permanent core factor — not an optional one.

---

## Crawling & Indexing

*Sources: [Crawler overview](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)<sup>8</sup>, [Sitemaps overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)<sup>10</sup>, [Robots meta tags](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)<sup>7</sup>.*

### Google's crawlers relevant to us

| Crawler | Purpose | Robots.txt token | Notes |
|---------|---------|-------------------|-------|
| **Googlebot** | Google Search indexing | `Googlebot` | Primary crawler. Respects robots.txt. Processes first 15MB of files.<sup>8</sup> |
| **Googlebot-Image** | Google Images indexing | `Googlebot-Image` | Crawls images referenced in pages. |
| **Google-CloudVertexBot** | Vertex AI Agents | `Google-CloudVertexBot` | Added August 2024.<sup>1</sup> Crawls on site owners' request when building Vertex AI Agents. |
| **Google-Extended** | AI training (Gemini) | `Google-Extended` | Controls AI training only — does NOT affect Search, AI Overviews, or AI Mode.<sup>8</sup> |

**New crawlers added since 2024:**<sup>1</sup>
- `Google-CloudVertexBot` (August 2024) — Vertex AI Agents
- `GoogleOther-Image` and `GoogleOther-Video` (May 2024) — binary data fetchers
- `Google-NotebookLM` (October 2025) — user-triggered fetcher for NotebookLM
- `Google-CWS` (November 2025) — user-triggered fetcher
- `Google-Pinpoint` (November 2025) — user-triggered fetcher

### Technical behavior

**Protocols:** HTTP/1.1 (default) and HTTP/2. Sites can opt out of HTTP/2 by responding with 421 status code.<sup>8</sup>

**Content encoding:** Supports gzip, deflate, and Brotli (br).<sup>8</sup>

**File size limit:** Crawlers process only the first **15MB** of files by default.<sup>8</sup> Our static Astro HTML pages are well under this.

**Caching:** Googlebot supports HTTP caching via `ETag`/`If-None-Match` and `Last-Modified`/`If-Modified-Since`. Google recommends ETag over Last-Modified to avoid date formatting issues.<sup>8</sup>

**Infrastructure:** Crawlers operate from thousands of distributed machines, primarily egressing from US IP addresses.<sup>8</sup>

**JavaScript:** Pages with a 200 HTTP status code are sent to rendering. Pages with non-200 status codes may not be rendered.<sup>1</sup> (Clarified December 2025.)

### Sitemaps

**When you need one:**<sup>10</sup>
- Site is new with few external links (this is us)
- Site has rich media content
- Pages lack comprehensive internal linking

**When you might not:**<sup>10</sup>
- Small site (under 500 pages) where all important pages are discoverable from the homepage via internal links

**Key quote from Google:** "It doesn't guarantee that all the items in your sitemap will be crawled and indexed."<sup>10</sup>

**Our situation:** We'll have a smaller site (portfolio, shop, services, workshops, about, contact) with rich media content (photography-heavy). We're a new site with few external links. We should submit a sitemap — especially because Google Images discovery benefits from it. Internal linking between portfolio, shop, and services pages is the main discovery driver.

**IndexNow:** Google does not support IndexNow as of March 2026, despite testing it since October 2021. Google's Indexing API is limited to job postings and live streaming content only — not applicable to us.

### Robots meta tags — complete reference

*Source: [Robots meta tag specification](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)<sup>7</sup>.*

All directives can be set via `<meta name="robots">` tags or `X-Robots-Tag` HTTP headers.<sup>7</sup>

#### Indexing directives

| Directive | Effect |
|-----------|--------|
| `noindex` | Page removed from Search entirely<sup>7</sup> |
| `nofollow` | Google won't follow links on the page<sup>7</sup> |
| `none` | Equivalent to `noindex, nofollow`<sup>7</sup> |
| `indexifembedded` | Allows indexing when embedded via iframes despite noindex on the parent<sup>7</sup> |

#### Snippet and preview directives

| Directive | Effect | AI impact |
|-----------|--------|-----------|
| `nosnippet` | Blocks text snippets, video previews, **AI Overviews, and AI Mode**<sup>7</sup> | Full opt-out from AI features |
| `data-nosnippet` | Blocks specific HTML elements from snippets and AI features<sup>7</sup> | Granular opt-out |
| `max-snippet:[n]` | Limits snippet to n characters; `0` = nosnippet; `-1` = no limit<sup>7</sup> | Affects AI feature usage |
| `max-image-preview:[setting]` | Controls image preview size: `none`, `standard`, `large`<sup>7</sup> | — |
| `max-video-preview:[n]` | Limits video preview to n seconds; `0` = static image only<sup>7</sup> | — |

#### Other directives

| Directive | Effect |
|-----------|--------|
| `notranslate` | No translation offered in search results<sup>7</sup> |
| `noimageindex` | Don't index images on this page<sup>7</sup> |
| `unavailable_after:[date]` | Remove from results after date (RFC 822, RFC 850, or ISO 8601)<sup>7</sup> |

#### Retired/unused directives

- `noarchive` — no longer controls anything (cached links feature removed)<sup>7</sup>
- `nocache` — not used by Google Search<sup>7</sup>
- `nositelinkssearchbox` — no longer controls sitelink search box<sup>7</sup>

#### Conflict resolution

"In the case of conflicting robots rules, the more restrictive rule applies."<sup>7</sup> Example: `max-snippet:50` combined with `nosnippet` defaults to `nosnippet`.

#### Critical constraint

Robots meta tags are discovered during crawling. If a page is blocked in robots.txt, the meta tags are never found and therefore ignored.<sup>7</sup> Don't block pages in robots.txt that you want to control with meta tags.

#### Structured data interaction

Robots meta tags limit automatic content extraction but don't restrict schema.org structured data usage — except for `article.description` and description fields in creative work schemas, which respect `max-snippet` limits.<sup>7</sup>

---

## Structured Data — What Google Requires for Our Schema Types

*Sources: [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)<sup>4</sup>, [Product](https://developers.google.com/search/docs/appearance/structured-data/product)<sup>5</sup>, [Event](https://developers.google.com/search/docs/appearance/structured-data/event)<sup>14</sup>, [Article](https://developers.google.com/search/docs/appearance/structured-data/article)<sup>11</sup>, [BreadcrumbList](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)<sup>12</sup>, [SpeakableSpecification](https://developers.google.com/search/docs/appearance/structured-data/speakable)<sup>13</sup>.*

### General policies (apply to all schema types)

**Format:** JSON-LD is recommended. Microdata and RDFa also supported.<sup>4</sup>

**Content rules:**<sup>4</sup>
- Don't mark up content that is not visible to readers
- Don't mark up irrelevant or misleading content
- Don't use structured data to deceive or mislead users
- Structured data must accurately represent page content
- Provide current, time-sensitive information
- Use original content generated by you or your users

**Access:** Don't block structured data pages from Googlebot using robots.txt or `noindex`.<sup>4</sup>

**Validation:** Use the [Rich Results Test](https://search.google.com/test/rich-results) and URL Inspection tool.<sup>4</sup>

**Consequences:** Violating guidelines triggers manual actions that prevent rich result eligibility — but does not affect web rankings.<sup>4</sup> Your page still ranks; it just doesn't get enhanced search features.

### Product + Offer — our shop schema

*Source: [Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)<sup>5</sup>.*

**What it gives us:** Product rich results in Search — price, availability, images. Essential for Fancy Boogers clothing and embroidery pieces for sale.

**Required properties:**

| Level | Property | Requirement |
|-------|----------|-------------|
| Product | `name` | Product name<sup>5</sup> |
| Product | `image` | Image(s) of the product<sup>5</sup> |
| Offer | `price` | Price as number<sup>5</sup> |
| Offer | `priceCurrency` | Currency code (EUR)<sup>5</sup> |
| Offer | `availability` | ItemAvailability (InStock, OutOfStock, etc.)<sup>5</sup> |

**Recommended properties:**
- `description` — product description
- `brand` — "Fancy Boogers" or "Studio Wievien"
- `material` — fabric/material info
- `offers.url` — link to product page

**Content rules:**<sup>5</sup>
- Only mark up products that can actually be purchased
- Price must be accurate and current
- Availability must reflect actual stock

**Our implementation:** Product + Offer on all shop items (Fancy Boogers clothing, embroidery pieces for sale). Portfolio pieces NOT for sale get `CreativeWork`/`VisualArtwork` instead (no Offer).

### Event — our workshop schema

*Source: [Event structured data](https://developers.google.com/search/docs/appearance/structured-data/event)<sup>14</sup>.*

**What it gives us:** Event rich results in Search — date, location, availability. Helps workshop discovery.

**Required properties:**

| Property | Requirement |
|----------|-------------|
| `name` | Workshop title<sup>14</sup> |
| `startDate` | ISO 8601 date/time<sup>14</sup> |
| `location` | Physical location (Place + Address) or VirtualLocation<sup>14</sup> |

**Recommended properties:**
- `description` — what the workshop covers
- `image` — workshop photo
- `offers` — price + availability (number of spots)
- `organizer` — Studio Wievien (Person or Organization)
- `eventStatus` — EventScheduled, EventCancelled, etc.
- `eventAttendanceMode` — OfflineEventAttendanceMode for in-person workshops

**Our implementation:** Event + Offer on each workshop page with date, location, price, and remaining spots.

### Article — optional for process/story pages

*Source: [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)<sup>11</sup>.*

**Supported types:** `Article`, `NewsArticle`, `BlogPosting`.<sup>11</sup>

**Required properties:** None. Google states: "There are no required properties; instead, add the properties that apply to your content."<sup>11</sup>

**Recommended properties:**

| Property | Type | Purpose |
|----------|------|---------|
| `author` | Person or Organization | Content creator<sup>11</sup> |
| `author.name` | Text | Creator's name<sup>11</sup> |
| `author.url` | URL | Link to author's profile or identifying page<sup>11</sup> |
| `dateModified` | DateTime (ISO 8601) | Most recent update<sup>11</sup> |
| `datePublished` | DateTime (ISO 8601) | Original publication<sup>11</sup> |
| `headline` | Text | Article title (concise)<sup>11</sup> |
| `image` | ImageObject or URL | Representative image(s)<sup>11</sup> |

**Author markup best practices:**<sup>11</sup>
- Include all visible authors
- Use `@type: Person` for individuals, `@type: Organization` for entities
- Include `url` or `sameAs` with valid URLs
- Only place author names in `author.name` — no titles, honorifics, or publisher info
- List each author separately, not comma-separated

**Image guidelines:**<sup>11</sup>
- Multiple high-resolution images recommended (minimum 50K pixels total)
- Suggested aspect ratios: 16:9, 4:3, 1:1
- Must be crawlable, indexable, and content-relevant

**Our implementation:** Article schema is optional for Studio Wievien — useful if we add blog/process posts about embroidery techniques or behind-the-scenes stories. Use `author` (Wievien), `datePublished`, `headline`, and `image`.

### BreadcrumbList — all pages

*Source: [BreadcrumbList structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)<sup>12</sup>.*

**Availability:** Desktop only, not mobile.<sup>1</sup> (Clarified January 2025.)

**Required properties:**

| Level | Property | Requirement |
|-------|----------|-------------|
| BreadcrumbList | `itemListElement` | Array of `ListItem` objects (minimum 2)<sup>12</sup> |
| ListItem | `position` | Integer — position 1 = beginning of trail<sup>12</sup> |
| ListItem | `name` | Display text for the breadcrumb<sup>12</sup> |
| ListItem | `item` | URL — not required for final item (Google uses page URL)<sup>12</sup> |

**Key guidance from Google:** "We recommend providing breadcrumbs that represent a typical user path to a page, instead of mirroring the URL structure."<sup>12</sup>

Multiple breadcrumb trails can be specified for a single page. The top-level path item is optional.<sup>12</sup>

### SpeakableSpecification — potential addition

*Source: [Speakable structured data](https://developers.google.com/search/docs/appearance/structured-data/speakable)<sup>13</sup>.*

**Status: Beta. US English only. Google Home devices only.**<sup>13</sup>

**What it does:** Identifies sections of articles best suited for text-to-speech (TTS) playback. Google Assistant can read these sections aloud on smart speakers.<sup>13</sup>

**Requirements:**
- Applies to `Article` and `WebPage` types only<sup>13</sup>
- Use CSS selectors OR XPath to point to speakable content — not both<sup>13</sup>
- Content should be ~20–30 seconds per section (2–3 sentences)<sup>13</sup>
- Avoid marking up datelines, captions, attributions<sup>13</sup>

**Our assessment:** Not relevant yet. Limited to US English, Google Home only. Monitor for expansion to Dutch / broader platforms. Listed in `seo-strategy.md` as a potential future addition.

### Schema types we don't use but should monitor

| Type | Why monitor | Status |
|------|------------|--------|
| **HowTo** | Could apply to embroidery process pages or workshop descriptions. | Active — evaluate fit |
| **CreativeWork / VisualArtwork** | For portfolio pieces not for sale. No rich results but helps AI systems understand the content type. | Active — implement on portfolio pages |
| **Organization** | For the homepage — Studio Wievien as creative practice. | Active — implement |
| **Person** | For the about page — Wievien as maker/artist. | Active — implement |

### Recently deprecated schema types (not relevant to us, but good to know)

Deprecated in 2025–2026:<sup>1</sup>
- Practice problem (January 2026)
- Dataset (limited to Dataset Search only, November 2025)
- Course info, estimated salary, learning video (September 2025)
- Special announcement (July 2025)
- Vehicle listing (September 2025)
- Fact check / ClaimReview (June 2025)
- Book actions (deprecated notice June 2025, then removed November 2025, then un-deprecated)

**Pattern:** Google is trimming schema types that weren't generating useful rich results. Our core types (Product, Event, BreadcrumbList, Organization) are stable.

---

## Google's SEO Best Practices — What Applies to Us

*Source: [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)<sup>9</sup>. Refreshed February 2024.*

This section extracts only the guidance that's actionable for Studio Wievien. Generic advice (e.g. "use a CMS") is excluded.

### Content

- Content must be "helpful, reliable, and people-first" with expert sources when applicable.<sup>9</sup>
- Keep content current. Update previously published material and remove outdated information.<sup>9</sup> → Keep portfolio, product availability, and workshop dates current.
- Anticipate how users search — both experienced and new users — but don't keyword-stuff. "Excessively repeating the same words over and over" violates spam policies.<sup>9</sup>
- Don't let ads or interstitials prevent users from accessing content.<sup>9</sup> → We have zero popups, zero exit-intent modals, zero intrusive interstitials.

### Site structure

- Use descriptive URLs: `example.com/pets/cats.html` over random identifiers.<sup>9</sup> → Our `/nl/werk/{slug}/`, `/nl/winkel/`, `/nl/workshops/` architecture does this.
- Group topically similar content in directories.<sup>9</sup> → Our `/werk/`, `/fancy-boogers/`, `/workshops/`, `/winkel/` structure does this.
- Ensure each piece of content has one primary URL. Use redirects or `rel="canonical"` when needed.<sup>9</sup>

### Links

- Anchor text should clearly describe the target page's content.<sup>9</sup> → Applies to our internal links between portfolio, shop, and services.
- Link to relevant resources that add context.<sup>9</sup> → Link to material suppliers, exhibition sites, workshop platforms where relevant.
- Add `nofollow` to untrusted or user-generated links.<sup>9</sup> → Not currently relevant (no user-generated content).

### Images

- Use high-quality images near relevant text.<sup>9</sup>
- Write descriptive `alt` text explaining the image's relationship to content.<sup>9</sup>
- Google confirmed it uses both `schema.org` markup AND `og:image` meta tags for determining image thumbnails in Search and Discover.<sup>1</sup> (Clarified March 2026.)
- Images are extracted only from `<img>` tag `src` attributes.<sup>1</sup> (Clarified April 2024.)

### Things Google says NOT to focus on

These are directly from Google's SEO starter guide — things that don't affect ranking:<sup>9</sup>

| Don't worry about | Why |
|--------------------|-----|
| Meta keywords tag | Google doesn't use this signal<sup>9</sup> |
| Keywords in domain name | Minimal ranking impact beyond breadcrumb display<sup>9</sup> |
| Content length targets | "No magical word count minimum or maximum exists for ranking"<sup>9</sup> |
| Heading order (H1 before H2) | Doesn't affect rankings, though it helps screen readers<sup>9</sup> |
| Subdomain vs. subdirectory | Choose what works for your business<sup>9</sup> |
| PageRank obsession | Links matter, but many other signals exist<sup>9</sup> |
| Duplicate content "penalties" | Having content on multiple URLs is inefficient but isn't penalized; copying others' content is different<sup>9</sup> |
| E-E-A-T as a direct ranking factor | "Expertise, Experience, Authoritativeness, Trustworthiness doesn't directly rank pages"<sup>9</sup> |

**Note on the E-E-A-T point:** Google says E-E-A-T is not a direct ranking factor — it's a framework for their quality raters, not an algorithmic signal. However, the systems that E-E-A-T describes (content effort, reliable information, original content) ARE algorithmic signals. The distinction: Google doesn't have an "E-E-A-T score" in its algorithm, but the underlying qualities that E-E-A-T measures are individually scored by multiple active ranking systems.

---

## Documentation Changelog — Changes Relevant to Studio Wievien

*Source: [Documentation updates log](https://developers.google.com/search/updates)<sup>1</sup>. Filtered to only show changes that affect our site or decisions.*

### 2026

| Date | Change | Impact on us |
|------|--------|-------------|
| March 2026 | Image SEO: Google uses both `schema.org` markup and `og:image` meta tag for thumbnails<sup>1</sup> | Ensure we set `og:image` on all pages alongside schema.org image markup |
| March 2026 | Removed outdated JavaScript accessibility section — Google renders JS natively now<sup>1</sup> | Confirms our Astro approach (static HTML) is optimal but JS rendering is no longer a concern if we ever need it |
| February 2026 | Discover Core Update — rewards locally relevant, in-depth, original content<sup>2</sup> | Positive for us: original handmade craft content with photography is exactly what this rewards |
| January 2026 | Practice problem structured data removed<sup>1</sup> | Not relevant — we don't use this |
| January 2026 | Preferred sources documentation launched<sup>1</sup> | Monitor: this feature lets users mark trusted news publishers. Could expand to other content types. |

### 2025

| Date | Change | Impact on us |
|------|--------|-------------|
| December 2025 | JavaScript: non-200 pages may not be rendered<sup>1</sup> | Not relevant — our pages return 200 |
| December 2025 | JS canonicalization best practices added<sup>1</sup> | Not relevant — we use static HTML with explicit canonical tags |
| December 2025 | Search Console: weekly and monthly views added<sup>2</sup> | Useful for post-launch monitoring |
| November 2025 | Search Console: branded queries filter added<sup>2</sup> | Useful for tracking "Studio Wievien" brand search growth |
| November 2025 | Shipping policies structured data added<sup>1</sup> | Potentially relevant for shop — evaluate when payment integration is decided |
| November 2025 | Review/aggregate rating nesting clarified<sup>1</sup> | Not currently relevant — no review markup |
| September 2025 | Deprecated: course info, estimated salary, learning video, special announcement, vehicle listing<sup>1</sup> | Not relevant — we don't use these |
| August 2025 | JavaScript-based paywall guidance added<sup>1</sup> | Not relevant — no paywall |
| June 2025 | AI Mode added to Search Console counting<sup>1</sup> | Important for measuring AI Mode traffic post-launch |
| June 2025 | Deprecated: book actions, ClaimReview<sup>1</sup> | Not relevant |
| June 2025 | URL structure docs revamped with real-world examples<sup>1</sup> | Review for any new guidance on our URL architecture |
| May 2025 | AI features documentation launched<sup>1</sup> | Core reference — captured in this document |
| May 2025 | Image SEO: use consistent URL references for crawling efficiency<sup>1</sup> | Ensure our images use consistent URLs, not varying paths |
| May 2025 | EPUB added to indexable file types<sup>1</sup> | Not relevant |
| April 2025 | Google-Extended clarified: doesn't affect Search<sup>1</sup> | Important — no need to block Google-Extended |
| March 2025 | Robots refresher series published (robots.txt, page-level controls, future-proofing)<sup>2</sup> | Good educational resource |
| January 2025 | Breadcrumb markup: desktop only, not mobile<sup>1</sup> | Our breadcrumbs still provide structural value even without mobile rich results |
| January 2025 | Site reputation abuse policy clarified<sup>1</sup> | Not relevant — no third-party content |

### 2024

| Date | Change | Impact on us |
|------|--------|-------------|
| November 2024 | Favicon: 1:1 aspect ratio, minimum 8×8px, recommend 48×48px+<sup>1</sup> | Verify our favicon meets this spec |
| November 2024 | C2PA metadata appearance in Search<sup>1</sup> | Relevant: our original photography could benefit from C2PA metadata to signal authenticity |
| October 2024 | URL parameter best practices added<sup>1</sup> | Not relevant — no URL parameters |
| August 2024 | AVIF added to supported image formats<sup>1</sup> | Critical for us — AVIF is our primary image format for portfolio/product photography |
| August 2024 | Video SEO overhauled: indexing criteria, technical requirements, watch pages<sup>1</sup> | Relevant if we add process videos of embroidery work |
| August 2024 | Google-CloudVertexBot added<sup>1</sup> | New crawler — don't block it |
| August 2024 | Core updates documentation restructured; Helpful Content System moved to archived<sup>1</sup> | Confirms HCS absorbed into core ranking |
| August 2024 | AI Overviews Search Console logging methodology clarified<sup>1</sup> | Important for interpreting AI Overview data post-launch |
| May 2024 | AI Overviews documentation introduced<sup>1</sup> | Foundation of our AI citation strategy |
| March 2024 | Scaled content abuse, site reputation abuse, expired domain abuse policies added<sup>1</sup> | Positive for us — penalizes low-quality competitors |
| March 2024 | INP replaced FID as Core Web Vital<sup>1</sup> | Verify INP scores on interactive elements (shop cart, contact forms) |
| February 2024 | SEO Starter Guide refreshed<sup>1</sup> | Captured in this document |

---

## Sources

| # | Document | URL |
|---|----------|-----|
| 1 | Google Search Central — Documentation Updates | https://developers.google.com/search/updates |
| 2 | Google Search Central — Blog | https://developers.google.com/search/blog |
| 3 | AI Features and Your Website | https://developers.google.com/search/docs/appearance/ai-features |
| 4 | General Structured Data Guidelines | https://developers.google.com/search/docs/appearance/structured-data/sd-policies |
| 5 | Product Structured Data | https://developers.google.com/search/docs/appearance/structured-data/product |
| 6 | Guide to Google Search Ranking Systems | https://developers.google.com/search/docs/appearance/ranking-systems-guide |
| 7 | Robots Meta Tags Specification | https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag |
| 8 | Google Crawlers Overview | https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers |
| 9 | SEO Starter Guide | https://developers.google.com/search/docs/fundamentals/seo-starter-guide |
| 10 | Sitemaps Overview | https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview |
| 11 | Article Structured Data | https://developers.google.com/search/docs/appearance/structured-data/article |
| 12 | BreadcrumbList Structured Data | https://developers.google.com/search/docs/appearance/structured-data/breadcrumb |
| 13 | SpeakableSpecification Structured Data | https://developers.google.com/search/docs/appearance/structured-data/speakable |
| 14 | Event Structured Data | https://developers.google.com/search/docs/appearance/structured-data/event |
