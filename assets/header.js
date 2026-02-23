(function() {
  // Search toggle functionality
  var openBtn = document.getElementById('header-search-open');
  var form = document.getElementById('header-search-form');
  var input = document.getElementById('header-search-input');

  if (!openBtn || !form || !input) return;

  function showSearch() {
    input.classList.add('visible');
    input.focus();
    openBtn.setAttribute('aria-expanded', 'true');
  }

  function hideSearch() {
    input.classList.remove('visible');
    openBtn.setAttribute('aria-expanded', 'false');
  }

  openBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (input.classList.contains('visible')) {
      hideSearch();
    } else {
      showSearch();
    }
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideSearch();
    }
  });

  document.addEventListener('click', function(e) {
    if (!form.contains(e.target) && !openBtn.contains(e.target)) {
      hideSearch();
    }
  });

  form.addEventListener('submit', function(e) {
    if (!input.value.trim()) {
      e.preventDefault();
      hideSearch();
    }
  });

  // Mobile navigation toggle
  var menuToggle = document.getElementById('mobile-menu-toggle');
  var nav = document.querySelector('.header__menu');

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
  });
})();
