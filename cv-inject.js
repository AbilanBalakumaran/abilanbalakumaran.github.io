/* ═══════════════════════════════════════════════════
   cv-inject.js — Injecte cv-data.js dans le DOM du site
   Met à jour automatiquement toutes les sections affichées
   quand cv-data.js est modifié.
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  function run() {
    const CV = window.ABILAN_CV;
    if (!CV) return;

    /* ── 1. HERO : Nom + Titre ─────────────────────── */
    const heroName = document.getElementById('hero-name-h1');
    if (heroName && CV.nom) {
      const parts = CV.nom.split(' ');
      const last  = parts.pop();
      heroName.textContent = parts.join(' ') + ' ' + last;
    }

    const heroRole = document.querySelector('.hero-role');
    if (heroRole && CV.titre) heroRole.textContent = CV.titre;

    /* ── 2. INTRO : Philosophie ────────────────────── */
    const taglineSpan = document.querySelector('.intro-tagline span');
    if (taglineSpan && CV.philosophie) {
      // Extrait la partie après la virgule pour le span coloré
      const parts = CV.philosophie.split(',');
      if (parts.length > 1) taglineSpan.textContent = parts[1].trim().replace(/\.$/, '') + '.';
    }

    /* ── 3. SERVICES : Génération complète ─────────── */
    const svcGrid = document.querySelector('.svc-grid');
    if (svcGrid && CV.services && CV.services.length) {
      svcGrid.innerHTML = CV.services.map(s => `
        <article class="bc" itemscope itemtype="https://schema.org/Service">
          <div class="bc-glow" aria-hidden="true"></div>
          <div class="bc-body svc-card">
            <div class="svc-icon-wrap" aria-hidden="true">
              <i class="fa-solid ${s.icon || 'fa-star'}" style="color:var(--bs)"></i>
            </div>
            <h3 class="svc-name" itemprop="name">${s.nom}</h3>
            <p class="svc-desc" itemprop="description">${s.desc}</p>
            ${s.chips && s.chips.length ? `
            <div class="svc-chips" aria-label="Outils & compétences">
              ${s.chips.map(c => `<span class="svc-chip">${c}</span>`).join('')}
            </div>` : ''}
          </div>
        </article>
      `).join('');
    }

    /* ── 4. FOOTER : Email & Réseaux ──────────────── */
    // Email dans le footer (lien mailto)
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
      if (CV.email) {
        a.href = 'mailto:' + CV.email;
        // Met à jour le texte visible si c'est une adresse
        if (a.textContent.includes('@')) a.textContent = CV.email;
      }
    });

    // Liens réseaux sociaux dans le footer
    const socialMap = {
      'instagram.com': CV.instagram,
      'youtube.com':   CV.youtube,
      'behance.net':   CV.behance,
      'linkedin.com':  CV.linkedin,
      'linktr.ee':     CV.linktree,
    };
    document.querySelectorAll('.tp-social-btn, a[href*="instagram"], a[href*="youtube.com/@"], a[href*="behance.net"], a[href*="linkedin.com/in"]').forEach(a => {
      const href = a.getAttribute('href') || '';
      for (const [domain, newHref] of Object.entries(socialMap)) {
        if (href.includes(domain) && newHref) {
          a.href = newHref;
          break;
        }
      }
    });

    /* ── 5. META itemprop ──────────────────────────── */
    document.querySelectorAll('[itemprop="name"]').forEach(el => {
      if (el.tagName === 'META' && CV.nom) el.setAttribute('content', CV.nom);
    });
    document.querySelectorAll('[itemprop="jobTitle"]').forEach(el => {
      if (el.tagName === 'META' && CV.titre) el.setAttribute('content', CV.titre);
    });

    /* ── 6. JSON-LD : mise à jour dynamique ───────── */
    document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
      try {
        const d = JSON.parse(s.textContent);
        if (d['@type'] === 'Person' && CV.nom) {
          d.name  = CV.nom;
          d.email = CV.email;
          if (d.jobTitle) d.jobTitle = CV.titre;
          s.textContent = JSON.stringify(d, null, 2);
        }
      } catch(e) {}
    });
  }

  // Lancer après chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

})();
