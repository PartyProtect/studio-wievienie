## Tested Workflows

### Lighthouse Audits (adapted from MeisterEnergie, not yet verified for this project)

**Setup:** The Lighthouse MCP server requires `CHROME_PATH`. This is configured in `~/.claude.json` under `mcpServers.lighthouse.env`. The path points to Playwright's bundled Chromium at `/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome`.

**The MCP server approach** (`mcp__lighthouse__run_audit` etc.) requires the env var to be set before the session starts. If it fails with "CHROME_PATH must be set", restart the session after verifying `~/.claude.json` has the env var.

**The reliable CLI approach** (works within any session):

```bash
# 1. Build for production (dev mode gives artificially bad scores)
cd site && npm run build

# 2. Start preview server
npx astro preview --port 4322 &
sleep 4

# 3. Run Lighthouse with Chrome path
CHROME_PATH=/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome \
npx lighthouse http://localhost:4322/ \
  --output=json --output-path=/tmp/lh-results.json \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo

# 4. Parse results
python3 -c "
import json
with open('/tmp/lh-results.json') as f:
    d = json.load(f)
for name, cat in d['categories'].items():
    print(f'{cat[\"title\"]}: {int(cat[\"score\"]*100)}/100')
"
```

**Key pages to audit:** `/` (homepage), `/nl/werk/` (portfolio), `/nl/winkel/` (shop), `/nl/fancy-boogers/` (clothing line), individual portfolio/product pages (image-heavy — performance critical).

**Important:** Always audit the production build, never the dev server. Dev mode serves unminified JS and gives scores 30-40 points lower than production.

### Visual Preview with Playwright (verified working on MeisterEnergie)

```bash
# Screenshot a local page
node -e "
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  // Block Google Fonts to avoid 30-second DNS timeouts in sandbox
  await page.route('**/fonts.googleapis.com/**', route => route.abort());
  await page.route('**/fonts.gstatic.com/**', route => route.abort());
  await page.goto('http://localhost:4322/nl/werk/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/page-screenshot.png' });
  await browser.close();
})();
"
# Then read /tmp/page-screenshot.png with Read tool
```

**Important:** Always block Google Fonts in Playwright screenshots to avoid 30-second DNS timeouts in the sandbox. Fonts fall back to Georgia/system-ui.

### SVG Preview (verified working)

```bash
# Convert SVG to PNG for visual verification
npx sharp-cli -i icon.svg -o icon.png
# Then read icon.png with Read tool
```

### Image Optimization Pipeline (to be verified)

Studio Wievien is image-heavy — this pipeline is critical.

```bash
# Convert a source image to AVIF + WebP at multiple sizes
# Requires sharp-cli (npm install -g sharp-cli)

# Generate responsive variants
for SIZE in 400 800 1200 1600; do
  npx sharp-cli -i source.jpg -o "output-${SIZE}w.avif" --format avif --quality 65 --width $SIZE
  npx sharp-cli -i source.jpg -o "output-${SIZE}w.webp" --format webp --quality 75 --width $SIZE
done

# Generate blur-up placeholder (20px wide, heavily compressed)
npx sharp-cli -i source.jpg -o "output-placeholder.webp" --format webp --quality 20 --width 20
```

**Performance budgets:**
- Hero images: max 150KB delivered
- Portfolio/product images: max 200KB delivered
- Thumbnails/grid items: max 30KB delivered
- Blur-up placeholders: max 1KB

**Image audit command:**
```bash
# Check all images in public/images/ for oversized files
find public/images/ -type f \( -name "*.avif" -o -name "*.webp" -o -name "*.jpg" \) -size +200k -exec ls -lh {} \;
```

### Font Loading (planned state)

Self-hosted WOFF2 fonts in `public/fonts/` (fonts to be selected). No external font dependency.
- Critical fonts use `font-display: swap` + `<link rel="preload">`
- Non-critical weights use `font-display: optional`

---
