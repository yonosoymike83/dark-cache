// ======================================================
// ESCENA 01
// LA TIENDA DEL VIEJO BUG
// ======================================================

const Scene01 = {

    id: "scene01",

    name: "La Tienda del Viejo Bug",

    image: "assets/images/escena01.png",

    music: "assets/music/escena01.mp3",

    ambient: "assets/sounds/rain.ogg",

    // Hotspots obligatorios para poder entrar

    requiredHotspots: [

        "cartel01",
        "cartel02",
        "cartel03",
        "placa",
        "mostrador",
        "cat"

    ],

    visitedHotspots: [],

    hotspots: [

        // ==========================================
        // CAMPANARIO
        // ==========================================

        {

            id: "campanario",

            visits: 0,

            x: 21.65,
            y: 15.78,
            width: 5.20,
            height: 17.96,

            click(){

                showDialogSequence(
            
                    this,
            
                    DialogCampanario

                 );

            }

        },

        // ==========================================
        // FAROLA
        // ==========================================

        {

            id: "light",

            visits: 0,

            x: 9.15,
            y: 5.58,
            width: 6.94,
            height: 16.15,

            click(){

                showDialogSequence(

                    this,

                    DialogLight

                );

            }

        },

        // ==========================================
        // CARTEL TIENDA
        // ==========================================

        {

            id: "cartel01",

            visits: 0,

            x: 59.15,
            y: 17.16,
            width: 10.11,
            height: 10.84,

            click(){

                visitHotspot("cartel01");

                showDialogSequence(

                    this,

                    DialogCartel01

                );

            }

        },

        // ==========================================
        // CARTEL TIENDA LOGO GC
        // ==========================================

        {

            id: "cartel02",

            visits: 0,

            x: 72.79,
            y: 12.06,
            width: 6.28,
            height: 12.75,

            click(){

                visitHotspot("cartel02");

                showDialogSequence(

                    this,

                    DialogCartel02

                );

            }

        },
        
        // ==========================================
        // CARTEL CALLE
        // ==========================================
        
        {
        
            id: "cartel03",

            visits: 0,
        
            x: 68.30,
            y: 69.34,
            width: 4.96,
            height: 13.39,
        
            click(){

                visitHotspot("cartel03");

                showDialogSequence(

                    this,

                    DialogCartel03

                );

            }
        
        },
        
        // ==========================================
        // PLACA CALLE
        // ==========================================

        {

            id: "placa",

            visits: 0,

            x: 89.06,
            y: 18.97,
            width: 6.82,
            height: 11.05,

            click(){

                visitHotspot("placa");

                showDialogSequence(

                    this,

                    DialogPlaca

                );

            }

        },

        // ==========================================
        // ESCAPARATE
        // ==========================================

        {

            id: "mostrador",

            visits: 0,

            x: 67.17,
            y: 36.72,
            width: 13.28,
            height: 25.40,

            click(){

                visitHotspot("mostrador");

                showDialogSequence(

                    this,

                    DialogMostrador

                );

            }

        },

        // ==========================================
        // ALCANTARILLA
        // ==========================================

        {

            id: "alcantarilla",

            visits: 0,

            x: 29.07,
            y: 94.00,
            width: 11.24,
            height: 5.53,

            click(){

                showDialogSequence(

                    this,

                    DialogAlcantarilla

                );

            }

        },

        // ==========================================
        // CONTENEDOR
        // ==========================================

        {

            id: "trash",

            visits: 0,

            x: 84.75,
            y: 69.98,
            width: 7.12,
            height: 16.79,

            click(){

                showDialogSequence(

                    this,

                    DialogTrash

                );

            }

        },

        // ==========================================
        // GATO
        // ==========================================

        {

            id: "cat",

            visits: 0,

            x: 76.32,
            y: 81.46,
            width: 6.04,
            height: 15.52,

            click(){

                visitHotspot("cat");

                showDialogSequence(

                    this,

                    DialogCat

                );

            }

        },

        // ==========================================
        // PUERTA
        // ==========================================

        {

            id: "door",

            visits: 0,

            x: 59.02,
            y: 45.39,
            width: 3.49,
            height: 4.75,

            click(){
            
                if(canEnterShop()){
            
                    showDialogSequence(
            
                        this,
            
                        DialogEnterShop,
            
                        () => {
            
                            dialog.showChoice(
            
                                "¿Entramos?",
            
                                "SÍ",
            
                                "NO",
            
                                () => {
            
                                    enterShop();
            
                                },
            
                                () => {
            
                                    dialog.show(
                                        DialogStayOutside
                                    );
            
                                }
            
                            );
            
                        }
            
                    );
            
                }else{
            
                    showDialogSequence(
            
                        this,
            
                        DialogDoorLocked
            
                    );
            
                }
            
            }

        }

    ]

};

// ======================================================
// FUNCIONES AUXILIARES
// ======================================================

function visitHotspot(id){

    if(

        !Scene01.visitedHotspots.includes(id)

    ){

        Scene01.visitedHotspots.push(id);

    }

}

// ------------------------------------------------------

function canEnterShop(){

    return Scene01.requiredHotspots.every(

        hotspot =>

            Scene01.visitedHotspots.includes(

                hotspot

            )

    );

}

// ------------------------------------------------------

function showDialogSequence(
    hotspot,
    dialogs,
    onFinish = null
){

    const index = Math.min(

        hotspot.visits,

        dialogs.length - 1

    );

    const isLast =
        index === dialogs.length - 1;

    dialog.show(

        [dialogs[index]],

        function(){

            if(isLast && onFinish){

                onFinish();

            }

        }

    );

    hotspot.visits++;

}

// ======================================================
// ENTRAR EN LA TIENDA
// ======================================================

function enterShop(){

    const scene =
        document.getElementById("scene");

    // Oscurecer la escena actual
    scene.style.transition =
        "opacity 1s ease";

    scene.style.opacity = "0";

    // Esperar a que termine el fundido
    setTimeout(() => {

        // Sonido de la puerta
        const doorSound =
            new Audio("assets/sounds/door.ogg");

        doorSound.play().catch(() => {});

        // Cargar escena 02
        sceneManager.load(Scene02);

    }, 1000);

}
