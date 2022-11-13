// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const database = getDatabase(app);
const analytics = getAnalytics(app);
const auth = getAuth();

//Button Reference
const signUp = document.getElementById("signUp");
const login = document.getElementById("login");
const logoutBtn = document.getElementById("logoutBtn");

//SIGNUP
signUp?.addEventListener('click',(e) =>{

var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
var username = document.getElementById('username').value;

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
// Signed in 
const user = userCredential.user;

set(ref(database, 'users/' + user.uid),{
    username: username,
    email: email
})

alert ('user created!');
// ...
})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;

alert(errorMessage);
// ..
});
});


//LOGIN
login?.addEventListener('click', (e)=>{
var email = document.getElementById('email').value;
var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
// Signed in 
const user = userCredential.user;

const dt = new Date();
update(ref(database, 'users/' + user.uid),{
    last_login: username,
})
window.location = "dashboard.html";
alert('User Logged in!');
// ...
})
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
});
});

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
if (user) {
// User is signed in, see docs for a list of available properties
// https://firebase.google.com/docs/reference/js/firebase.User
const uid = user.uid;
// ...
} else {
// User is signed out
// ...
}
});  
//LOGOUT
logoutBtn?.addEventListener("click", ()=>{
    alert('User Logged out');
    signOut(auth).then(() => {
    // Sign-out successful.
    window.location = "login.html";
}).catch((error) => {
// An error happened.
const errorCode = error.code;
const errorMessage = error.message;

alert(errorMessage);
});
})

