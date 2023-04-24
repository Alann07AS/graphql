import { LoadGraph } from "./allgraph.js";
import { Login, QUERY, Query } from "./graphQL.js"

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
    const jwt = getCookie("jwt")
    if (jwt !=="") {
        Query(jwt, QUERY).then((data)=>{
            data = data.data
            document.body.removeChild(login)
            document.getElementById("prenom").innerText = data.user[0].attrs.firstName
            document.getElementById("nom").innerText = data.user[0].attrs.lastName
            document.getElementById("logout").onclick = ()=>{deletCookie("userLogin"), deletCookie("jwt"); window.location.reload()}
            document.getElementById("pp").src = data.user[0].attrs.image
            const formatter = new Intl.NumberFormat('fr-FR', {})
            document.getElementById("xps").innerText = formatter.format(parseInt(data.xp_total.aggregate.sum.amount ))
            document.getElementById("lvls").innerText = data.current_lvl.aggregate.max.amount
            LoadGraph(data)
            profil.style.visibility = "visible"
        })
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
