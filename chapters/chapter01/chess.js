// ======================================================
// CHESS
// DARK CACHE
// ======================================================

let chessDialogActive = false;

let chessDialogIndex = 0;


// ======================================================
// ABRIR AJEDREZ
// ======================================================

function openChess(){

    // ==================================================
    // SI EL DIÁLOGO YA ESTÁ ABIERTO
    // ==================================================

    if(chessDialogActive){

        clearInterval(
            dialog.typingTimer
        );

        dialog.isTyping = false;

        chessDialogIndex++;


        // --------------------------------------------------
        // QUEDAN FRASES
        // --------------------------------------------------

        if(
            chessDialogIndex <
            DialogChess.length
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


        // --------------------------------------------------
        // DIÁLOGO TERMINADO
        // --------------------------------------------------

        chessDialogActive = false;


        dialog.showChoice(

            "¿Quieres jugar una partida?",

            "SÍ",

            "NO",

            () => {

                showChess();

            },

            () => {

                // Volver a la escena

            }

        );

        return;

    }


    // ==================================================
    // PRIMER CLIC
    // ==================================================

    chessDialogActive = true;

    chessDialogIndex = 0;


    dialog.show(

        [
            DialogChess[0]
        ]

    );

}


// ======================================================
// MOSTRAR TABLERO
// ======================================================

function showChess(){

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
    // PANTALLA CHESS MYSTERY
    // ==================================================

    const screenFrame =
        document.createElement("div");

    screenFrame.className =
        "chessScreenFrame";


    const screen =
        document.createElement("iframe");

    screen.className =
        "chessScreen";

    screen.src =
        "https://yonosoymike83.github.io/chess-mystery/";

    screen.title =
        "Chess Mystery Cache";

    screen.setAttribute(
        "scrolling",
        "no"
    );


    screenFrame.appendChild(
        screen
    );


    // ==================================================
    // CERRAR
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
    // CONSTRUIR
    // ==================================================

    board.appendChild(
        screenFrame
    );

    board.appendChild(
        close
    );

    overlay.appendChild(
        board
    );

    document.body.appendChild(
        overlay
    );

}
