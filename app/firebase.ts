import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfmxXZqxwGqWyK0maujTHuMzn53CEsDyA",
  authDomain: "postify-82c32.firebaseapp.com",
  projectId: "postify-82c32",
  storageBucket: "postify-82c32.firebasestorage.app",
  messagingSenderId: "163098733833",
  appId: "1:163098733833:web:5b6c726fc5d455752ff7d8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
