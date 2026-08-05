class HotspotEditor {

    constructor(hotspotManager) {

        this.hotspotManager = hotspotManager;

        this.scene = document.getElementById("scene");
        this.layer = document.getElementById("hotspotLayer");

        this.enabled = false;

        this.dragging = false;
        this.moving = false;

        this.startX = 0;
        this.startY = 0;

        this.preview = null;

        this.selected = null;

        this.resizing = false;

        // -------------------------
        // PANEL
        // -------------------------

        this.editorPanel =
            document.getElementById("editorPanel");

        this.editorCode =
            document.getElementById("editorCode");

        this.editorId =
            document.getElementById("editorId");
        
        this.saveIdButton =
            document.getElementById("saveIdButton");

        this.copyButton =
            document.getElementById("copyHotspotButton");

        this.closeButton =
            document.getElementById("closeEditorButton");

        this.copyButton.addEventListener(

            "click",

            () => this.copyCode()

        );

        this.saveIdButton.addEventListener(

            "click",
        
            ()=>{
        
                if(!this.selected) return;
        
                const id = this.editorId.value.trim();
        
                if(id==="") return;
        
                this.selected.id = id;
        
                this.updateCode();
        
            }

);
        this.closeButton.addEventListener(

            "click",

            () => {

                this.editorPanel.style.display = "none";

            }

        );

        // -------------------------
        // F2
        // -------------------------

        document.addEventListener(

            "keydown",

            (e)=>{

                if(e.key==="F2"){

                    e.preventDefault();

                    this.toggle();

                }

                if(!this.enabled) return;

                if(e.key==="Delete"){

                    this.deleteSelected();

                }

            }

        );

        // -------------------------
        // RATÓN
        // -------------------------

        this.scene.addEventListener(

            "pointerdown",

            (e)=>this.pointerDown(e)

        );

        this.scene.addEventListener(

            "pointermove",

            (e)=>this.pointerMove(e)

        );

        this.scene.addEventListener(

            "pointerup",

            (e)=>this.pointerUp(e)

        );
        }
        
    //================================================

    toggle(){

        this.enabled=!this.enabled;

        document.body.classList.toggle(

            "editor-mode",

            this.enabled

        );

        if(!this.enabled){

            this.clearSelection();

            this.editorPanel.style.display="none";

        }

        console.log(

            "Hotspot Editor",

            this.enabled ? "ON" : "OFF"

        );

    }

    //================================================

    pointerDown(e){
        
    if(!this.enabled) return;

    // ¿Ha pulsado un hotspot?

    if(e.target.classList.contains("hotspot")){

        const hotspot =
            this.hotspotManager.findByElement(
                e.target
            );

        if(!hotspot) return;

        this.select(hotspot);

        this.dragging = false;

        if(e.altKey){

            this.resizing = true;

        }else{

            this.moving = true;

        }

        return;

    }

    // Crear hotspot nuevo

    this.clearSelection();

    this.dragging = true;

    const rect =
        this.layer.getBoundingClientRect();

    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;

    this.preview = document.createElement("div");

    this.preview.style.position = "absolute";

    this.preview.style.left = this.startX + "px";
    this.preview.style.top = this.startY + "px";

    this.preview.style.width = "0px";
    this.preview.style.height = "0px";

    this.preview.style.background =
        "rgba(0,255,120,.25)";

    this.preview.style.border =
        "2px solid #00ff66";

    this.preview.style.boxSizing = "border-box";

    this.preview.style.pointerEvents = "none";

    this.layer.appendChild(this.preview);

}

    //================================================

    pointerMove(e){
    
        if(!this.enabled) return;
    
        const rect =
            this.layer.getBoundingClientRect();
    
        // -------------------
        // REDIMENSIONAR
        // -------------------
    
        if(this.resizing && this.selected){
    
            const x =
                ((e.clientX - rect.left) / rect.width) * 100;
    
            const y =
                ((e.clientY - rect.top) / rect.height) * 100;
    
            this.selected.width =
                Math.max(1, x - this.selected.x);
    
            this.selected.height =
                Math.max(1, y - this.selected.y);
    
            this.hotspotManager.update();
    
            this.updateCode();
    
            return;
    
        }
    
        // -------------------
        // MOVER
        // -------------------
    
        if(this.moving && this.selected){
    
            this.selected.x =
                ((e.clientX - rect.left) / rect.width) * 100
                - this.selected.width / 2;
    
            this.selected.y =
                ((e.clientY - rect.top) / rect.height) * 100
                - this.selected.height / 2;
    
            this.hotspotManager.update();
    
            this.updateCode();
    
            return;
    
        }
    
        // -------------------
        // CREAR
        // -------------------
    
        if(!this.dragging) return;
    
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        const left = Math.min(this.startX, x);
        const top = Math.min(this.startY, y);
    
        const width = Math.abs(x - this.startX);
        const height = Math.abs(y - this.startY);
    
        this.preview.style.left = left + "px";
        this.preview.style.top = top + "px";
    
        this.preview.style.width = width + "px";
        this.preview.style.height = height + "px";
    
    }

    //================================================

    pointerUp(){
    
        if(this.moving){
    
            this.moving = false;
    
            this.updateCode();
    
            return;
    
        }
    
        if(this.resizing){
    
            this.resizing = false;
    
            this.updateCode();
    
            return;
    
        }
    
        if(!this.dragging) return;
    
        this.finishDraw();
    
    }
    
    //================================================

    select(hotspot){

        this.clearSelection();

        this.selected=hotspot;

        hotspot.element.style.outline=

            "3px solid yellow";

        this.updateCode();

        this.editorPanel.style.display="block";

    }

    //================================================

    clearSelection(){

        if(this.selected){

            this.selected.element.style.outline="";

        }

        this.selected=null;

    }
        //================================================

    finishDraw(){

        this.dragging=false;

        const rect =
            this.layer.getBoundingClientRect();

        const left =
            parseFloat(this.preview.style.left);

        const top =
            parseFloat(this.preview.style.top);

        const width =
            parseFloat(this.preview.style.width);

        const height =
            parseFloat(this.preview.style.height);

        this.preview.remove();

        this.preview=null;

        if(width<5 || height<5){

            return;

        }

        const hotspot =
            this.hotspotManager.add({

                id:"nuevoHotspot",

                x:(left/rect.width)*100,

                y:(top/rect.height)*100,

                width:(width/rect.width)*100,

                height:(height/rect.height)*100,

                click(){}

            });

        this.select(hotspot);

    }

    //================================================

    updateCode(){

        if(!this.selected){
        
            this.editorId.value = "";
        
            this.editorCode.textContent = "";
        
            return;
        
        }
        
        this.editorId.value = this.selected.id;

        this.editorCode.textContent=`{

    id: "${this.selected.id}",

    x: ${this.selected.x.toFixed(2)},
    y: ${this.selected.y.toFixed(2)},
    width: ${this.selected.width.toFixed(2)},
    height: ${this.selected.height.toFixed(2)},

    click(){

    }

},`;

    }

    //================================================

    copyCode(){

        if(!this.selected) return;

        navigator.clipboard.writeText(

            this.editorCode.textContent

        );

        this.copyButton.textContent="✅ COPIADO";

        setTimeout(()=>{

            this.copyButton.textContent="📋 COPIAR";

        },1000);

            }

    //================================================

    deleteSelected(){
    
        if(!this.selected) return;
    
        this.hotspotManager.remove(
            this.selected
        );
    
        this.clearSelection();
    
        this.editorPanel.style.display="none";

        this.editorId.value="";
    
    }

}
