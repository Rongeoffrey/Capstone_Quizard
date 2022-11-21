import { auth } from './config/firebaseConfig.js'

auth.onAuthStateChanged(user => {
    if(user){
        //USER IS LOGGED IN
        if(document.URL.includes("login.html") || document.URL.includes("register.html") || document.URL.includes("index.html")) //USER IS LOGGED IN
        {
            window.location = "dashboard.html"
        }
    }
    else{
        if(!document.URL.includes("login.html") && !document.URL.includes("register.html") && !document.URL.includes("index.html")) //USER IS NOT LOGGED IN
        {
            window.location = "login.html"
        }
    }
})