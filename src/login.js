import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import {database, auth, userRef} from './config/firebaseConfig.js'

//LOGIN
const login = document.getElementById("login");

login?.addEventListener('click', (e)=>{
    e.preventDefault()
    var userId = document.getElementById('userId').value;
    var password = document.getElementById('password').value;
    
    if(userId !== '' && password !== '')
    {
        GetUserEmail(userId).then(value => userId = value)
        .then(signInWithEmailAndPassword(auth, userId, password))
        .then(() => {
            console.log(userId)
            if(getAuth !== undefined){
                RecordLogin(userId)
                .then(() => {
                    window.location = "dashboard.html";
                    alert('User Logged in!');
                })
            }
            else{
                console.log("login failed")
            }
        })
    }
   
});

async function RecordLogin(userId){ //UPDATES LAST LOGIN OF USER
    var q;
    var docId = '';
    userId.includes('@') ? q = query(userRef, where("email", "==", userId), limit(1)) : query(userRef, where("username", "==", userId), limit(1))
    userId.includes('@') ? console.log("using email") : console.log("using username")

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => { docId = doc.id });

    const docRef = doc(database, 'userId', docId)
    updateDoc( docRef, {
        lastActivity: new Date()
    })
    .then(() => {
        console.log("Updated Document")
    })
}

async function GetUserEmail(userId){ //GET EMAIL OF USER

    if(userId.includes('@')) { return userId;}

    var email = ''
    const q = query(userRef, where("username", "==", userId), limit(1))

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => { email = doc.data().email});

    email === undefined && console.log("Email Doesnt exist")

    return email
}
