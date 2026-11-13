importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBJnkrBjbCivsCjFC2DyMRfv0ssXA9ZONs",
    authDomain: "telulas-dd5c8.firebaseapp.com",
    projectId: "telulas-dd5c8",
    storageBucket: "telulas-dd5c8.firebasestorage.app",
    messagingSenderId: "619593885912",
    appId: "1:619593885912:web:27d14bea00aab6fd574fad"
});

const messaging = firebase.messaging();

// Menangani notifikasi saat aplikasi di background/tertutup
messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('install', (e) => {
    self.skipWaiting();
});
