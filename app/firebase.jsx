// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6wsJiV3-Cw_mwcJinGkJa0vZ_ruK_mlY",
  authDomain: "duoleet-beb21.firebaseapp.com",
  projectId: "duoleet-beb21",
  storageBucket: "duoleet-beb21.firebasestorage.app",
  messagingSenderId: "702411357820",
  appId: "1:702411357820:web:56d7fca3c83019196853f9",
  measurementId: "G-5R8T2R4094"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);