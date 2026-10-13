// Gera o site estático em /dist. Sem dependências: `node scripts/build.mjs`.
import { mkdir, writeFile, cp, rm, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE, BIZ, IMG, cl, wix, wa, WA_DEFAULT, POSTERS, MOMENTS, COURSES, EVENTS, HOME_FAQ, courseFaq,
} from './content.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dist');
const PUB = join(ROOT, 'public');
const TODAY = new Date().toISOString().slice(0, 10);

const hash = async (f) => createHash('sha1').update(await readFile(join(PUB, f))).digest('hex').slice(0, 10);
const V = { css: await hash('assets/css/style.css'), js: await hash('assets/js/main.js') };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- Ícones ---------- */
const I = {
  arrow: '<svg class="ico ico--arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowPlain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  wa: '<svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.34M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
  star: '<svg class="star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"/></svg>',
};

const eq = (n = 22, seed = 1) => {
  let out = '';
  for (let i = 0; i < n; i++) {
    const r = Math.abs(Math.sin((i + 1) * 12.9898 * seed) * 43758.5453) % 1;
    const h = (0.45 + r * 0.55).toFixed(2);
    const t = (0.7 + ((r * 7) % 1) * 0.9).toFixed(2);
    const dl = (-r * 1.2).toFixed(2);
    out += `<i style="--h:${h};--t:${t}s;--dl:${dl}s"></i>`;
  }
  return `<div class="eq" aria-hidden="true">${out}</div>`;
};

const split = (text, start = 0) =>
  text.split(' ').map((w, i) => `<span class="w"><span style="--i:${start + i}">${w}</span></span>`).join(' ');

const btnWa = (label, { track = 'cta', curso = '', cls = 'btn btn--y btn--lg', text } = {}) =>
  `<a class="${cls}" href="${text ? wa(text) : WA_DEFAULT}" target="_blank" rel="noopener" data-track="${track}"${curso ? ` data-curso="${curso}"` : ''}>${I.wa}<span>${label}</span></a>`;

const shot = (item, { w = 540, h = 840, wide = false, lazy = true } = {}) =>
  `<figure class="shot${wide ? ' shot--wide' : ''}"><img src="${wix(item.id, w, h)}" alt="${esc(item.alt || `${item.label} na Musicalize Camboriú`)}" width="${w}" height="${h}"${lazy ? ' loading="lazy" decoding="async"' : ''}><figcaption>${esc(item.label)}</figcaption></figure>`;

/* ---------- Schema.org ---------- */
const SCHOOL_ID = `${SITE}/#escola`;
const school = {
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  '@id': SCHOOL_ID,
  name: BIZ.name,
  alternateName: ['Escola de Música Musicalize Camboriú', 'Musicalize Escola de Música Camboriú'],
  description: 'Escola de música no Centro de Camboriú (SC) com aulas de violão, guitarra, baixo, bateria, teclado, canto, ukulele, violino e formação de bandas. Método prático, repertório e experiência real de palco. Mais de 3 mil alunos ensinados.',
  slogan: 'Aprenda tocando. Viva o palco.',
  url: `${SITE}/`,
  logo: IMG.logo,
  image: [cl(IMG.hero, 1600), cl(IMG.stage, 1600)],
  telephone: BIZ.phoneE164,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BIZ.street,
    addressLocality: BIZ.city,
    addressRegion: BIZ.state,
    addressCountry: BIZ.country,
  },
  hasMap: BIZ.mapsLink,
  areaServed: [
    { '@type': 'City', name: 'Camboriú' },
    { '@type': 'City', name: 'Balneário Camboriú' },
  ],
  contactPoint: {
    '@type': 'ContactPoint', telephone: BIZ.phoneE164, contactType: 'customer service',
    availableLanguage: 'Portuguese', url: WA_DEFAULT,
  },
  sameAs: [BIZ.instagram, BIZ.facebook],
  parentOrganization: { '@type': 'Organization', name: 'Musicalize Escola de Música', url: BIZ.network },
  knowsAbout: ['Aula de violão', 'Aula de guitarra', 'Aula de baixo', 'Aula de bateria', 'Aula de teclado', 'Aula de canto', 'Técnica vocal', 'Aula de ukulele', 'Aula de violino', 'Formação de bandas'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cursos de música',
    itemListElement: COURSES.map((c) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Course', name: c.h1 || `Aula de ${c.nounLower} em Camboriú`, url: `${SITE}/cursos/${c.slug}`, description: c.card },
    })),
  },
};
const website = {
  '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: BIZ.name, inLanguage: 'pt-BR', publisher: { '@id': SCHOOL_ID },
};
const faqLd = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
const ld = (graph) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;

/* ---------- Layout ---------- */
const NAV = [
  ['Cursos', '/#cursos'],
  ['Método', '/#metodo'],
  ['Palco', '/#palco'],
  ['Unidade', '/#unidade'],
  ['Dúvidas', '/#duvidas'],
];

