"""Otimiza as fotos do pacote de assets para o site.

Uso: python3 scripts/media.py <pasta-com-as-fotos-originais>

Lê scripts/media-sources.json, recorta bordas brancas (fotos horizontais
salvas dentro de um quadro vertical), gera AVIF + WebP em 2 larguras em
public/assets/img/ e escreve scripts/media.json com dimensões para o build.
"""
import fnmatch
import json
import os
import sys

from PIL import Image, ImageChops, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'assets', 'img')
SRC_DIR = sys.argv[1]

cfg = json.load(open(os.path.join(ROOT, 'scripts', 'media-sources.json'), encoding='utf-8'))
files = os.listdir(SRC_DIR)


def find(pattern):
    hits = [f for f in files if fnmatch.fnmatch(f, pattern)]
    if not hits:
        sys.exit(f'arquivo não encontrado: {pattern}')
    return os.path.join(SRC_DIR, sorted(hits)[0])


def trim_white(im):
    """Remove as faixas brancas de fotos horizontais salvas em canvas vertical."""
    bg = Image.new('RGB', im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg).convert('L').point(lambda p: 255 if p > 18 else 0)
    box = diff.getbbox()
    if box and (box[2] - box[0]) * (box[3] - box[1]) < im.size[0] * im.size[1] * 0.9:
        return im.crop(box)
    return im


os.makedirs(OUT, exist_ok=True)
old_path = os.path.join(ROOT, 'scripts', 'media.json')
old = json.load(open(old_path, encoding='utf-8')) if os.path.exists(old_path) else {}
manifest = {}
for key, item in cfg['photos'].items():
    prev = old.get(key)
    if prev and all(os.path.exists(os.path.join(OUT, f'{key}-{w}.avif')) for w, _ in prev['sizes']):
        prev['alt'] = item['alt']
        manifest[key] = prev
        continue
    im = ImageOps.exif_transpose(Image.open(find(item['src']))).convert('RGB')
    im = trim_white(im)
    w0, h0 = im.size
    portrait = h0 > w0
    widths = [480, 900] if portrait else [800, 1600]
    widths = sorted({min(w, w0) for w in widths})
    variants = []
    for w in widths:
        h = round(h0 * w / w0)
        r = im.resize((w, h), Image.LANCZOS)
        r.save(os.path.join(OUT, f'{key}-{w}.webp'), 'WEBP', quality=74, method=6)
        r.save(os.path.join(OUT, f'{key}-{w}.avif'), 'AVIF', quality=52, speed=6)
        variants.append([w, h])
    manifest[key] = {'alt': item['alt'], 'w': w0, 'h': h0, 'sizes': variants}
    print(f'{key:22s} {w0}x{h0} -> {widths}')

with open(os.path.join(ROOT, 'scripts', 'media.json'), 'w', encoding='utf-8') as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)
print('ok', len(manifest))
