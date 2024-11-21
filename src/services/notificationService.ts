import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app } from '../lib/firebase';

const messaging = getMessaging(app);

export const notificationService = {
  async requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
        });
        return token;
      }
      return null;
    } catch (error) {
      console.error('Notification permission error:', error);
      return null;
    }
  },

  onMessageListener() {
    return new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });
  },

  async sendTestNotification() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification('Sabz Khushali', {
        body: 'Welcome to Sabz Khushali!',
        icon: '/icons/icon-192.png',
        badge: '/icons/badge-72.png',
        vibrate: [200, 100, 200]
      });
    }
  }
};