const header = () => `
<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<header class="header">
  <div class="container header__inner">
    <a class="brand" href="/" aria-label="Musicalize Camboriú, página inicial">
      <img class="brand__logo" src="${IMG.logo}" alt="Musicalize" height="34">
      <span class="brand__text"><span class="brand__city">Camboriú</span></span>
    </a>
    <nav class="nav" aria-label="Principal">
      <ul class="nav__links">${NAV.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>
      ${btnWa('Aula experimental', { track: 'header', cls: 'btn btn--y btn--sm' })}
      <button class="menu-btn" type="button" aria-controls="mobile-menu" aria-expanded="false" aria-label="Abrir menu"><span></span><span></span></button>
    </nav>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu">
  <ul>${NAV.map(([l, h]) => `<li><a href="${h}">${l} ${I.arrowPlain.replace('<svg', '<svg width="28" height="28"')}</a></li>`).join('')}</ul>
  ${btnWa('Agendar aula experimental', { track: 'menu_mobile' })}
</div>`;

const footer = () => `
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <a class="brand" href="/" aria-label="Musicalize Camboriú"><img class="brand__logo" src="${IMG.logo}" alt="Musicalize" height="34" loading="lazy"><span class="brand__text"><span class="brand__city">Camboriú</span></span></a>
        <p>Escola de música no Centro de Camboriú. Método, repertório e palco pra quem quer tocar de verdade. Unidade da rede <a class="link" href="${BIZ.network}" target="_blank" rel="noopener">Musicalize</a>.</p>
      </div>
      <div>
        <h3>Cursos</h3>
        <ul>${COURSES.map((c) => `<li><a href="/cursos/${c.slug}">${c.slug === 'banda' ? 'Formação de bandas' : c.name}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h3>Escola</h3>
        <ul>
          <li><a href="/#metodo">Método</a></li>
          <li><a href="/#palco">Eventos e palco</a></li>
          <li><a href="/#galeria">Alunos</a></li>
          <li><a href="/#duvidas">Dúvidas frequentes</a></li>
          <li><a href="/#comecar">Aula experimental</a></li>
        </ul>
      </div>
      <div>
        <h3>Contato</h3>
        <ul>
          <li><a href="${WA_DEFAULT}" target="_blank" rel="noopener" data-track="footer">WhatsApp ${BIZ.phoneDisplay}</a></li>
          <li><a href="tel:${BIZ.phoneE164}">Ligar agora</a></li>
          <li><a href="${BIZ.instagram}" target="_blank" rel="noopener">Instagram ${BIZ.instagramHandle}</a></li>
          <li><a href="${BIZ.facebook}" target="_blank" rel="noopener">Facebook</a></li>
          <li><a href="${BIZ.mapsLink}" target="_blank" rel="noopener">${BIZ.street}, ${BIZ.district}, ${BIZ.city}/${BIZ.state}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__big" aria-hidden="true">MUSICALIZE</div>
    <div class="footer__bottom">
      <span>© ${new Date().getFullYear()} Musicalize Camboriú. Todos os direitos reservados.</span>
      <span>Escola de música em Camboriú, SC</span>
    </div>
  </div>
</footer>
<a class="wa-float" href="${WA_DEFAULT}" target="_blank" rel="noopener" data-track="float" aria-label="Agendar aula experimental pelo WhatsApp">${I.wa}<span>Aula experimental</span></a>`;

const layout = ({ path, title, description, body, graph, preloadImg }) => {
  const url = `${SITE}${path}`;
  return `<!doctype html>
