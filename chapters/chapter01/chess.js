// ======================================================
// CHESS
// DARK CACHE
// ======================================================

let chessDialogActive = false;

let chessDialogIndex = 0;

let chessChoiceShown = false;


// ======================================================
// ABRIR / CONTINUAR AJEDREZ
// ======================================================

function openChess(){

    // ==================================================
    // DIÁLOGO YA ABIERTO
    // ==================================================

    if(chessDialogActive){

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

        chessDialogIndex++;


        // ----------------------------------------------
        // TODAVÍA QUEDAN FRASES ANTES DE LA PREGUNTA
        // ----------------------------------------------

        if(
            chessDialogIndex <
            DialogChess.length - 1
        ){

            dialog.show(

                [
                    DialogChess[
                        chessDialogIndex
                    ]
                ]

            );

            return;

        }


        // ----------------------------------------------
        // ÚLTIMA FRASE = PREGUNTA
        // ----------------------------------------------

        if(!chessChoiceShown){

            chessChoiceShown = true;


            const question =
                DialogChess[
                    DialogChess.length - 1
                ].text;


            dialog.showChoice(

                question,

                "SÍ",

                "NO",


                // ======================================
                // SÍ
                // ======================================

                () => {

                    chessDialogActive = false;

                    chessChoiceShown = false;

                    chessDialogIndex = 0;

                    showChess();

                },


                // ======================================
                // NO
                // ======================================

                () => {

                    chessDialogActive = false;

                    chessChoiceShown = false;

                    chessDialogIndex = 0;

                    dialog.hide();

                }

            );

        }

        return;

    }


    // ==================================================
    // PRIMER CLIC
    // ==================================================

    chessDialogActive = true;

    chessChoiceShown = false;

    chessDialogIndex = 0;


    dialog.show(

        [
            DialogChess[0]
        ]

    );

}


// ======================================================
// MOSTRAR CHESS MYSTERY
// ======================================================

function showChess(){

    // ==================================================
    // OVERLAY
    // ==================================================

    const overlay =
        document.createElement("div");

    overlay.id =
        "chessOverlay";


    // ==================================================
    // TABLERO
    // ==================================================

    const board =
        document.createElement("div");

    board.className =
        "chessBoard";


    // ==================================================
    // MARCO / PANTALLA
    // ==================================================

    const screenFrame =
        document.createElement("div");

    screenFrame.className =
        "chessScreenFrame";


    // ==================================================
    // CHESS MYSTERY
    // ==================================================

    const screen =
        document.createElement("iframe");

    screen.className =
        "chessScreen";


    screen.src =
        "https://yonosoymike83.github.io/chess-mystery/?darkcache=true";


    screen.title =
        "Chess Mystery Cache";


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
        "chessClose";

    close.textContent =
        "× CERRAR";


    close.addEventListener(

        "click",

        () => {

            overlay.remove();

        }

    );


    // ==================================================
    // CONSTRUIR TABLERO
    // ==================================================

    board.appendChild(
        screenFrame
    );

    board.appendChild(
        close
    );


    // ==================================================
    // CONSTRUIR OVERLAY
    // ==================================================

    overlay.appendChild(
        board
    );


    // ==================================================
    // AÑADIR A LA PÁGINA
    // ==================================================

    document.body.appendChild(
        overlay
    );

}
