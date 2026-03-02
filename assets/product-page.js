/**
 * product-page.js
 * Handles: thumbnail gallery, quantity stepper, add-to-cart feedback
 */

(function () {
  'use strict';

  /* ── Thumbnail Gallery ─────────────────── */
  function initGallery() {
    const section = document.querySelector('.product-page');
    if (!section) return;

    const mainImg = section.querySelector('#main-product-image-' + section.dataset.sectionId);
    const thumbLinks = section.querySelectorAll('.thumbnail-link');

    if (!mainImg || !thumbLinks.length) return;

    // Mark first thumb active
    if (thumbLinks[0]) thumbLinks[0].classList.add('is-active');

    thumbLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const newSrc = link.getAttribute('href');

        // Fade transition
        mainImg.style.opacity = '0';
        mainImg.style.transform = 'scale(1.02)';

        setTimeout(() => {
          mainImg.src = newSrc;
          mainImg.style.transition = 'opacity 0.35s ease, transform 0.6s ease';
          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
        }, 180);

        // Active state
        thumbLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      });
    });
  }

  /* ── Quantity Stepper ──────────────────── */
  function initQuantity() {
    document.querySelectorAll('.quantity-wrapper').forEach(wrapper => {
      const input = wrapper.querySelector('.quantity-input');
      const minusBtn = wrapper.querySelector('[data-action="minus"]');
      const plusBtn  = wrapper.querySelector('[data-action="plus"]');

      if (!input) return;

      if (minusBtn) {
        minusBtn.addEventListener('click', () => {
          const val = parseInt(input.value, 10);
          if (val > 1) input.value = val - 1;
        });
      }
      if (plusBtn) {
        plusBtn.addEventListener('click', () => {
          const val = parseInt(input.value, 10);
          input.value = val + 1;
        });
      }
    });
  }

  /* ── Add-to-Cart Feedback ──────────────── */
  function initAddToCart() {
    const forms = document.querySelectorAll('.product-form');
    forms.forEach(form => {
      const btn = form.querySelector('[type="submit"]');
      if (!btn) return;

      form.addEventListener('submit', () => {
        btn.classList.add('is-loading');
        // Remove loading state after Shopify handles the event
        setTimeout(() => btn.classList.remove('is-loading'), 1800);
      });
    });
  }

  /* ── Sticky Info Panel on scroll ──────── */
  function initStickyOffset() {
    const header = document.querySelector('header');
    const info = document.querySelector('.product-page__info');
    if (!info || !header) return;
    info.style.top = (header.offsetHeight + 16) + 'px';
  }

  /* ── Init ──────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initQuantity();
    initAddToCart();
    initStickyOffset();
  });

})();