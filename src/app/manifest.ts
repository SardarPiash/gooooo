import type { MetadataRoute } from 'next';
import { product, store } from '@/content/product';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${product.name} | ${store.name}`,
    short_name: store.name,
    start_url: '/',
    display: 'browser',
    background_color: '#fdf9f6',
    theme_color: '#2f5d62',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
