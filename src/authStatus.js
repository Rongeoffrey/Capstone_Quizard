import { auth } from './config/firebaseConfig.js'

auth.onAuthStateChanged(user => {
    console.log("this is running")
    if(user){
        //USER IS LOGGED IN
    }
    else{
        if(!document.URL.includes("login.html") && !document.URL.includes("register.html") && !document.URL.includes("index.html")) //USER IS NOT LOGGED IN
        {
            window.location = "login.html"
        }
    }
})