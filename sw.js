// sw.js
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', function(event) {
    if (event.data) {
        try {
            const data = event.data.json();

            const title = data.notification?.title || data.title || 'Telulas Gank';
            const body = data.notification?.body || data.message || 'Pesan baru masuk';

            const options = {
                body: body,
                icon: 'https://cdn-icons-png.flaticon.com/512/2888/2888407.png',
                badge: 'https://cdn-icons-png.flaticon.com/512/2888/2888407.png',
                vibrate: [300, 100, 400, 100, 400],
                tag: 'telulas-gank-chat',
                renotify: true,
                silent: false, // MEMAKSA SUARA DAN POP-UP MUNCUL
                requireInteraction: true, // Notif tidak hilang sampai disentuh
                data: { url: self.registration.scope }
            };

            event.waitUntil(self.registration.showNotification(title, options));
        } catch (e) {
            event.waitUntil(self.registration.showNotification('Telulas Gank', {
                body: event.data.text(),
                silent: false
            }));
        }
    }
});

// Aksi saat notifikasi di-klik
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const target = (event.notification.data && event.notification.data.url) || self.registration.scope;
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url.startsWith(self.registration.scope) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(target);
            }
        })
    );
});
