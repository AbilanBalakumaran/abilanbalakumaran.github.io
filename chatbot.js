/* ═══════════════════════════════════════════════════
   Akino : Chatbot Assistant
   Commercial virtuel d'Abilan Balakumaran
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const AVATAR = '/images/chatbot-avatar.png';

  /* ── Base de connaissances ─────────────────────── */
  const KB = [
    {
      keys: ['bonjour','salut','hello','coucou','bonsoir','hey','hi'],
      answer: () => `Bonjour ! 👋 Bienvenue !<br><br>Je suis <strong>Akino</strong>, l'assistant d'<strong>Abilan Balakumaran</strong> — Digital Manager & Motion Designer.<br><br>Que vous cherchiez à booster votre image de marque, créer des vidéos percutantes ou développer votre présence en ligne, vous êtes au bon endroit 🎯<br><br>Comment puis-je vous aider ?`
    },
    {
      keys: ['qui est','c\'est qui','parle moi','tell me','about','profil','présentation','présente'],
      answer: () => `<strong>Abilan Balakumaran</strong> est le profil rare qui combine <strong>créativité visuelle</strong> et <strong>stratégie digitale</strong> 🚀<br><br>✅ <strong>Motion Designer certifié</strong> (Mastère avec félicitations du jury)<br>✅ <strong>En MBA Digital Marketing</strong> pour comprendre vos enjeux business<br>✅ <strong>2 ans d'alternance chez WAAT</strong> : vidéos qui ont généré des dizaines de réactions et amélioré la communication interne d'une vraie entreprise<br>✅ <strong>Certifié Google Analytics & Ads</strong><br><br>Sa philosophie : <em>"Votre visibilité en ligne est votre meilleur commercial."</em><br>Ce n'est pas qu'un slogan, c'est ce qu'il prouve chaque jour avec ses clients 💡`
    },
    {
      keys: ['expérience','poste','entreprise','emploi','waat','alternance','travaillé','travaille','carrière','cabinet','rénovation'],
      answer: () => `Abilan a prouvé ses compétences en entreprise :<br><br>🏢 <strong>Chef de projet digital</strong> — Cabinet d'Étude pour la Rénovation<br>→ En poste depuis sept. 2025, il pilote la stratégie digitale d'une entreprise BTP<br><br>🏢 <strong>Graphiste / Motion Designer</strong> — WAAT (solutions de recharge VE)<br>→ 1 an 10 mois : vidéos pédagogiques vues par des milliers de personnes, animation de mascotte 2D/3D, sound design, charte graphique, contenus multi-réseaux<br><br>🎬 <strong>Motion Designer</strong> — Clutch Rayn Production<br>→ Intros Twitch, vidéos esport, affiches événementielles<br><br>Pas que de la théorie : du <strong>vrai terrain</strong>, de vrais clients, de vrais résultats 💪`
    },
    {
      keys: ['motion design','motion designer','animation','animé','clip','reel','davinci','premiere pro','after effect','2d','mascotte'],
      answer: () => `Abilan est spécialisé en <strong>Motion Design</strong> depuis 2016 🎬<br><br>Quelques créations directement depuis son portfolio :`
        + grid([
            vid('/images/motion/Coding%20animation.mp4','Coding Animation'),
            vid('/images/motion/Hey%20Alexa.mp4','Hey Alexa'),
            vid('/images/motion/basketball%20match.mp4','Basketball Match'),
            vid('/images/motion/MascotteAnimation2d.mp4','Mascotte 2D'),
          ])
        + `<br>Vidéos pédagogiques chez WAAT (recrutement, recharge copropriété), rigging & lip-syncing de mascotte 2D/3D.<br><br>`
        + chips([['YouTube @sukiamv','https://www.youtube.com/@sukiamv'],['Behance','https://www.behance.net/AbilanBalakumaran']])
    },
    {
      keys: ['youtube','yt','chaine','chaîne','suki','sukiamv','amv','tuto','tutoriel','abonné','abonne','vidéo youtube'],
      answer: () => `Sur <a href="https://www.youtube.com/@sukiamv" target="_blank"><strong>YouTube @sukiamv</strong></a>, Abilan publie depuis <strong>2016</strong> 🎬<br><br>Deux types de contenu :<br>🎌 <strong>AMV (Anime Music Videos)</strong> : montages créatifs sur des musiques<br>🎓 <strong>Tutoriels After Effects</strong> :<br>&nbsp;&nbsp;• Smooth Zoom In & Out Tutorial<br>&nbsp;&nbsp;• Smooth 3D Camera Movements with 2D Text<br>&nbsp;&nbsp;• Hardcore Twitch Shake Tutorial (sans plugin !)<br><br>Il gère tout de A à Z : SEO YouTube, miniatures, sound design, montage avancé et effets visuels. Allez vous abonner ! ✨`
    },
    {
      keys: ['compétence','logiciel','skill','maîtrise','technologie','capable','stack','illustrator','photoshop','sait faire','blender','sound design'],
      answer: () => `Ce qui rend Abilan rare, c'est qu'il maîtrise <strong>toute la chaîne de création</strong> sans avoir besoin d'une équipe :<br><br>🎬 <strong>Motion & Vidéo</strong> : After Effects, Premiere Pro, DaVinci Resolve, Blender 3D<br>🎨 <strong>Design</strong> : Illustrator, Photoshop, InDesign — logo, charte, print, digital<br>🔊 <strong>Sound Design</strong> : Adobe Audition — musiques, voix IA, habillage sonore<br>💻 <strong>Développement</strong> : HTML, CSS, JavaScript, PHP, WordPress, UI/UX<br>📊 <strong>Marketing digital</strong> : Google Analytics ✅, Google Ads ✅, SEO YouTube, Community Management<br>🤖 <strong>Intelligence Artificielle</strong> : génération de voix, extension d'images, automatisation créative<br><br>Du brief client jusqu'à la livraison finale, il gère tout. C'est un <strong>couteau suisse du digital</strong> 🎯`
    },
    {
      keys: ['service','propose','offre','prestation','travail','mission','commande','tarif','prix','devis','aide','comment abilan','aider'],
      answer: () => `Abilan maîtrise <strong>tout le spectre du digital créatif</strong> pour faire grandir votre marque :<br><br>🎬 <strong>Motion Design & Vidéo animée</strong><br>Vidéos explicatives, publicités, tutos, intros, animations 2D/3D, sound design. Il gère tout : script, illustration, animation, voix IA, montage. Résultat : vos messages passent en quelques secondes là où du texte échoue.<br><br>🎨 <strong>Identité visuelle & Design graphique</strong><br>Logo, charte graphique, flyers, bannières, supports print et digitaux. Une image qui inspire confiance au premier regard et reste dans les mémoires.<br><br>📱 <strong>Stratégie digitale & Community Management</strong><br>Gestion des réseaux, création de contenu, SEO YouTube, Google Analytics & Ads (certifié). Il transforme votre visibilité en clients réels.<br><br>💻 <strong>Développement web & Applications mobiles</strong><br>Sites WordPress, apps mobiles sur mesure, UI/UX design. Ce portfolio que vous visitez ? Il l'a codé entièrement lui-même.<br><br>📩 Un projet ? Contactez-le, il répond vite ! 🚀`
    },
    {
      keys: ['contact','email','mail','joindre','écrire','disponible','disponibilité','localisation','region','situe','île-de-france','linkedin'],
      answer: () => `Abilan répond vite et est à l'écoute de chaque projet 🤝<br><br>📧 <a href="mailto:Abilan.Balakumaran@gmail.com"><strong>Abilan.Balakumaran@gmail.com</strong></a><br>💼 <a href="https://www.linkedin.com/in/abilan-balakumaran/" target="_blank"><strong>LinkedIn</strong></a> — 1 123 abonnés<br><br>Il est <strong>mobile en Île-de-France</strong> et disponible pour des missions freelance ou des collaborations.<br><br>💡 <em>Pas de question trop petite : si vous avez un projet créatif ou digital en tête, c'est exactement pour ça qu'il est là !</em>`
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
      keys: ['certification','google','analytics','ads','certifié'],
      answer: () => `Abilan est certifié par Google 🏆<br><br>✅ <strong>Google Analytics Certification</strong> (avril 2026)<br>✅ <strong>Google Ads Certification</strong> (avril 2026)<br><br>Ces certifications complètent son profil créatif avec une vraie expertise en performance digitale et mesure des résultats.`
    },
    {
      keys: ['lab','outil','gratuit','fonctionnalité','feature'],
      answer: () => `<strong>Abilan Lab</strong> est son terrain d'expérimentation 🧪<br><br>Sa philosophie : <em>"Je construis d'abord pour moi. Quand un outil me fait gagner du temps, je le publie."</em><br><br>3 outils gratuits disponibles :<br>🎙️ <a href="/abilanlab/transcription/"><strong>Transcription Audio</strong></a> : audio et vidéo en texte<br>🖼️ <a href="/abilanlab/filigrane-remover/"><strong>Filigrane Remover</strong></a> : supprime les filigranes (Canva, Shutterstock...)<br>✨ <a href="/abilanlab/image-extender/"><strong>Image Extender</strong></a> : étend vos images avec l'IA<br><br>Voulez-vous que je vous explique l'un d'eux ?`
    },
    {
      keys: ['transcri','audio','whisper','sous-titre','srt','dicter','enregistrement','vocal'],
      answer: () => `Comment utiliser la <strong>Transcription Audio</strong> :<br><br>1️⃣ Choisissez <em>Fichier local</em> ou <em>URL vidéo</em><br>2️⃣ Paramétrez la vitesse, la langue et le nombre d'intervenants<br>3️⃣ Cliquez sur <em>"Lancer la transcription"</em><br>4️⃣ Exportez en TXT, JSON ou SRT<br><br>Compatible YouTube, Instagram, TikTok, Twitter/X. Formats : MP3, MP4, WAV, M4A 🚀`
    },
    {
      keys: ['filigrane','watermark','supprimer','enlever','efface'],
      answer: () => `Comment utiliser le <strong>Filigrane Remover</strong> :<br><br>1️⃣ Importez votre image (PNG, JPG, WEBP)<br>2️⃣ Détection automatique ou sélection manuelle<br>3️⃣ L'IA supprime et reconstruit la zone ✨<br>4️⃣ Téléchargez le résultat<br><br>Optimisé pour Canva, Shutterstock et Adobe Stock. 100% gratuit 🔒`
    },
    {
      keys: ['extend','étend','agrandir','outpaint','zoom out'],
      answer: () => `Comment utiliser l'<strong>Image Extender</strong> :<br><br>1️⃣ Importez votre image (PNG, JPG, WEBP)<br>2️⃣ Choisissez la direction d'extension<br>3️⃣ Mode rapide ou IA réaliste<br>4️⃣ Téléchargez l'image étendue<br><br>Parfait pour recadrer ou agrandir vos visuels ! 🖼️`
    },
    {
      keys: ['installer','install','pwa','application','appli','écran d\'accueil','télécharger'],
      answer: () => `Vous pouvez installer ce site comme une <strong>vraie application</strong> ! 📱<br><br><strong>Sur iPhone (Safari) :</strong> Partager puis <em>"Sur l'écran d'accueil"</em><br><strong>Sur Android (Chrome) :</strong> 3 points puis <em>"Ajouter à l'écran d'accueil"</em><br><br>L'app se lance en plein écran avec splash screen et notifications pour vos transcriptions ✨`
    },
    {
      keys: ['projet','réalisation','portfolio','travaux','exemple','dernier','récent','behance','warren','vélo','tx coin','voir','montre','affiche'],
      answer: () => `Voici quelques projets d'Abilan :`
        + grid([
            imgt('/images/website/etudereno-fr.png','etudereno.fr'),
            imgt('/images/website/app/application-suivi-de-chantier-dashboardtestnew.png','App Suivi Chantier'),
          ])
        + `<br>📱 <strong>App Suivi de Chantier</strong> : dashboard BTP temps réel<br>🌐 <strong>etudereno.fr</strong> : site WordPress entreprise de rénovation<br>🎬 <strong>Motion Design WAAT</strong> : vidéos pédagogiques internes<br>+34 réalisations au total !<br><br>`
        + chips([['Portfolio complet','https://abilanbalakumaran.github.io/'],['Behance','https://www.behance.net/AbilanBalakumaran']])
    },
    {
      keys: ['formation','étude','diplôme','école','fonderie','mastère','mba','upec','icademie','bachelor','dut','parcours','cursus','bac'],
      answer: () => `Le parcours académique complet d'Abilan :<br><br>🎓 <strong>MBA Digital Marketing & Business</strong> (oct. 2025 – sept. 2026)<br>🎨 <strong>Mastère Directeur de Création – Motion Design</strong>, Fonderie de l'Image (2023–2025)<br>&nbsp;&nbsp;→ Mention <strong>Félicitations du jury</strong> 🏅<br>&nbsp;&nbsp;→ Projet de fin d'études : campagne de sensibilisation pour <strong>L'Enfant Bleu</strong> contre la maltraitance des enfants<br>🖥️ <strong>Bachelor Graphiste Motion Designer</strong>, Icademie (2022–2023)<br>&nbsp;&nbsp;→ Animation 2D, 3D, sound design, VFX, compositing<br>🌐 <strong>DUT Métiers du Multimédia et de l'Internet</strong>, UPEC (2020–2022)<br>&nbsp;&nbsp;→ Web, audiovisuel, graphisme, développement (HTML/CSS/JS/PHP)<br>📚 <strong>Bac STIDD</strong> – Innovation Technologique, Lycée Edouard Branly`
    },
    {
      keys: ['merci','super','parfait','génial','cool','top','excellent','impeccable','nickel','bravo','sympa'],
      answer: () => `Merci beaucoup, c'est très gentil ! 😊 Je transmettrai à Abilan. N'hésitez pas si vous avez d'autres questions, je suis là pour vous aider ! 🙌`
    }
  ];

  const SUGGESTIONS = [
    { label: '👤 Qui est Abilan ?',    key: 1 },
    { label: '🛠️ Ses services',        key: 3 },
    { label: '📧 Le contacter',        key: 4 },
    { label: '⚙️ Les outils du Lab',   key: 6 },
    { label: '📱 Installer l\'app',    key: 10 },
    { label: '🌐 Ses réseaux',         key: 5 },
  ];

  function getAnswer(input) {
    const low = input.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    for (const entry of KB) {
      if (entry.keys.some(k => low.includes(k.normalize('NFD').replace(/[̀-ͯ]/g, '')))) {
        return entry.answer();
      }
    }
    return `Merci pour votre message ! 😊 Je n'ai pas la réponse exacte, mais Abilan sera ravi de vous répondre directement.<br><br>📧 <a href="mailto:Abilan.Balakumaran@gmail.com"><strong>Abilan.Balakumaran@gmail.com</strong></a><br><br>En attendant, une de ces questions peut peut-être vous aider 👇`;
  }

  /* ── CSS ───────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
/* bouton : div pur, zéro style navigateur */
#cb-btn{position:fixed;bottom:24px;right:24px;z-index:99990;width:68px;height:68px;border-radius:50%;cursor:pointer;animation:cbFloat 3s ease-in-out infinite;transition:transform .2s;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;}
#cb-btn:hover{transform:scale(1.12) translateY(-4px);}
#cb-btn img{width:68px;height:68px;object-fit:cover;border-radius:50%;display:block;pointer-events:none;filter:drop-shadow(0 4px 24px rgba(107,155,209,.55));}
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
.cbm-b img{max-width:100%;border-radius:8px;margin-top:8px;display:block;cursor:pointer;}
.cbm-b video{max-width:100%;border-radius:8px;margin-top:8px;display:block;max-height:150px;object-fit:cover;cursor:pointer;}
.cb-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:8px;}
.cb-grid img,.cb-grid video{width:100%;height:85px;object-fit:cover;border-radius:7px;display:block;cursor:pointer;transition:transform .2s;}
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

  // Helpers HTML médias
  const vid  = (src, t='') => `<video src="${src}" title="${t}" autoplay loop muted playsinline></video>`;
  const imgt = (src, a='') => `<img src="${src}" alt="${a}" loading="lazy">`;
  const grid = items => `<div class="cb-grid">${items.join('')}</div>`;
  const chips = links => `<div class="cb-links">${links.map(([l,h])=>`<a href="${h}" target="_blank" class="cb-chip-link">${l}</a>`).join('')}</div>`;

  const msgs = () => document.getElementById('cb-msgs');
  const inp  = () => document.getElementById('cb-inp');

  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function scroll() { const m = msgs(); m.scrollTop = m.scrollHeight; }

  function addMsg(html, role) {
    const d = document.createElement('div');
    d.className = `cbm cb${role}`;
    d.innerHTML = role === 'b'
      ? `<img class="cbm-av" src="${AVATAR}" alt="Bot"><div class="cbm-b">${html}</div>`
      : `<div class="cbm-b">${html}</div>`;
    msgs().appendChild(d);
    scroll();
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
    SUGGESTIONS.forEach(sg => {
      const b = document.createElement('button');
      b.className = 'cbc';
      b.textContent = sg.label;
      b.onclick = () => { addMsg(esc(sg.label), 'u'); botReply(KB[sg.key].answer()); };
      s.appendChild(b);
    });
  }

  function botReply(html) {
    showTyping();
    setTimeout(() => { hideTyping(); addMsg(html, 'b'); }, 700 + Math.random() * 350);
  }

  function send() {
    const v = inp().value.trim();
    if (!v || /^[-—–.…,;:!?]+$/.test(v)) return;
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
      setTimeout(() => addMsg(`Bonjour ! 👋 Bienvenue sur le portfolio d'<strong>Abilan Balakumaran</strong>.<br>Je suis son assistant : je peux vous parler de son profil, ses services, ses outils ou vous aider à le contacter. Comment puis-je vous aider ? 😊`, 'b'), 350);
    }
    initScroll();
    // Lightbox sur clic média dans le chat
    msgs().addEventListener('click', e => {
      const el = e.target.closest('.cbm-b img, .cbm-b video');
      if (el) openLightbox(el.src || el.currentSrc, el.tagName === 'VIDEO');
    });
    setTimeout(() => inp().focus(), 400);
  }

  function closeChat() {
    open = false;
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
    m.addEventListener('wheel', e => e.stopPropagation(), { passive: true });
  }

  // Scanner la page au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanPage);
  } else {
    scanPage();
  }

  btn.onclick = () => open ? closeChat() : openChat();
  btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') btn.onclick(); });
  document.getElementById('cb-x').onclick = closeChat;
  document.getElementById('cb-go').onclick = send;
  win.querySelector('#cb-inp').addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

})();

