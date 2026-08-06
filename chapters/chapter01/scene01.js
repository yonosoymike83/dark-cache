const Scene01 = {

    id: "scene01",

    name: "La Tienda del Viejo Bug",

    image: "assets/images/escena01.png",

    music: "assets/music/escena01.mp3",

    ambient: "assets/sounds/rain.ogg",

    hotspots: [
                {
        
            id: "campanario",
        
            x: 21.65,
            y: 15.78,
            width: 5.20,
            height: 17.96,
        
            click(){
        
            }
        
        },
                {
        
            id: "light",
        
            x: 9.15,
            y: 5.58,
            width: 6.94,
            height: 16.15,
        
            click(){
        
            }
        
        },
                {
        
            id: "cartel01",
        
            x: 59.15,
            y: 17.16,
            width: 10.11,
            height: 10.84,
        
            click(){
        
            }
        
        },
                {
        
            id: "cartel02",
        
            x: 72.79,
            y: 12.06,
            width: 6.28,
            height: 12.75,
        
            click(){
        
            }
        
        },
                {
        
            id: "placa",
        
            x: 89.06,
            y: 18.97,
            width: 6.82,
            height: 11.05,
        
            click(){
        
            }
        
        },
                {
        
            id: "mostrador",
        
            x: 67.17,
            y: 36.72,
            width: 13.28,
            height: 25.40,
        
            click(){
        
            }
        
        },
                {
        
            id: "alcantarilla",
        
            x: 29.07,
            y: 94.00,
            width: 11.24,
            height: 5.53,
        
            click(){
        
            }
        
        },
                {
        
            id: "trash",
        
            x: 84.75,
            y: 69.98,
            width: 7.12,
            height: 16.79,
        
            click(){
        
            }
        
        },
        {
        
            id: "cat",
        
            x: 76.32,
            y: 81.46,
            width: 6.04,
            height: 15.52,
        
            click(){
        
            }
        
        },
        {

            id: "door",

            x: 59.02,
            y: 45.39,
            width: 3.49,
            height: 4.75,

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
