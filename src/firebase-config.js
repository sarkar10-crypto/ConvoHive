// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// connecting Firestore with our project with firebase
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVks9YGiu4Tx7N6N1O8jgIrNZTWVdyBEc",
  authDomain: "convohive-976b2.firebaseapp.com",
  projectId: "convohive-976b2",
  storageBucket: "convohive-976b2.firebasestorage.app",
  messagingSenderId: "435119674786",
  appId: "1:435119674786:web:ffb9f373b751aae5de0efb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// creating a constant to store Firestore value and call app

export const db = getFirestore(app);