import { LoginErr } from "./login.js";

export const queryXp = `
    {
    xp_view(where: {user: {login: {_eq: "Alann"}}}) {
        user {
            login
        }
        amount
        path
        event {
            createdAt
        }
    }
    }
`;

export function Query(jwt, query) {
    return fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify({
    query: query
    })
})
.then(rep => rep.json())
// .then(obj => console.log(obj))
.catch(err => console.log(err))
}

const url = 'https://zone01normandie.org/api/auth/signin';


export function Login(log, pws) {
    const authHeader = 'Basic ' + btoa(log + ':' + pws);
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': authHeader
        }
    })
    .then(response => {return response.json()})
    .then(data => {
        if (data.error) {
            console.log(data.error);
            LoginErr(data.error)
            return
        }
const queryidbymail = `
{
    user(where: {email: {_eq: "${log.toLowerCase()}"}}){
        login
    }
}
`;
const queryidbyName = `
{
    user(where: {login: {_eq: "${log}"}}){
        login
    }
}
`;
        Query(data, queryidbyName).then((p)=>{
            const id = p.data.user[0]
            if (!id) {
                Query(data, queryidbymail).then((p2)=>{
                const id2 = p2.data.user[0]
                if (id2) {
                    setCookie("jwt", data, 1)
                    setCookie("userLogin", id2.login, 1)
                    window.location.reload()
                }
                console.log(p2);
                })
            } else {
                setCookie("jwt", data, 1)
                setCookie("userLogin", id.login, 1)
                window.location.reload()
            }
            console.log(p);
        })
    })
    .catch(error => console.error(error));
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
