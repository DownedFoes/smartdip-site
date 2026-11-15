(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const yearEl = document.getElementById('year');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formReset = document.getElementById('form-reset');

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Sticky header style on scroll */
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile nav */
  const setMenuOpen = (open) => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.classList.toggle('hidden', !open);
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      setMenuOpen(open);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
  }

  /* Smooth-scroll for in-page anchors (respects reduced motion via CSS) */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    });
  });

  /* Scroll reveal */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* Contact form — client-side success state */
  const clearInvalid = (form) => {
    form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
  };

  const validateForm = (form) => {
    clearInvalid(form);
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach((field) => {
      const empty = !field.value.trim();
      const badEmail =
        field.type === 'email' &&
        field.value.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      if (empty || badEmail) {
        field.classList.add('is-invalid');
        valid = false;
      }
    });
    return valid;
  };

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateForm(contactForm)) {
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      contactForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');
      formSuccess.focus?.();
    });
  }

  if (formReset && contactForm && formSuccess) {
    formReset.addEventListener('click', () => {
      contactForm.reset();
      clearInvalid(contactForm);
      formSuccess.classList.add('hidden');
      contactForm.classList.remove('hidden');
      const first = contactForm.querySelector('input');
      if (first) first.focus();
    });
  }

  /* Flavor selector */
  const flavorButtons = [...document.querySelectorAll('.flavor-item[data-flavor]')];
  const flavorLabel = document.getElementById('flavor-active-label');
  const flavorBlurb = document.getElementById('flavor-active-blurb');
  const flavorImage = document.getElementById('flavor-product-image');
  const nutritionLabel = document.getElementById('nutrition-flavor-label');
  const nutritionPanel = document.getElementById('nutrition-panel');
  const nutritionSoon = document.getElementById('nutrition-soon');

  const selectFlavor = (button) => {
    if (!button) return;
    const name = button.dataset.name || '';
    const blurb = button.dataset.blurb || '';
    const hasNutrition = button.dataset.hasNutrition === 'true';

    flavorButtons.forEach((btn) => {
      const selected = btn === button;
      btn.classList.toggle('is-selected', selected);
      btn.setAttribute('aria-checked', selected ? 'true' : 'false');
      btn.tabIndex = selected ? 0 : -1;
    });

    if (flavorLabel) flavorLabel.textContent = name;
    if (flavorBlurb) {
      flavorBlurb.innerHTML = blurb.replace(
        /28g of protein/gi,
        '<strong class="text-black">28g of protein</strong>'
      );
    }
    if (flavorImage) {
      flavorImage.alt = `Smart Dip ${name} cottage cheese dip — 28g protein`;
    }
    if (nutritionLabel) {
      nutritionLabel.textContent = hasNutrition
        ? `${name} · Per container (250g)`
        : `${name} · Nutrition coming soon`;
    }
    if (nutritionPanel) {
      nutritionPanel.classList.toggle('hidden', !hasNutrition);
      nutritionPanel.setAttribute(
        'aria-label',
        hasNutrition ? `Nutrition Facts for Smart Dip ${name}, 250 grams` : ''
      );
    }
    if (nutritionSoon) {
      nutritionSoon.classList.toggle('hidden', hasNutrition);
    }
  };

  if (flavorButtons.length) {
    flavorButtons.forEach((btn, index) => {
      btn.tabIndex = btn.classList.contains('is-selected') ? 0 : -1;
      btn.addEventListener('click', () => selectFlavor(btn));
      btn.addEventListener('keydown', (event) => {
        if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return;
        event.preventDefault();
        const delta = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
        const next = (index + delta + flavorButtons.length) % flavorButtons.length;
        flavorButtons[next].focus();
        selectFlavor(flavorButtons[next]);
      });
    });
  }
})();
