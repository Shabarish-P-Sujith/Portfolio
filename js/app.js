// ─── SPA ROUTER ──────────────────────────────────────────────────────────────

const pages   = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const buttons  = document.querySelectorAll('[data-section]');

/**
 * Show the requested section and hide all others.
 * Updates nav active state and URL hash.
 */
function navigateTo(sectionId) {
  // Hide all pages
  pages.forEach(p => p.classList.add('hidden'));

  // Show target page
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove('hidden');
    // Re-trigger animation
    target.style.animation = 'none';
    target.offsetHeight;                     // reflow
    target.style.animation = '';
  }

  // Update nav active state
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });

  // Update URL hash without reloading
  history.pushState(null, '', `#${sectionId}`);

  // Close mobile menu if open
  navLinks[0]?.closest('ul')?.classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── NAV LINK CLICKS ─────────────────────────────────────────────────────────
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(link.dataset.section);
  });
});

// ─── BUTTON CLICKS (hero CTA, etc.) ──────────────────────────────────────────
buttons.forEach(btn => {
  if (!btn.classList.contains('nav-link')) {
    btn.addEventListener('click', () => navigateTo(btn.dataset.section));
  }
});

// ─── HANDLE DIRECT URL HASH ON LOAD ──────────────────────────────────────────
function loadFromHash() {
  const hash = window.location.hash.replace('#', '') || 'home';
  const valid = ['home', 'about', 'projects', 'contact'];
  navigateTo(valid.includes(hash) ? hash : 'home');
}

window.addEventListener('popstate', loadFromHash);
document.addEventListener('DOMContentLoaded', loadFromHash);

// ─── HAMBURGER MENU ───────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navList   = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navList.classList.toggle('open');
});

// ─── FOOTER YEAR ─────────────────────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ─── NAV SCROLL SHADOW ───────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 4px 30px rgba(0,0,0,0.4)'
    : 'none';
});
