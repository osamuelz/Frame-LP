'use strict';

initTheme();
initMobileNavigation();
initComparison();
initStylePresets();
initLightbox();
initReveals();

function initTheme() {
  const button = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  function syncTheme() {
    const light = root.dataset.theme === 'light';
    button.setAttribute('aria-label', light ? 'Ativar tema escuro' : 'Ativar tema claro');
    button.setAttribute('aria-pressed', String(light));
    meta.content = light ? '#f5f4f8' : '#101114';
  }
  button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('frame-theme', root.dataset.theme); } catch (_) {}
    syncTheme();
  });
  syncTheme();
}

function initMobileNavigation() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-navigation');
  const mobile = window.matchMedia('(max-width: 600px)');
  function setOpen(open) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  }
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setOpen(false);
    // Move focus to the destination so a hidden link never retains keyboard focus.
    const section = document.querySelector(link.hash);
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', event => {
    if (!menu.hidden && !event.target.closest('.site-header')) setOpen(false);
  });
  mobile.addEventListener('change', () => setOpen(false));
}

function initComparison() {
  const card = document.getElementById('comparison-card');
  const input = document.getElementById('comparison-range-input');
  function update(value) {
    const percentage = Math.round(Math.max(0, Math.min(100, value)));
    input.value = percentage;
    input.setAttribute('aria-valuetext', `${percentage}% da foto com edição FRAME`);
    card.style.setProperty('--split-pos', `${percentage}%`);
  }
  input.addEventListener('input', () => update(Number(input.value)));
  let drag = null;
  let horizontal = false;
  function position(event) {
    const rect = card.getBoundingClientRect();
    update((event.clientX - rect.left) / rect.width * 100);
  }
  input.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
    horizontal = event.pointerType !== 'touch';
    input.setPointerCapture(event.pointerId);
    if (horizontal) { event.preventDefault(); input.focus({ preventScroll: true }); position(event); }
  });
  input.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    if (!horizontal) {
      const dx = Math.abs(event.clientX - drag.x);
      const dy = Math.abs(event.clientY - drag.y);
      if (dy > dx && dy > 6) { end(event); return; }
      horizontal = dx > 6;
    }
    if (horizontal) { event.preventDefault(); position(event); }
  });
  function end(event) {
    if (!drag || event.pointerId !== drag.id) return;
    if (input.hasPointerCapture(event.pointerId)) input.releasePointerCapture(event.pointerId);
    drag = null;
    horizontal = false;
  }
  input.addEventListener('pointerup', event => {
    if (drag && !horizontal) position(event);
    end(event);
  });
  input.addEventListener('pointercancel', end);
  input.addEventListener('lostpointercapture', () => { drag = null; horizontal = false; });
  update(Number(input.value));
}

function initStylePresets() {
  const buttons = [...document.querySelectorAll('.style-preset-btn')];
  const layer = document.querySelector('.comparison-layer-modified');
  const badge = document.querySelector('.comparison-badge-modified');
  const descriptions = {
    natural: 'Cores vivas. Luz na medida. A beleza do instante.',
    cinema: 'Tons quentes e contraste profundo. Uma história em cada cena.',
    mono: 'Sem cor, com sentimento. Luz e textura em primeiro plano.'
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    layer.classList.remove('filter-natural', 'filter-cinema', 'filter-mono');
    layer.classList.add(`filter-${button.dataset.style}`);
    badge.textContent = `FRAME · ${button.textContent.trim()}`;
    document.getElementById('preset-description').textContent = descriptions[button.dataset.style];
  }));
}

function initLightbox() {
  const dialog = document.getElementById('gallery-lightbox');
  const image = document.getElementById('lightbox-img');
  const close = document.getElementById('lightbox-close-btn');
  let trigger;
  let previousOverflow;
  document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
    trigger = item;
    const thumbnail = item.querySelector('img');
    image.src = thumbnail.getAttribute('src');
    image.alt = thumbnail.alt;
    document.getElementById('lightbox-title').textContent = item.dataset.title;
    document.getElementById('lightbox-category').textContent = item.dataset.category;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    close.focus();
  }));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow || '';
    if (trigger) trigger.focus({ preventScroll: true });
  });
}

function initReveals() {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  elements.forEach(element => { element.classList.add('is-pending'); observer.observe(element); });
  motion.addEventListener('change', event => {
    if (event.matches) { elements.forEach(element => element.classList.remove('is-pending')); observer.disconnect(); }
  });
}
