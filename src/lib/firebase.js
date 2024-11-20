// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn3I5KILzOQM6980iGtw_GvnTryuX1dlc",
  authDomain: "watugador.firebaseapp.com",
  projectId: "watugador",
  storageBucket: "watugador.firebasestorage.app",
  messagingSenderId: "114088624267",
  appId: "1:114088624267:web:be93f8b4d71e7e976ad48e",
  measurementId: "G-ZNQPZ78EWP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
