class SceneManager {

    constructor(scene, sceneImage, hotspotManager, audioManager) {

        this.scene = scene;
        this.sceneImage = sceneImage;
        this.hotspots = hotspotManager;
        this.audio = audioManager;

        this.currentScene = null;

    }

    async load(sceneData) {

        this.currentScene = sceneData;

        // Fade de salida
        this.scene.style.opacity = "0";

        // Eliminar hotspots anteriores
        this.hotspots.clear();

        // Cargar imagen
        this.sceneImage.src = sceneData.image;

        await new Promise(resolve => {

            this.sceneImage.onload = resolve;

        });

        // Mostrar escena
        this.scene.style.display = "block";

        // Ajustar la capa de hotspots al tamaño REAL de la imagen
        this.updateHotspotLayer();

        // Crear hotspots
        if (sceneData.hotspots) {

            sceneData.hotspots.forEach(hotspot => {

                this.hotspots.add(hotspot);

            });

        }

        // -------------------------
        // AMBIENTE
        // -------------------------

        if (sceneData.ambient) {

            await this.audio.playAmbient(
                sceneData.ambient
            );

        } else {

            this.audio.stopAmbient();

        }

        // -------------------------
        // MÚSICA
        // -------------------------

        if (sceneData.music) {

            await this.audio.playMusic(
                sceneData.music
            );

        }

        // Fade de entrada
        requestAnimationFrame(() => {

            this.scene.style.opacity = "1";

        });

    }

    updateHotspotLayer() {

        const layer =
            document.getElementById("hotspotLayer");

        const imageRect =
            this.sceneImage.getBoundingClientRect();

        const sceneRect =
            this.scene.getBoundingClientRect();

        layer.style.left =
            (imageRect.left - sceneRect.left) + "px";

        layer.style.top =
            (imageRect.top - sceneRect.top) + "px";

        layer.style.width =
            imageRect.width + "px";

        layer.style.height =
            imageRect.height + "px";

    }

}
