export

class GraphSVG {
    /**
     * @param {GraphData} Data 
     * @param {HTMLElement} HTMLElement 
     */
    constructor(Data, HTMLElement) {
        this.Data = Data
        this.HTMLElement = HTMLElement
        /**
         * @type {SVGSVGElement}
         */
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.HTMLElement.appendChild(this.svg)
        const th = this
        this.resizefunc = function (e) {
            // if(!divlis) window.removeEventListener("resize", this.resizefunc)
            th.update()
        }
        window.addEventListener("resize", this.resizefunc)
        this.parseGraphData(Data)
        this.listGroups = []
        this.listPoints = []
        this.listPaths = []
        this.listTexts = []
        this.listAxes = []
    }

    parseGraphData(GD) {
        const objGD = JSON.parse(GD)
        this.Title = objGD.Title
        this.TitleX = objGD.TitleX
        this.TitleY = objGD.TitleY
        this.MinX = objGD.MinX
        this.MaxX = objGD.MaxX
        this.MinY = objGD.MinY
        this.MaxY = objGD.MaxY
        this.Curves = objGD.Curves
    }

    update() {
        this.svg.innerHTML = ""
        const h = (this.MaxY || this.HTMLElement.clientHeight)
        const w = (this.MaxX || this.HTMLElement.clientWidth)
        this.svg.setAttribute("height" ,h)
        this.svg.setAttribute("width" ,w)
        const o = {x: w*0.05, y: h*0.95}
        const LegendG = this.createGroup( qsdjdqs ICI
            this.createAxe(...(o.x, o.y, w*0.95, o.y)),//axe x
            this.createAxe(o.x, o.y, o.x, h*0.05)//axe y
            // this.createText()
        )
        this.addToSvg(LegendG)
    }

    addToSvg(el){
        this.svg.appendChild(el)
    }
    createGroup(...elems){
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        elems.forEach((el)=>{
            g.appendChild(el)
        })
        return g
    }

    createPoint(x, y, r, title, onclick, css){
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute("cx", x)
        circle.setAttribute("cy", y)
        circle.setAttribute("r", r)
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        t.textContent = title
        circle.appendChild(t)
        circle.setAttribute("style", css)
        circle.addEventListener("click", onclick)
        return circle
    }

    createPath(css, ...path){

    }

    createText(text, x, y, orientation, css){

    }

    createAxe(x1, y1, x2, y2, css = "stroke:rgb(255,0,0);stroke-width:2"){
        const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l.setAttribute("x1", x1)
        l.setAttribute("y1", y1)
        l.setAttribute("x2", x2)
        l.setAttribute("y2", y2)
        l.setAttribute("style", css)
        return l
    }
}

class GraphData {
    /**
     * param must be in format:
     * `
    {
        Title: "myTitle",
        TitleX: "myTitleX",
        TitleY: "myTitleY",
        MinX: 10,
        MinY: 10,
        MaxX: 100,
        MaxY: 100,
        Curves: [
            [{X:0, Y:0, R:1, Title: titlePoint1, OnClick: func1, StyleCurve:{Color: "red"}},
            {X:3, Y:3, R:1, Title: titlePoint2, OnClick: func2, StyleCurve:{Color: "blue"}}]
        ]
    }
    `
     * 
     * @param {string} jsondata 
     */
    constructor(jsondata){

    }

}

`
{
    Title: "myTitle",
    Titlex: "myTitlex",
    Titley: "myTitley",
    MinX: 10,
    MinY: 10,
    MaxX: 100,
    MaxY: 100,
    Curves: [
        [{X:0, Y:0, R:1, Title: titlePoint1, OnClick: func1, StyleCurve:{Color: "red"}},
        {X:3, Y:3, R:1, Title: titlePoint2, OnClick: func2, StyleCurve:{Color: "blue"}}]
    ]
}
`