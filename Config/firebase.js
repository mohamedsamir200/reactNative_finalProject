// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClAzLnGbkY7nPI7RqSapyMJC5l_OFgW0U",
  authDomain: "finalproject-3767c.firebaseapp.com",
  projectId: "finalproject-3767c",
  storageBucket: "finalproject-3767c.appspot.com",
  messagingSenderId: "95741196127",
  appId: "1:95741196127:web:6d116b9ae6ec4271a3a8ea",
  measurementId: "G-Y4Q3M0WT99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default db;
