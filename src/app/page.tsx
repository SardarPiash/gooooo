import Image from 'next/image';
import { JsonLd } from '@/components/JsonLd';
import { abs, product, productUrl, siteUrl, store } from '@/content/product';

// Fully static: the HTML Googlebot fetches already contains all content and JSON-LD.
export const dynamic = 'force-static';

const price = product.price ? Number(product.price) : null;
const formattedPrice = price !== null ? new Intl.NumberFormat('en-BD', { style: 'currency', currency: product.currency }).format(price) : null;
const buyHref = product.buyUrl ?? '#buy';
const availabilityLabel = { InStock: 'In stock', OutOfStock: 'Out of stock', PreOrder: 'Pre-order' }[product.availability];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: store.name,
      url: `${siteUrl}/`,
      logo: abs(store.logo),
      ...(store.email ? { email: store.email } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: store.name,
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': `${productUrl}#webpage`,
      url: productUrl,
      name: `${product.name} | ${store.name}`,
      description: product.shortDescription,
      isPartOf: { '@id': `${siteUrl}/#website` },
      primaryImageOfPage: abs(product.images[0]!.src),
      mainEntity: { '@id': `${productUrl}#product` },
      inLanguage: 'en',
    },
    {
      '@type': 'Product',
      '@id': `${productUrl}#product`,
      name: product.name,
      description: product.description,
      image: product.images.map(image => abs(image.src)),
      brand: { '@type': 'Brand', name: product.brand },
      category: product.category,
      size: product.size,
      ...(product.sku ? { sku: product.sku } : {}),
      ...(product.gtin ? { gtin: product.gtin } : {}),
      // Offer only when a real price is configured (see src/content/product.ts).
      ...(price !== null
        ? {
            offers: {
              '@type': 'Offer',
              url: productUrl,
              price: price.toFixed(2),
              priceCurrency: product.currency,
              availability: `https://schema.org/${product.availability}`,
              itemCondition: 'https://schema.org/NewCondition',
              seller: { '@id': `${siteUrl}/#organization` },
            },
          }
        : {}),
    },
  ],
};

export default function Page() {
  const [hero, ...gallery] = product.images;
  return (
    <>
      <JsonLd data={structuredData} />
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="wrap header-inner">
          <a href="/" className="logo" aria-label={`${store.name} home`}>
            <Image src="/icon.svg" alt="" width={32} height={32} />
            <span>{store.name}</span>
          </a>
          <nav aria-label="Page sections">
            <ul>
              <li><a href="#benefits">Benefits</a></li>
              <li><a href="#ingredients">Ingredients</a></li>
              <li><a href="#how-to-use">How to use</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <article>
          <section className="hero wrap" aria-labelledby="product-title">
            <figure className="hero-media">
              <Image
                src={hero!.src}
                alt={hero!.alt}
                width={hero!.width}
                height={hero!.height}
                priority
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </figure>
            <div className="hero-copy">
              <p className="eyebrow">{product.brand} · {product.size}</p>
              <h1 id="product-title">{product.name}</h1>
              <p className="lead">{product.shortDescription}</p>
              <dl className="facts">
                <div><dt>Size</dt><dd>{product.size}</dd></div>
                <div><dt>Category</dt><dd>{product.category.replace(' > ', ' › ')}</dd></div>
                {product.sku && <div><dt>SKU</dt><dd>{product.sku}</dd></div>}
                <div><dt>Availability</dt><dd>{availabilityLabel}</dd></div>
              </dl>
              <div id="buy" className="buy">
                {formattedPrice && <p className="price"><span className="visually-hidden">Price: </span>{formattedPrice}</p>}
                <a className="button" href={buyHref}>{formattedPrice ? 'Buy now' : 'Check price & order'}</a>
              </div>
            </div>
          </section>

          <section className="wrap prose" aria-labelledby="about">
            <h2 id="about">About this ceramide face mask</h2>
            <p>{product.description}</p>
          </section>

          <section id="benefits" className="wrap" aria-labelledby="benefits-title">
            <h2 id="benefits-title">Key benefits</h2>
            <ul className="cards">
              {product.benefits.map(benefit => (
                <li key={benefit.title}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="ingredients" className="wrap split" aria-labelledby="ingredients-title">
            <figure>
              <Image
                src={product.textureImage.src}
                alt={product.textureImage.alt}
                width={product.textureImage.width}
                height={product.textureImage.height}
                sizes="(max-width: 860px) 100vw, 45vw"
              />
              <figcaption>Mask texture</figcaption>
            </figure>
            <div>
              <h2 id="ingredients-title">Key ingredients</h2>
              <ul className="plain">
                {product.ingredients.map(ingredient => (
                  <li key={ingredient.name}><strong>{ingredient.name}:</strong> {ingredient.text}</li>
                ))}
              </ul>
              <p className="note">See the packaging for the full ingredient list.</p>
            </div>
          </section>

          <section id="how-to-use" className="wrap" aria-labelledby="how-title">
            <h2 id="how-title">How to use</h2>
            <ol className="steps">
              {product.howToUse.map(step => <li key={step}>{step}</li>)}
            </ol>
          </section>

          <section className="wrap" aria-labelledby="gallery-title">
            <h2 id="gallery-title">Product gallery</h2>
            <div className="gallery">
              {gallery.map(image => (
                <figure key={image.src}>
                  <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 860px) 100vw, 50vw" />
                </figure>
              ))}
            </div>
          </section>

          <section id="faq" className="wrap" aria-labelledby="faq-title">
            <h2 id="faq-title">Frequently asked questions</h2>
            {product.faqs.map(faq => (
              <details key={faq.q}>
                <summary><h3>{faq.q}</h3></summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </section>
        </article>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <p>© {new Date().getFullYear()} {store.name}{store.email && <> · <a href={`mailto:${store.email}`}>{store.email}</a></>}</p>
          <p className="note">Patch test before first use. Discontinue use if irritation occurs.</p>
        </div>
      </footer>
    </>
  );
}
