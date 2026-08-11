class HotspotManager {

    constructor(scene, image, layer){

        this.scene = scene;
        this.image = image;
        this.layer = layer;

        this.hotspots = [];

        window.addEventListener(
            "resize",
            () => this.update()
        );

        this.image.addEventListener(
            "load",
            () => this.update()
        );

    }

    //================================================

    clear(){

        this.hotspots.forEach(h=>{

            h.element.remove();

        });

        this.hotspots=[];

    }

    //================================================

    add(data){

        const hotspot={

            id:data.id || "hotspot",

            visits:data.visits || 0,

            enterVisits:data.enterVisits || 0,

            x:data.x,
            y:data.y,

            width:data.width,
            height:data.height,

            cursor:data.cursor || "pointer",

            click:data.click || function(){},

            element:document.createElement("div")

        };

        hotspot.element.className="hotspot";

        hotspot.element.style.cursor=hotspot.cursor;

        hotspot.element.addEventListener(

            "click",

            ()=>{

                hotspot.click.call(hotspot);

            }

        );

        this.layer.appendChild(

            hotspot.element

        );

        this.hotspots.push(

            hotspot

        );

        this.update();

        return hotspot;

    }

    //================================================

    remove(hotspot){

        hotspot.element.remove();

        this.hotspots=this.hotspots.filter(

            h=>h!==hotspot

        );

    }

    //================================================

    update(){

        const imageRect=
            this.image.getBoundingClientRect();

        const sceneRect=
            this.scene.getBoundingClientRect();

        this.layer.style.left=
            (imageRect.left-sceneRect.left)+"px";

        this.layer.style.top=
            (imageRect.top-sceneRect.top)+"px";

        this.layer.style.width=
            imageRect.width+"px";

        this.layer.style.height=
            imageRect.height+"px";

        this.hotspots.forEach(h=>{

            h.element.style.left=
                h.x+"%";

            h.element.style.top=
                h.y+"%";

            h.element.style.width=
                h.width+"%";

            h.element.style.height=
                h.height+"%";

        });

    }

    //================================================

    findByElement(element){

        return this.hotspots.find(

            h=>h.element===element

        );

    }

}
