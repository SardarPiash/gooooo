// Generates original product illustrations (no third-party photos) in the
// aspect ratios Google recommends for Product images: 1:1, 4:3 and 16:9.
// Replace the files in public/images with real product photography when available
// (keep the same filenames, or update src/content/product.ts).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const out = new URL('../public/images/', import.meta.url);
await mkdir(out, { recursive: true });

const defs = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fdf6f0"/><stop offset="1" stop-color="#f3e3d8"/>
    </linearGradient>
    <linearGradient id="jar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#e9eef2"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#d5dde3"/>
    </linearGradient>
    <linearGradient id="lid" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#2f5d62"/><stop offset=".5" stop-color="#4a8a8f"/><stop offset="1" stop-color="#264b4f"/>
    </linearGradient>
    <radialGradient id="cream" cx=".45" cy=".4" r=".7">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f6efe9"/><stop offset="1" stop-color="#e8dcd2"/>
    </radialGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#7a5a48" flood-opacity=".25"/>
    </filter>
  </defs>`;

// A 30 ml jar drawn around (0,0); scaled and placed per canvas.
const jar = `
  <g filter="url(#shadow)">
    <rect x="-210" y="-60" width="420" height="300" rx="46" fill="url(#jar)"/>
    <rect x="-226" y="-190" width="452" height="150" rx="30" fill="url(#lid)"/>
    <rect x="-226" y="-70" width="452" height="18" fill="#1f3e41" opacity=".35"/>
  </g>
  <rect x="-170" y="10" width="340" height="170" rx="16" fill="#fdf6f0" stroke="#d9c4b4" stroke-width="3"/>
  <text x="0" y="70" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="46" letter-spacing="6" fill="#2f5d62">CERAMIDE</text>
  <text x="0" y="112" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="8" fill="#7a5a48">FACE MASK</text>
  <text x="0" y="156" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#9b8170">30 ml</text>`;

const leaves = (x, y, s) => `
  <g transform="translate(${x} ${y}) scale(${s})" opacity=".55">
    <path d="M0 0 C 60 -90 160 -90 210 -40 C 150 -10 70 20 0 0 Z" fill="#9cc3b5"/>
    <path d="M10 30 C 80 -20 170 0 200 60 C 130 80 60 70 10 30 Z" fill="#b9d6cb"/>
  </g>`;

const scenes = {
  'product-1x1': [1200, 1200, `${leaves(80, 980, 1.3)}${leaves(1120, 260, -1.1)}<g transform="translate(600 640) scale(1.25)">${jar}</g>`],
  'product-4x3': [1200, 900, `${leaves(60, 760, 1.1)}<g transform="translate(600 480) scale(1.05)">${jar}</g>`],
  'product-16x9': [1600, 900, `${leaves(120, 760, 1.2)}${leaves(1500, 200, -1)}<g transform="translate(800 480) scale(1.05)">${jar}</g>`],
  texture: [1200, 900, `
    <ellipse cx="600" cy="470" rx="420" ry="300" fill="url(#cream)" filter="url(#shadow)"/>
    <path d="M330 470 C 420 330 640 320 720 420 C 790 510 660 600 560 540 C 480 490 540 420 610 450" fill="none" stroke="#e2d3c7" stroke-width="22" stroke-linecap="round"/>
    ${leaves(900, 760, 1)}`],
  og: [1200, 630, `
    <g transform="translate(340 340) scale(.8)">${jar}</g>
    <text x="640" y="250" font-family="Georgia, serif" font-size="64" fill="#2f5d62">Ceramide</text>
    <text x="640" y="330" font-family="Georgia, serif" font-size="64" fill="#2f5d62">Face Mask 30 ml</text>
    <text x="640" y="400" font-family="Arial, sans-serif" font-size="30" fill="#7a5a48">Barrier-care mask for daily comfort</text>`],
};

for (const [name, [w, h, body]] of Object.entries(scenes)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}<rect width="100%" height="100%" fill="url(#bg)"/>${body}</svg>`;
  const image = sharp(Buffer.from(svg));
  if (name === 'og') await image.png().toFile(new URL(`${name}.png`, out).pathname.replace(/^\/(\w:)/, '$1'));
  else await image.webp({ quality: 86 }).toFile(new URL(`${name}.webp`, out).pathname.replace(/^\/(\w:)/, '$1'));
  console.log(`generated ${name} ${w}x${h}`);
}

// Raster logo for Organization structured data (Google prefers >=112px raster logos).
await sharp(new URL('../public/icon.svg', import.meta.url).pathname.replace(/^\/(\w:)/, '$1'), { density: 600 })
  .resize(512, 512).png().toFile(new URL('logo.png', out).pathname.replace(/^\/(\w:)/, '$1'));
console.log('generated logo 512x512');
