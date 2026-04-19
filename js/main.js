/* ============================================================
   MAIN.JS — Navigation, Hero, Scroll Reveal, Lightbox
   ============================================================ */

// ── Navigation scroll state (rAF-throttled) ──────────────────
const navbar = document.getElementById('navbar');
let scrollTicking = false;

function onScroll() {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(onScroll);
    scrollTicking = true;
  }
}, { passive: true });

// ── Hero background Ken Burns effect ─────────────────────────
window.addEventListener('load', () => {
  document.getElementById('hero')?.classList.add('loaded');
});

// ── Mobile menu ───────────────────────────────────────────────
const mobileMenu = document.getElementById('mobileMenu');
const hamburger  = document.getElementById('hamburger');
const mobileClose = document.getElementById('mobileClose');

function openMobile() {
  if (!mobileMenu || !hamburger) return;
  mobileMenu.classList.add('open');
  hamburger.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobile() {
  if (!mobileMenu || !hamburger) return;
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  if (mobileMenu?.classList.contains('open')) closeMobile();
  else openMobile();
});

mobileClose?.addEventListener('click', closeMobile);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) closeMobile();
});

// ── Scroll reveal (IntersectionObserver, unobserve once shown)
const revealEls = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right, .reveal-scale'
);

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ── Lightbox ──────────────────────────────────────────────────
const galleryImages = [
  'images/gallery-1.jpg',
  'images/about-main.jpg',
  'images/gallery-3.jpg',
  'images/gallery-4.jpg',
  'images/gallery-5.jpg',
  'images/restaurant-milo.jpg',
  'images/gallery-7.jpg',
];

let currentImg = 0;
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(index) {
  if (!lightbox || !lightboxImg) return;
  currentImg = index;
  lightboxImg.src = galleryImages[index];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function changeLightbox(dir) {
  if (!lightboxImg) return;
  currentImg = (currentImg + dir + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentImg];
}

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  changeLightbox(-1);
  if (e.key === 'ArrowRight') changeLightbox(1);
});

// ── Smooth anchor scroll (skip bare "#") ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Dynamic copyright year ───────────────────────────────────
const yearEl = document.getElementById('copyYear');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ── KVKK cookie consent ──────────────────────────────────────
const cookieBanner = document.getElementById('cookieConsent');
const cookieAccept = document.getElementById('cookieAccept');
if (cookieBanner && !localStorage.getItem('roasCookieOK')) {
  cookieBanner.hidden = false;
  cookieAccept?.addEventListener('click', () => {
    localStorage.setItem('roasCookieOK', '1');
    cookieBanner.hidden = true;
  });
}

// ── Expose functions used inline in HTML ─────────────────────
window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;
window.changeLightbox = changeLightbox;
window.closeMobile   = closeMobile;
