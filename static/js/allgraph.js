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
const skilGraph = new CircleGraph(datarow.skill_Go.aggregate.max.amount/100 ,document.getElementById("skillgraph"))

}