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

                const lastStep =
                    DialogLogbook.length - 1;


                // ==========================================
                // TODAVÍA QUEDAN FRASES
                // ==========================================

                if(this.visits < lastStep){

                    const currentDialog =
                        DialogLogbook[this.visits];

                    this.visits++;

                    dialog.show(

                        [currentDialog]

                    );

                    return;

                }


                // ==========================================
                // ÚLTIMA FRASE = PREGUNTA
                // ==========================================

                const question =
                    DialogLogbook[lastStep].text;


                dialog.showChoice(

                    question,

                    "SÍ",

                    "NO",

                    () => {

                        // SÍ → abrir logbook

                        openLogbook();

                    },

                    () => {

                        // NO → mostrar despedida

                        dialog.show(

                            DialogLogbookNo

                        );

                    }

                );


                // Evitar repetir la pregunta

                this.visits++;

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
     * DialogGameBoy contiene las frases.
     *
     * La última frase es la pregunta:
     *
     * "¿Echamos una partida?"
     *
     * En ese mismo clic aparecen SÍ / NO.
     */


    const lastStep =
        DialogGameBoy.length - 1;


    // ==========================================
    // TODAVÍA QUEDAN FRASES
    // ==========================================

    if(hotspot.visits < lastStep){

        const currentDialog =
            DialogGameBoy[hotspot.visits];


        hotspot.visits++;


        dialog.show(

            [currentDialog]

        );


        return;

    }


    // ==========================================
    // ÚLTIMA FRASE = PREGUNTA
    // ==========================================

    const question =
        DialogGameBoy[lastStep].text;


    dialog.showChoice(

        question,

        "SÍ",

        "NO",

        () => {

            // SÍ → abrir Game Boy

            openGameBoy();

        },

        () => {

            // NO → mostrar despedida

            dialog.show(

                DialogGameBoyNo

            );

        }

    );


    // Evitar repetir la pregunta

    hotspot.visits++;

}
