// ======================================================
// LOGBOOK
// DARK CACHE
// ======================================================


// ======================================================
// ESTADO
// ======================================================

let logbookDialogActive = false;

let logbookDialogIndex = 0;

let logbookChoiceShown = false;


// ======================================================
// ABRIR / CONTINUAR LOGBOOK
// ======================================================

function openLogbook(){

    // ==================================================
    // DIÁLOGO YA ABIERTO
    // ==================================================

    if(logbookDialogActive){

        // ----------------------------------------------
        // Si la frase todavía se está escribiendo,
        // el clic sobre el HOTSPOT debe pasar
        // directamente a la siguiente frase.
        // ----------------------------------------------

        clearInterval(
            dialog.typingTimer
        );

        dialog.isTyping = false;


        logbookDialogIndex++;


        // --------------------------------------------------
        // Quedan frases
        // --------------------------------------------------

        if(
            logbookDialogIndex <
            DialogLogbookIntro.length - 1
        ){

            dialog.show(

                [
                    DialogLogbookIntro[
                        logbookDialogIndex
                    ]
                ]

            );

            return;

        }


        // --------------------------------------------------
        // Última frase = pregunta
        // --------------------------------------------------

        if(!logbookChoiceShown){

            logbookChoiceShown = true;

            const question =
                DialogLogbookIntro[
                    DialogLogbookIntro.length - 1
                ].text;


            dialog.showChoice(

                question,

                "SÍ",

                "NO",

                () => {

                    // --------------------------------------
                    // SÍ → abrir directamente el Logbook
                    // --------------------------------------

                    logbookDialogActive = false;

                    logbookChoiceShown = false;

                    logbookDialogIndex = 0;

                    showLogbook();

                },

                () => {

                    // --------------------------------------
                    // NO → cerrar conversación
                    // --------------------------------------

                    logbookDialogActive = false;

                    logbookChoiceShown = false;

                    logbookDialogIndex = 0;

                    dialog.hide();

                }

            );

        }

        return;

    }


    // ==================================================
    // PRIMER CLIC
    // ==================================================

    logbookDialogActive = true;

    logbookChoiceShown = false;

    logbookDialogIndex = 0;


    dialog.show(

        [
            DialogLogbookIntro[0]
        ]

    );

}


// ======================================================
// MOSTRAR LOGBOOK
// ======================================================

