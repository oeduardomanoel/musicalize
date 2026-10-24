#!/usr/bin/env bash
# Comprime os vídeos do pacote de assets para o site.
# Uso: bash scripts/videos.sh <pasta-videos> <pasta-depoimentos>
set -euo pipefail
V="$1"; D="$2"; OUT="$(dirname "$0")/../public/assets/video"; mkdir -p "$OUT"

# Reels: trecho de 14s, vertical 480x854, com áudio (toque para ouvir)
reel() { # chave arquivo-prefixo início
  local f; f=$(ls "$V" | grep "^$2 " | head -1)
  ffmpeg -v error -y -ss "$3" -t 14 -i "$V/$f" -vf "scale=480:854:force_original_aspect_ratio=increase,crop=480:854,fps=30" \
    -c:v libx264 -profile:v high -preset slow -crf 27 -pix_fmt yuv420p -c:a aac -b:a 96k -ac 2 -movflags +faststart "$OUT/reel-$1.mp4"
  ffmpeg -v error -y -ss 1 -i "$OUT/reel-$1.mp4" -frames:v 1 -c:v libwebp -quality 72 "$OUT/reel-$1.webp"
}
reel daniel 57 20; reel bateria 53 5; reel guitarra 54 5; reel baixo 55 5; reel violao 58 5
reel canto 61 5; reel teclado 63 4; reel canto2 68 4; reel bateria2 75 4

# Depoimentos: vídeo completo 540x540, áudio mono 64k
for n in 1 5 6 7 9 10 11 13 15 16 18 19 20 21 23 26 29 32 33 34; do
  ffmpeg -v error -y -i "$D/$n.mp4" -vf "scale=540:540,fps=30" -c:v libx264 -profile:v high -preset slow -crf 31 -pix_fmt yuv420p \
    -c:a aac -b:a 64k -ac 1 -movflags +faststart "$OUT/depo-$n.mp4"
  ffmpeg -v error -y -ss 3 -i "$OUT/depo-$n.mp4" -frames:v 1 -c:v libwebp -quality 74 "$OUT/depo-$n.webp"
done
echo ok
