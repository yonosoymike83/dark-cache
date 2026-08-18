// ======================================================
// GUITARRA
// DARK CACHE
// ======================================================

let guitarDialogActive = false;

let guitarDialogIndex = 0;


// ======================================================
// ABRIR / CONTINUAR GUITARRA
// ======================================================

function openGuitar(){

    // ==================================================
    // DIÁLOGO YA ABIERTO
    // ==================================================

    if(guitarDialogActive){

        // ----------------------------------------------
        // Detener escritura
        // ----------------------------------------------

        clearInterval(
            dialog.typingTimer
        );

        dialog.isTyping = false;


        // ----------------------------------------------
        // Siguiente frase
        // ----------------------------------------------

        guitarDialogIndex++;


        // ----------------------------------------------
        // QUEDAN FRASES ANTES DE LA PREGUNTA
        // ----------------------------------------------

        if(
            guitarDialogIndex <
            DialogGuitar.length - 1
        ){

            dialog.show(

                [
                    DialogGuitar[
                        guitarDialogIndex
                    ]
                ]

            );

            return;

        }


        // ----------------------------------------------
        // ÚLTIMA FRASE = PREGUNTA
        // ----------------------------------------------

        guitarDialogActive = false;


        const question =
            DialogGuitar[
                DialogGuitar.length - 1
            ].text;


        dialog.showChoice(

            question,

            "SÍ",

            "NO",


            // ==========================================
            // SÍ → GUITAR MYSTERY
            // ==========================================

            () => {

                showGuitar();

            },


            // ==========================================
            // NO → RESPUESTA
            // ==========================================

            () => {

                dialog.show(

                    DialogGuitarNo

                );

            }

        );

        return;

    }


    // ==================================================
    // PRIMER CLIC
    // ==================================================

    guitarDialogActive = true;

    guitarDialogIndex = 0;


    dialog.show(

        [
            DialogGuitar[0]
        ]

    );

}


// ======================================================
// MOSTRAR GUITAR MYSTERY
// ======================================================

function showGuitar(){

    // ==================================================
    // OVERLAY
    // ==================================================

    const overlay =
        document.createElement("div");

    overlay.id =
        "guitarOverlay";


    // ==================================================
    // CONTENEDOR
    // ==================================================

    const guitar =
        document.createElement("div");

    guitar.className =
        "guitarFrame";


    // ==================================================
    // MARCO / PANTALLA
    // ==================================================

    const screenFrame =
        document.createElement("div");

    screenFrame.className =
        "guitarScreenFrame";


    // ==================================================
    // GUITAR MYSTERY
    // ==================================================

    const screen =
        document.createElement("iframe");

    screen.className =
        "guitarScreen";


    // ==================================================
    // MODO DARK CACHE
    // ==================================================

    screen.src =
        "https://yonosoymike83.github.io/guitar-mystery/?darkcache=true";


    screen.title =
        "Guitar Mystery Cache";


    screen.setAttribute(
        "scrolling",
        "no"
    );


    // ==================================================
    // AÑADIR PANTALLA AL MARCO
    // ==================================================

    screenFrame.appendChild(
        screen
    );


    // ==================================================
    // BOTÓN CERRAR
    // ==================================================

    const close =
        document.createElement("button");

    close.className =
        "guitarClose";

    close.textContent =
        "× CERRAR";


    close.addEventListener(

        "click",

        () => {

            overlay.remove();

        }

    );


    // ==================================================
    // CONSTRUIR GUITARRA
    // ==================================================

    guitar.appendChild(
        screenFrame
    );

    guitar.appendChild(
        close
    );


    // ==================================================
    // CONSTRUIR OVERLAY
    // ==================================================

    overlay.appendChild(
        guitar
    );


    // ==================================================
    // AÑADIR A LA PÁGINA
    // ==================================================

    document.body.appendChild(
        overlay
    );

}
