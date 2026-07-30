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

        // Ocultar escena
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

        // Crear hotspots
        if (sceneData.hotspots) {

            sceneData.hotspots.forEach(hotspot => {

                this.hotspots.add(hotspot);

            });

        }

        // Reproducir ambiente
        if (sceneData.ambient) {

            await this.audio.playAmbient(sceneData.ambient);

        }

        // Reproducir música
        if (sceneData.music) {

            await this.audio.playMusic(sceneData.music);

        }

        // Fade de entrada
        requestAnimationFrame(() => {

            this.scene.style.opacity = "1";

        });

    }

}
