import { createUserWithEmailAndPassword} from 'firebase/auth'
import { auth, userRef  } from './config/firebaseConfig.js'
import {addDoc, collection } from 'firebase/firestore'

const signUp = document.getElementById("signUp");

signUp?.addEventListener('click',(e) =>{
    console.log("signing up")
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        RegisterUsername(username, email)
        
        alert ('user created!');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        alert(errorMessage);
    });
});

function RegisterUsername(username, email){

    addDoc(userRef, {
        username: username,
        email : email
    })
}