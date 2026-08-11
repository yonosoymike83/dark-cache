// ======================================================
// ESCENA 02
// DENTRO DE LA TIENDA
// ======================================================

const Scene02 = {

    id: "scene02",

    name: "La Tienda del Viejo Bug",

    image: "assets/images/escena02.png",

    music: "assets/music/escena02.mp3",

    ambient: null,

    // Hotspots obligatorios para poder entrar

    requiredHotspots: [

        "logbook",

    ],
    
    hotspots: [

        // ==========================================
        // LOGBOOK
        // ==========================================

        {

            id: "logbook",

            visits: 0,

            x: 90.79,
            y: 57.45,
            width: 5.76,
            height: 11.21,

            click(){

                 alert("HOTSPOT LOGBOOK FUNCIONA");

            }

        }

    ]

};
