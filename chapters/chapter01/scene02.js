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

    // Hotspots obligatorios para poder pasar a escena 03

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

                openLogbook();

            }

        },


        // ==========================================
        // GAME BOY
        // ==========================================

        {

            id: "gameboy",

            visits: 0,

            x: 77.48,
            y: 71.40,
            width: 4.01,
            height: 15.76,

            click(){

                handleGameBoyClick(this);

            }

        }

    ]

};


// ======================================================
// GAME BOY
// ======================================================

function handleGameBoyClick(hotspot){

    /*
     * DialogGameBoy contiene las frases de la Game Boy.
     *
     * Todas las frases anteriores se muestran normalmente.
     *
     * La última frase NO se muestra como un diálogo normal:
     * se utiliza directamente como pregunta del SÍ / NO.
     */


    const lastStep =
        DialogGameBoy.length - 1;


    // ==================================================
    // TODAVÍA QUEDAN FRASES ANTES DE LA PREGUNTA
    // ==================================================

    if(hotspot.visits < lastStep){

        const currentDialog =
            DialogGameBoy[hotspot.visits];


        hotspot.visits++;


        dialog.show(

            [currentDialog]

        );


        return;

    }


    // ==================================================
    // PREGUNTA FINAL
    // ==================================================

    const question =
        DialogGameBoy[lastStep].text;


    dialog.showChoice(

        question,

        "SÍ",

        "NO",

        () => {

            // ------------------------------------------
            // SÍ
            // ------------------------------------------

            openGameBoy();

        },

        () => {

            // ------------------------------------------
            // NO
            // ------------------------------------------

            dialog.show(

                DialogGameBoyNo

            );

        }

    );


    // Evitamos que vuelva a intentar mostrar
    // la pregunta como si fuera una frase.

    hotspot.visits++;

}
