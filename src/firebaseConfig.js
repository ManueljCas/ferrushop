import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDA9lONwvsuj8T1ANIlKnF9nRKrfbwv-fw",
  authDomain: "ferrushop1.firebaseapp.com",
  projectId: "ferrushop1",
  storageBucket: "ferrushop1.appspot.com",
  messagingSenderId: "648488210809",
  appId: "1:648488210809:web:41f8e3b47a8af796d35fa8",
  measurementId: "G-Y29CQLXK2L"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
