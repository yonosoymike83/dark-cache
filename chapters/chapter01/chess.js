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


        // ==================================================
        // PREGUNTA
        // ==================================================

        dialog.showChoice(

            "¿Quieres jugar una partida?",

            "SÍ",

            "NO",

            // ==============================================
            // SÍ
            // ==============================================

            () => {

                showChess();

            },

            // ==============================================
            // NO
            // ==============================================

            () => {

                chessDialogActive = false;

                chessDialogIndex = 0;

                dialog.hide();

            }

        );


        // ==================================================
        // CORREGIR EVENTO DEL BOTÓN NO
        // ==================================================

        setTimeout(() => {

            const choices =
                document.getElementById(
                    "dialogChoices"
                );


            if(!choices){

                return;

            }


            const options =
                choices.children;


            if(options.length < 2){

                return;

            }


            const no =
                options[1];


            // ----------------------------------------------
            // Evitar que el listener original interfiera
            // ----------------------------------------------

            no.addEventListener(

                "pointerdown",

                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    event.stopImmediatePropagation();


                    // ------------------------------------------
                    // Estado
                    // ------------------------------------------

                    chessDialogActive = false;

                    chessDialogIndex = 0;


                    // ------------------------------------------
                    // Eliminar botones
                    // ------------------------------------------

                    dialog.removeChoices();


                    // ------------------------------------------
                    // Mostrar respuesta
                    // ------------------------------------------

                    dialog.show(

                        DialogChessNo

                    );

                },

                true

            );

        }, 50);


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
    // CREAR OVERLAY
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


    // ==================================================
    // MODO DARK CACHE
    // ==================================================

    screen.src =
        "https://yonosoymike83.github.io/chess-mystery/?darkcache=true";


    screen.title =
        "Chess Mystery Cache";


    screen.setAttribute(
        "scrolling",
        "no"
    );


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
