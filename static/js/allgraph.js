import { RatioVS } from "./bar.Js";
import { CircleGraph } from "./circlegraph.js";
import { GraphSVG } from "./graph.js";

export function LoadGraph(datarow) {
var lastamount = 0
// console.log(datarow);
const data = datarow.transaction.map((d)=>{
    lastamount += d.amount
    return {"X":Date.parse(d.createdAt), "Y":lastamount, "R":6, "Title":d.path, "StyleCurve":{"Color": "red"}}
}).filter((n)=>{
    if (n !== null) return n
})
data.sort((a, b)=> a.X - b.X)
const GRdata = 
    `
{
    "Title": "Projects",
    "TitleX": "Timeline",
    "TitleY": "Xps",
    "Curves": [
        ${JSON.stringify(data)}
    ]
}
`
const projectgraph = new GraphSVG(GRdata, document.getElementById("projectgraph"))
const ratioGraph = new RatioVS(datarow.up_total.aggregate.sum.amount, datarow.down_total.aggregate.sum.amount ,document.getElementById("ratiograph"))
console.log(datarow);
const skills = []
const skillsName = []
datarow.skills.nodes.forEach((v)=>{
    if (!skillsName.includes(v.type) && v.amount != 0) {
        skills.push(v)
        skillsName.push(v.type)
    }
})
const skillsDiv = document.getElementById("skillsgraph")
skills.sort((a,b) => b.amount-a.amount)
skills.forEach((skill)=>{
    const div = document.createElement("div")
    div.id = skill.type
    skillsDiv.appendChild(div)
    new CircleGraph(skill.amount/100, div, skill.type, "white")
})
}