/**
 * FRAME — JavaScript Principal
 * Interações acessíveis, controle de comparação de imagens,
 * alternância de estilos de edição e visualização de galeria (lightbox).
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de todos os módulos
  initMobileNavigation();
  initComparisonSlider();
  initStylePresets();
  initGalleryLightbox();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
 * 1. Navegação Mobile Acessível
 * -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-navigation');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

  if (!toggleBtn || !mobileNav) return;

  function setMenuState(open) {
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      mobileNav.classList.add('is-open');
      toggleBtn.setAttribute('aria-label', 'Fechar menu de navegação');
    } else {
      mobileNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-label', 'Abrir menu de navegação');
    }
  }

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    setMenuState(!isCurrentlyOpen);
  });

  // Fechar ao clicar em qualquer link da navegação
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  // Fechar com Escape se estiver aberto
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      toggleBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
 * 2. Demonstração Interativa de Edição: Comparador de Imagens
 * -------------------------------------------------------------------------- */
function initComparisonSlider() {
  const card = document.getElementById('comparison-card');
  const slider = document.getElementById('comparison-range-input');

  if (!card || !slider) return;

  // Atualiza a posição visual da divisão
  function updatePosition(percentage) {
    const clamped = Math.max(0, Math.min(100, percentage));
    card.style.setProperty('--split-pos', `${clamped}%`);
    slider.value = clamped;
  }

  // Controle nativo via input range (teclado, leitor de tela e arrasto padrão)
  slider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    updatePosition(val);
  });

  // Suporte adicional a toque e mouse diretamente na superfície do card
  let isPointerDown = false;

  function handlePointerMove(e) {
    if (!isPointerDown) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    updatePosition(percentage);
  }

  card.addEventListener('pointerdown', (e) => {
    // Permite que o próprio slider responda ao clique
    isPointerDown = true;
    card.setPointerCapture(e.pointerId);
    handlePointerMove(e);
  });

  card.addEventListener('pointermove', handlePointerMove);

  function endPointer(e) {
    if (isPointerDown) {
      isPointerDown = false;
      try {
        card.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignora caso já tenha sido liberado
      }
    }
  }

  card.addEventListener('pointerup', endPointer);
  card.addEventListener('pointercancel', endPointer);

  // Inicializa na metade
  updatePosition(50);
}

/* --------------------------------------------------------------------------
 * 3. Demonstração Interativa de Edição: Seleção de Estilos
 * -------------------------------------------------------------------------- */
function initStylePresets() {
  const presetButtons = document.querySelectorAll('.style-preset-btn');
  const modifiedLayer = document.querySelector('.comparison-layer-modified');
  const modifiedBadge = document.querySelector('.comparison-badge-modified');

  if (!presetButtons.length || !modifiedLayer) return;

  const styleNames = {
    'natural': 'Natural',
    'cinema': 'Cinema',
    'mono': 'Mono'
  };

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedStyle = btn.getAttribute('data-style');

      // Atualiza estado visual dos botões e acessibilidade
      presetButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      // Remove classes anteriores de filtro e adiciona a nova
      modifiedLayer.classList.remove('filter-natural', 'filter-cinema', 'filter-mono');
      modifiedLayer.classList.add(`filter-${selectedStyle}`);

      // Atualiza o indicador textual do estilo ativo
      if (modifiedBadge && styleNames[selectedStyle]) {
        modifiedBadge.setAttribute('data-active-style', styleNames[selectedStyle]);
      }
    });
  });
}

/* --------------------------------------------------------------------------
 * 4. Galeria Editorial & Lightbox Acessível
 * -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('gallery-lightbox');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');

  if (!modal || !galleryItems.length || !closeBtn || !lightboxImg) return;

  let triggerElement = null;

  function openLightbox(item) {
    triggerElement = item;

    const img = item.querySelector('.gallery-item-image');
    const title = item.getAttribute('data-title') || '';
    const category = item.getAttribute('data-category') || '';
    const fullSrc = item.getAttribute('data-full') || (img ? img.getAttribute('src') : '');
    const altText = img ? img.getAttribute('alt') : 'Fotografia ampliada';

    lightboxImg.setAttribute('src', fullSrc);
    lightboxImg.setAttribute('alt', altText);
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCategory) lightboxCategory.textContent = category;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Foco no botão de fechar para controle de teclado imediato
    closeBtn.focus();
  }

  function closeLightbox() {
    if (!modal.classList.contains('is-open')) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Retorna o foco ao elemento que abriu o modal
    if (triggerElement && typeof triggerElement.focus === 'function') {
      triggerElement.focus();
    }
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      openLightbox(item);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  // Fechar ao clicar fora da área da imagem (no backdrop escuro)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  // Controle de teclado: fechar com Escape e prender foco (Focus Trap)
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
      return;
    }

    if (e.key === 'Tab') {
      // Como o único elemento focável interativo no modal é o botão de fechar,
      // garantimos que o foco permaneça nele
      e.preventDefault();
      closeBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
 * 5. Animações Sutis com IntersectionObserver
 * -------------------------------------------------------------------------- */
function initScrollAnimations() {
  // Respeita prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animElements = document.querySelectorAll('.fade-in-element');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    animElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animElements.forEach(el => observer.observe(el));
}
