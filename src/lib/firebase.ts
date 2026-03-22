import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDw6bnMCxde5UJtP0Zr6A0kmt2D6VGdAn0',
  authDomain: 'ac-godmode-titan.firebaseapp.com',
  projectId: 'ac-godmode-titan',
  storageBucket: 'ac-godmode-titan.firebasestorage.app',
  messagingSenderId: '449004939498',
  appId: '1:449004939498:web:b5c8d7b1e6a2f3c4d5e6f7',
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, 'us-central1');

export { app, functions, httpsCallable };
