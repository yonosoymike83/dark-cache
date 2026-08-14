// ======================================================
// GAME BOY
// DARK CACHE
// ======================================================

let gameBoyDialogActive = false;

let gameBoyDialogIndex = 0;


// ======================================================
// ABRIR GAME BOY
// ======================================================

function openGameBoy(){

    // ==================================================
    // SI EL DIÁLOGO YA ESTÁ ABIERTO
    // ==================================================

    if(gameBoyDialogActive){

        clearInterval(
            dialog.typingTimer
        );

        dialog.isTyping = false;

        gameBoyDialogIndex++;


        // --------------------------------------------------
        // Quedan frases
        // --------------------------------------------------

        if(
            gameBoyDialogIndex <
            DialogGameBoy.length
        ){

            dialog.show(

                [
                    DialogGameBoy[
                        gameBoyDialogIndex
                    ]
                ]

            );

            return;

        }


        // --------------------------------------------------
        // Diálogo terminado
        // --------------------------------------------------

        gameBoyDialogActive = false;


        dialog.showChoice(

            "¿Echamos una partida?",

            "SÍ",

            "NO",

            () => {

                showGameBoy();

            },

            () => {

                // No hacemos nada.
                // Volvemos a la escena.

            }

        );

        return;

    }


    // ==================================================
    // PRIMER CLIC
    // ==================================================

    gameBoyDialogActive = true;

    gameBoyDialogIndex = 0;


    dialog.show(

        [
            DialogGameBoy[0]
        ]

    );

}


// ======================================================
// MOSTRAR GAME BOY
// ======================================================

function showGameBoy(){

    const overlay =
        document.createElement("div");

    overlay.id =
        "gameBoyOverlay";


    // ==================================================
    // GAME BOY
    // ==================================================

    const gameBoy =
        document.createElement("div");

    gameBoy.className =
        "gameBoy";


    // ==================================================
    // PANTALLA
    // ==================================================

    const screenFrame =
        document.createElement("div");

    screenFrame.className =
        "gameBoyScreenFrame";


    const screen =
        document.createElement("iframe");

    screen.className =
        "gameBoyScreen";

    screen.src =
        "https://yonosoymike83.github.io/arcade-mystery/?gameboy=true";

    screen.title =
        "Arcade Mystery Cache";

    screen.setAttribute(
        "scrolling",
        "no"
    );

    screen.setAttribute(
        "allow",
        "autoplay"
    );

    screenFrame.appendChild(
        screen
    );


    // ==================================================
    // MARCA
    // ==================================================

    const logo =
        document.createElement("div");

    logo.className =
        "gameBoyLogo";

    logo.textContent =
        "Nintendo";


    // ==================================================
    // BOTONES
    // ==================================================

    const controls =
        document.createElement("div");

    controls.className =
        "gameBoyControls";


    const dpad =
        document.createElement("div");

    dpad.className =
        "gameBoyDpad";


    const dpadUp =
        document.createElement("div");

    dpadUp.className =
        "dpadUp";


    const dpadDown =
        document.createElement("div");

    dpadDown.className =
        "dpadDown";


    const dpadLeft =
        document.createElement("div");

    dpadLeft.className =
        "dpadLeft";


    const dpadRight =
        document.createElement("div");

    dpadRight.className =
        "dpadRight";


    const dpadCenter =
        document.createElement("div");

    dpadCenter.className =
        "dpadCenter";


    dpad.appendChild(
        dpadUp
    );

    dpad.appendChild(
        dpadDown
    );

    dpad.appendChild(
        dpadLeft
    );

    dpad.appendChild(
        dpadRight
    );

    dpad.appendChild(
        dpadCenter
    );


    // --------------------------------------------------
    // Botones A / B
    // --------------------------------------------------

    const actionButtons =
        document.createElement("div");

    actionButtons.className =
        "gameBoyActionButtons";


    const buttonB =
        document.createElement("div");

    buttonB.className =
        "gameBoyRoundButton";

    buttonB.textContent =
        "B";


    const buttonA =
        document.createElement("div");

    buttonA.className =
        "gameBoyRoundButton";

    buttonA.textContent =
        "A";


    actionButtons.appendChild(
        buttonB
    );

    actionButtons.appendChild(
        buttonA
    );


    controls.appendChild(
        dpad
    );

    controls.appendChild(
        actionButtons
    );


    // ==================================================
    // START / SELECT
    // ==================================================

    const menuButtons =
        document.createElement("div");

    menuButtons.className =
        "gameBoyMenuButtons";


    const select =
        document.createElement("span");

    select.textContent =
        "SELECT";


    const start =
        document.createElement("span");

    start.textContent =
        "START";


    menuButtons.appendChild(
        select
    );

    menuButtons.appendChild(
        start
    );


    // ==================================================
    // CERRAR
    // ==================================================

    const close =
        document.createElement("button");

    close.className =
        "gameBoyClose";

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

    gameBoy.appendChild(
        screenFrame
    );

    gameBoy.appendChild(
        logo
    );

    gameBoy.appendChild(
        controls
    );

    gameBoy.appendChild(
        menuButtons
    );

    gameBoy.appendChild(
        close
    );


    overlay.appendChild(
        gameBoy
    );

    document.body.appendChild(
        overlay
    );

}
