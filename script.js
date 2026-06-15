// CCC BOYS · v0.16.0
// Lightweight enhancements only. Site is fully static without JS.

(function () {
  'use strict';

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
