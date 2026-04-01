/* ============================================================
   MAIN.JS — Navigation, Hero, Scroll Reveal, Lightbox
   ============================================================ */

// ── Navigation scroll state ──────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Hero background Ken Burns effect ─────────────────────────
window.addEventListener('load', () => {
  document.getElementById('hero').classList.add('loaded');
});

// ── Mobile menu ───────────────────────────────────────────────
const mobileMenu = document.getElementById('mobileMenu');

document.getElementById('hamburger').addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

document.getElementById('mobileClose').addEventListener('click', closeMobile);

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ── Scroll reveal (IntersectionObserver) ─────────────────────
const revealEls = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right, .reveal-scale'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ── Lightbox ──────────────────────────────────────────────────
const galleryImages = [
  'https://www.roashotel.com/wp-content/uploads/2021/05/1622397736_Original-scaled.jpeg',
  'https://www.roashotel.com/wp-content/uploads/2021/05/4C7FBBA3-4141-4A35-B2DD-123DB5C10E82-scaled.jpeg',
  'https://www.roashotel.com/wp-content/uploads/2021/05/1622400252_Original-scaled.jpeg',
  'https://www.roashotel.com/wp-content/uploads/2021/05/IMG_9586_Original-scaled.jpeg',
  'https://www.roashotel.com/wp-content/uploads/2021/05/1622753344_Original-scaled.jpeg',
  'https://www.roashotel.com/wp-content/uploads/2021/05/B26768B5-85A6-4632-82C9-6D42DED8E085-1-scaled.jpg',
  'https://www.roashotel.com/wp-content/uploads/2021/05/1622567338_Original-scaled.jpeg',
];

let currentImg = 0;
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(index) {
  currentImg = index;
  lightboxImg.src = galleryImages[index];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function changeLightbox(dir) {
  currentImg = (currentImg + dir + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentImg];
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  changeLightbox(-1);
  if (e.key === 'ArrowRight') changeLightbox(1);
});

// ── Smooth anchor scroll ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Expose functions used inline in HTML ─────────────────────
window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;
window.changeLightbox = changeLightbox;
window.closeMobile   = closeMobile;
