# Ceramide Face Mask landing page (Next.js)

A single, fully static product page built so Googlebot can crawl, render and index it:
the HTML Google fetches already contains all text, image `alt`s and JSON-LD (no client-side rendering needed).

## Run

```bash
cd E:\landing
npm install
npm run dev                      # http://localhost:3000
```

Production build (set your real origin — canonical, sitemap, OG and JSON-LD URLs depend on it):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com NEXT_PUBLIC_PRODUCT_PRICE=850 npm run build
npm start
```

All product facts live in `src/content/product.ts`; values marked `VERIFY` must be replaced with the
real brand, price, SKU, ingredients and usage instructions before going live. Env options are listed in `.env.example`
(Next.js loads `.env.local` automatically).

## What is in place for Google

| Requirement | Where |
| --- | --- |
| Server-rendered static HTML, real 404 status for unknown URLs | `export const dynamic = 'force-static'`, `src/app/not-found.tsx` |
| Unique `<title>`, meta description, canonical, `lang="en"` | `src/app/layout.tsx` |
| `index, follow` + `max-image-preview:large` | `metadata.robots` |
| `robots.txt` allowing everything (incl. `/_next/` assets) + sitemap link | `src/app/robots.ts` → `/robots.txt` |
| XML sitemap with image entries | `src/app/sitemap.ts` → `/sitemap.xml` |
| Product structured data (name, images, description, brand, SKU/GTIN, Offer) + Organization, WebSite, WebPage | `src/app/page.tsx` (`@graph` JSON-LD) |
| Structured data matches visible content (same source object) | `src/content/product.ts` |
| Product images in 1:1, 4:3 and 16:9, descriptive `alt`, explicit width/height, LCP image `priority` | `public/images/`, `next/image` |
| One `h1`, logical `h2`/`h3` outline, semantic `header/nav/main/article/section/footer` | `src/app/page.tsx` |
| Open Graph / Twitter card image | `public/images/og.png` |
| Mobile-friendly responsive layout | `src/app/globals.css` |

Intentionally **not** added: ratings/reviews (only add real, verifiable reviews), shipping/return policy markup
(add `shippingDetails` / `hasMerchantReturnPolicy` once you have the real policy), and FAQPage markup
(Google only shows FAQ rich results for authoritative government/health sites).
The `offers` block is emitted only when `NEXT_PUBLIC_PRODUCT_PRICE` is set, because Google rejects made-up prices.

## Images

`npm run images` regenerates the illustrations in `public/images/` (original artwork made with `sharp`).
Swap them for real product photos, keeping the filenames or updating `product.ts`.

## After deploying

1. Open `https://your-domain.com/robots.txt` and `/sitemap.xml` to confirm the production URLs.
2. Test the page in Google's Rich Results Test and the Schema Markup Validator.
3. Submit the sitemap in Search Console for your verified property, then use URL Inspection → Request Indexing.
4. The URL Indexer Lab (`E:\url_index`) can then track this URL (`baseline`, `sitemap --source`, `url-inspection`, `crawl-monitor`).

Indexing is decided by Google; a valid page and sitemap make it eligible but do not guarantee or speed up indexing.
