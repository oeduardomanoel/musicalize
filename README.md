# Musicalize Camboriú — site

Site estático da Musicalize Camboriú (escola de música em Camboriú/SC). Zero dependências, zero framework: HTML gerado por um script Node, CSS e JS puros. Lighthouse-friendly e pronto pra Vercel.

## Estrutura

```
scripts/content.mjs   ← TODO o conteúdo: dados da escola, cursos, eventos, FAQ, fotos
scripts/build.mjs     ← gera as páginas, sitemap.xml e llms-full.txt em dist/
scripts/assets.mjs    ← regera og.jpg e ícones (Playwright), só se mudar a arte
public/               ← CSS, JS, fontes self-hosted, robots.txt, llms.txt, ícones
vercel.json           ← build, URLs limpas, cache e headers de segurança
```

Seções da home: hero, números, método, cursos, palco, workshops com artistas, vídeos de alunos, depoimentos em vídeo, aula experimental, unidade, FAQ.

Páginas geradas: `/`, `/cursos/{violao,guitarra,canto,bateria,banda,teclado,baixo,ukulele,violino}` e `404`.

## Rodar local

```bash
npm run dev     # build + servidor em http://localhost:4321
npm run build   # só gera dist/
```

## Deploy na Vercel

1. Importe o repositório na Vercel (Framework Preset: **Other**). O `vercel.json` já define build (`node scripts/build.mjs`) e saída (`dist`).
2. Em *Domains*, adicione `www.musicalizecamboriu.com.br` e `musicalizecamboriu.com.br` (este redirecionando pro www, que é o canônico).
3. No registro do domínio, aponte o DNS conforme a Vercel indicar e desligue o site no Wix.
4. Envie `https://www.musicalizecamboriu.com.br/sitemap.xml` no Google Search Console e no Bing Webmaster Tools.

## SEO e GEO

- Title, description, canonical, Open Graph e Twitter Card por página
- JSON-LD: `LocalBusiness` + `EducationalOrganization` (NAP, catálogo de cursos, rede Musicalize), `Course`, `FAQPage`, `BreadcrumbList`, `WebSite`
- Uma página por instrumento mirando "aula de X em Camboriú"
- `robots.txt` liberando buscadores e crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…)
- `llms.txt` (resumo + links) e `llms-full.txt` (guia completo gerado do conteúdo)
- `sitemap.xml` gerado a cada build

## Conversão e tracking

Todos os CTAs abrem o WhatsApp com mensagem pronta (por curso). O formulário "Monte sua aula experimental" qualifica o lead (instrumento, nível, período, pra quem é) e monta a mensagem. Eventos enviados ao `dataLayer`: `whatsapp_click` (com `cta_location` e `curso`), `generate_lead`, `testimonial_play` e `video_sound_on`. Cole o GTM/GA4/Pixel no ponto marcado no `<head>` em `scripts/build.mjs`.

## Fotos e vídeos

Tudo é servido do próprio site (sem Wix nem Cloudinary). Os originais ficam fora do repositório; o que vai pro site é gerado por dois scripts:

```bash
python3 scripts/media.py <pasta-fotos>                     # fotos → AVIF + WebP em public/assets/img + scripts/media.json
bash scripts/videos.sh <pasta-videos> <pasta-depoimentos>  # vídeos → MP4 leve + capa em public/assets/video
```

Pra trocar ou adicionar uma foto, inclua a chave em `scripts/media-sources.json`, rode `media.py` e use a chave em `scripts/content.mjs`. Reels, depoimentos (com os textos das legendas de cada vídeo) e workshops com artistas também ficam em `content.mjs`.

## Confirmar com a escola antes de publicar

- **Endereço**: usei o da bio do Instagram (Rua Gustavo Richard, 289, 2º andar). O site antigo mostra R. Ernesto F. Pereira, 17. Confirmar qual vale.
- **Aula experimental grátis?** A rede anuncia como gratuita; o site não promete "grátis" por segurança.
- **Horário de funcionamento** (adicionar `openingHours` no JSON-LD quando tiver).
- **Musicalização infantil (Clubinho)** existe na rede; incluir se a unidade oferecer.
