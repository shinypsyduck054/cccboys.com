// CCC BOYS · v0.20.5
// Lightweight enhancements only. Site is fully static without JS.

(function () {
  'use strict';

  // Hamburger nav toggle
  var navToggle = document.querySelector('.primary-nav-toggle');
  var navLinks = document.querySelector('.primary-nav-links');
  if (navToggle && navLinks) {
    var closeNav = function () {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    var openNav = function () {
      navLinks.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    navToggle.addEventListener('click', function () {
      if (navLinks.classList.contains('is-open')) closeNav(); else openNav();
    });
    // Close drawer when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) closeNav();
    });
  }

  // Reveal panels on scroll
  if ('IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.panel, .ttile, .rules li, .enlist-card, .creed p');
    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => io.observe(el));
  }
})();
