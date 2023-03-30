export

class GraphSVG {
    /**
     * @param {GraphData} Data 
     * @param {HTMLElement} HTMLElement 
     */
    constructor(Data, HTMLElement) {
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
        // this.listGroups = []
        this.listPoints = []
        this.listPaths = []
        // this.listTexts = []
        // this.listAxes = []
    }

    parseGraphData(GD) {
        const objGD = JSON.parse(GD)
        this.Data = objGD
        this.Title = objGD.Title
        this.TitleX = objGD.TitleX
        this.TitleY = objGD.TitleY
        this.MinX = objGD.MinX
        this.MaxX = objGD.MaxX
        this.MinY = objGD.MinY
        this.MaxY = objGD.MaxY
        this.Curves = objGD.Curves
        console.log(objGD);
    }

    update() {
        this.svg.innerHTML = ""
        const h = this.HTMLElement.clientHeight
        const w = this.HTMLElement.clientWidth
        this.svg.setAttribute("height" ,h)
        this.svg.setAttribute("width" ,w)
        const o = {x: w*0.05, y: h*0.95}
        const LegendG = this.createGroup(
            this.createAxe(o.x, o.y, w*0.95, o.y),//axe x
            this.createAxe(o.x, o.y, o.x, h*0.05),//axe y
            this.createText(this.TitleY, o.x/2, h/2, "", "writing-mode: sideways-lr;"),
            this.createText(this.TitleX, w/2 , (h+o.y)/2, "", ""),
            this.createText(this.Title, w/2 , (h-o.y)/2, "", "font-weight: 900;"),
        )

        this.addToSvg(LegendG)
        this.Data.Curves.forEach((c)=>{

            const Xs = c.map((p)=>{
                return p.X
            })
            const Ys = c.map((p)=>{
                return p.Y
            })
            const echellX = (w*0.9)/(Math.max(...Xs) - Math.min(...Xs))
            const echellY = (h*0.9)/(Math.max(...Ys) - Math.min(...Ys))
            const ofsetX = (w*0.05)
            const ofsetY = (h*0.05)
            const minX = Math.min(...Xs)
            const minY = Math.min(...Ys)

            const Graph = this.createGroup(
                this.createPath("", ...c.map((p)=>{return [(p.X-minX)*echellX+ofsetX, this.APY(echellY, p.Y-minY, h, ofsetY)]}).flat()),
                ...c.map((p)=>{
                    return this.createPoint((p.X-minX)*echellX+ofsetX, this.APY(echellY, p.Y-minY, h, ofsetY), p.R, p.Title, p.OnClick, p.Css)
                })    
            )
            this.addToSvg(Graph)
        })

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

    createPoint(x = 0, y = 0, r = 1, title, onclick, css){
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
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute("style", "fill: none; stroke: red; stroke-width: 4;"+css)
        var compt = 0.5
        const p1 = path[0], p2 = path[1]

        p.setAttribute("d", path.splice(2).reduce((acc, currentValue)=>{
            compt+=1/2
            if (compt === 1) compt = 0
            return acc.concat(compt%1>0?" ":" L ", currentValue.toString())
        }, "M ".concat(p1.toString(), " ", p2.toString())))
        return p
    }

    createText(text, x, y, orientation, css){
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.textContent = text
        t.setAttribute("x", x)
        t.setAttribute("y", y)
        t.setAttribute("text-anchor", "middle")
        t.setAttribute("style", css)
        return t
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
    /**
     * Apply echelle
     */
    APY(echel, y, h, ofsetY) {
        console.log(y, h, h - y*echel);
        return (h - y*echel)-ofsetY
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
            [{X:0, Y:0, R:1, Title: titlePoint1, OnClick: func1, Css:{Color: "red"}},
            {X:3, Y:3, R:1, Title: titlePoint2, OnClick: func2, Css:{Color: "blue"}}]
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