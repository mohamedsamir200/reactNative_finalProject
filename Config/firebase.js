// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// ============ Final Project firebase ===============//
// const firebaseConfig = {
//   apiKey: "AIzaSyClAzLnGbkY7nPI7RqSapyMJC5l_OFgW0U",
//   authDomain: "finalproject-3767c.firebaseapp.com",
//   projectId: "finalproject-3767c",
//   storageBucket: "finalproject-3767c.appspot.com",
//   messagingSenderId: "95741196127",
//   appId: "1:95741196127:web:6d116b9ae6ec4271a3a8ea",
//   measurementId: "G-Y4Q3M0WT99",
// };
// ============ Final Project firebase ===============//


// ============ Test Firebase ===============//
const firebaseConfig = {
  apiKey: "AIzaSyAtDi-iE7zas87-ut6LezCOANkV3WZlvUg",
  authDomain: "test-f7fde.firebaseapp.com",
  projectId: "test-f7fde",
  storageBucket: "test-f7fde.appspot.com",
  messagingSenderId: "739059949523",
  appId: "1:739059949523:web:14ac38d72b4b791d6e9926",
  measurementId: "G-XGL05J93NY",
};
// ============ Test Firebase ===============//



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default db;
