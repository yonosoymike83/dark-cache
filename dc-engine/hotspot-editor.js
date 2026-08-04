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

    startDraw(e) {

        this.dragging = true;

        const rect = document
            .getElementById("scene")
            .getBoundingClientRect();

        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;

        this.preview = document.createElement("div");

        this.preview.style.position = "absolute";

        this.preview.style.left = this.startX + "px";
        this.preview.style.top = this.startY + "px";

        this.preview.style.width = "0px";
        this.preview.style.height = "0px";

        this.preview.style.background = "rgba(0,255,120,.20)";
        this.preview.style.border = "2px solid #00ff66";

        this.preview.style.pointerEvents = "none";

        document
            .getElementById("scene")
            .appendChild(this.preview);

    }

    updateDraw(e) {

        if (!this.dragging) return;

        const rect = document
            .getElementById("scene")
            .getBoundingClientRect();

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

    finishDraw(e) {

        if (!this.dragging) return;

        this.dragging = false;

        console.log("Hotspot creado.");

    }

}
