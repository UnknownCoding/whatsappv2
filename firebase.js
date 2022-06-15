// Import the functions you need from the SDKs you need
import { initializeApp , getApp, getApps} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAG3y2aXj2VVkRaYiUmD6l-tPOVO0SOAFU",
    authDomain: "whatsappv2-12f45.firebaseapp.com",
    projectId: "whatsappv2-12f45",
    storageBucket: "whatsappv2-12f45.appspot.com",
    messagingSenderId: "454494809129",
    appId: "1:454494809129:web:3d689a5692c0e994f98038"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp() ;
const db = getFirestore();
const storage= getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider;

export {app,db,storage,provider,auth}