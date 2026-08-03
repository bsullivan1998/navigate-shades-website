// ============================================================
// NAVIGATE WINDOW & SHADE CO. — Main JS
// ============================================================

// --- HEADER SCROLL ---
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      mobileNav.setAttribute('aria-hidden', true);
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      mobileNav.setAttribute('aria-hidden', true);
      document.body.style.overflow = '';
    }
  });
}

// --- SCROLL REVEAL ---
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}

// --- CONTACT FORM ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit .btn');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Netlify Forms — works automatically with data-netlify="true"
    const formData = new FormData(contactForm);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      if (res.ok) {
        contactForm.innerHTML = `
          <div style="text-align:center; padding:48px 0;">
            <div style="font-size:40px; margin-bottom:16px;">✦</div>
            <h3 style="color:var(--teal); margin-bottom:12px;">Thank You</h3>
            <p>We've received your request and will be in touch within one business day to confirm your consultation.</p>
          </div>`;
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      btn.textContent = originalText;
      btn.disabled = false;
      alert('Something went wrong. Please call us directly at (512) 820-6599.');
    }
  });
}

// --- ACTIVE NAV ---
const currentPath = window.location.pathname;
document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.style.color = 'var(--gold)';
  }
});
