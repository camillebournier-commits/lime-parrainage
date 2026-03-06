/**
 * lime-parrainage.fr — script.js
 * - Scroll reveal animations
 * - CTA click tracking (console-only, RGPD-safe)
 * - Smooth anchor scrolling
 */

'use strict';

/* ── Scroll reveal ────────────────────────────────────────── */
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.step-card, .faq-card, .about__text, .about__stat-block, .section-title, .section-sub'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger children of the same parent
    const sibling = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    if (sibling > 0) el.classList.add(`reveal-delay-${Math.min(sibling, 3)}`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ── CTA tracking (privacy-safe, no external calls) ──────── */
(function initCtaTracking() {
  const ctaLinks = document.querySelectorAll('a[href*="lime.bike/referral"]');

  ctaLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const label = link.textContent.trim().slice(0, 60);
      console.info('[lime-parrainage] CTA clicked:', label, '→', link.href);
      // Add your analytics call here if needed (Plausible, Matomo, etc.)
      // Example: plausible('CTA Click', { props: { label } });
    });
  });
})();

/* ── Active nav highlight (for future nav extension) ─────── */
(function initActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll('[data-nav]').forEach((n) =>
            n.classList.toggle('active', n.dataset.nav === entry.target.id)
          );
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => navObserver.observe(s));
})();

/* ── Sticky CTA pulse after 8s ───────────────────────────── */
(function initDelayedPulse() {
  const firstCta = document.querySelector('.cta-btn');
  if (!firstCta) return;

  setTimeout(() => {
    firstCta.style.animation = 'pulse 1.2s ease 0s 2';
  }, 8000);
})();

/* ── Inline CSS for pulse (injected once) ────────────────── */
(function injectPulseKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { box-shadow: 0 4px 24px rgba(0,200,83,.35); }
      50%       { box-shadow: 0 8px 48px rgba(0,200,83,.65), 0 0 0 10px rgba(0,200,83,.08); }
    }
  `;
  document.head.appendChild(style);
})();
