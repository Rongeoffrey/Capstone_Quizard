import { connectAuthEmulator, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import {database, auth, userRef} from './config/firebaseConfig.js'

// connectAuthEmulator(auth, "http://localhost:5055");

//LOGIN
const login = document.getElementById("login");

login?.addEventListener('click', (e)=>{
    e.preventDefault()
    var userId = document.getElementById('userId').value;
    var password = document.getElementById('password').value;
    
    if(userId !== '' && password !== '')
    {
        GetUserEmail(userId).then(value => userId = value) //GET EMAIL OF USERS
        .then((email) => {
            if(email !== '') {
                signInWithEmailAndPassword(auth, userId, password) //IF EMAIL EXISTS TRY TO LOGIN
                .then(() => {
                    RecordLogin(userId)
                    .then(() => {
                        window.location = "dashboard.html";
                        alert('User Logged in!');
                    })
                })
                .catch(() => {alert("incorrect username or password")})
            }
            else{ alert("Email doesnt exists")}
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

    email === '' ? console.log("Email Doesnt exist"): console.log("email exists")

    return email
}
