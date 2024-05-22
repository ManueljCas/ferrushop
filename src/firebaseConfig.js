// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC6IzOAKLQ4sD5_XRlGeOKyGnWoV-EBQS8",
  authDomain: "ferrushop93.firebaseapp.com",
  projectId: "ferrushop93",
  storageBucket: "ferrushop93.appspot.com",
  messagingSenderId: "33732604555",
  appId: "1:33732604555:web:8195efa44e688a674cda8e",
  measurementId: "G-BBR7T78NHP"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
