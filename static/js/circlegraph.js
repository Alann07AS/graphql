export class CircleGraph {
    /**
     * 
     * @param {number} c 
     * @param {HTMLElement} div 
     * @param {number} value 
     */
    constructor (value = 0, div, title, color = "red") {
        this.div = div;
        this.title = title;
        this.c = 0;
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.classList.add("circular-chart");
        this.style = document.createElement("style")
        this.style.innerText = `
        .circular-chart {
            display: block;
            margin: 10px auto;
          }
          
          .circle {
            stroke: ${color};
            fill: none;
            stroke-linecap: round;
            animation: progress 1s ease-out forwards;
          }

          .text {
            fill: ${color};
            font-family: CordiaUPC;
          }
          
          @keyframes progress {
            0% {
              stroke-dasharray: 0 ${this.c};
            }
          }
        `
        this.div.appendChild(this.style);
        this.value = value;
        window.addEventListener("resize", ()=>{this.update(); console.log("REZISE");})
        this.div.appendChild(this.svg);
        this.update();
    }
    update() {
        this.svg.innerHTML = "";
        const info = this.div.getBoundingClientRect();
        this.size = (info.height<info.width?info.height:info.width)
        this.svg.setAttribute("height", this.size);
        this.svg.setAttribute("width", this.size);
        const radius = this.size*0.9/2;
        this.c =  radius * (2*Math.PI);
        const diametre = radius*2;
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.classList.add("circle")
        p.setAttribute("d", `
        M${(this.size)/2} ${ this.size*0.05}
        a ${radius} ${radius} 0 0 1 0 ${diametre}
        a ${radius} ${radius} 0 0 1 0 -${diametre}"
        `)
        p.style.strokeWidth = `${this.size*0.1}`
        p.setAttribute("fill","none");
        p.setAttribute("stroke","#444");
        p.setAttribute("stroke-width","1");
        p.setAttribute("stroke-dasharray",`${this.value*this.c}, ${this.c}`);
        this.svg.appendChild(p);

        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.style.fontSize = `${this.size*0.008}em`;
        t.textContent = `${Math.round((this.value*100)*10)/10}%`
        this.svg.appendChild(t);
        t.setAttribute("x", this.size/2-t.getBBox().width/2)
        t.setAttribute("y", (this.title?this.size/3:this.size/2)+t.getBBox().height/2)
        t.classList.add("text")

        const t2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t2.textContent = this.title?this.title:""
        t2.style.fontSize = `${this.size*0.008}em`;
        this.svg.appendChild(t2);
        t2.setAttribute("x", this.size/2-t2.getBBox().width/2)
        t2.setAttribute("y", this.size/3*2)
        t2.classList.add("text")
    }
}