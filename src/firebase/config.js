import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGrBH7LUE5-iSATxlJHRsnIzdZKYEPU18",
  authDomain: "chatapp-4a49e.firebaseapp.com",
  projectId: "chatapp-4a49e",
  storageBucket: "chatapp-4a49e.appspot.com",
  messagingSenderId: "1099259315315",
  appId: "1:1099259315315:web:c11e0eb740e801e450d606",
  measurementId: "G-NLHYC1ECZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);