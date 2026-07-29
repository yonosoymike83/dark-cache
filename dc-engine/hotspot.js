class HotspotManager {

    constructor(container){

        this.container = container;
        this.hotspots = [];

    }

    clear(){

        this.hotspots.forEach(h => h.remove());

        this.hotspots = [];

    }

    add(options){

        const hotspot = document.createElement("div");

        hotspot.className = "hotspot";

        hotspot.style.left = options.x + "px";
        hotspot.style.top = options.y + "px";
        hotspot.style.width = options.width + "px";
        hotspot.style.height = options.height + "px";

        hotspot.style.cursor = options.cursor || "pointer";

        if(options.click){

            hotspot.addEventListener("click", options.click);

        }

        this.container.appendChild(hotspot);

        this.hotspots.push(hotspot);

    }

}
