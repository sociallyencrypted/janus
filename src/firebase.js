// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth provider with iiitd.ac.in domain restriction
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  hd: "iiitd.ac.in"
});

export { auth, provider, db };

