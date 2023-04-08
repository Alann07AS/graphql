import { Login } from "./graphQL.js"

export function initLogin() {
    console.log("InitLogin");
}

const loginForm = document.getElementById("login-form")

loginForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    Login(loginForm["username-email"].value, loginForm["password"].value)
})

export function LoginErr(err) {
    document.getElementById("login-err").textContent = err
}

export function CheckLogin() {
    const login = document.getElementById("login")
    if (getCookie("jwt") !=="") {
        login.removeChild(loginForm)
    } else {
        login.style.visibility = "visible"
    }
}


function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}