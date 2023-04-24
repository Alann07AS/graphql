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
        this.v1 = v1
        this.v2 = v2
        this.rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.update()
        const th = this
        window.addEventListener("resize", ()=>{
            th.update()
        })
    }

    update() {
        const info = this.parent.getBoundingClientRect()
        const ratio = info.width/(this.v1+this.v2)
        this.svg.setAttribute("height", info.height)
        this.svg.setAttribute("width", info.width)
        this.rect1.setAttribute("x", 0)
        this.rect1.setAttribute("y", 0)
        this.rect1.setAttribute("height", info.height)
        this.rect1.setAttribute("width", this.v1 * ratio)
        this.rect1.style.fill = "var(--color-green)"
        this.rect2.setAttribute("x", this.v1 * ratio)
        this.rect2.setAttribute("y", 0)
        this.rect2.setAttribute("height", info.height)
        this.rect2.setAttribute("width", this.v2 * ratio)
        this.rect2.style.fill = "var(--color-red)"
        this.svg.appendChild(this.rect1)
        this.svg.appendChild(this.rect2)
    }
}