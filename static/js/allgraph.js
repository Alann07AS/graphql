import { GraphSVG } from "./graph.js";
import { Query } from "./graphQL.js";
import { getCookie } from "./login.js";

export function LoadGraph() {
    console.log("COUCOU");
}

const jwt = getCookie("jwt")
const login = getCookie("userLogin")

const queryXpProject = `
{
    xp_view(where: {user: {login: {_eq: "${login}"}}}) {
        user {
            login
        }
        amount
        path
        event {
            created_at: createdAt
        }
    }
}
`

Query(jwt, queryXpProject).then((rawdata)=>{
    console.log(rawdata.data.xp_view);
    var lastamount = 0
    const data = rawdata.data.xp_view.map((d)=>{
        if (!d.event) return
        lastamount += d.amount
        return {"X":Date.parse(d.event.created_at), "Y":lastamount, "R":4, "Title":d.path, "StyleCurve":{"Color": "red"}}
    }).filter((n)=>{
        if (n !== null) return n
    })
    data.sort((a, b)=> a.X - b.X)
    console.log(data);
    const GRdata = 
    `
{
    "Title": "myTitle",
    "Titlex": "myTitlex",
    "Titley": "myTitley",
    "Curves": [
        ${JSON.stringify(data)}
    ]
}
`
console.log(GRdata);
    const projectgraph = new GraphSVG(GRdata, document.getElementById("projectgraph"))
})
