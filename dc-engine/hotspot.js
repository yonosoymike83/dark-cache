class HotspotManager {

    constructor(scene, image, layer){

        this.scene = scene;
        this.image = image;
        this.layer = layer;

        this.hotspots = [];

        window.addEventListener("resize", () => this.update());

        this.image.addEventListener("load", () => this.update());

    }

    clear(){

        this.hotspots.forEach(h => h.element.remove());

        this.hotspots = [];

    }

    add(options){

        const hotspot = document.createElement("div");

        hotspot.className = "hotspot";

        hotspot.style.cursor = options.cursor || "pointer";

        if(options.click){

            hotspot.addEventListener("click", options.click);

        }

        this.layer.appendChild(hotspot);

        this.hotspots.push({

            element: hotspot,

            x: options.x,
            y: options.y,
            width: options.width,
            height: options.height

        });

        this.update();

    }

    update(){

        const rect = this.image.getBoundingClientRect();

        this.layer.style.left = rect.left + "px";
        this.layer.style.top = rect.top + "px";
        this.layer.style.width = rect.width + "px";
        this.layer.style.height = rect.height + "px";

        this.hotspots.forEach(h => {

            h.element.style.left = h.x + "%";
            h.element.style.top = h.y + "%";
            h.element.style.width = h.width + "%";
            h.element.style.height = h.height + "%";

        });

    }

}
