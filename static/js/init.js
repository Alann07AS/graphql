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
        [{"X":20, "Y":0, "R":10, "Title": "titlePoint0", "Css":"fill: white;"},
        {"X":30, "Y":10, "R":10, "Title": "titlePoint1", "Css":"fill: red;"},
        {"X":60, "Y":30, "R":10, "Title": "titlePoint2", "Css":"fill: blue;"},
        {"X":90, "Y":40, "R":10, "Title": "titlePoint3", "Css":"fill: green;"}
        ]
    ]
}
`, div)

// const p = newGraph.createPoint(30, 30, 20, "HELLO CIRCLE", null, "fill: red;")
// const g = newGraph.createGroup(p)
// newGraph.addToSvg(g)

newGraph.update()