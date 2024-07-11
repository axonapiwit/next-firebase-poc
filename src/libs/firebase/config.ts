import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    apiKey: "AIzaSyCXpRY-oNM8lFszcrFp5w5AST9fN8Kt_xE",
    authDomain: "next-firebase-new.firebaseapp.com",
    projectId: "next-firebase-new",
    storageBucket: "next-firebase-new.appspot.com",
    messagingSenderId: "552010471424",
    appId: "1:552010471424:web:d49a5c1db84f6dbb85a0e5",
    measurementId: "G-8JNQ0M47XG"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

export { app, auth }