async function showLogbook(){

    // --------------------------------------------------
    // Crear overlay
    // --------------------------------------------------

    const overlay =
        document.createElement("div");

    overlay.id =
        "logbookOverlay";


    // --------------------------------------------------
    // Crear libro
    // --------------------------------------------------

    const book =
        document.createElement("div");

    book.className =
        "logbookBook";


    // ==================================================
    // PÁGINA IZQUIERDA
    // ==================================================

    const writePage =
        document.createElement("div");

    writePage.className =
        "logbookPage logbookPageLeft";


    // --------------------------------------------------
    // Cabecera
    // --------------------------------------------------

    writePage.appendChild(

        createHeader(

            "DEJA TU LOG",
            "",
            ""

        )

    );


    // --------------------------------------------------
    // Nombre
    // --------------------------------------------------

    const usernameField =
        document.createElement("div");

    usernameField.className =
        "logbookField";


    const usernameLabel =
        document.createElement("label");

    usernameLabel.textContent =
        "NOMBRE DE GEOCACHING";


    const usernameInput =
        document.createElement("input");

    usernameInput.className =
        "logbookInput";

    usernameInput.type =
        "text";

    usernameInput.maxLength =
        30;

    usernameInput.autocomplete =
        "off";

    usernameInput.spellcheck =
        false;

    usernameInput.placeholder =
        "Introduce tu nick...";


    usernameField.appendChild(
        usernameLabel
    );

    usernameField.appendChild(
        usernameInput
    );


    const usernameCounter =
        document.createElement("div");

    usernameCounter.className =
        "logbookCounter";

    usernameCounter.textContent =
        "0 / 30";


    usernameField.appendChild(
        usernameCounter
    );


    writePage.appendChild(
        usernameField
    );


    // --------------------------------------------------
    // Mensaje
    // --------------------------------------------------

    const messageField =
        document.createElement("div");

    messageField.className =
        "logbookField";


    const messageLabel =
        document.createElement("label");

    messageLabel.textContent =
        "MENSAJE";


    const messageInput =
        document.createElement("textarea");

    messageInput.className =
        "logbookTextarea";

    messageInput.maxLength =
        150;

    messageInput.spellcheck =
        false;

    messageInput.placeholder =
        "Escribe unas palabras para los próximos jugadores...";


    messageField.appendChild(
        messageLabel
    );

    messageField.appendChild(
        messageInput
    );


    const messageCounter =
        document.createElement("div");

    messageCounter.className =
        "logbookCounter";

    messageCounter.textContent =
        "0 / 150";


    messageField.appendChild(
        messageCounter
    );


    writePage.appendChild(
        messageField
    );


    // --------------------------------------------------
    // Botones
    // --------------------------------------------------

    const buttons =
        document.createElement("div");

    buttons.className =
        "logbookButtons";


    const signButton =
        document.createElement("button");

    signButton.className =
        "logbookButton primary";

    signButton.textContent =
        "FIRMAR";


    const closeButton =
        document.createElement("button");

    closeButton.className =
        "logbookButton secondary";

    closeButton.textContent =
        "CERRAR";


    buttons.appendChild(
        signButton
    );

    buttons.appendChild(
        closeButton
    );


    writePage.appendChild(
        buttons
    );


    // --------------------------------------------------
    // Pie
    // --------------------------------------------------

    const writeFooter =
        document.createElement("div");

    writeFooter.className =
        "logbookFooter";

    writeFooter.textContent =
        "DARK CACHE";

    writePage.appendChild(
        writeFooter
    );


    // ==================================================
    // PÁGINA DERECHA
    // ==================================================

    const logsPage =
        document.createElement("div");

    logsPage.className =
        "logbookPage logbookPageRight";


    logsPage.appendChild(

        createHeader(

            "LOGBOOK",
            "",
            ""

        )

    );


    // --------------------------------------------------
    // Contenedor de entradas
    // --------------------------------------------------

    const entriesContainer =
        document.createElement("div");

    entriesContainer.className =
        "logbookEntries";


    logsPage.appendChild(
        entriesContainer
    );


    const logsFooter =
        document.createElement("div");

    logsFooter.className =
        "logbookFooter";

    logsFooter.textContent =
        "VISITOR LOG";

    logsPage.appendChild(
        logsFooter
    );


    // ==================================================
    // AÑADIR PÁGINAS
    // ==================================================

    book.appendChild(
        writePage
    );

    book.appendChild(
        logsPage
    );


    overlay.appendChild(
        book
    );


    document.body.appendChild(
        overlay
    );


    // ==================================================
    // CONTADORES
    // ==================================================

    usernameInput.addEventListener(

        "input",

        () => {

            usernameCounter.textContent =
                usernameInput.value.length +
                " / 30";

        }

    );


    messageInput.addEventListener(

        "input",

        () => {

            messageCounter.textContent =
                messageInput.value.length +
                " / 150";

        }

    );


    // ==================================================
    // CERRAR
    // ==================================================

    closeButton.addEventListener(

        "click",

        () => {

            overlay.remove();

        }

    );


    // ==================================================
    // FIRMAR
    // ==================================================

    signButton.addEventListener(

        "click",

        async () => {

            const username =
                usernameInput.value.trim();

            const message =
                messageInput.value.trim();


            // ------------------------------------------
            // Validación
            // ------------------------------------------

            if(!username){

                showLogbookError(

                    writePage,

                    "ERROR: FALTA EL NOMBRE"

                );

                usernameInput.focus();

                return;

            }


            if(!message){

                showLogbookError(

                    writePage,

                    "ERROR: FALTA EL MENSAJE"

                );

                messageInput.focus();

                return;

            }


            // ------------------------------------------
            // Guardando
            // ------------------------------------------

            signButton.disabled =
                true;

            signButton.textContent =
                "GUARDANDO...";


            try{

                const { error } =

                    await supabaseClient

                        .from("logbook")

                        .insert({

                            username:
                                username,

                            message:
                                message

                        });


                if(error){

                    throw error;

                }


                // --------------------------------------
                // Limpiar formulario
                // --------------------------------------

                usernameInput.value = "";

                messageInput.value = "";

                usernameCounter.textContent =
                    "0 / 30";

                messageCounter.textContent =
                    "0 / 150";


                signButton.disabled =
                    false;

                signButton.textContent =
                    "FIRMAR";


                // --------------------------------------
                // Recargar logs
                // --------------------------------------

                await loadLogbookEntries(

                    entriesContainer

                );


            }catch(error){

                console.error(

                    "Error al guardar logbook:",

                    error

                );


                showLogbookError(

                    writePage,

                    "ERROR: NO SE HA PODIDO GUARDAR"

                );


                signButton.disabled =
                    false;

                signButton.textContent =
                    "FIRMAR";

            }

        }

    );


    // ==================================================
    // CARGAR REGISTROS
    // ==================================================

    await loadLogbookEntries(

        entriesContainer

    );


    // ==================================================
    // ENFOCAR NOMBRE
    // ==================================================

    usernameInput.focus();

}


