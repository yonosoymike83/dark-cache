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


            // ==============================================
            // SÍ
            // ==============================================

            () => {

                // Cerrar completamente el diálogo

                dialog.hide();


                // Abrir Chess Mystery

                setTimeout(() => {

                    showChess();

                }, 50);

            },


            // ==============================================
            // NO
            // ==============================================

            () => {

                dialog.hide();

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

    // ==================================================
    // EVITAR DUPLICADOS
    // ==================================================

    const oldOverlay =
        document.getElementById(
            "chessOverlay"
        );

    if(oldOverlay){

        oldOverlay.remove();

    }


    // ==================================================
    // OVERLAY
    // ==================================================

    const overlay =
        document.createElement("div");

    overlay.id =
        "chessOverlay";


    // ==================================================
    // TABLERO ANTIGUO
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
        "https://yonosoymike83.github.io/chess-mystery/";


    screen.title =
        "Chess Mystery Cache";


    screen.setAttribute(
        "scrolling",
        "no"
    );


    screen.setAttribute(
        "frameborder",
        "0"
    );


    screen.allow =
        "fullscreen";


    // ==================================================
    // AÑADIR IFRAME AL MARCO
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


    close.type =
        "button";


    close.textContent =
        "× CERRAR";


    close.addEventListener(

        "click",

        (event) => {

            event.preventDefault();

            event.stopPropagation();


            overlay.remove();


            // Reiniciar el estado del diálogo

            chessDialogActive = false;

            chessDialogIndex = 0;

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


    // ==================================================
    // ASEGURAR VISIBILIDAD
    // ==================================================

    requestAnimationFrame(() => {

        overlay.style.opacity = "1";

    });

}
