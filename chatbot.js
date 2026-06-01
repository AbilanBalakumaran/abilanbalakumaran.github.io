/* ═══════════════════════════════════════════════════
   Abilan Lab — Chatbot Assistant
   Commercial virtuel d'Abilan Balakumaran
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const AVATAR = '/images/chatbot-avatar.png';

  /* ── Base de connaissances ─────────────────────── */
  const KB = [
    {
      keys: ['bonjour','salut','hello','coucou','bonsoir','hey','hi'],
      answer: () => `Bonjour ! 👋 Ravi de vous accueillir sur le portfolio d'<strong>Abilan Balakumaran</strong>.<br>Je suis son assistant — posez-moi n'importe quelle question sur son profil, ses services ou ses outils. Je suis là pour vous aider ! 😊`
    },
    {
      keys: ['qui','profil','présent','abilan','c\'est qui','parle moi','tell me','about'],
      answer: () => `<strong>Abilan Balakumaran</strong> est <strong>Digital Manager & Motion Designer</strong> 🎨<br><br>Il crée des expériences visuelles impactantes : animations, identités visuelles, stratégies digitales et développement web.<br><br><em>"Votre visibilité en ligne est votre meilleur commercial !"</em>`
    },
    {
      keys: ['compétence','logiciel','skill','maîtrise','technologie','sait','capable','outil','stack','after effects','premiere','illustrator','photoshop'],
      answer: () => `Voici les compétences d'Abilan :<br><br>🎬 <strong>Vidéo & Motion</strong> — After Effects, Premiere Pro, DaVinci Resolve<br>🎨 <strong>Design</strong> — Illustrator, Photoshop, InDesign<br>💻 <strong>Web</strong> — HTML/CSS/JS, WordPress, UI/UX<br>📱 <strong>Digital</strong> — Stratégie réseaux, Community Management`
    },
    {
      keys: ['service','propose','offre','prestation','travail','mission','commande','tarif','prix','devis','aide','faire'],
      answer: () => `Abilan propose <strong>4 grands services</strong> :<br><br>🎬 <strong>Motion Design & Vidéo animée</strong><br>🎨 <strong>Design graphique & Identité visuelle</strong><br>📱 <strong>Stratégie digitale & Community Management</strong><br>💻 <strong>Développement web & Applications</strong><br><br>Pour un devis, contactez-le directement par email 😊`
    },
    {
      keys: ['contact','email','mail','joindre','écrire','message','disponible','disponibilité','localisation','où','location'],
      answer: () => `Le meilleur moyen de contacter Abilan :<br><br>📧 <strong><a href="mailto:Abilan.Balakumaran@gmail.com">Abilan.Balakumaran@gmail.com</a></strong><br><br>Il est <strong>mobile en Île-de-France</strong> et disponible pour des projets freelance. N'hésitez pas, il répond rapidement ! 🙂`
    },
    {
      keys: ['réseau','instagram','youtube','behance','social','suivre','lien','communauté'],
      answer: () => `Retrouvez Abilan sur ses réseaux :<br><br>📸 <a href="https://www.instagram.com/abilan_motion/" target="_blank">Instagram — @abilan_motion</a><br>🎬 <a href="https://www.youtube.com/@sukiamv" target="_blank">YouTube — @sukiamv</a><br>🎨 <a href="https://www.behance.net/AbilanBalakumaran" target="_blank">Behance — AbilanBalakumaran</a><br><br>Abonnez-vous pour suivre ses créations ! ✨`
    },
    {
      keys: ['lab','outil','gratuit','fonctionnalité','feature','transcription','filigrane','extender','image'],
      answer: () => `Le Lab propose <strong>3 outils 100% gratuits</strong> :<br><br>🎙️ <a href="/abilanlab/transcription/"><strong>Transcription Audio</strong></a> — Audio/vidéo en texte, multilingue<br>🖼️ <a href="/abilanlab/filigrane-remover/"><strong>Filigrane Remover</strong></a> — Supprime les filigranes<br>✨ <a href="/abilanlab/image-extender/"><strong>Image Extender</strong></a> — Étend vos images avec l'IA<br><br>Voulez-vous que je vous explique comment utiliser l'un d'eux ?`
    },
    {
      keys: ['transcri','audio','whisper','sous-titre','srt','dicter','enregistrement','vocal'],
      answer: () => `Comment utiliser la <strong>Transcription Audio</strong> :<br><br>1️⃣ Choisissez <em>Fichier local</em> ou <em>URL vidéo</em><br>2️⃣ Sélectionnez vos paramètres (vitesse, langue, intervenants)<br>3️⃣ Cliquez sur <em>"Lancer la transcription"</em><br>4️⃣ Exportez en TXT, JSON ou SRT<br><br>Compatible YouTube, Instagram, TikTok, Twitter/X 🚀`
    },
    {
      keys: ['filigrane','watermark','supprimer','enlever','efface'],
      answer: () => `Comment utiliser le <strong>Filigrane Remover</strong> :<br><br>1️⃣ Importez votre image<br>2️⃣ Sélectionnez la zone du filigrane<br>3️⃣ Laissez l'IA faire son travail ✨<br>4️⃣ Téléchargez le résultat<br><br>100% gratuit, aucune donnée envoyée ! 🔒`
    },
    {
      keys: ['extend','étend','agrandir','image extend','outpaint','zoom out'],
      answer: () => `Comment utiliser l'<strong>Image Extender</strong> :<br><br>1️⃣ Importez votre image<br>2️⃣ Choisissez la direction d'extension<br>3️⃣ L'IA génère le contenu manquant ✨<br>4️⃣ Téléchargez l'image étendue<br><br>Parfait pour recadrer ou agrandir vos visuels ! 🖼️`
    },
    {
      keys: ['installer','install','pwa','application','app','écran d\'accueil','télécharger','appli','mobile'],
      answer: () => `Vous pouvez installer ce site comme une <strong>vraie application</strong> ! 📱<br><br><strong>Sur iPhone (Safari) :</strong><br>Appuyez sur <em>Partager</em> puis <em>"Sur l'écran d'accueil"</em><br><br><strong>Sur Android (Chrome) :</strong><br>Appuyez sur les <em>3 points</em> puis <em>"Ajouter à l'écran d'accueil"</em><br><br>L'app se lance sans barre de navigateur, avec un beau splash screen ✨`
    },
    {
      keys: ['projet','réalisation','portfolio','travaux','exemple','création','client'],
      answer: () => `Parmi les projets notables d'Abilan :<br><br>📱 <strong>Application mobile</strong> — Suivi de chantier BTP<br>🌐 <strong>Site web</strong> — <a href="https://etudereno.fr" target="_blank">etudereno.fr</a> (WordPress)<br>🎬 <strong>Motion Design</strong> — Animations & contenus réseaux<br>🎨 <strong>Identités visuelles</strong> — Logos, chartes graphiques<br><br>Tout sur <a href="https://abilanbalakumaran.github.io/" target="_blank">son portfolio</a> et <a href="https://www.behance.net/AbilanBalakumaran" target="_blank">Behance</a> 🎨`
    },
    {
      keys: ['formation','étude','diplôme','école','université','cursus','parcours','bac','master'],
      answer: () => `Abilan a un solide parcours :<br><br>🎓 <strong>MBA Digital Marketing & Business</strong><br>🎨 <strong>Spécialisation Motion Design & Création digitale</strong><br><br>Une combinaison rare entre créativité et stratégie pour des projets complets de A à Z !`
    },
    {
      keys: ['merci','super','parfait','génial','cool','top','excellent','impeccable','nickel'],
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
#cb-btn{position:fixed;bottom:24px;right:24px;z-index:99990;width:68px;height:68px;border-radius:50%;cursor:pointer;border:none;background:transparent;padding:0;animation:cbFloat 3s ease-in-out infinite;transition:transform .2s;}
#cb-btn:hover{transform:scale(1.12) translateY(-4px);}
#cb-btn img{width:100%;height:100%;object-fit:cover;border-radius:50%;filter:drop-shadow(0 4px 24px rgba(107,155,209,.55));}
.cb-ring{position:fixed;bottom:24px;right:24px;z-index:99989;width:68px;height:68px;border-radius:50%;border:2px solid rgba(107,155,209,.35);pointer-events:none;animation:cbRing 2.2s ease-out infinite;}
.cb-ring2{animation-delay:.7s;}
#cb-dot{position:fixed;bottom:82px;right:20px;z-index:99991;width:13px;height:13px;background:#6ba68d;border-radius:50%;border:2px solid #0f1823;box-shadow:0 0 8px rgba(107,166,141,.8);animation:cbDotPulse 2.5s ease-in-out infinite;pointer-events:none;}
#cb-win{position:fixed;bottom:106px;right:24px;z-index:99992;width:345px;max-height:530px;background:#0d1720;border:1px solid rgba(168,197,226,.14);border-radius:22px;box-shadow:0 24px 64px rgba(0,0,0,.65),0 0 0 1px rgba(168,197,226,.04);display:flex;flex-direction:column;overflow:hidden;transform-origin:bottom right;}
#cb-win.cb-in{animation:cbIn .38s cubic-bezier(.22,1,.36,1) both;}
#cb-win.cb-out{animation:cbOut .28s cubic-bezier(.4,0,1,1) both;}
.cbh{display:flex;align-items:center;gap:10px;padding:13px 15px;background:rgba(168,197,226,.045);border-bottom:1px solid rgba(168,197,226,.09);}
.cbh-av{width:40px;height:40px;border-radius:50%;object-fit:cover;animation:cbFloat 3.5s ease-in-out infinite;filter:drop-shadow(0 2px 10px rgba(107,155,209,.45));}
.cbh-name{font-family:'Sora',sans-serif;font-size:14px;font-weight:700;color:#fff;line-height:1;}
.cbh-status{font-family:'JetBrains Mono',monospace;font-size:10px;color:#6ba68d;letter-spacing:.05em;margin-top:3px;}
.cbh-status::before{content:'● ';font-size:8px;}
.cbh-x{margin-left:auto;width:30px;height:30px;border:none;background:rgba(168,197,226,.07);border-radius:8px;cursor:pointer;color:rgba(168,197,226,.55);font-size:15px;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.cbh-x:hover{background:rgba(168,197,226,.14);color:#fff;}
#cb-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin;scrollbar-color:rgba(90,123,166,.25) transparent;}
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
@keyframes cbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes cbRing{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.9);opacity:0}}
@keyframes cbDotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.45);opacity:.65}}
@keyframes cbIn{from{opacity:0;transform:scale(.82) translateY(22px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes cbOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.82) translateY(22px)}}
@keyframes cbMsg{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes cbdd{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
@media(max-width:400px){#cb-win{width:calc(100vw - 16px);right:8px;bottom:96px;}}
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

  const btn = document.createElement('button');
  btn.id = 'cb-btn';
  btn.setAttribute('aria-label', 'Ouvrir le chat Abilan Lab');
  btn.innerHTML = `<img src="${AVATAR}" alt="Assistant Abilan">`;
  document.body.appendChild(btn);

  const win = document.createElement('div');
  win.id = 'cb-win';
  win.style.display = 'none';
  win.innerHTML = `
<div class="cbh">
  <img class="cbh-av" src="${AVATAR}" alt="Assistant">
  <div>
    <div class="cbh-name">Abilan Lab</div>
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
    if (!v) return;
    addMsg(esc(v), 'u');
    inp().value = '';
    botReply(getAnswer(v));
  }

  /* ── Open / Close ──────────────────────────────── */
  let open = false, greeted = false;

  function openChat() {
    open = true;
    win.style.display = 'flex';
    win.classList.remove('cb-out');
    win.classList.add('cb-in');
    renderSugg();
    if (!greeted) {
      greeted = true;
      setTimeout(() => addMsg(`Bonjour ! 👋 Bienvenue sur le portfolio d'<strong>Abilan Balakumaran</strong>.<br>Je suis son assistant — je peux vous parler de son profil, ses services, ses outils ou vous aider à le contacter. Comment puis-je vous aider ? 😊`, 'b'), 350);
    }
    setTimeout(() => inp().focus(), 400);
  }

  function closeChat() {
    open = false;
    win.classList.remove('cb-in');
    win.classList.add('cb-out');
    setTimeout(() => { win.style.display = 'none'; }, 270);
  }

  btn.onclick = () => open ? closeChat() : openChat();
  document.getElementById('cb-x').onclick = closeChat;
  document.getElementById('cb-go').onclick = send;
  win.querySelector('#cb-inp').addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

})();
