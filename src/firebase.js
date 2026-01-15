// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore,doc,setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGDlaDsCU74lQW9J1bpsuuPtrXbTOdQ3M",
  authDomain: "darkknight-personal-vault.firebaseapp.com",
  projectId: "darkknight-personal-vault",
  storageBucket: "darkknight-personal-vault.firebasestorage.app",
  messagingSenderId: "893702553222",
  appId: "1:893702553222:web:8f9d1382a089c613cedb07",
  measurementId: "G-6QR679STYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};
