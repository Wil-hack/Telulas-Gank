// sw.js
self.addEventListener('push', function(event) {
    if (event.data) {
        try {
            // Menangkap data yang dikirim dari Cloudflare Worker / Firebase
            const data = event.data.json();
            
            // Mengambil judul dan pesan
            const title = data.notification?.title || data.title || 'Telulas Gank';
            const body = data.notification?.body || data.message || 'Pesan baru';
            
            // Opsi Notifikasi
            const options = {
                body: body,
                icon: 'https://cdn-icons-png.flaticon.com/512/2888/2888407.png', // Ikon besar (bisa diganti logo Telulas)
                badge: 'https://cdn-icons-png.flaticon.com/512/2888/2888407.png', // Ikon kecil di status bar
                vibrate: [200, 100, 200, 100, 200], // Pola getar
                tag: 'telulas-gank-chat', // Agar notifikasi menumpuk (tidak menuhin layar)
                renotify: true, // Tetap bergetar walau menumpuk
                data: {
                    url: '/' // Link yang dibuka saat notif diklik
                }
            };

            // Tampilkan Notifikasi ke Panel Android
            event.waitUntil(self.registration.showNotification(title, options));
        } catch (e) {
            // Cadangan jika format bukan JSON
            event.waitUntil(self.registration.showNotification('Telulas Gank', {
                body: event.data.text()
            }));
        }
    }
});

// Aksi saat notifikasi di-klik
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Tutup notif

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            // Jika aplikasi sudah terbuka, fokuskan
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            // Jika belum terbuka, buka aplikasi
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
