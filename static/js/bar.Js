export class RatioVS {

    /**
     * 
     * @param v1 
     * @param v2 
     * @param {HTMLElement} nodeHtml 
     */
    constructor(v1, v2, nodeHtml) {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        nodeHtml.appendChild(this.svg)
        this.parent = nodeHtml
        this.SetV1 = v1
        this.SetV2 = v2
        this.rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.update()
        const th = this
        window.addEventListener("resize", ()=>{
            th.update()
        })
    }

    set SetV1(v) {
        this.v1 = Math.round(v*100)/100
    }

    set SetV2(v) {
        this.v2 = Math.round(v*100)/100
    }

    update() {
        const info = this.parent.getBoundingClientRect();
        const ratio = info.width/(this.v1+this.v2);
        this.svg.setAttribute("height", info.height);
        this.svg.setAttribute("width", info.width);
        this.rect1.setAttribute("x", 0);
        this.rect1.setAttribute("y", 0);
        this.rect1.setAttribute("height", info.height);
        this.rect1.setAttribute("width", this.v1 * ratio);
        this.rect1.style.fill = "var(--color-green)";
        this.rect2.setAttribute("x", this.v1 * ratio);
        this.rect2.setAttribute("y", 0);
        this.rect2.setAttribute("height", info.height);
        this.rect2.setAttribute("width", this.v2 * ratio);
        this.rect2.style.fill = "var(--color-red)";
        this.svg.appendChild(this.rect1);
        this.svg.appendChild(this.rect2);

        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.style.fontSize = `${this.rect1.height.baseVal.value*0.16}px`;
        t.textContent = `${this.v1}`;
        this.svg.appendChild(t);
        t.setAttribute("x", this.rect1.width.baseVal.value/2-t.getBBox().width/2);
        t.setAttribute("y", this.rect1.height.baseVal.value/2+t.getBBox().height/2);

        const t2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t2.style.fontSize = `${this.rect2.height.baseVal.value*0.16}px`;
        t2.textContent = `${this.v2}`;
        this.svg.appendChild(t2);
        t2.setAttribute("x", (this.rect2.width.baseVal.value/2)+this.rect1.width.baseVal.value-t2.getBBox().width/2);
        t2.setAttribute("y", (this.rect2.height.baseVal.value)/2+t2.getBBox().height/2);

        const ratioT = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        ratioT.style.fontSize = `${this.rect2.height.baseVal.value*0.16}px`;
        ratioT.textContent = `${Math.round(this.v1/this.v2*100)/100}`;
        this.svg.appendChild(ratioT);
        ratioT.setAttribute("x", (this.rect1.width.baseVal.value)-ratioT.getBBox().width/2);
        ratioT.setAttribute("y", (this.rect2.height.baseVal.value)/2+t2.getBBox().height/2);
    }
}