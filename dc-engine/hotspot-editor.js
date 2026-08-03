class HotspotEditor {

    constructor(hotspotManager) {

        this.hotspotManager = hotspotManager;

        this.enabled = false;

        document.addEventListener("keydown", (e) => {

            if (e.key === "F2") {

                e.preventDefault();

                this.toggle();

            }

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

}
