import { LoadGraph } from "./allgraph.js";
import { Login } from "./graphQL.js"

export function initLogin() {
    console.log("InitLogin");
}

const loginForm = document.getElementById("login-form")
const profil = document.getElementById("profil")

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
        document.body.removeChild(login)
        document.getElementById("title").innerText = `Welecome: ${getCookie("userLogin")}`
        document.getElementById("logout").onclick = ()=>{deletCookie("userLogin"), deletCookie("jwt"); window.location.reload()}
        LoadGraph()
        profil.style.visibility = "visible"
    } else {
        login.style.visibility = "visible"
    }
}


export function getCookie(cname) {
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

function deletCookie(nom) {
    document.cookie = nom + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
