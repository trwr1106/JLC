/* =========================================================
   Japan Life Community — script.js
   Mobile nav, scroll fade-ins, QR image fallback
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile hamburger menu ---------- */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Close menu after tapping a link */
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll fade-in animation ---------- */
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback for older browsers: just show everything */
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- QR code image fallback ---------- */
  /* If assets/discord-qr.png does not exist yet, show a friendly
     placeholder instead of a broken image icon. */
  document.querySelectorAll('.qr-img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
      var placeholder = img.nextElementSibling;
      if (placeholder && placeholder.classList.contains('qr-placeholder')) {
        placeholder.style.display = 'flex';
      }
    });
  });

  /* ---------- Newsletter signup confirmation ---------- */
  /* After a successful FormSubmit POST, the visitor is redirected back
     with ?subscribed=true — show a quick confirmation in the footer. */
  if (window.location.search.indexOf('subscribed=true') !== -1) {
    var newsletterCol = document.querySelector('.footer-newsletter');
    var signupForm = document.querySelector('.footer-signup');
    if (newsletterCol && signupForm) {
      var note = document.createElement('p');
      note.className = 'footer-newsletter-note';
      note.textContent = '✅ Thanks for subscribing!';
      newsletterCol.insertBefore(note, signupForm);
    }
    if (window.history && window.history.replaceState) {
      var cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState(null, '', cleanUrl);
    }
  }

});
