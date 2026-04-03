// Firebase Service Worker for Push Notifications
// FORESIGHT - v1.0

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDWx5oT1Li8O1NzfNYUtwdbDD_7-ItR9Zs",
  authDomain: "foresight-d3cde.firebaseapp.com",
  projectId: "foresight-d3cde",
  storageBucket: "foresight-d3cde.firebasestorage.app",
  messagingSenderId: "481432685510",
  appId: "1:481432685510:web:34239dc6239e9e011400c7"
});

const messaging = firebase.messaging();

// הצג התראה כשהאפליקציה ברקע
messaging.onBackgroundMessage(function(payload) {
  console.log('FORESIGHT: Push notification received', payload);
  
  const notificationTitle = payload.notification?.title || payload.data?.title || '📢 FORESIGHT';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || 'עדכון חדש',
    icon: 'https://via.placeholder.com/192x192/0a1628/c8a84b?text=F',
    badge: 'https://via.placeholder.com/72x72/0a1628/c8a84b?text=F',
    tag: 'foresight-notification',
    renotify: true,
    vibrate: [200, 100, 200],
    data: payload.data || {},
    actions: [
      { action: 'open', title: '👁️ פתח' },
      { action: 'dismiss', title: 'סגור' }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// לחיצה על ההתראה — פתח את האפליקציה
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'dismiss') return;
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url.includes('foresight') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('https://cohen6120-dev.github.io/foresight');
    })
  );
});
