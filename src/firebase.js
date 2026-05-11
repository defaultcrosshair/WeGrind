import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwvwkS2uMX0DDSuZEVkiHxKsfUiL-e7Bw",
  authDomain: "wegrind-91c67.firebaseapp.com",
  projectId: "wegrind-91c67",
  storageBucket: "wegrind-91c67.firebasestorage.app",
  messagingSenderId: "344053165931",
  appId: "1:344053165931:web:e14b55253bb3de5906a62e",
  measurementId: "G-5EJL0H47YY"
};

// Initialize Firebase only if an API key is somewhat present so the app doesn't crash immediately on load
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
