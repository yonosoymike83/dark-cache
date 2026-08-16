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


    // ==================================================
    // HOTSPOTS OBLIGATORIOS PARA PASAR A ESCENA 03
    // ==================================================

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
                    DialogLogbookIntro.length - 1;


                // ==========================================
                // TODAVÍA QUEDAN FRASES
                // ==========================================

                if(this.visits < lastStep){

                    const currentDialog =
                        DialogLogbookIntro[this.visits];

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
                    DialogLogbookIntro[lastStep].text;


                dialog.showChoice(

                    question,

                    "SÍ",

                    "NO",


                    () => {

                        // ==================================
                        // SÍ → ABRIR DIRECTAMENTE EL LIBRO
                        // ==================================

                        showLogbook();

                    },


                    () => {

                        // ==================================
                        // NO
                        // ==================================

                        dialog.show(

                            DialogLogbookNo

                        );

                    }

                );


                // Evitamos repetir la pregunta

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

                const lastStep =
                    DialogGameBoy.length - 1;


                // ==========================================
                // TODAVÍA QUEDAN FRASES
                // ==========================================

                if(this.visits < lastStep){

                    const currentDialog =
                        DialogGameBoy[this.visits];

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
                    DialogGameBoy[lastStep].text;


                dialog.showChoice(

                    question,

                    "SÍ",

                    "NO",


                    () => {

                        // ==================================
                        // SÍ → ABRIR GAME BOY
                        // ==================================

                        showGameBoy();

                    },


                    () => {

                        // ==================================
                        // NO
                        // ==================================

                        dialog.show(

                            DialogGameBoyNo

                        );

                    }

                );


                // Evitamos repetir la pregunta

                this.visits++;

            }

        },


        // ==========================================
        // AJEDREZ
        // ==========================================

        {

            id: "chess",

            visits: 0,

            // ==========================================
            // MODIFICA ESTAS COORDENADAS
            // ==========================================

            x: 50,
            y: 50,
            width: 10,
            height: 15,


            click(){

                const lastStep =
                    DialogChess.length - 1;


                // ==========================================
                // TODAVÍA QUEDAN FRASES
                // ==========================================

                if(this.visits < lastStep){

                    const currentDialog =
                        DialogChess[this.visits];

                    this.visits++;


                    dialog.show(

                        [currentDialog]

                    );

                    return;

                }


                // ==========================================
                // ÚLTIMA FRASE = PREGUNTA
                // ==========================================

                dialog.showChoice(

                    "¿Quieres jugar una partida?",

                    "SÍ",

                    "NO",


                    () => {

                        // ==================================
                        // SÍ → ABRIR CHESS MYSTERY
                        // ==================================

                        showChess();

                    },


                    () => {

                        // ==================================
                        // NO → VOLVER A LA ESCENA
                        // ==================================

                        // No hacemos nada.

                    }

                );


                // ==========================================
                // EVITAR REPETIR LA PREGUNTA
                // ==========================================

                this.visits++;

            }

        }

    ]

};
