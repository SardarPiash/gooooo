import type { Metadata, Viewport } from 'next';
import { product, siteUrl, store } from '@/content/product';
import './globals.css';

const title = `${product.name} | ${store.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: product.shortDescription,
  applicationName: store.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: store.name,
    title,
    description: product.shortDescription,
    locale: 'en_US',
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: product.name }],
  },
  twitter: { card: 'summary_large_image', title, description: product.shortDescription, images: ['/images/og.png'] },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = { themeColor: '#2f5d62', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
