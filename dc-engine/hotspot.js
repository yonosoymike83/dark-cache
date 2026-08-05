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
            
        hotspot.addEventListener("click", (e) => {
        
            if (!window.hotspotEditor) return;
        
            if (!window.hotspotEditor.enabled) return;
        
            e.stopPropagation();
        
            window.hotspotEditor.select(hotspot);
        
        });
        }

        this.layer.appendChild(hotspot);

        const hotspotData = {

            element: hotspot,
        
            x: options.x,
            y: options.y,
            width: options.width,
            height: options.height
        
        };
        
        this.hotspots.push(hotspotData);
        
        this.update();
        
        return hotspotData;

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
