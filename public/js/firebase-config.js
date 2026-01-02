/* =================================
   Firebase Configuration
   ================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getAuth, 
    signInAnonymously, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    getDocs, 
    deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWXYvY8FqhVaAfQRtZShCCkEHYsxOtitE",
    authDomain: "rohit-cyber.firebaseapp.com",
    projectId: "rohit-cyber",
    storageBucket: "rohit-cyber.firebasestorage.app",
    messagingSenderId: "55303679856",
    appId: "1:55303679856:web:870886641d23af677369b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Admin Configuration
const ADMIN_EMAIL = "romiorohit86@gmail.com";
const appId = "rohitcafe-default";

// Export for use in other modules
export { 
    auth, 
    db, 
    ADMIN_EMAIL, 
    appId,
    signInAnonymously,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    collection,
    doc,
    setDoc,
    getDocs,
    deleteDoc
};