<html lang="pt-BR" data-wa="${BIZ.whatsapp}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="theme-color" content="#0a0a0a">
<meta name="geo.region" content="BR-SC">
<meta name="geo.placename" content="Camboriú">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${BIZ.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Musicalize Camboriú, escola de música">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE}/og.jpg">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="text/plain" href="/llms.txt" title="Resumo para IA (llms.txt)">
<link rel="preconnect" href="https://res.cloudinary.com" crossorigin>
<link rel="preconnect" href="https://static.wixstatic.com" crossorigin>
<link rel="preload" href="/assets/fonts/dm-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${preloadImg ? `<link rel="preload" as="image" href="${preloadImg.src}"${preloadImg.srcset ? ` imagesrcset="${preloadImg.srcset}" imagesizes="100vw"` : ''} fetchpriority="high">` : ''}
<link rel="stylesheet" href="/assets/css/style.css?v=${V.css}">
<script>document.documentElement.classList.add('js')</script>
<script src="/assets/js/main.js?v=${V.js}" defer></script>
<!-- Google Tag Manager / GA4 / Meta Pixel: cole aqui. Eventos já enviados ao dataLayer: whatsapp_click e generate_lead. -->
${ld(graph)}
</head>
<body>
${header()}
<main id="conteudo">
${body}
</main>
${footer()}
</body>
</html>
`;
};

/* ---------- Blocos ---------- */
const marquee = (items, { dark = false, speed = 34 } = {}) => {
  const group = items.map((t) => `<span class="marquee__item">${t}${I.star}</span>`).join('');
  return `<div class="marquee${dark ? ' marquee--dark' : ''}" aria-hidden="true" style="--speed:${speed}s"><div class="marquee__track"><div class="marquee__group">${group}</div><div class="marquee__group">${group}</div></div></div>`;
};

const courseCard = (c, i) => {
  const poster = POSTERS.find((p) => p.c === c.slug) || { id: MOMENTS[0].id, label: c.name };
  const img = c.feature ? MOMENTS[0] : poster;
  return `<article class="course${c.feature ? ' course--feature' : ''}" data-tilt data-reveal style="--d:${(i % 3) * 90}ms">
    <div class="course__media"><span class="course__tag">${esc(c.program)}</span><img src="${wix(img.id, 720, c.feature ? 800 : 800)}" alt="Aula de ${esc(c.nounLower)} na Musicalize Camboriú" width="720" height="800" loading="lazy" decoding="async"></div>
    <div class="course__body">
      <div class="course__title"><h3><a class="course__link" href="/cursos/${c.slug}">${c.slug === 'banda' ? 'Formação de bandas' : c.name}</a></h3><span class="course__arrow" aria-hidden="true">${I.arrowPlain}</span></div>
      <p>${esc(c.card)}</p>
    </div>
  </article>`;
};

const faqBlock = (items, { title = 'Perguntas que a gente mais recebe.', id = 'duvidas' } = {}) => `
<section class="section" id="${id}" aria-labelledby="${id}-t">
  <div class="container faq">
    <div class="faq__intro" data-reveal>
      <span class="eyebrow">Dúvidas</span>
      <h2 class="h2" id="${id}-t" style="margin-top:16px">${title}</h2>
      <p class="lead">Não achou sua resposta? Manda no WhatsApp que a equipe responde.</p>
      ${btnWa('Perguntar no WhatsApp', { track: 'faq', cls: 'btn btn--y' })}
    </div>
    <div>
      ${items.map((f, i) => `<details class="qa" data-reveal style="--d:${i * 40}ms"${i === 0 ? ' open' : ''}><summary><span>${esc(f.q)}</span><span class="qa__ico" aria-hidden="true"></span></summary><div class="qa__a"><p>${esc(f.a)}</p></div></details>`).join('')}
    </div>
  </div>
</section>`;

const leadForm = (preset = '') => {
  const opts = (name, list, checked) => list.map((v) => `<label class="chip"><input type="radio" name="${name}" value="${esc(v)}"${v === checked ? ' checked' : ''}><span>${esc(v)}</span></label>`).join('');
  return `<div class="lead-card" data-reveal="right">
    <h3>Monte sua aula experimental</h3>
    <p>Leva 20 segundos. Sua mensagem chega pronta no WhatsApp da escola.</p>
    <form class="form" id="lead-form" novalidate>
      <div class="field"><label for="lf-nome">Seu nome</label><input class="input" id="lf-nome" name="nome" type="text" autocomplete="given-name" placeholder="Como podemos te chamar?" required><p class="form__error" hidden>Coloca seu nome pra gente saber com quem está falando.</p></div>
      <fieldset><legend>Instrumento</legend><div class="chips">${opts('instrumento', ['Violão', 'Guitarra', 'Canto', 'Bateria', 'Teclado', 'Baixo', 'Ukulele', 'Violino', 'Banda', 'Ainda não sei'], preset)}</div></fieldset>
      <fieldset><legend>Seu nível</legend><div class="chips">${opts('nivel', ['Nunca toquei', 'Já toco um pouco', 'Quero voltar a tocar'], '')}</div></fieldset>
      <fieldset><legend>Melhor período</legend><div class="chips">${opts('periodo', ['Manhã', 'Tarde', 'Noite'], '')}</div></fieldset>
      <fieldset><legend>A aula é pra</legend><div class="chips">${opts('para', ['Mim', 'Meu filho ou filha', 'Outra pessoa'], '')}</div></fieldset>
      <button class="btn btn--y btn--lg" type="submit">${I.wa}<span>Enviar pelo WhatsApp</span></button>
      <p class="form__note">Você revisa a mensagem antes de enviar.</p>
    </form>
  </div>`;
};

const startSection = (preset = '') => `
<section class="section on-light" id="comecar" aria-labelledby="comecar-t">
  <div class="container start">
    <div data-reveal="left">
      <span class="eyebrow">Como começar</span>
      <h2 class="h2" id="comecar-t" style="margin-top:16px">Da primeira mensagem à <span class="serif">primeira música.</span></h2>
      <ol class="steps">
        <li class="step"><span class="step__n">1</span><div><h3>Chama no WhatsApp</h3><p>Conta qual instrumento te interessa e se já toca alguma coisa. Pode ser pra você ou pra alguém da família.</p></div></li>
        <li class="step"><span class="step__n">2</span><div><h3>Faz a aula experimental</h3><p>Você conhece a escola, o professor e sente na prática como funciona o método.</p></div></li>
        <li class="step"><span class="step__n">3</span><div><h3>Começa sua jornada</h3><p>Matrícula aberta o ano todo. Você começa quando estiver pronto, sem esperar semestre.</p></div></li>
      </ol>
    </div>
    ${leadForm(preset)}
  </div>
</section>`;

const placeSection = () => `
<section class="section on-light" id="unidade" aria-labelledby="unidade-t" style="padding-top:0">
  <div class="container place">
    <div class="place__info" data-reveal="left">
      <div><span class="eyebrow">A unidade</span><h2 id="unidade-t" style="margin-top:16px">Centro de Camboriú, <span class="serif y">2º andar.</span></h2></div>
      <ul class="place__list">
        <li><a href="${BIZ.mapsLink}" target="_blank" rel="noopener"><span class="ico-wrap">${I.pin}</span><span><small>Endereço</small><strong>${BIZ.street}<br>${BIZ.district}, ${BIZ.city} (${BIZ.state})</strong></span></a></li>
        <li><a href="${WA_DEFAULT}" target="_blank" rel="noopener" data-track="unidade"><span class="ico-wrap">${I.wa.replace('class="ico"', '')}</span><span><small>WhatsApp</small><strong>${BIZ.phoneDisplay}</strong></span></a></li>
        <li><a href="tel:${BIZ.phoneE164}"><span class="ico-wrap">${I.phone}</span><span><small>Telefone</small><strong>Ligue e tire suas dúvidas na hora</strong></span></a></li>
        <li><a href="${BIZ.instagram}" target="_blank" rel="noopener"><span class="ico-wrap">${I.ig}</span><span><small>Instagram</small><strong>${BIZ.instagramHandle}</strong></span></a></li>
      </ul>
      ${btnWa('Agendar minha visita', { track: 'unidade_btn', cls: 'btn btn--y', text: 'Oi! Vim pelo site e quero agendar uma visita e uma aula experimental na Musicalize Camboriú.' })}
    </div>
    <div class="place__map" data-reveal="scale">
      <iframe src="${BIZ.mapsEmbed}" title="Mapa da Musicalize Camboriú" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  </div>
</section>`;

const finalCta = (headline = 'Aquela música que você sempre quis tocar <span class="serif">começa aqui.</span>', text = WA_DEFAULT) => `
<section class="section on-yellow final" aria-label="Agendar aula experimental">
  <div class="container">
    ${eq(28, 3)}
    <h2 data-reveal>${headline}</h2>
    <p class="lead" data-reveal style="--d:120ms">Agende uma aula experimental e sinta como é aprender música tocando, com direção e palco no caminho.</p>
    <div data-reveal style="--d:220ms"><a class="btn btn--dark btn--lg" href="${text}" target="_blank" rel="noopener" data-track="final">${I.wa}<span>Quero minha aula experimental</span></a></div>
  </div>
</section>`;

/* ---------- Home ---------- */
const heroSrcset = [800, 1400, 2000].map((w) => `${cl(IMG.hero, w)} ${w}w`).join(', ');

const home = () => {
  const half = Math.ceil(POSTERS.length / 2);
  const body = `
<section class="hero" aria-labelledby="hero-t">
  <div class="hero__media"><img src="${cl(IMG.hero, 1400)}" srcset="${heroSrcset}" sizes="100vw" alt="Alunos da Musicalize tocando juntos" fetchpriority="high" decoding="async"></div>
  <div class="container hero__grid">
    <div>
      <span class="eyebrow fade-in" style="--d:150ms">Musicalize Camboriú · SC</span>
      <h1 class="display split" id="hero-t">
        <span class="kicker fade-in" style="--d:200ms">Escola de música em Camboriú com <b>método, repertório e palco.</b></span>
        ${split('Aprenda tocando.', 0)}<br>${split('Viva o', 2)} <span class="w"><span class="serif y" style="--i:4">palco.</span></span>
      </h1>
      <p class="lead fade-in" style="--d:750ms">Violão, guitarra, baixo, bateria, teclado, canto, ukulele e violino pra quem nunca tocou, pra quem já arranha e pra quem quer voltar. Mais de 3 mil alunos já passaram por aqui.</p>
      <div class="hero__ctas fade-in" style="--d:900ms">
        ${btnWa('Agendar aula experimental', { track: 'hero' })}
        <a class="btn btn--lg" href="#cursos">Ver cursos ${I.arrow}</a>
      </div>
      <ul class="hero__meta fade-in" style="--d:1050ms"><li>Matrículas abertas o ano todo</li><li>Do zero ao palco</li><li>Centro de Camboriú</li></ul>
    </div>
    <div class="hero__aside fade-in" style="--d:1100ms">
      <a class="hero__badge" href="#comecar" aria-label="Agendar aula experimental">
        <svg viewBox="0 0 200 200" aria-hidden="true"><defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><text font-size="15.5" font-weight="800" letter-spacing="3.2" fill="#0b0b0b"><textPath href="#circ">AULA EXPERIMENTAL • AGENDE A SUA • </textPath></text></svg>
        <span><strong>+3 mil</strong><small>alunos</small></span>
      </a>
      ${eq(14, 2)}
    </div>
  </div>
</section>

<section class="stats" aria-label="Números da Musicalize Camboriú">
  <div class="container stats__grid">
    <div class="stat" data-reveal><div class="stat__num" data-count="3000" data-prefix="+">+3.000</div><p class="stat__label">alunos já aprenderam música na unidade Camboriú</p></div>
    <div class="stat" data-reveal style="--d:80ms"><div class="stat__num">7<span class="serif">+</span>1</div><p class="stat__label">sete instrumentos e canto, mais formação de bandas</p></div>
    <div class="stat" data-reveal style="--d:160ms"><div class="stat__num" data-count="5">5</div><p class="stat__label">unidades da rede Musicalize em Santa Catarina</p></div>
    <div class="stat" data-reveal style="--d:240ms"><div class="stat__num" data-count="12">12</div><p class="stat__label">meses por ano de matrícula aberta</p></div>
  </div>
</section>

${marquee(['Violão', 'Guitarra', 'Baixo', 'Bateria', 'Teclado', 'Canto', 'Ukulele', 'Violino', 'Banda'])}

<section class="section on-light" id="metodo" aria-labelledby="metodo-t">
  <div class="container method">
    <div class="method__sticky" data-reveal="left">
      <span class="eyebrow">O método</span>
      <h2 class="h2" id="metodo-t" style="margin-top:16px">Aula solta não forma músico. <span class="serif">Jornada forma.</span></h2>
      <p class="lead">Muita gente começa música, empolga no primeiro mês e para. Quase sempre não é falta de talento, é falta de direção. Aqui cada aluno sabe onde está, pra onde vai e o que vai tocar no caminho.</p>
      <div class="method__photo parallax-img"><img src="${cl(IMG.method, 1000)}" alt="Aula prática na Musicalize" width="1000" height="750" loading="lazy" decoding="async"></div>
    </div>
    <ol class="pillars">
      <li class="pillar"><span class="pillar__num">01</span><h3>Direção <span class="dot"></span></h3><p>Você entende sua evolução. Cada etapa tem objetivo claro, acompanhamento do professor e música nova pra tocar.</p></li>
      <li class="pillar"><span class="pillar__num">02</span><h3>Prática <span class="dot"></span></h3><p>A teoria entra quando faz sentido na mão. O foco é tocar: técnica, percepção e repertório desde as primeiras aulas.</p></li>
      <li class="pillar"><span class="pillar__num">03</span><h3>Vivência <span class="dot"></span></h3><p>Ensaio, banda, audição e palco. A música sai da sala e vira experiência, confiança e memória que fica.</p></li>
    </ol>
  </div>
</section>

<section class="section" id="cursos" aria-labelledby="cursos-t">
  <div class="container">
    <div class="section__head">
      <div data-reveal><span class="eyebrow">Cursos</span><h2 class="h2" id="cursos-t">Escolha <span class="serif y">seu som.</span></h2></div>
      <p class="lead" data-reveal style="--d:100ms">Cursos pra iniciantes, pra quem já toca e pra quem está voltando. Técnica conectada com repertório e evolução que sai da sala.</p>
    </div>
    <div class="courses">${COURSES.map(courseCard).join('')}</div>
  </div>
</section>

<section class="section on-yellow" id="palco" aria-labelledby="palco-t">
  <div class="container stage">
    <div class="stage__intro" data-reveal="left">
      <span class="eyebrow">Palco</span>
      <h2 class="h2" id="palco-t" style="margin-top:16px">Aqui o aluno <span class="serif">sobe no palco.</span></h2>
      <p class="lead">Estudar sem nunca tocar pra ninguém é metade da música. Por isso o palco faz parte da jornada, com eventos da rede Musicalize ao longo do ano.</p>
      ${btnWa('Quero tocar no palco', { track: 'palco', cls: 'btn btn--dark btn--lg', text: 'Oi! Vim pelo site e quero saber como participar das apresentações e bandas da Musicalize Camboriú.' })}
      <div class="stage__photo"><img src="${cl(IMG.stage, 1100)}" alt="Alunos da Musicalize se apresentando no palco" width="1100" height="756" loading="lazy" decoding="async"></div>
    </div>
    <div class="events">
      ${EVENTS.map((e, i) => `<article class="event" style="--i:${i}" data-reveal="scale"><div class="event__top"><span class="event__num">${String(i + 1).padStart(2, '0')}</span><span class="event__pill">${esc(e.pill)}</span></div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p><ul class="event__tags">${e.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></article>`).join('')}
    </div>
  </div>
</section>

<section class="section" id="galeria" aria-labelledby="galeria-t">
  <div class="container">
    <div class="section__head">
      <div data-reveal><span class="eyebrow">Quem toca aqui</span><h2 class="h2" id="galeria-t">Gente de Camboriú <span class="serif y">tocando de verdade.</span></h2></div>
      <p class="lead" data-reveal style="--d:100ms">Registros de alunos da unidade em aula, em apresentação e no dia da entrega de certificado. Passa o mouse pra ver o instrumento.</p>
    </div>
  </div>
  <div class="gallery">
    <div class="strip" style="--speed:90s"><div class="strip__track">${[...POSTERS.slice(0, half), ...POSTERS.slice(0, half)].map((p, i) => shot(p, { lazy: true }).replace('<figure', i >= half ? '<figure aria-hidden="true"' : '<figure')).join('')}</div></div>
    <div class="strip strip--rev" style="--speed:80s"><div class="strip__track">${[...MOMENTS, ...MOMENTS].map((m, i) => shot(m, { w: 600, h: 800, wide: true }).replace('<figure', i >= MOMENTS.length ? '<figure aria-hidden="true"' : '<figure')).join('')}</div></div>
    <div class="strip" style="--speed:95s"><div class="strip__track">${[...POSTERS.slice(half), ...POSTERS.slice(half)].map((p, i) => shot(p).replace('<figure', i >= POSTERS.length - half ? '<figure aria-hidden="true"' : '<figure')).join('')}</div></div>
  </div>
  <div class="container gallery__foot">
    <p class="lead" style="max-width:40ch">Tem vídeo novo de aluno toda semana no Instagram.</p>
    <a class="btn btn--lg" href="${BIZ.instagram}" target="_blank" rel="noopener">${I.ig.replace('<svg', '<svg class="ico"')}<span>Seguir ${BIZ.instagramHandle}</span></a>
  </div>
</section>

${marquee(['Direção', 'Prática', 'Vivência', 'Repertório', 'Palco', 'Banda'], { dark: true, speed: 40 })}

${startSection()}
${placeSection()}
${faqBlock(HOME_FAQ)}
${finalCta()}
`;
  const graph = [
    website,
    school,
    { '@type': 'WebPage', '@id': `${SITE}/#webpage`, url: `${SITE}/`, name: 'Escola de Música em Camboriú | Musicalize Camboriú', isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': SCHOOL_ID }, inLanguage: 'pt-BR', primaryImageOfPage: cl(IMG.hero, 1600) },
    faqLd(HOME_FAQ),
  ];
  return layout({
    path: '/',
    title: 'Escola de Música em Camboriú | Musicalize Camboriú',
    description: 'Aulas de violão, guitarra, baixo, bateria, teclado, canto, ukulele e violino no Centro de Camboriú (SC). Mais de 3 mil alunos. Agende sua aula experimental.',
    body,
    graph,
    preloadImg: { src: cl(IMG.hero, 1400), srcset: heroSrcset },
  });
};

