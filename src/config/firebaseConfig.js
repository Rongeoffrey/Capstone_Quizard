import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyBToQSAJh0j9hcFd4meilciSAydXhcjLow",
    authDomain: "quizard-b254d.firebaseapp.com",
    databaseURL: "https://quizard-b254d-default-rtdb.firebaseio.com",
    projectId: "quizard-b254d",
    storageBucket: "quizard-b254d.appspot.com",
    messagingSenderId: "898500892582",
    appId: "1:898500892582:web:6c18f3486219598909a167",
    measurementId: "G-1F6T690937"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();

//Firebase Reference
export const userRef = collection(database, 'userId')