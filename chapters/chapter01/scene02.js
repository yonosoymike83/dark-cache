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

    hotspots: [

        // ==========================================
        // LOGBOOK
        // ==========================================

        {

            id: "logbook",

            visits: 0,

            x: 91.81,
            y: 57.55,
            width: 4.25,
            height: 10.41,

            click(){

                alert("HOTSPOT DEL LOGBOOK");

            }

        }

    ]

};