// ======================================================
// CABECERA
// ======================================================

function createHeader(

    line1,
    line2,
    subtitle

){

    const header =
        document.createElement("div");

    header.className =
        "logbookHeader";


    const title =
        document.createElement("h2");

    title.className =
        "logbookHeaderTitle";

    title.textContent =
        line1;

    header.appendChild(
        title
    );


    const secondLine =
        document.createElement("div");

    secondLine.className =
        "logbookHeaderTitle";

    secondLine.style.marginTop =
        "5px";

    secondLine.style.color =
        "#d9b34b";

    secondLine.textContent =
        line2;

    header.appendChild(
        secondLine
    );


    const sub =
        document.createElement("div");

    sub.className =
        "logbookHeaderSubtitle";

    sub.textContent =
        subtitle;

    header.appendChild(
        sub
    );


    return header;

}


// ======================================================
// CARGAR REGISTROS
// ======================================================

async function loadLogbookEntries(

    container

){

    container.innerHTML = "";


    try{

        const { data, error } =

            await supabaseClient

                .from("logbook")

                .select(
                    "username,message,signed_at"
                )

                .order(

                    "signed_at",

                    {
                        ascending: false
                    }

                );


        if(error){

            throw error;

        }


        // --------------------------------------------------
        // Sin registros
        // --------------------------------------------------

        if(
            !data ||
            data.length === 0
        ){

            const empty =
                document.createElement("div");

            empty.className =
                "logbookEmpty";

            empty.innerHTML =
                "El logbook está vacío.<br>" +
                "Sé el primero en dejar tu huella.";

            container.appendChild(
                empty
            );

            return;

        }


        // --------------------------------------------------
        // Registros
        // --------------------------------------------------

        data.forEach(

            (entry, index) => {

                const log =
                    document.createElement("div");

                log.className =
                    "logbookEntry";


                // ------------------------------------------
                // Número de log
                // ------------------------------------------

                const number =
                    document.createElement("div");

                number.className =
                    "logbookNumber";

                number.textContent =
                    "LOG #" +

                    String(

                        data.length - index

                    ).padStart(

                        3,

                        "0"

                    );


                log.appendChild(
                    number
                );


                // ------------------------------------------
                // Cabecera
                // ------------------------------------------

                const header =
                    document.createElement("div");

                header.className =
                    "logbookEntryHeader";


                const username =
                    document.createElement("span");

                username.className =
                    "logbookUsername";

                username.textContent =
                    entry.username;


                const date =
                    document.createElement("span");

                date.className =
                    "logbookDate";


                const dateObject =
                    new Date(

                        entry.signed_at

                    );


                date.textContent =
                    dateObject.toLocaleDateString(

                        "es-ES"

                    );


                header.appendChild(
                    username
                );

                header.appendChild(
                    date
                );


                log.appendChild(
                    header
                );


                // ------------------------------------------
                // Mensaje
                // ------------------------------------------

                const message =
                    document.createElement("p");

                message.className =
                    "logbookMessage";

                message.textContent =
                    entry.message || "";


                log.appendChild(
                    message
                );


                container.appendChild(
                    log
                );

            }

        );


    }catch(error){

        console.error(

            "Error leyendo logbook:",

            error

        );


        const errorMessage =
            document.createElement("div");

        errorMessage.className =
            "logbookError";

        errorMessage.textContent =
            "[ ERROR: DATABASE OFFLINE ]";


        container.appendChild(
            errorMessage
        );

    }

}


// ======================================================
// ERROR
// ======================================================

function showLogbookError(

    page,

    message

){

    const previous =
        page.querySelector(

            ".logbookError"

        );


    if(previous){

        previous.remove();

    }


    const error =
        document.createElement("div");

    error.className =
        "logbookError";

    error.textContent =
        message;


    page.appendChild(
        error
    );

}
