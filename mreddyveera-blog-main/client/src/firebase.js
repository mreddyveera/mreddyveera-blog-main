// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-manikanta.firebaseapp.com",
  projectId: "mern-manikanta",
  storageBucket: "mern-manikanta.firebasestorage.app",
  messagingSenderId: "520760463609",
  appId: "1:520760463609:web:bd2437668af7376abd9228"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);