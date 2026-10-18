// Single source of truth for the page copy AND the structured data.
// Google requires structured data to match what is visible on the page,
// so both the HTML and the JSON-LD are rendered from this object.
//
// Before deploying: replace every value marked VERIFY with the real product
// facts. Never publish a price, rating or review you cannot back up — Google
// treats misleading structured data as spam.

// Absolute production origin, no trailing slash. Set at build time:
//   NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
// On Vercel it falls back to the project's production domain (system env var).
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
).replace(/\/+$/, '');

export const store = {
  name: process.env.NEXT_PUBLIC_STORE_NAME ?? 'Skin Barrier Store', // VERIFY
  logo: '/images/logo.png',
  email: process.env.NEXT_PUBLIC_STORE_EMAIL ?? null, // optional
};

export const product = {
  slug: 'ceramide-face-mask-30ml',
  name: 'Ceramide Face Mask 30ml',
  brand: process.env.NEXT_PUBLIC_PRODUCT_BRAND ?? 'Ceramide Care', // VERIFY: the manufacturer brand on the packaging
  sku: process.env.NEXT_PUBLIC_PRODUCT_SKU ?? null, // VERIFY
  gtin: process.env.NEXT_PUBLIC_PRODUCT_GTIN ?? null, // optional barcode (EAN/UPC)
  size: '30 ml',
  category: 'Skincare > Face Masks',
  shortDescription:
    'A 30 ml ceramide face mask that helps support the skin barrier and leaves skin feeling soft, smooth and comfortable.',
  description:
    'This ceramide face mask is a compact 30 ml jar made for barrier-focused skincare. Ceramides are lipids that occur naturally in the outer layer of the skin, where they help hold moisture in. A ceramide-rich mask is a simple way to add an extra comfort step to your routine after cleansing.',
  // Offer is only emitted when price is set. VERIFY all three before going live.
  price: process.env.NEXT_PUBLIC_PRODUCT_PRICE ?? null, // e.g. "850.00"
  currency: 'BDT',
  availability: 'InStock' as 'InStock' | 'OutOfStock' | 'PreOrder',
  buyUrl: process.env.NEXT_PUBLIC_BUY_URL ?? null, // checkout/cart URL; falls back to #buy
  images: [
    { src: '/images/product-1x1.webp', width: 1200, height: 1200, alt: 'Ceramide Face Mask 30ml jar with teal lid, front view' },
    { src: '/images/product-4x3.webp', width: 1200, height: 900, alt: 'Ceramide Face Mask 30ml jar on a soft beige background' },
    { src: '/images/product-16x9.webp', width: 1600, height: 900, alt: 'Ceramide Face Mask 30ml jar, wide product shot' },
  ],
  textureImage: { src: '/images/texture.webp', width: 1200, height: 900, alt: 'Close-up of the creamy white ceramide mask texture' },
  benefits: [
    { title: 'Barrier support', text: 'Ceramides help reinforce the skin’s natural moisture barrier.' },
    { title: 'Soft, comfortable feel', text: 'Leaves skin feeling smooth and less tight after cleansing.' },
    { title: 'Travel-friendly 30 ml', text: 'A compact jar that fits easily in a bag or travel kit.' },
    { title: 'Simple routine step', text: 'Fits between cleansing and moisturising in a few minutes.' },
  ],
  // VERIFY against the INCI list on the packaging; list only real ingredients.
  ingredients: [
    { name: 'Ceramides', text: 'Skin-identical lipids that help keep moisture in and support the barrier.' },
  ],
  // VERIFY against the packaging instructions.
  howToUse: [
    'Cleanse your face and pat it dry.',
    'Apply an even layer to the face, avoiding the eye and lip area.',
    'Leave on for the time stated on the packaging.',
    'Rinse with lukewarm water if directed, then follow with your moisturiser.',
  ],
  faqs: [
    {
      q: 'Which skin types is this mask for?',
      a: 'Ceramide masks are generally chosen for dry, dehydrated or easily irritated skin. Check the packaging for the manufacturer’s guidance and patch test before first use.',
    },
    {
      q: 'How often can I use it?',
      a: 'Follow the frequency printed on the packaging. Many people use a barrier mask two to three times a week.',
    },
    {
      q: 'How much product is in the jar?',
      a: 'The jar contains 30 ml.',
    },
  ],
};

export const productUrl = `${siteUrl}/`;
export const abs = (path: string) => new URL(path, siteUrl + '/').href;
