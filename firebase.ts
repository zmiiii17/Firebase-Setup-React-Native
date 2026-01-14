import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHQTeAWIuyFPNoxPqj6lFUMo4gn6uFsmU",
  authDomain: "todo-firebaseapp-18563.firebaseapp.com",
  projectId: "todo-firebaseapp-18563",
  storageBucket: "todo-firebaseapp-18563.firebasestorage.app",
  messagingSenderId: "975535223372",
  appId: "1:975535223372:web:75b55d77e88b185c623ae9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
