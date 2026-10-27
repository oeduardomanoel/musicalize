// Gera og.jpg e os ícones PNG a partir de HTML, usando Playwright (Chromium).
// Uso: npx playwright@1 install chromium (uma vez) && node scripts/assets.mjs
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(ROOT, 'public');
const font = (await readFile(join(PUB, 'assets/fonts/dm-sans-latin-wght-normal.woff2'))).toString('base64');
const serif = (await readFile(join(PUB, 'assets/fonts/instrument-serif-latin-400-italic.woff2'))).toString('base64');
const photo = (await readFile(join(PUB, 'assets/img/hero-1600.webp'))).toString('base64');

const base = `<style>
@font-face{font-family:D;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 1000}
@font-face{font-family:S;src:url(data:font/woff2;base64,${serif}) format('woff2');font-style:italic}
*{margin:0;box-sizing:border-box}body{background:#0a0a0a;color:#f6f3ec;font-family:D}
</style>`;

const bars = (n, h, w, gap, color = '#ffcc00') => Array.from({ length: n }, (_, i) => {
  const r = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
  return `<i style="display:block;width:${w}px;height:${Math.round(h * (0.25 + r * 0.75))}px;background:${color};border-radius:${w / 2}px"></i>`;
}).join('').replace(/^/, `<div style="display:flex;align-items:flex-end;gap:${gap}px;height:${h}px">`) + '</div>';

const og = `${base}<body style="width:1200px;height:630px;position:relative;overflow:hidden;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between">
<div style="position:absolute;inset:0;background:url(data:image/webp;base64,${photo}) center 40%/cover"></div>
<div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,10,10,.92) 0%,rgba(10,10,10,.7) 50%,rgba(10,10,10,.25) 100%)"></div>
<div style="position:relative;display:flex;align-items:center;gap:16px;font-size:22px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#ffcc00"><span style="width:40px;height:3px;background:#ffcc00"></span>Musicalize Camboriú</div>
<div style="position:relative;font-size:112px;line-height:.9;letter-spacing:-.055em;font-weight:850">Aprenda tocando.<br>Viva o <span style="font-family:S;font-style:italic;font-weight:400;color:#ffcc00;letter-spacing:-.02em">palco.</span></div>
<div style="position:relative;display:flex;justify-content:space-between;align-items:flex-end">
<div style="font-size:26px;color:#c9c4b8;font-weight:600;line-height:1.35">Escola de música em Camboriú (SC)<br><b style="color:#f6f3ec">+5 mil alunos · Aula experimental</b></div>
${bars(18, 110, 12, 8)}
</div></body>`;

const icon = (size) => `${base}<body style="width:${size}px;height:${size}px;display:grid;place-items:center;background:#0a0a0a">
${bars(4, Math.round(size * 0.58), Math.round(size * 0.1), Math.round(size * 0.06))}</body>`;

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const shot = async (html, w, h, path, type = 'png') => {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(PUB, path), type, ...(type === 'jpeg' ? { quality: 88 } : {}) });
  await page.close();
};
await shot(og, 1200, 630, 'og.jpg', 'jpeg');
await shot(icon(180), 180, 180, 'apple-touch-icon.png');
await shot(icon(32), 32, 32, 'favicon-32.png');
await shot(icon(192), 192, 192, 'icon-192.png');
await shot(icon(512), 512, 512, 'icon-512.png');
await browser.close();
console.log('✔ og.jpg e ícones gerados em public/');
