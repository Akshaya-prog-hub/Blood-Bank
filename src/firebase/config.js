import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWNYS3QgJJJ8PFwoGsm1C4IupPwA2mekU",
  authDomain: "bloodbank-89899.firebaseapp.com",
  projectId: "bloodbank-89899",
  storageBucket: "bloodbank-89899.appspot.com", // ✅ FIX
  messagingSenderId: "264319335796",
  appId: "1:264319335796:web:0719a8816b56f4d6fcc021",
  measurementId: "G-LPBCE1RJG8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