/* ---------- Página de curso ---------- */
const coursePage = (c) => {
  const title = c.h1 || `Aula de ${c.nounLower} em Camboriú`;
  const label = c.slug === 'banda' ? 'Formação de bandas' : c.name;
  const shots = c.slug === 'banda' ? MOMENTS.filter((m) => m.label.startsWith('Apresentação')).slice(0, 2) : POSTERS.filter((p) => p.c === c.slug).slice(0, 2);
  const more = c.slug === 'banda' ? MOMENTS.filter((m) => m.label.startsWith('Apresentação')) : POSTERS.filter((p) => p.c === c.slug);
  const faq = courseFaq(c);
  const waText = c.slug === 'banda'
    ? 'Oi! Vim pelo site e quero saber sobre a formação de bandas na Musicalize Camboriú.'
    : `Oi! Vim pelo site e quero agendar uma aula experimental de ${c.nounLower} na Musicalize Camboriú.`;
  const url = `${SITE}/cursos/${c.slug}`;
  const description = c.slug === 'banda'
    ? 'Formação de bandas em Camboriú (SC): ensaie com outros alunos e suba no palco no Musicalize Tour. Agende sua aula experimental na Musicalize.'
    : `Aula de ${c.nounLower} em Camboriú (SC) com método prático, repertório e palco. Para iniciantes e quem já toca. Agende sua aula experimental.`;
  const presetMap = { banda: 'Banda' };
  const body = `
<section class="c-hero" aria-labelledby="c-t">
  <div class="container c-hero__grid">
    <div>
      <nav aria-label="Você está em"><ol class="crumbs"><li><a href="/">Início</a></li><li><a href="/#cursos">Cursos</a></li><li aria-current="page">${esc(label)}</li></ol></nav>
      <h1 class="split" id="c-t">${split(title)}</h1>
      <span class="program fade-in" style="--d:500ms"><b>${esc(c.program)}</b> Musicalize Camboriú</span>
      <p class="lead fade-in" style="--d:650ms">${esc(c.lead)}</p>
      <div class="hero__ctas fade-in" style="--d:800ms">
        ${btnWa('Agendar aula experimental', { track: 'curso_hero', curso: c.slug, text: waText })}
        <a class="btn btn--lg" href="#comecar">Como começar ${I.arrow}</a>
      </div>
    </div>
    <div class="collage fade-in" style="--d:400ms">
      ${shots.map((s) => shot(s, { lazy: false })).join('')}
      <div class="collage__badge">${eq(10, 4)}</div>
    </div>
  </div>
</section>

${marquee([label, c.program, 'Musicalize Camboriú'].concat([label, c.program, 'Camboriú']))}

<section class="section on-light" aria-labelledby="skills-t">
  <div class="container">
    <div class="section__head">
      <div data-reveal><span class="eyebrow">O que você desenvolve</span><h2 class="h2" id="skills-t" style="margin-top:16px">Técnica que <span class="serif">vira música.</span></h2></div>
      <p class="lead" data-reveal style="--d:100ms">Na Musicalize a técnica anda junto com o repertório. Você estuda pra tocar, e toca pra evoluir.</p>
    </div>
    <ul class="skills">${c.skills.map((s, i) => `<li class="skill" data-reveal style="--d:${i * 90}ms"><strong>${esc(s)}</strong></li>`).join('')}</ul>
  </div>
</section>

<section class="section" aria-labelledby="pra-quem-t">
  <div class="container">
    <div data-reveal><span class="eyebrow">Pra quem é</span><h2 class="h2" id="pra-quem-t" style="margin-top:16px">Começa do <span class="serif y">seu nível.</span></h2></div>
    <div class="levels">
      <div class="level" data-reveal><span class="tag">Do zero</span><h3>Nunca toquei</h3><p>Você começa pela base, com direção clara e música desde as primeiras aulas.</p></div>
      <div class="level" data-reveal style="--d:90ms"><span class="tag">Evoluir</span><h3>Já toco um pouco</h3><p>A gente organiza o que você já sabe e destrava o próximo passo.</p></div>
      <div class="level" data-reveal style="--d:180ms"><span class="tag">Retomar</span><h3>Quero voltar</h3><p>Parou faz tempo? Você retoma no seu ritmo, com repertório que dá vontade de estudar.</p></div>
    </div>
  </div>
</section>

<section class="section on-yellow" aria-labelledby="palco-c-t">
  <div class="container stage-band">
    <div data-reveal="left"><span class="eyebrow">No palco</span><h2 class="h2" id="palco-c-t" style="margin-top:16px">Da sala pro <span class="serif">palco.</span></h2><p>Quem estuda ${esc(c.nounLower)} na Musicalize Camboriú tem onde mostrar o que aprendeu. O palco faz parte da jornada.</p></div>
    <ul data-reveal="right">${c.stage.map(([n, t]) => `<li>${esc(n)} <span>${esc(t)}</span></li>`).join('')}</ul>
  </div>
</section>

${more.length > 2 ? `<section class="section--tight" aria-label="Alunos de ${esc(c.nounLower)}"><div class="strip" style="--speed:60s"><div class="strip__track">${[...more, ...more].map((s, i) => shot(s, s.id.includes('f003') ? { w: 600, h: 800, wide: true } : {}).replace('<figure', i >= more.length ? '<figure aria-hidden="true"' : '<figure')).join('')}</div></div></section>` : ''}

${startSection(presetMap[c.slug] || c.name)}
${placeSection()}
${faqBlock(faq, { title: `Dúvidas sobre ${esc(c.slug === 'banda' ? 'bandas' : c.nounLower)}.` })}

<section class="section--tight" aria-labelledby="outros-t">
  <div class="container">
    <h2 class="h3" id="outros-t" style="margin-bottom:22px">Outros cursos na Musicalize Camboriú</h2>
    <div class="others">${COURSES.filter((o) => o.slug !== c.slug).map((o) => `<a href="/cursos/${o.slug}">${o.slug === 'banda' ? 'Formação de bandas' : o.name} ${I.arrowPlain}</a>`).join('')}</div>
  </div>
</section>

${finalCta(`Sua primeira aula de ${esc(c.slug === 'banda' ? 'banda' : c.nounLower)} <span class="serif">tá a uma mensagem.</span>`, wa(waText))}
`;
  const graph = [
    website,
    school,
    {
      '@type': 'Course', '@id': `${url}#curso`, name: title, description: c.lead, url, inLanguage: 'pt-BR',
      provider: { '@id': SCHOOL_ID }, teaches: c.skills, coursePrerequisites: 'Nenhum. Turmas para iniciantes, intermediários e alunos em retomada.',
      educationalLevel: 'Iniciante, intermediário e retomada', image: wix(shots[0].id, 720, 1120),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Cursos', item: `${SITE}/#cursos` },
        { '@type': 'ListItem', position: 3, name: label, item: url },
      ],
    },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${url}#curso` }, inLanguage: 'pt-BR' },
    faqLd(faq),
  ];
  return layout({ path: `/cursos/${c.slug}`, title: `${title} | Musicalize Camboriú`, description, body, graph, preloadImg: { src: wix(shots[0].id, 540, 840) } });
};

