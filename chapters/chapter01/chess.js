// ======================================================
// CHESS
// DARK CACHE
// ======================================================

let chessDialogActive = false;

let chessDialogIndex = 0;


// ======================================================
// ABRIR / CONTINUAR AJEDREZ
// ======================================================

function openChess(){

    // ==================================================
    // DIÁLOGO YA ABIERTO
    // ==================================================

    if(chessDialogActive){

        clearInterval(
            dialog.typingTimer
        );

        dialog.isTyping = false;


        chessDialogIndex++;


        // --------------------------------------------------
        // QUEDAN FRASES ANTES DE LA PREGUNTA
        // --------------------------------------------------

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


        // --------------------------------------------------
        // ÚLTIMA FRASE = PREGUNTA
        // --------------------------------------------------

        chessDialogActive = false;


        const question =
            DialogChess[
                DialogChess.length - 1
            ].text;


        dialog.showChoice(

            question,

            "SÍ",

            "NO",


            // --------------------------------------------------
            // SÍ
            // --------------------------------------------------

            () => {

                showChess();

            },


            // --------------------------------------------------
            // NO
            // --------------------------------------------------

            () => {

                dialog.show(

                    DialogChessNo

                );

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
// MOSTRAR CHESS MYSTERY
// ======================================================

function showChess(){

    const overlay =
        document.createElement("div");

    overlay.id =
        "chessOverlay";


    const board =
        document.createElement("div");

    board.className =
        "chessBoard";


    const screenFrame =
        document.createElement("div");

    screenFrame.className =
        "chessScreenFrame";


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


    screenFrame.appendChild(
        screen
    );


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
