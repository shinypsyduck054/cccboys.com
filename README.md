# cccboys.com

Static site for the CCC Boys collective. Vintage WPA poster aesthetic, in the spirit of the 1933 Civilian Conservation Corps.

## Files

- `index.html` — single page
- `styles.css` — vintage type + paper texture
- `script.js` — small scroll reveal
- `images/` — public domain CCC era photos (NARA / LOC, via Wikimedia Commons)
- `CNAME` — for GitHub Pages custom domain

## Local preview

```bash
cd cccboys.com
python3 -m http.server 8080
# open http://localhost:8080
```

Or just open `index.html` in a browser. No build step.

## Deploy

Domain is on Cloudflare. Two easy options.

### Option A — Cloudflare Pages (recommended)

1. Push this folder to a GitHub repo (e.g. `shinypsyduck054/cccboys.com`).
2. In Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repo. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. After first deploy, go to **Custom domains → Set up a custom domain → `cccboys.com`**. Cloudflare wires DNS automatically since the domain is already on Cloudflare.
5. Add `www.cccboys.com` too if you want.

### Option B — GitHub Pages + Cloudflare DNS

1. Push to `shinypsyduck054/cccboys.com` and enable Pages on `main` branch root.
2. In Cloudflare DNS, add:
   - `CNAME` `cccboys.com` → `shinypsyduck054.github.io` (proxy on)
   - or `A` records to GitHub Pages IPs (185.199.108.153 / .109.153 / .110.153 / .111.153)
3. GitHub Pages will read the `CNAME` file in the repo and serve at `cccboys.com`.

## Image credits

All photographs are in the U.S. public domain (works of the federal government, pre-1989). Sourced via Wikimedia Commons from the National Archives (NARA) and Library of Congress.

- `poster-1935.jpg` — CCC recruitment poster, 1935
- `workers-willow.jpg` — CCC enrollees planting willow sprouts (NARA 286156)
- `crew-campground.jpg` — CCC crew at campground work
- `elk-basin-camp.jpg` — Elk Basin Camp F-139, Bovill, Idaho, 1935
- `new-uniform.jpg` — CCC member in new spruce-green uniform, Feb 1, 1939
- `crew-compressor.jpg` — CCC work crew with diesel compressor
