const CACHE = 'abilanlab-v1';

const SHELL = [
  '/',
  '/index.html',
  '/abilanlab/',
  '/abilanlab/index.html',
  '/abilanlab/transcription/',
  '/abilanlab/transcription/index.html',
  '/abilanlab/filigrane-remover/',
  '/abilanlab/filigrane-remover/index.html',
  '/abilanlab/image-extender/',
  '/abilanlab/image-extender/index.html',
  '/images/fiole.png',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first pour le shell, network-first pour les APIs externes
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Ne jamais intercepter les appels API
  if (
    url.includes('workers.dev') ||
    url.includes('translate.googleapis.com') ||
    url.includes('fonts.googleapis.com') ||
    url.includes('fonts.gstatic.com')
  ) return;

  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type !== 'opaque') {
          caches.open(CACHE).then(c => c.put(e.request, res.clone())).catch(() => {});
        }
        return res;
      }).catch(() => cached || new Response('', { status: 408 }));
      return cached || network;
    }).catch(() => caches.match(e.request))
  );
});

// Notification de fin de transcription
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'TRANSCRIPTION_DONE') {
    const { speakers, words, duration } = e.data.payload;
    const body = [
      `${speakers} intervenant${speakers > 1 ? 's' : ''}`,
      `${words} mots`,
      duration
    ].filter(Boolean).join(' · ');

    self.registration.showNotification('Transcription terminée ✓', {
      body,
      icon: '/images/fiole.png',
      badge: '/images/fiole.png',
      tag: 'transcription-done',
      renotify: true,
      vibrate: [200, 100, 200],
      data: { url: '/abilanlab/transcription/' }
    });
  }
});

// Clic sur la notification → focus ou ouvre l'onglet transcription
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || '/abilanlab/transcription/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('/abilanlab/transcription') && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});
