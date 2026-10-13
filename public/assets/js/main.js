/* Musicalize Camboriú — interações. Sem dependências. */
(() => {
  const doc = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const WA = doc.dataset.wa;

  window.dataLayer = window.dataLayer || [];
  const track = (event, data = {}) => window.dataLayer.push({ event, ...data });

  /* Header: fundo ao rolar e esconde ao descer */
  const header = document.querySelector('.header');
  let lastY = window.scrollY;
  const onHeader = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    const hide = y > lastY && y > 400 && !doc.classList.contains('menu-open');
    header.classList.toggle('is-hidden', hide);
    lastY = y;
  };

  /* Menu mobile */
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('mobile-menu');
  const setMenu = (open) => {
    doc.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.toggleAttribute('inert', !open);
  };
  if (menuBtn && menu) {
    setMenu(false);
    menuBtn.addEventListener('click', () => setMenu(!doc.classList.contains('menu-open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }

  /* Revelação no scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

  /* Contadores */
  const fmt = new Intl.NumberFormat('pt-BR');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      countIO.unobserve(en.target);
      const el = en.target;
      const to = Number(el.dataset.count);
      const pre = el.dataset.prefix || '';
      const suf = el.dataset.suffix || '';
      if (reduce) { el.textContent = pre + fmt.format(to) + suf; return; }
      const dur = 1600;
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 4);
        el.textContent = pre + fmt.format(Math.round(to * e)) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el));

  /* Pilares do método: destaca o que está no centro da tela */
  const pillars = document.querySelectorAll('.pillar');
  if (pillars.length) {
    const pIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => en.target.classList.toggle('is-active', en.isIntersecting));
    }, { rootMargin: '-38% 0px -38% 0px' });
    pillars.forEach((p) => pIO.observe(p));
  }

  /* Parallax do hero + inclinação do marquee pela velocidade de rolagem */
  const heroImg = document.querySelector('.hero__media img');
  const marquees = document.querySelectorAll('.marquee');
  let ticking = false;
  let prevY = window.scrollY;
  let skew = 0;
  const onFrame = () => {
    const y = window.scrollY;
    if (!reduce) {
      if (heroImg && y < window.innerHeight * 1.2) heroImg.style.setProperty('--py', `${y * 0.28}px`);
      const v = Math.max(-12, Math.min(12, (y - prevY) * 0.12));
      skew += (v - skew) * 0.3;
      marquees.forEach((m) => m.style.setProperty('--skew', `${(-skew * 0.25).toFixed(2)}deg`));
    }
    prevY = y;
    onHeader();
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onFrame); ticking = true; }
  }, { passive: true });
  onHeader();

  /* Tilt suave nos cards de curso */
  if (finePointer && !reduce) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`);
        card.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--rx', '0deg');
      });
    });
  }

  /* Botão flutuante do WhatsApp aparece depois do hero */
  const floatBtn = document.querySelector('.wa-float');
  const heroEl = document.querySelector('.hero, .c-hero');
  if (floatBtn && heroEl) {
    new IntersectionObserver(([en]) => {
      floatBtn.classList.toggle('is-visible', !en.isIntersecting);
    }, { threshold: 0.15 }).observe(heroEl);
  }

  /* Rastreia cliques no WhatsApp (GA4/GTM/Meta via dataLayer) */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href*="wa.me"]');
    if (a) track('whatsapp_click', { cta_location: a.dataset.track || 'link', curso: a.dataset.curso || '' });
  });

  /* Formulário que monta a mensagem e abre o WhatsApp */
  const form = document.getElementById('lead-form');
  if (form && WA) {
    const errorEl = form.querySelector('.form__error');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nome = String(data.get('nome') || '').trim();
      const nameInput = form.querySelector('[name="nome"]');
      if (!nome) {
        nameInput.setAttribute('aria-invalid', 'true');
        errorEl.hidden = false;
        nameInput.focus();
        return;
      }
      nameInput.removeAttribute('aria-invalid');
      errorEl.hidden = true;
      const lines = [
        `Oi! Sou ${nome} e vim pelo site. Quero agendar uma aula experimental na Musicalize Camboriú.`,
        data.get('instrumento') && `Instrumento: ${data.get('instrumento')}`,
        data.get('nivel') && `Nível: ${data.get('nivel')}`,
        data.get('periodo') && `Melhor período: ${data.get('periodo')}`,
        data.get('para') && `A aula é para: ${data.get('para')}`,
      ].filter(Boolean);
      const url = `https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n'))}`;
      track('generate_lead', { method: 'whatsapp_form', curso: data.get('instrumento') || '' });
      window.open(url, '_blank', 'noopener');
    });
  }
})();
