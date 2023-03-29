import { GraphSVG } from "./graph.js";

const div = document.getElementById("graphtest")
console.log(div);
const newGraph = new GraphSVG(`{
    "Title": "myTitle",
    "TitleX": "myTitlex",
    "TitleY": "myTitley",
    "MinX": 10,
    "MinY": 10,
    "MaxX": 100,
    "MaxY": 100,
    "Curves": [
        [{"X":30, "Y":0, "R":10, "Title": "titlePoint1", "Css":{"Color": "red"}},
        {"X":60, "Y":30, "R":10, "Title": "titlePoint2", "Css":{"Color": "blue"}}]
    ]
}
`, div)

// const p = newGraph.createPoint(30, 30, 20, "HELLO CIRCLE", null, "fill: red;")
// const g = newGraph.createGroup(p)
// newGraph.addToSvg(g)

newGraph.update()