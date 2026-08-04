class HotspotEditor {

    constructor(hotspotManager) {

        this.hotspotManager = hotspotManager;

        this.enabled = false;

        this.dragging = false;

        this.startX = 0;
        this.startY = 0;

        this.preview = null;

        document.addEventListener("keydown", (e) => {

            if (e.key === "F2") {

                e.preventDefault();

                this.toggle();

            }

        });

        const scene = document.getElementById("scene");

        scene.addEventListener("pointerdown", (e) => {

            if (!this.enabled) return;

            this.startDraw(e);

        });

        scene.addEventListener("pointermove", (e) => {

            if (!this.enabled) return;

            this.updateDraw(e);

        });

        scene.addEventListener("pointerup", (e) => {

            if (!this.enabled) return;

            this.finishDraw(e);

        });

    }

    toggle() {

        this.enabled = !this.enabled;

        document.body.classList.toggle(
            "editor-mode",
            this.enabled
        );

        console.log(
            "Hotspot Editor:",
            this.enabled ? "ON" : "OFF"
        );

    }

    startDraw(e){

    }

    updateDraw(e){

    }

    finishDraw(e){

    }

}
