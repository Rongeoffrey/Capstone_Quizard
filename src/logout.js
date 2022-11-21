import { signOut } from "firebase/auth"
import { auth } from "./config/firebaseConfig"

//LOGOUT
const logout = document.getElementById("logout")

logout?.addEventListener('click', (e) => {
    console.log("logging out")
    e.preventDefault()

    signOut(auth) 
    .then(() => {
        window.location = "login.html";
        alert('User Logged out!');
    })
})
