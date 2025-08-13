import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpIOF7ghziyg5hM56c8SHfDZcEFXDhPi4",
  authDomain: "contact-book-wa.firebaseapp.com",
  projectId: "contact-book-wa",
  storageBucket: "contact-book-wa.firebasestorage.app",
  messagingSenderId: "750615124966",
  appId: "1:750615124966:web:250de7913228037cbc9427"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;