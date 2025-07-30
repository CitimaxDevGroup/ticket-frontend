// firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAIV30Q6FKq7ZQWHuNw4HwTsRyIU_5D4x8",
  authDomain: "citimaxticket.firebaseapp.com",
  projectId: "citimaxticket",
  storageBucket: "citimaxticket.firebasestorage.app",
  messagingSenderId: "347048520244",
  appId: "1:347048520244:web:462ec6ff0bef09985bb861",
  measurementId: "G-HJ54PLL9NQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Firestore export
