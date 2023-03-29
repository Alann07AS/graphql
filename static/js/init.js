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
    "Curve": [
        [{"X":0, "Y":0, "R":1, "Title": "titlePoint1", "StyleCurve":{"Color": "red"}},
        {"X":3, "Y":3, "R":1, "Title": "titlePoint2", "StyleCurve":{"Color": "blue"}}]
    ]
}
`, div)

// const p = newGraph.createPoint(30, 30, 20, "HELLO CIRCLE", null, "fill: red;")
// const g = newGraph.createGroup(p)
// newGraph.addToSvg(g)

newGraph.update()