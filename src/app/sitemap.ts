import type { MetadataRoute } from 'next';
import { abs, product, productUrl } from '@/content/product';

// Served at /sitemap.xml, with an image sitemap entry for each product image.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: productUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [...product.images, product.textureImage].map(image => abs(image.src)),
    },
  ];
}
