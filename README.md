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

Todos os CTAs abrem o WhatsApp com mensagem pronta (por curso). O formulário "Monte sua aula experimental" qualifica o lead (instrumento, nível, período, pra quem é) e monta a mensagem. Eventos enviados ao `dataLayer`: `whatsapp_click` (com `cta_location` e `curso`) e `generate_lead`. Cole o GTM/GA4/Pixel no ponto marcado no `<head>` em `scripts/build.mjs`.

## Imagens

As fotos vêm direto dos CDNs atuais (Cloudinary da rede Musicalize e Wix da unidade), com conversão automática pra WebP/AVIF. **Antes de cancelar o Wix**, baixe as fotos pra `public/assets/img/` e troque os helpers `wix()`/`cl()` em `scripts/content.mjs` pra apontar pros arquivos locais.

## Confirmar com a escola antes de publicar

- **Endereço**: usei o da bio do Instagram (Rua Gustavo Richard, 289, 2º andar). O site antigo mostra R. Ernesto F. Pereira, 17. Confirmar qual vale.
- **Aula experimental grátis?** A rede anuncia como gratuita; o site não promete "grátis" por segurança.
- **Horário de funcionamento** (adicionar `openingHours` no JSON-LD quando tiver).
- **Musicalização infantil (Clubinho)** existe na rede; incluir se a unidade oferecer.
