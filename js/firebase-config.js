// ═══════════════════════════════════════════════════════
//   PICCHIO QR MENU — FIREBASE-CONFIG.JS
//   Configure your Firebase connection here
// ═══════════════════════════════════════════════════════

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const FIREBASE_SETTINGS = {
  // Set to false to enable Firestore fetching. 
  // If true, or if configuration is invalid, it will fall back to local data.
  useLocalFallbackOnly: true, 
  
  // Document path in Firestore where menu data is stored
  documentPath: "menu/data"
};
