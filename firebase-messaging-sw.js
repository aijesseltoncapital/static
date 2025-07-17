importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js")

const firebase = self.firebase // Declare the firebase variable

firebase.initializeApp({
  apiKey: "AIzaSyDv5HzpXBW-5IQwZ8hRNbRtAso8I5mrKSE",
  authDomain: "productivitytool-ffe3d.firebaseapp.com",
  projectId: "productivitytool-ffe3d",
  storageBucket: "productivitytool-ffe3d.firebasestorage.app",
  messagingSenderId: "855924967705",
  appId: "1:855924967705:web:cf8ecb71cf1cfdeddb1d88",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload)

  const notificationTitle = payload.notification?.title || "TaskFlow Notification"
  const notificationOptions = {
    body: payload.notification?.body || "You have a new update",
    icon: "/icon-192x192.png",
    badge: "/badge-72x72.png",
    tag: "taskflow-notification",
    requireInteraction: true,
    data: payload.data,
    actions: [
      {
        action: "open",
        title: "Open App",
      },
      {
        action: "dismiss",
        title: "Dismiss",
      },
    ],
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  if (event.action === "open") {
    event.waitUntil(clients.openWindow("/"))
  }
})
