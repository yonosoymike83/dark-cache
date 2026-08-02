const Scene01 = {

    id: "scene01",

    name: "La Tienda del Viejo Bug",

    image: "assets/images/escena01.png",

    music: "assets/music/escena01.mp3",

    ambient: "assets/sounds/rain.ogg",

    hotspots: [

        {

            id: "shop",

            x: 69.7,
            y: 26.5,
            width: 12.5,
            height: 42,

            click() {

                dialog.show(

                    DialogEnterShop,

                    function(){

                        // Más adelante:
                        // sceneManager.load(Scene02);

                        console.log("Entrar en la tienda");

                    }

                );

            }

        }

    ]

};
