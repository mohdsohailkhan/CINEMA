import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCWAnolfEIl1onmD66jV7WPJX3PaRsCcyw",
    authDomain: "cinema-4735d.firebaseapp.com",
    projectId: "cinema-4735d",
    storageBucket: "cinema-4735d.appspot.com",
    messagingSenderId: "19641877675",
    appId: "1:19641877675:web:991ed5617e98b83c8f23ee",
    measurementId: "G-S539GCVWNR"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

