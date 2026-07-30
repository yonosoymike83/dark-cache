class SceneManager{

    constructor(scene, sceneImage, hotspotManager){

        this.scene = scene;
        this.sceneImage = sceneImage;
        this.hotspots = hotspotManager;

        this.currentScene = null;

    }

    async load(sceneData){

        this.currentScene = sceneData;

        // Oculta la escena
        this.scene.style.opacity = "0";

        // Limpia hotspots anteriores
        this.hotspots.clear();

        // Carga la imagen
        this.sceneImage.src = sceneData.image;

        await new Promise(resolve => {

            this.sceneImage.onload = resolve;

        });

        // Muestra la escena
        this.scene.style.display = "block";

        // Crea hotspots
        if(sceneData.hotspots){

            sceneData.hotspots.forEach(hotspot=>{

                this.hotspots.add(hotspot);

            });

        }

        // Fade de entrada
        requestAnimationFrame(()=>{

            this.scene.style.opacity="1";

        });

    }

}
