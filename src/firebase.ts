import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIV30Q6FKq7ZQWHuNw4HwTsRyIU_5D4x8",
  authDomain: "citimaxticket.firebaseapp.com",
  projectId: "citimaxticket",
  storageBucket: "citimaxticket.firebasestorage.app",
  messagingSenderId: "347048520244",
  appId: "1:347048520244:web:462ec6ff0bef09985bb861",
  measurementId: "G-HJ54PLL9NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);