/* ═══════════════════════════════════════════════════
   Akino : Chatbot Assistant
   Commercial virtuel d'Abilan Balakumaran
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const AVATAR = '/images/chatbot-avatar.png';

  // Lecture du CV (cv-data.js) — fallback si non chargé
  const CV = (typeof window !== 'undefined' && window.ABILAN_CV) || {};
  const NOM    = CV.nom    || 'Abilan Balakumaran';
  const TITRE  = CV.titre  || 'Digital Manager & Motion Designer';
  const EMAIL  = CV.email  || 'Abilan.Balakumaran@gmail.com';
  const LINKTREE = CV.linktree || 'https://linktr.ee/abilan.motion';
  const LINKEDIN = CV.linkedin || 'https://www.linkedin.com/in/abilan-balakumaran/';

  /* ── Base de connaissances ─────────────────────── */
  const KB = [
    {
      keys: ['bonjour','salut','hello','coucou','bonsoir','hey','hi'],
      answer: () => `Bonjour ! 👋 Bienvenue !<br><br>Je suis <strong>Akino</strong>, l'assistant d'<strong>${NOM}</strong> — <strong>${TITRE}</strong>.<br><br>Que vous cherchiez à booster votre image de marque, créer des vidéos percutantes ou développer votre présence en ligne, vous êtes au bon endroit 🎯<br><br>Comment puis-je vous aider ?`
    },
    {
      keys: ['qui est','c\'est qui','parle moi','tell me','about','profil','présentation','présente'],
      answer: () => `<strong>${NOM}</strong> est <strong>${TITRE}</strong> 🚀<br><br>${CV.accroche ? CV.accroche.replace(/\n/g,'<br>') + '<br><br>' : ''}✅ <strong>En poste</strong> : Chef de projet digital — Cabinet d'Étude pour la Rénovation<br>✅ <strong>2 ans chez WAAT</strong> : motion design, DA, sound design, IA<br>✅ <strong>Stage Clutch Rayn Production</strong> : motion design, montage, esport<br>✅ <strong>Mastère Motion Design</strong> — Félicitations du jury · <strong>MBA Digital Marketing</strong> en cours<br>✅ <strong>Certifié Google Analytics, Google Ads & Prestashop</strong><br>✅ <strong>Mobile en Île-de-France</strong> — freelance & alternance<br><br><em>"${CV.philosophie || 'Votre visibilité en ligne est votre meilleur commercial.'}"</em> 💡` + skillVidHtml()
    },
    {
      keys: ['expérience','poste','entreprise','emploi','waat','alternance','travaillé','travaille','carrière','cabinet','rénovation'],
      answer: () => `Abilan a un vrai parcours terrain, pas que de la théorie 💪<br><br>🏢 <strong>Chef de projet digital — Cabinet d'Étude pour la Rénovation</strong> (alternance, depuis 2025)<br>• Pilotage de l'écosystème web : sites, landing pages, web apps, tunnels de vente<br>• Déploiement de l'identité de marque globale : DA, motion design, print, merchandising<br>• Lead de la stratégie notoriété, SEO local (Google Business Profile) et e-réputation<br><br>🏢 <strong>Graphiste / Motion Designer — WAAT</strong> (alternance 2 ans, 2023–2025)<br>• Vidéos pédagogiques 2D/3D à fort impact : compréhension produit, formats promotionnels<br>• Vidéos d'onboarding et communication interne pour engager les équipes<br>• Animation de mascotte 2D/3D : rigging, modélisation, lip-syncing, incrustation vidéo<br>• Direction artistique globale + intégration outils IA + sound design<br>• Charte graphique pour l'association AFOR<br>• Contenus multi-réseaux : LinkedIn, YouTube, Intranet, site internet<br><br>🎬 <strong>Monteur / Motion Designer — Clutch Rayn Production</strong> (stage 8 semaines, 2022)<br>• Overlays, animations et transitions Twitch sur-mesure<br>• Montage vidéo long format : streaming, récapitulatifs, dérushage<br>• Affiches et illustrations événementielles<br><br>➕ <strong>Depuis 2016</strong> : YouTube @SukiAMV — stratégie de contenu, VFX, communauté<br>➕ <strong>Depuis 2019</strong> : Instagram @abilan_motion — dessin et animation<br>➕ <strong>2021</strong> : développement de son portfolio web sur-mesure`
    },
    {
      keys: ['motion design','motion designer','animation','animé','clip','reel','davinci','premiere pro','after effect','2d','mascotte','vidéo animée','video animee'],
      answer: () => `Abilan crée du <strong>Motion Design</strong> depuis 2016 🎬<br>Cliquez ▶ pour regarder directement :`
        + YT_CAT.slice(0,3).map(v => ytCard(v.id, v.title, v.desc)).join('')
        + `<br><small style="color:rgba(168,197,226,.45);font-size:10px">Réalisées dans le cadre professionnel · After Effects · Premiere Pro</small>`
        + chips([['🎬 Voir toutes les vidéos','/#section-videos'],['▶ Chaîne YouTube','https://www.youtube.com/@sukiamv'],['🎨 Behance','https://www.behance.net/AbilanBalakumaran']])
    },
    {
      keys: ['youtube','yt','chaine','chaîne','suki','sukiamv','amv','tuto','tutoriel','abonné','abonne','vidéo youtube'],
      answer: () => `Sur <a href="https://www.youtube.com/@sukiamv" target="_blank"><strong>YouTube @sukiamv</strong></a>, Abilan publie depuis <strong>2016</strong> 🎬<br><br>Deux types de contenu :<br>🎌 <strong>AMV (Anime Music Videos)</strong> : montages créatifs sur des musiques<br>🎓 <strong>Tutoriels After Effects</strong> :<br>&nbsp;&nbsp;• Smooth Zoom In & Out Tutorial<br>&nbsp;&nbsp;• Smooth 3D Camera Movements with 2D Text<br>&nbsp;&nbsp;• Hardcore Twitch Shake Tutorial (sans plugin !)<br><br>Il gère tout de A à Z : SEO YouTube, miniatures, sound design, montage avancé et effets visuels. Allez vous abonner ! ✨`
    },
    {
      keys: ['compétence','logiciel','skill','maîtrise','technologie','capable','stack','illustrator','photoshop','sait faire','blender','sound design','figma','canva','anglais','wordpress','html','css','javascript','connaissance'],
      answer: () => `Ce qui rend Abilan rare, c'est qu'il maîtrise <strong>toute la chaîne créative et digitale</strong> en solo :<br><br>🎬 <strong>Motion & Vidéo</strong> : After Effects, Premiere Pro, DaVinci Resolve, Blender 3D, Adobe Audition<br>🎨 <strong>Design</strong> : Illustrator, Photoshop, InDesign, Figma, Canva<br>💻 <strong>Web & Dev</strong> : HTML, CSS, WordPress, Claude AI<br>📊 <strong>Marketing & Digital</strong> : Google Analytics ✅, Google Ads ✅, Prestashop ✅, SEO local, Google Business Profile<br>🤖 <strong>IA</strong> : génération de voix, extension d'images, automatisation créative<br>🌐 <strong>Langues</strong> : Français natif · Anglais B2<br><br>Du brief client jusqu'à la livraison : <strong>un seul interlocuteur, zéro dépendance externe</strong> 🎯` + skillVidHtml()
    },
    {
      keys: ['service','propose','offre','prestation','mission','commande','tarif','prix','devis','aider','comment abilan','logo','site web','graphisme','identité visuelle','identite visuelle','design graphique','seo','référencement','referencement','pub','publicité','publicite','communication','marque','brand','freelance','digital manager','tunnel','landing','vidéo','video','stratégie','strategie','community'],
      answer: () => `Abilan maîtrise <strong>tout le spectre du digital créatif</strong> pour faire grandir votre marque :<br><br>🎬 <strong>Motion Design & Vidéo animée</strong><br>Vidéos explicatives, publicités, tutos, intros, animations 2D/3D, sound design. Il gère tout : script, illustration, animation, voix IA, montage. Résultat : vos messages passent en quelques secondes là où du texte échoue.<br><br>🎨 <strong>Identité visuelle & Design graphique</strong><br>Logo, charte graphique, flyers, bannières, supports print et digitaux. Une image qui inspire confiance au premier regard et reste dans les mémoires.<br><br>📱 <strong>Stratégie digitale & Community Management</strong><br>Gestion des réseaux, création de contenu, SEO YouTube, Google Analytics & Ads (certifié). Il transforme votre visibilité en clients réels.<br><br>💻 <strong>Développement web & Applications mobiles</strong><br>Sites WordPress, apps mobiles sur mesure, UI/UX design. Ce portfolio que vous visitez ? Il l'a codé entièrement lui-même.<br><br>Expérimenté chez <strong>Cabinet d'Étude pour la Rénovation</strong>, <strong>WAAT</strong> et <strong>Clutch Rayn Production</strong> — du vrai terrain, de vrais livrables.<br>📩 Un projet ? Contactez-le, il répond vite ! 🚀`
        + chips([['🛠️ Voir les services','/#section-services'],['🎬 Voir les vidéos','/#section-videos'],['🖼️ Voir la galerie','/#section-galerie']])
        + skillVidHtml()
    },
    {
      keys: ['contact','email','mail','joindre','écrire','disponible','disponibilité','localisation','region','situe','île-de-france','linkedin','linktree'],
      answer: () => `${NOM} répond vite et est à l'écoute de chaque projet 🤝<br><br>📧 <a href="mailto:${EMAIL}"><strong>${EMAIL}</strong></a><br>🔗 <a href="${LINKTREE}" target="_blank"><strong>${LINKTREE.replace('https://','')}</strong></a> — tous ses liens en un<br>💼 <a href="${LINKEDIN}" target="_blank"><strong>LinkedIn</strong></a> — 1 123 abonnés<br><br>Il est <strong>${CV.localisation || 'mobile en Île-de-France'}</strong>, disponible en ${CV.disponibilite || 'alternance & freelance'}.<br><br>💡 <em>Un projet créatif ou digital en tête ? Écrivez-lui, il sera ravi d'en discuter !</em>`
    },
    {
      keys: ['réseau','instagram','behance','social','suivre','communauté','actif','créateur','publie','poste'],
      answer: () => {
        const icons = { 'instagram.com':'📸','youtube.com':'🎬','behance.net':'🎨','linkedin.com':'💼','mail.google.com':'📧','mailto':'📧' };
        const links = Array.from(document.querySelectorAll('.tp-social-btn'));
        let html = 'Retrouvez Abilan sur ses réseaux :<br><br>';
        if (links.length) {
          links.forEach(a => {
            const href = a.href || '';
            const label = (a.getAttribute('aria-label') || a.textContent || '').replace(/Abilan Balakumaran\s?/i,'').trim();
            const icon = Object.entries(icons).find(([k]) => href.includes(k));
            html += `${icon ? icon[1] : '🔗'} <a href="${href}" target="_blank"><strong>${label}</strong></a><br>`;
          });
        } else {
          html += `📸 <a href="https://www.instagram.com/abilan_motion/" target="_blank">Instagram @abilan_motion</a><br>🎬 <a href="https://www.youtube.com/@sukiamv" target="_blank">YouTube @sukiamv</a><br>🎨 <a href="https://www.behance.net/AbilanBalakumaran" target="_blank">Behance</a><br>`;
        }
        html += '<br>Abonnez-vous pour suivre ses créations ! ✨';
        return html;
      }
    },
    {
      keys: ['certification','google','analytics','ads','certifié','prestashop'],
      answer: () => `Abilan cumule les certifications qui prouvent son expertise 🏆<br><br>✅ <strong>Google Analytics</strong> (avr. 2026)<br>✅ <strong>Google Ads</strong> (avr. 2026)<br>✅ <strong>Prestashop</strong> — e-commerce<br><br>Pas juste un créatif : il comprend les chiffres, mesure les performances et ajuste la stratégie pour obtenir de vrais résultats business 📈`
    },
    {
      keys: ['lab','outil','gratuit','fonctionnalité','feature'],
      answer: () => `Le <strong>Lab</strong> met à disposition <strong>3 outils gratuits</strong> 🧪<br><br>🎙️ <strong>Transcription Audio</strong><br>Convertit vos fichiers audio et vidéo en texte. Compatible YouTube, TikTok, Instagram, Twitter/X. Export TXT, JSON ou SRT.<br><br>🖼️ <strong>Filigrane Remover</strong><br>Supprime automatiquement les filigranes (Canva, Shutterstock, Adobe Stock). Détection auto ou sélection manuelle.<br><br>✨ <strong>Image Extender</strong><br>Étend vos images avec l'IA en mode rapide ou réaliste. Idéal pour recadrer vos visuels sans perte de qualité.<br><br>Quel outil voulez-vous utiliser ?`
        + chips([['🎙️ Transcription','/abilanlab/transcription/'],['🖼️ Filigrane Remover','/abilanlab/filigrane-remover/'],['✨ Image Extender','/abilanlab/image-extender/']])
    },
    {
      keys: ['transcri','audio','whisper','sous-titre','srt','dicter','enregistrement','vocal'],
      answer: () => `Comment utiliser la <strong>Transcription Audio</strong> :<br><br>1️⃣ Choisissez <em>Fichier local</em> ou <em>URL vidéo</em><br>2️⃣ Paramétrez la vitesse, la langue et le nombre d'intervenants<br>3️⃣ Cliquez sur <em>"Lancer la transcription"</em><br>4️⃣ Exportez en TXT, JSON ou SRT<br><br>Compatible YouTube, Instagram, TikTok, Twitter/X. Formats : MP3, MP4, WAV, M4A 🚀`
        + chips([['🎙️ Ouvrir la Transcription','/abilanlab/transcription/'],['← Tous les outils','/abilanlab/']])
    },
    {
      keys: ['filigrane','watermark','supprimer','enlever','efface'],
      answer: () => `Comment utiliser le <strong>Filigrane Remover</strong> :<br><br>1️⃣ Importez votre image (PNG, JPG, WEBP)<br>2️⃣ Détection automatique ou sélection manuelle<br>3️⃣ L'IA supprime et reconstruit la zone ✨<br>4️⃣ Téléchargez le résultat<br><br>Optimisé pour Canva, Shutterstock et Adobe Stock. 100% gratuit 🔒`
        + chips([['🖼️ Ouvrir le Filigrane Remover','/abilanlab/filigrane-remover/'],['← Tous les outils','/abilanlab/']])
    },
    {
      keys: ['extend','étend','agrandir','outpaint','zoom out'],
      answer: () => `Comment utiliser l'<strong>Image Extender</strong> :<br><br>1️⃣ Importez votre image (PNG, JPG, WEBP)<br>2️⃣ Choisissez la direction d'extension<br>3️⃣ Mode rapide ou IA réaliste<br>4️⃣ Téléchargez l'image étendue<br><br>Parfait pour recadrer ou agrandir vos visuels ! 🖼️`
        + chips([['✨ Ouvrir l\'Image Extender','/abilanlab/image-extender/'],['← Tous les outils','/abilanlab/']])
    },
    {
      keys: ['installer','install','pwa','application','appli','écran d\'accueil','télécharger'],
      answer: () => `Vous pouvez installer ce site comme une <strong>vraie application</strong> ! 📱<br><br><strong>Sur iPhone (Safari) :</strong> Partager puis <em>"Sur l'écran d'accueil"</em><br><strong>Sur Android (Chrome) :</strong> 3 points puis <em>"Ajouter à l'écran d'accueil"</em><br><br>L'app se lance en plein écran avec splash screen et notifications pour vos transcriptions ✨`
    },
    {
      keys: ['projet','réalisation','portfolio','travaux','exemple','dernier','récent','behance','warren','vélo','tx coin','voir','montre','affiche','création','galerie','réalise','cree','construit'],
      answer: () => `Voici les projets d'Abilan :<br><br>📱 <strong>App Suivi de Chantier</strong> : dashboard mobile temps réel pour le BTP<br>🌐 <strong>etudereno.fr</strong> : site WordPress pour une entreprise de rénovation<br>🎬 <strong>Motion Design WAAT</strong> : vidéos pédagogiques à fort impact<br>🪙 <strong>Tx Coin</strong> : vidéo motion design sur Behance<br>🎨 <strong>+34 réalisations</strong> en motion, print et digital<br><br>Explorez directement :`
        + chips([['📱 Projets web & app','/#section-projets'],['🎬 Vidéos motion','/#section-videos'],['🖼️ Galerie complète','/#section-galerie'],['Behance','https://www.behance.net/AbilanBalakumaran']])
    },
    {
      keys: ['formation','étude','diplôme','école','fonderie','mastère','mba','upec','icademie','bachelor','dut','parcours','cursus','bac','efap'],
      answer: () => `Le parcours académique d'Abilan 🎓<br><br>⭐ <strong>MBA Digital Marketing & Business</strong> — EFAP Paris (2025–2026)<br><em>Manager du marketing et de la transformation digitale</em><br><br>🎨 <strong>Mastère Directeur de Création — Motion Design</strong> — Fonderie de l'Image (2023–2025)<br>&nbsp;&nbsp;→ Mention <strong>Félicitations du jury</strong> 🏅<br>&nbsp;&nbsp;→ Projet de fin d'études : campagne pour <strong>L'Enfant Bleu</strong><br><br>🖥️ <strong>Bachelor Graphiste Motion Designer</strong> — Icademie (2022–2023)<br>🌐 <strong>DUT Métiers du Multimédia et de l'Internet</strong> — IUT Sénart Fontainebleau (2020–2022)<br><br>De la technique créative jusqu'au management marketing : il parle aussi bien à un DA qu'à un directeur commercial 💡`
    },
    {
      keys: ['merci','super','parfait','génial','cool','top','excellent','impeccable','nickel','bravo','sympa'],
      answer: () => `Merci beaucoup, c'est très gentil ! 😊 Je transmettrai à Abilan. N'hésitez pas si vous avez d'autres questions, je suis là pour vous aider ! 🙌`
    }
  ];

  // Pool de suggestions — 4 affichées à la fois, rotatives via bouton 🔄
  const SUGG_POOL = [
    { label: '👤 Qui est Abilan ?',     trigger: 'qui est abilan' },
    { label: '🛠️ Ses services',         trigger: 'service propose' },
    { label: '💼 Son expérience',       trigger: 'expérience waat' },
    { label: '🎓 Sa formation',         trigger: 'formation diplôme' },
    { label: '🔧 Ses compétences',      trigger: 'compétence logiciel' },
    { label: '📧 Le contacter',         trigger: 'contact email' },
    { label: '⚙️ Les outils du Lab',    trigger: 'lab gratuit' },
    { label: '🌐 Ses réseaux',          trigger: 'réseau instagram' },
    { label: '📱 Installer l\'app',     trigger: 'installer pwa' },
  ];
  let _suggOffset = 0;

  function getAnswer(input) {
    const low = input.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    for (const entry of KB) {
      if (entry.keys.some(k => low.includes(k.normalize('NFD').replace(/[̀-ͯ]/g, '')))) {
        return entry.answer();
      }
    }
    return `Merci pour votre message ! 😊 Je n'ai pas la réponse exacte, mais Abilan sera ravi de vous répondre directement.<br><br>📧 <a href="mailto:${EMAIL}"><strong>${EMAIL}</strong></a><br><br>En attendant, une de ces questions peut peut-être vous aider 👇`;
  }

  /* ── CSS ───────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
/* reset global PWA : supprime le flash gris sur tous les éléments tactiles */
*{-webkit-tap-highlight-color:rgba(0,0,0,0)!important;}
/* bouton : div pur, zéro style navigateur */
#cb-btn{position:fixed;bottom:24px;right:24px;z-index:99990;width:68px;height:68px;border-radius:50%;cursor:pointer;animation:cbFloat 3s ease-in-out infinite;transition:transform .2s;-webkit-tap-highlight-color:rgba(0,0,0,0)!important;tap-highlight-color:rgba(0,0,0,0)!important;user-select:none;-webkit-user-select:none;outline:none!important;background:transparent!important;background-color:transparent!important;border:none!important;box-shadow:none!important;-webkit-appearance:none;appearance:none;overflow:visible;clip-path:circle(34px at center);-webkit-clip-path:circle(34px at center);}
#cb-btn::before,#cb-btn::after{display:none!important;content:none!important;}
#cb-btn img{width:68px;height:68px;object-fit:cover;border-radius:50%;display:block;pointer-events:none;filter:drop-shadow(0 4px 24px rgba(107,155,209,.55));background:transparent;outline:none;border:none;}
#cb-btn:hover{transform:scale(1.12) translateY(-4px);}
#cb-btn:focus,#cb-btn:active,#cb-btn:focus-visible{outline:none!important;background:transparent!important;box-shadow:none!important;}
/* bouton son sur les vidéos */
.cb-vid-wrap{position:relative;display:block;width:100%;margin-top:8px;}
.cb-vid-wrap video{width:100%;height:auto;object-fit:contain;border-radius:8px;display:block;pointer-events:none!important;}
.cb-snd-btn{position:absolute;bottom:7px;right:7px;width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,.65);border:1px solid rgba(255,255,255,.15);cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;z-index:10;transition:background .2s;-webkit-tap-highlight-color:transparent;pointer-events:all!important;padding:0;}
.cb-snd-btn svg{display:block;flex-shrink:0;}
.cb-snd-btn:hover{background:rgba(0,0,0,.9);}
/* dans la grille */
.cb-grid .cb-vid-wrap{margin-top:0;height:auto;}
.cb-grid .cb-vid-wrap video{max-height:180px;background:#000;}
/* YouTube cards */
.cb-yt-card{display:flex;flex-direction:column;gap:0;text-decoration:none;background:rgba(168,197,226,.05);border:1px solid rgba(168,197,226,.13);border-radius:10px;overflow:hidden;margin-top:7px;transition:background .2s;}
.cb-yt-card:hover{background:rgba(168,197,226,.1);}
.cb-yt-thumb{position:relative;width:100%;aspect-ratio:16/9;cursor:pointer;overflow:hidden;}
.cb-yt-thumb img{width:100%;height:100%;object-fit:cover;display:block;}
.cb-yt-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.35);transition:background .2s;}
.cb-yt-thumb:hover .cb-yt-play{background:rgba(0,0,0,.55);}
.cb-yt-play svg{filter:drop-shadow(0 2px 6px rgba(0,0,0,.6));}
.cb-yt-info{padding:7px 9px;display:flex;flex-direction:column;gap:3px;}
.cb-yt-title{font-family:'Sora',sans-serif;font-size:11.5px;font-weight:600;color:rgba(255,255,255,.9);line-height:1.3;}
.cb-yt-desc{font-family:'Sora',sans-serif;font-size:10px;color:rgba(168,197,226,.55);}
.cb-yt-ext{font-family:'Sora',sans-serif;font-size:10px;color:#a8c5e2;text-decoration:none;margin-top:2px;}
.cb-yt-ext:hover{color:#fff;}
.cb-yt-frame{width:100%;aspect-ratio:16/9;border:none;display:block;}
.cb-ring{position:fixed;bottom:24px;right:24px;z-index:99989;width:68px;height:68px;border-radius:50%;border:2px solid rgba(107,155,209,.35);pointer-events:none;animation:cbRing 2.2s ease-out infinite;}
.cb-ring2{animation-delay:.7s;}
#cb-dot{position:fixed;bottom:82px;right:20px;z-index:99991;width:13px;height:13px;background:#6ba68d;border-radius:50%;border:2px solid #0f1823;box-shadow:0 0 8px rgba(107,166,141,.8);animation:cbDotPulse 2.5s ease-in-out infinite;pointer-events:none;}
/* bulle de bienvenue */
#cb-bubble{position:fixed;bottom:102px;right:96px;z-index:99993;background:#0f1823;border:1px solid rgba(168,197,226,.2);border-radius:16px 16px 4px 16px;padding:11px 14px 11px 13px;max-width:210px;font-family:'Sora',sans-serif;font-size:12.5px;line-height:1.55;color:rgba(255,255,255,.9);box-shadow:0 8px 32px rgba(0,0,0,.55);display:flex;align-items:flex-start;gap:8px;cursor:pointer;animation:cbBubIn .4s cubic-bezier(.22,1,.36,1) both;}
#cb-bubble.cb-bubble-hide{animation:cbBubOut .3s ease forwards;}
#cb-bubble-x{background:none;border:none;color:rgba(168,197,226,.45);cursor:pointer;font-size:13px;padding:0;line-height:1;flex-shrink:0;margin-top:1px;}
#cb-bubble-x:hover{color:#fff;}
/* fenêtre chat */
#cb-win{position:fixed;bottom:106px;right:24px;z-index:99992;width:345px;height:520px;background:#0d1720;border:1px solid rgba(168,197,226,.14);border-radius:22px;box-shadow:0 24px 64px rgba(0,0,0,.65);display:flex;flex-direction:column;transform-origin:bottom right;overflow:hidden;}
#cb-win.cb-in{animation:cbIn .38s cubic-bezier(.22,1,.36,1) both;}
#cb-win.cb-out{animation:cbOut .28s cubic-bezier(.4,0,1,1) both;}
.cbh{display:flex;align-items:center;gap:10px;padding:13px 15px;background:rgba(168,197,226,.045);border-bottom:1px solid rgba(168,197,226,.09);}
.cbh-av{width:40px;height:40px;border-radius:50%;object-fit:cover;animation:cbFloat 3.5s ease-in-out infinite;filter:drop-shadow(0 2px 10px rgba(107,155,209,.45));}
.cbh-name{font-family:'Sora',sans-serif;font-size:14px;font-weight:700;color:#fff;line-height:1;}
.cbh-status{font-family:'JetBrains Mono',monospace;font-size:10px;color:#6ba68d;letter-spacing:.05em;margin-top:3px;}
.cbh-status::before{content:'● ';font-size:8px;}
.cbh-x{margin-left:auto;width:30px;height:30px;border:none;background:rgba(168,197,226,.07);border-radius:8px;cursor:pointer;color:rgba(168,197,226,.55);font-size:15px;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.cbh-x:hover{background:rgba(168,197,226,.14);color:#fff;}
#cb-msgs{height:285px;overflow-y:scroll;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-y;position:relative;padding:14px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin;scrollbar-color:rgba(90,123,166,.25) transparent;}
#cb-msgs::-webkit-scrollbar{width:3px;}
#cb-msgs::-webkit-scrollbar-thumb{background:rgba(90,123,166,.3);border-radius:3px;}
.cbm{display:flex;gap:8px;animation:cbMsg .3s cubic-bezier(.22,1,.36,1) both;}
.cbm.cbu{flex-direction:row-reverse;}
.cbm-av{width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0;margin-top:2px;}
.cbm-b{max-width:78%;padding:9px 13px;font-family:'Sora',sans-serif;font-size:12.5px;line-height:1.65;border-radius:16px;word-break:break-word;}
.cbm-b a{color:#a8c5e2;text-decoration:underline;}
.cbm.cbb .cbm-b{background:rgba(168,197,226,.07);border:1px solid rgba(168,197,226,.1);color:rgba(255,255,255,.9);border-radius:4px 16px 16px 16px;}
.cbm.cbu .cbm-b{background:linear-gradient(135deg,#2d4263,#3e5c7a);color:#fff;border-radius:16px 4px 16px 16px;}
#cb-typing{display:flex;gap:8px;align-items:center;}
.cbtd{display:flex;align-items:center;gap:5px;padding:11px 14px;background:rgba(168,197,226,.07);border:1px solid rgba(168,197,226,.1);border-radius:4px 16px 16px 16px;}
.cbdd{width:6px;height:6px;background:rgba(168,197,226,.5);border-radius:50%;animation:cbdd 1.2s ease-in-out infinite;}
.cbdd:nth-child(2){animation-delay:.2s;}
.cbdd:nth-child(3){animation-delay:.4s;}
#cb-sugg{padding:8px 10px;display:flex;flex-wrap:wrap;gap:5px;border-top:1px solid rgba(168,197,226,.07);}
.cbc{padding:5px 10px;background:rgba(168,197,226,.06);border:1px solid rgba(168,197,226,.13);border-radius:100px;font-family:'Sora',sans-serif;font-size:11px;color:rgba(168,197,226,.75);cursor:pointer;transition:all .2s;white-space:nowrap;}
.cbc:hover{background:rgba(90,123,166,.18);color:#fff;border-color:rgba(90,123,166,.35);}
#cb-bar{display:flex;gap:7px;padding:9px 11px;border-top:1px solid rgba(168,197,226,.07);}
#cb-inp{flex:1;padding:8px 12px;background:rgba(168,197,226,.055);border:1px solid rgba(168,197,226,.13);border-radius:10px;color:#fff;font-family:'Sora',sans-serif;font-size:12.5px;outline:none;transition:border-color .2s;}
#cb-inp::placeholder{color:rgba(168,197,226,.28);}
#cb-inp:focus{border-color:rgba(90,123,166,.4);}
#cb-go{width:36px;height:36px;border:none;background:linear-gradient(135deg,#2d4263,#5a7ba6);border-radius:10px;cursor:pointer;color:#fff;font-size:15px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .2s,box-shadow .2s;}
#cb-go:hover{transform:scale(1.06);box-shadow:0 4px 16px rgba(45,66,99,.45);}
/* ── Médias dans les bulles ── */
.cbm-b img{max-width:100%;border-radius:8px;margin-top:8px;display:block;cursor:pointer;height:auto;}
.cbm-b video{max-width:100%;width:100%;border-radius:8px;margin-top:8px;display:block;height:auto;object-fit:contain;cursor:pointer;}
.cb-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:8px;}
.cb-grid img{width:100%;height:85px;object-fit:cover;border-radius:7px;display:block;cursor:pointer;transition:transform .2s;}
.cb-grid video{width:100%;height:auto;max-height:180px;object-fit:contain;border-radius:7px;display:block;cursor:pointer;transition:transform .2s;background:#000;}
.cb-grid img:hover,.cb-grid video:hover{transform:scale(1.03);}
.cb-links{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px;}
.cb-chip-link{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;background:rgba(168,197,226,.07);border:1px solid rgba(168,197,226,.14);border-radius:100px;font-size:11px;color:#a8c5e2;text-decoration:none;transition:background .2s;white-space:nowrap;}
.cb-chip-link:hover{background:rgba(90,123,166,.2);color:#fff;}
/* Lightbox */
#cb-lb{position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;cursor:zoom-out;animation:cbIn .2s ease;}
#cb-lb img,#cb-lb video{max-width:90vw;max-height:85vh;border-radius:12px;object-fit:contain;}
@keyframes cbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes cbRing{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.9);opacity:0}}
@keyframes cbDotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.45);opacity:.65}}
@keyframes cbIn{from{opacity:0;transform:scale(.82) translateY(22px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes cbOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.82) translateY(22px)}}
@keyframes cbMsg{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes cbdd{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
@keyframes cbBubIn{from{opacity:0;transform:translateY(10px) scale(.9)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes cbBubOut{to{opacity:0;transform:translateY(6px) scale(.95)}}
.cb-sugg-rot{padding:5px 8px;font-size:13px;flex-shrink:0;}
#cb-fs{display:none;width:30px;height:30px;border:none;background:rgba(168,197,226,.07);border-radius:8px;cursor:pointer;color:rgba(168,197,226,.55);font-size:15px;align-items:center;justify-content:center;transition:all .2s;margin-left:4px;flex-shrink:0;}
#cb-fs:hover{background:rgba(168,197,226,.14);color:#fff;}
@media(max-width:768px){#cb-fs{display:flex;}}
#cb-win.cb-fullscreen{bottom:0!important;right:0!important;left:0!important;top:0!important;width:100vw!important;height:100vh!important;height:100dvh!important;border-radius:0!important;max-width:none!important;z-index:999995!important;}
#cb-win.cb-fullscreen #cb-msgs{height:calc(100dvh - 195px)!important;}
#cb-win.cb-fullscreen #cb-fs{display:flex!important;background:rgba(255,100,100,.13);color:rgba(255,180,180,.8);}
@media(max-width:400px){#cb-win{width:calc(100vw - 16px);right:8px;bottom:96px;}#cb-bubble{right:84px;max-width:180px;}}
`;
  document.head.appendChild(css);

  /* ── DOM ───────────────────────────────────────── */
  ['cb-ring','cb-ring cb-ring2'].forEach(c => {
    const r = document.createElement('div'); r.className = c;
    document.body.appendChild(r);
  });

  const dot = document.createElement('div');
  dot.id = 'cb-dot';
  document.body.appendChild(dot);

  // div au lieu de button = zéro style navigateur, zéro carré
  const btn = document.createElement('div');
  btn.id = 'cb-btn';
  btn.setAttribute('role', 'button');
  btn.setAttribute('tabindex', '0');
  btn.setAttribute('aria-label', 'Ouvrir le chat Akino');
  btn.innerHTML = `<img src="${AVATAR}" alt="Akino">`;
  document.body.appendChild(btn);

  function hideBubble() {}

  const win = document.createElement('div');
  win.id = 'cb-win';
  win.style.display = 'none';
  win.innerHTML = `
<div class="cbh">
  <img class="cbh-av" src="${AVATAR}" alt="Assistant">
  <div>
    <div class="cbh-name">Akino</div>
    <div class="cbh-status">En ligne</div>
  </div>
  <button id="cb-fs" title="Plein écran">⤢</button>
  <button class="cbh-x" id="cb-x">✕</button>
</div>
<div id="cb-msgs"></div>
<div id="cb-sugg"></div>
<div id="cb-bar">
  <input id="cb-inp" type="text" placeholder="Écrivez votre message…" autocomplete="off">
  <button id="cb-go">➤</button>
</div>`;
  document.body.appendChild(win);

  /* ── Helpers ───────────────────────────────────── */
  /* ── Scanner de page ─────────────────────────────
     Collecte tous les liens et images présents sur la page. */
  let _pageLinks = [], _pageImages = [];

  function scanPage() {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('javascript')) return;
      const label = (a.getAttribute('aria-label') || a.textContent || '').trim().replace(/\s+/g,' ');
      if (label.length > 1 && label.length < 80) _pageLinks.push({ href: a.href, label });
    });
    document.querySelectorAll('img[src]').forEach(img => {
      const src = img.src;
      if (!src || src.includes('data:') || src.includes('fiole.png') || src.includes('chatbot')) return;
      _pageImages.push({ src, alt: (img.alt || '').trim() });
    });
    _pageLinks  = [...new Map(_pageLinks.map(x  => [x.href, x])).values()];
    _pageImages = [...new Map(_pageImages.map(x => [x.src,  x])).values()];
  }

  // Lightbox
  function openLightbox(src, isVideo) {
    const lb = document.createElement('div'); lb.id = 'cb-lb';
    lb.innerHTML = isVideo
      ? `<video src="${src}" autoplay controls style="max-width:90vw;max-height:85vh;border-radius:12px"></video>`
      : `<img src="${src}" style="max-width:90vw;max-height:85vh;border-radius:12px">`;
    lb.onclick = () => lb.remove();
    document.body.appendChild(lb);
  }

  // ── Vidéo auto à la première réponse compétences ───
  const SKILL_VIDS = [
    '/images/motion/Coding%20animation.mp4',
    '/images/motion/Hey%20Alexa.mp4',
    '/images/motion/basketball%20match.mp4',
    '/images/motion/MascotteAnimation2d.mp4',
    '/images/motion/can\'t%20see.mp4',
    '/images/motion/radio_1.mp4',
  ];
  let _skillVidCount = 0; // 1 réponse sur 3 affiche une vidéo

  function skillVidHtml() {
    _skillVidCount++;
    if (_skillVidCount % 3 !== 1) return ''; // affiche sur la 1re, 4e, 7e...
    const src = SKILL_VIDS[Math.floor(Math.random() * SKILL_VIDS.length)];
    return `<br><small style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(168,197,226,.4);letter-spacing:.05em">▶ Une création d'Abilan</small>`
      + vid(src)
      + chips([['🎬 Voir toutes les créations','/#section-videos'],['🖼️ Galerie complète','/#section-galerie']]);
  }

  // ── Icônes SVG son (définies avant vid() pour éviter la TDZ) ──
  const ICO_MUTE = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M17 7l-1.4 1.4 2.1 2.1-2.1 2.1L17 14l2.1-2.1 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1L21.1 7 19 9.1 17 7z"/></svg>`;
  const ICO_SOUND = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1-3.29-2.5-4.03v8.05c1.5-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;

  // ── Catalogue YouTube — vidéos carrousel du portfolio ──
  const YT_CAT = [
    { id: '-O1Cyivoj_Y', title: 'Animation pédagogique WAAT',        desc: 'Vidéo explicative produit · After Effects · WAAT' },
    { id: 'SsdlF6K7aWY', title: 'Motion Design produit WAAT',        desc: 'Format promotionnel · animation 2D · WAAT' },
    { id: 'fqwBNsTpmFs', title: 'Animation corporate',               desc: 'Vidéo institutionnelle · motion design · portfolio' },
    { id: 'X0uaPlkVRUE', title: 'Animation 2D After Effects',        desc: 'Création motion design · effets visuels' },
    { id: 'p7obnS5C9Z8', title: 'Tutoriel After Effects',            desc: 'YouTube @sukiamv · tutoriel motion design' },
    { id: 'WzHgnUweD-4', title: 'Motion Design créatif',             desc: 'Création personnelle · After Effects' },
    { id: 'X5qPfGG_SIU', title: 'Animation typographique',           desc: 'Motion design · typographie animée' },
    { id: 'mg5f_VOLVgU', title: 'Smooth transition After Effects',   desc: 'Tutoriel · YouTube @sukiamv' },
  ];

  // YouTube card — thumbnail cliquable → iframe lecture dans le chat
  function ytCard(id, title, desc) {
    const thumb = `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
    const cid = 'cbyt_' + id.replace(/[^a-zA-Z0-9]/g,'');
    return `<div class="cb-yt-card" id="${cid}">
      <div class="cb-yt-thumb" onclick="window._cbYtPlay('${cid}','${id}')">
        <img src="${thumb}" alt="${title}" loading="lazy">
        <div class="cb-yt-play"><svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="rgba(255,0,0,.85)"/><polygon points="14,11 28,18 14,25" fill="white"/></svg></div>
      </div>
      <div class="cb-yt-info">
        <span class="cb-yt-title">${title}</span>
        <span class="cb-yt-desc">${desc}</span>
        <a href="https://www.youtube.com/watch?v=${id}" target="_blank" class="cb-yt-ext">↗ Ouvrir sur YouTube</a>
      </div>
    </div>`;
  }

  // Helpers HTML médias
  // Vidéo locale avec bouton son en overlay — muette par défaut
  function vid(src, t='') {
    const id = 'cbv' + Math.random().toString(36).slice(2,7);
    return `<div class="cb-vid-wrap"><video id="${id}" src="${src}" title="${t}" autoplay loop muted playsinline webkit-playsinline disablePictureInPicture controlsList="nofullscreen nodownload noremoteplayback"></video><button class="cb-snd-btn" onclick="window._cbSnd(this,'${id}')" title="Activer le son">${ICO_MUTE}</button></div>`;
  }
  const imgt = (src, a='') => `<img src="${src}" alt="${a}" loading="lazy">`;
  const grid = items => `<div class="cb-grid">${items.join('')}</div>`;
  const chips = links => `<div class="cb-links">${links.map(([l,h])=>`<a href="${h}" target="_blank" class="cb-chip-link">${l}</a>`).join('')}</div>`;

  const msgs = () => document.getElementById('cb-msgs');
  const inp  = () => document.getElementById('cb-inp');

  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function scroll() { const m = msgs(); m.scrollTop = m.scrollHeight; }

  /* ── Historique persistant (localStorage) ─── */
  const HIST_KEY = 'akino_history';
  const HIST_MAX = 60;

  const HIST_TTL = 5 * 60 * 1000; // 5 minutes

  function saveMsg(html, role) {
    try {
      const h = JSON.parse(localStorage.getItem(HIST_KEY) || '[]');
      h.push({ html, role, ts: Date.now() });
      if (h.length > HIST_MAX) h.splice(0, h.length - HIST_MAX);
      localStorage.setItem(HIST_KEY, JSON.stringify(h));
    } catch(e) {}
  }

  function loadHistory() {
    try {
      const h = JSON.parse(localStorage.getItem(HIST_KEY) || '[]');
      if (!h.length) return false;
      const last = h[h.length - 1];
      if (Date.now() - (last.ts || 0) > HIST_TTL) {
        localStorage.removeItem(HIST_KEY);
        return false;
      }
      h.forEach(({ html, role }) => addMsg(html, role, true));
      return true;
    } catch(e) { return false; }
  }

  function addMsg(html, role, noSave) {
    const d = document.createElement('div');
    d.className = `cbm cb${role}`;
    d.innerHTML = role === 'b'
      ? `<img class="cbm-av" src="${AVATAR}" alt="Bot"><div class="cbm-b">${html}</div>`
      : `<div class="cbm-b">${html}</div>`;
    msgs().appendChild(d);
    scroll();
    if (!noSave) saveMsg(html, role);
  }

  function showTyping() {
    const d = document.createElement('div');
    d.id = 'cb-typing';
    d.innerHTML = `<img class="cbm-av" src="${AVATAR}" alt="">
      <div class="cbtd"><span class="cbdd"></span><span class="cbdd"></span><span class="cbdd"></span></div>`;
    msgs().appendChild(d);
    scroll();
  }

  function hideTyping() { const t = document.getElementById('cb-typing'); if (t) t.remove(); }

  function renderSugg() {
    const s = document.getElementById('cb-sugg');
    s.innerHTML = '';
    // bouton rotatif 🔄
    const rot = document.createElement('button');
    rot.className = 'cbc cb-sugg-rot';
    rot.title = 'Autres suggestions';
    rot.innerHTML = '🔄';
    rot.onclick = () => { _suggOffset = (_suggOffset + 4) % SUGG_POOL.length; renderSugg(); };
    s.appendChild(rot);
    // 4 suggestions à partir de l'offset courant
    for (let i = 0; i < 4; i++) {
      const sg = SUGG_POOL[(_suggOffset + i) % SUGG_POOL.length];
      const b = document.createElement('button');
      b.className = 'cbc';
      b.textContent = sg.label;
      b.onclick = () => { addMsg(esc(sg.label), 'u'); botReply(getAnswer(sg.trigger)); };
      s.appendChild(b);
    }
  }

  function botReply(html) {
    showTyping();
    setTimeout(() => { hideTyping(); addMsg(html, 'b'); }, 700 + Math.random() * 350);
  }

  function send() {
    const v = inp().value.trim();
    if (!v || /^[-—–.…,;:!?]+$/.test(v)) return;
    muteAllVideos();
    addMsg(esc(v), 'u');
    inp().value = '';
    botReply(getAnswer(v));
  }

  /* ── Open / Close ──────────────────────────────── */
  let open = false, greeted = false;

  function openChat() {
    open = true;
    hideBubble();
    win.style.display = 'flex';
    win.classList.remove('cb-out');
    win.classList.add('cb-in');
    renderSugg();
    if (!greeted) {
      greeted = true;
      const hasHistory = loadHistory();
      if (!hasHistory) {
        setTimeout(() => addMsg(`Bonjour ! 👋 Bienvenue sur le portfolio d'<strong>Abilan Balakumaran</strong>.<br>Je suis son assistant : je peux vous parler de son profil, ses services, ses outils ou vous aider à le contacter. Comment puis-je vous aider ? 😊`, 'b'), 350);
      }
    }
    initScroll();
    setTimeout(() => inp().focus(), 400);
  }

  function closeChat() {
    open = false;
    _skillVidCount = 0;
    muteAllVideos();
    win.classList.remove('cb-in');
    win.classList.add('cb-out');
    setTimeout(() => { win.style.display = 'none'; }, 270);
  }

  // ── Scroll fix iOS/PWA — scroll JS manuel ──────────
  // preventDefault sur tout le chat + scroll msgs piloté à la main
  // C'est la seule technique qui fonctionne sur iOS position:fixed
  let _tz = null, _ty = 0, _ts = 0;

  document.addEventListener('touchstart', e => {
    if (!open) return;
    const m = document.getElementById('cb-msgs');
    _tz = e.target.closest('#cb-msgs') ? 'msgs'
        : e.target.closest('#cb-win')  ? 'win' : null;
    if (_tz === 'msgs' && m) { _ty = e.touches[0].clientY; _ts = m.scrollTop; }
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (!_tz) return;
    e.preventDefault(); // Bloque la page dans tous les cas
    if (_tz === 'msgs') {
      const m = document.getElementById('cb-msgs');
      if (m) m.scrollTop = _ts - (e.touches[0].clientY - _ty);
    }
  }, { passive: false });

  document.addEventListener('touchend', () => { _tz = null; }, { passive: true });

  function initScroll() {
    const m = document.getElementById('cb-msgs');
    if (!m || m._cbScroll) return;
    m._cbScroll = true;
    m.addEventListener('wheel', () => muteAllVideos(), { passive: true });
    m.addEventListener('touchmove', () => muteAllVideos(), { passive: true });
  }

  // Scanner la page au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanPage);
  } else {
    scanPage();
  }

  // Mute toutes les vidéos du chat + reset icônes
  function muteAllVideos() {
    document.querySelectorAll('#cb-msgs video').forEach(v => { v.muted = true; });
    document.querySelectorAll('.cb-snd-btn').forEach(b => { b.innerHTML = ICO_MUTE; b.title = 'Activer le son'; });
  }

  // Gestion son : 1 seule vidéo avec son à la fois
  // Lecture YouTube dans le chat — remplace la thumbnail par iframe
  window._cbYtPlay = function(cardId, ytId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    muteAllVideos();
    const thumb = card.querySelector('.cb-yt-thumb');
    if (thumb) thumb.outerHTML = `<iframe class="cb-yt-frame" src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0" allow="autoplay;encrypted-media" allowfullscreen></iframe>`;
  };

  window._cbSnd = function(btn, id) {
    const target = document.getElementById(id);
    if (!target) return;
    const unmuting = target.muted;
    muteAllVideos();
    if (unmuting) {
      target.muted = false;
      btn.innerHTML = ICO_SOUND;
      btn.title = 'Couper le son';
    }
  };

  btn.onclick = () => open ? closeChat() : openChat();
  btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') btn.onclick(); });
  document.getElementById('cb-x').onclick = closeChat;
  document.getElementById('cb-go').onclick = send;
  win.querySelector('#cb-inp').addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

  // Bouton fullscreen mobile
  let _fs = false;
  const fsBtn = document.getElementById('cb-fs');
  function setFs(on) {
    _fs = on;
    win.classList.toggle('cb-fullscreen', _fs);
    fsBtn.innerHTML = _fs ? '⤡' : '⤢';
    fsBtn.title = _fs ? 'Réduire' : 'Plein écran';
    scroll();
  }
  fsBtn.onclick = () => setFs(!_fs);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && _fs) setFs(false); });

})();

