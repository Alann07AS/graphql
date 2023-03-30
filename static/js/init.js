import { GraphSVG } from "./graph.js";
const div = document.getElementById("graphtest")
const newGraph = new GraphSVG(`{
    "Title": "myTitle",
    "TitleX": "myTitlex",
    "TitleY": "myTitley",
    "MinX": 18,
    "MinY": 10,
    "MaxX": 102,
    "MaxY": 32,
    "Curves": [
        [
            {"X":20, "Y":20, "R":10, "Title": "titlePoint0", "Css":"fill: white;"},
            {"X":45, "Y":30, "R":10, "Title": "titlePoint2", "Css":"fill: blue;"},
            {"X":90, "Y":12, "R":10, "Title": "titlePoint2", "Css":"fill: red;"},
            {"X":100, "Y":19, "R":10, "Title": "titlePoint2", "Css":"fill: red;"}
        ]
    ]
}   
`, div)