/* ---------- 404 ---------- */
const notFound = () => layout({
  path: '/404',
  title: 'Página não encontrada | Musicalize Camboriú',
  description: 'Essa página saiu do tom. Volte para a página inicial da Musicalize Camboriú.',
  body: `<section class="nf"><div><h1>404</h1><p>Essa página saiu do tom. Bora voltar pro começo da música?</p><div class="hero__ctas" style="justify-content:center"><a class="btn btn--y btn--lg" href="/">Voltar ao início ${I.arrow}</a>${btnWa('Falar no WhatsApp', { track: '404', cls: 'btn btn--lg' })}</div></div></section>`,
  graph: [website],
}).replace('content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"', 'content="noindex, follow"');

/* ---------- Sitemap ---------- */
const sitemap = () => {
  const urls = [{ loc: `${SITE}/`, pr: '1.0', img: [cl(IMG.hero, 1600)] }]
    .concat(COURSES.map((c) => ({ loc: `${SITE}/cursos/${c.slug}`, pr: '0.8' })));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.pr}</priority>${(u.img || []).map((i) => `
    <image:image><image:loc>${esc(i)}</image:loc></image:image>`).join('')}
  </url>`).join('\n')}
</urlset>
`;
};

/* ---------- llms-full.txt (gerado a partir do conteúdo) ---------- */
const llmsFull = () => `# Musicalize Camboriú: guia completo

> Escola de música no Centro de Camboriú (SC), unidade da rede Musicalize. Aulas de violão, guitarra, baixo, bateria, teclado, canto, ukulele, violino e formação de bandas, com método prático e experiência real de palco. Mais de 3 mil alunos ensinados.

Última atualização: ${TODAY}
Site: ${SITE}/

## Dados da escola

- Nome: ${BIZ.name} (Escola de Música Musicalize Camboriú)
- Endereço: ${BIZ.street}, ${BIZ.district}, ${BIZ.city}, ${BIZ.state}, Brasil
- WhatsApp e telefone: ${BIZ.phoneDisplay} (${BIZ.phoneE164})
- Agendamento: ${WA_DEFAULT}
- Instagram: ${BIZ.instagram}
- Facebook: ${BIZ.facebook}
- Rede: Musicalize Escola de Música (${BIZ.network}), com unidades em ${BIZ.units.join(', ')}, em Santa Catarina
- Alunos ensinados na unidade: mais de 3 mil
- Matrículas: abertas o ano todo
- Primeiro passo: aula experimental, agendada pelo WhatsApp
- Atende: Camboriú e Balneário Camboriú (cidade vizinha)
- Públicos: iniciantes, quem já toca e quem quer retomar

## Método

A Musicalize trabalha com três pilares:

1. Direção: cada aluno tem uma jornada clara, com objetivo por etapa, acompanhamento e repertório.
2. Prática: a teoria entra quando faz sentido no instrumento. O foco é tocar desde as primeiras aulas.
3. Vivência: ensaio, banda, audições e palco fazem parte do aprendizado.

## Cursos

${COURSES.map((c) => `### ${c.h1 || `Aula de ${c.nounLower} em Camboriú`} (${c.program})

URL: ${SITE}/cursos/${c.slug}

${c.lead}

O que o aluno desenvolve: ${c.skills.join('; ')}.

Onde se apresenta: ${c.stage.map(([n]) => n).join('; ')}.
`).join('\n')}
## Eventos e palco (rede Musicalize)

${EVENTS.map((e) => `- ${e.title}: ${e.text} (${e.tags.join(', ')})`).join('\n')}

## Perguntas frequentes

${HOME_FAQ.map((f) => `### ${f.q}\n\n${f.a}\n`).join('\n')}`;

/* ---------- Escrita ---------- */
const write = async (rel, content) => {
  const f = join(OUT, rel);
  await mkdir(dirname(f), { recursive: true });
  await writeFile(f, content);
};

await rm(OUT, { recursive: true, force: true });
await cp(PUB, OUT, { recursive: true });
await write('index.html', home());
for (const c of COURSES) await write(`cursos/${c.slug}.html`, coursePage(c));
await write('404.html', notFound());
await write('sitemap.xml', sitemap());
await write('llms-full.txt', llmsFull());
console.log(`✔ Build ok: ${COURSES.length + 2} páginas em dist/ (css ${V.css}, js ${V.js})`);
