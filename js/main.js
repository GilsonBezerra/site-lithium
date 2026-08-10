(function () {
  var nav = document.getElementById('mainNav');
  var toggle = document.querySelector('.lith-nav__toggle');
  var menu = document.getElementById('navbarResponsive');

  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('lith-nav--scrolled');
    } else {
      nav.classList.remove('lith-nav--scrolled');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('lith-nav__menu--open');
    toggle.classList.toggle('lith-nav__toggle--open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('.js-scroll-trigger').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      menu.classList.remove('lith-nav__menu--open');
      toggle.classList.remove('lith-nav__toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
