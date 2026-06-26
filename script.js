// CCC BOYS · v0.20.14
// Lightweight enhancements only. Site is fully static without JS.

(function () {
  'use strict';

  // Hamburger nav toggle
  var navToggle = document.querySelector('.primary-nav-toggle');
  var navLinks = document.querySelector('.primary-nav-links');
  var navClose = document.querySelector('.primary-nav-close');
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
    if (navClose) {
      navClose.addEventListener('click', closeNav);
    }
    // Close drawer when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) closeNav();
    });
  }

  // Focused state/country map: zoom the SVG to a target element's bbox
  // Use by adding data-focus-map="#us-map" data-focus-target="#STATE_SC" to a container,
  // or call CccFocusMap.init() after dynamically inserting.
  window.CccFocusMap = {
    apply: function (svgEl, targetSel, opts) {
      if (!svgEl) return false;
      var target = svgEl.querySelector(targetSel);
      if (!target || !target.getBBox) return false;
      try {
        var bb = target.getBBox();
        var pad = (opts && opts.pad) || 0.25;
        var px = bb.width * pad;
        var py = bb.height * pad;
        svgEl.setAttribute('viewBox',
          (bb.x - px) + ' ' + (bb.y - py) + ' ' +
          (bb.width + px * 2) + ' ' + (bb.height + py * 2));
        target.classList.add('focus-target');
        return true;
      } catch (e) { return false; }
    },
    init: function () {
      document.querySelectorAll('[data-focus-map]').forEach(function (host) {
        var svgSel = host.getAttribute('data-focus-map');
        var targetSel = host.getAttribute('data-focus-target');
        var svgEl = host.querySelector(svgSel) || document.querySelector(svgSel);
        if (svgEl && targetSel) {
          // Allow SVG to lay out first
          requestAnimationFrame(function () {
            window.CccFocusMap.apply(svgEl, targetSel, { pad: 0.3 });
          });
        }
      });
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.CccFocusMap.init);
  } else {
    window.CccFocusMap.init();
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
