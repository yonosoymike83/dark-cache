// ======================================================
// LOGBOOK
// ======================================================


// ======================================================
// ESTADO DEL LOGBOOK
// ======================================================

let logbookDialogActive = false;

let logbookDialogIndex = 0;

let logbookChoiceActive = false;


// ======================================================
// ABRIR / CONTINUAR LOGBOOK
// ======================================================

function openLogbook(){

    // --------------------------------------------------
    // Si estamos en la elección SÍ / NO
    // --------------------------------------------------

    if(logbookChoiceActive){

        return;

    }


    // ==================================================
    // DIÁLOGO YA ABIERTO
    // ==================================================

    if(logbookDialogActive){

        // Detener la escritura actual

        clearInterval(
            dialog.typingTimer
        );

        dialog.isTyping = false;


        // Pasar a la siguiente frase

        logbookDialogIndex++;


        // --------------------------------------------------
        // Todavía quedan frases
        // --------------------------------------------------

        if(
            logbookDialogIndex <
            DialogLogbookIntro.length
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
        // Ya no quedan frases
        // --------------------------------------------------

        logbookDialogActive = false;

        logbookChoiceActive = true;


        dialog.showChoice(

            "¿Quieres dejar tu nombre en el libro?",

            "SÍ",

            "NO",

            () => {

                logbookChoiceActive = false;

                showLogbookForm();

            },

            () => {

                logbookChoiceActive = false;

            }

        );

        return;

    }


    // ==================================================
    // PRIMER CLIC EN EL LIBRO
    // ==================================================

    logbookDialogActive = true;

    logbookDialogIndex = 0;


    dialog.show(

        [
            DialogLogbookIntro[0]
        ]

    );

}


// ======================================================
// FORMULARIO DEL LOGBOOK
// ======================================================

function showLogbookForm(){

    // --------------------------------------------------
    // Crear fondo
    // --------------------------------------------------

    const overlay =
        document.createElement("div");

    overlay.id =
        "logbookOverlay";

    overlay.style.position =
        "fixed";

    overlay.style.left =
        "0";

    overlay.style.top =
        "0";

    overlay.style.width =
        "100%";

    overlay.style.height =
        "100%";

    overlay.style.background =
        "rgba(0,0,0,0.85)";

    overlay.style.zIndex =
        "10000";

    overlay.style.display =
        "flex";

    overlay.style.alignItems =
        "center";

    overlay.style.justifyContent =
        "center";


    // --------------------------------------------------
    // Libro
    // --------------------------------------------------

    const book =
        document.createElement("div");

    book.style.width =
        "min(90vw, 650px)";

    book.style.maxHeight =
        "90vh";

    book.style.overflowY =
        "auto";

    book.style.padding =
        "30px";

    book.style.boxSizing =
        "border-box";

    book.style.background =
        "#d8c39b";

    book.style.color =
        "#241b12";

    book.style.border =
        "4px solid #4b351f";

    book.style.boxShadow =
        "0 0 30px rgba(0,0,0,0.8)";

    book.style.fontFamily =
        "Georgia, serif";


    // --------------------------------------------------
    // Título
    // --------------------------------------------------

    const title =
        document.createElement("h2");

    title.textContent =
        "LIBRO DE VISITAS";

    title.style.textAlign =
        "center";

    title.style.marginTop =
        "0";

    book.appendChild(
        title
    );


    // --------------------------------------------------
    // Nombre
    // --------------------------------------------------

    const usernameLabel =
        document.createElement("label");

    usernameLabel.textContent =
        "Nombre de Geocaching";

    usernameLabel.style.display =
        "block";

    usernameLabel.style.marginTop =
        "20px";

    book.appendChild(
        usernameLabel
    );


    const usernameInput =
        document.createElement("input");

    usernameInput.type =
        "text";

    usernameInput.maxLength =
        30;

    usernameInput.placeholder =
        "Tu nombre de Geocaching";

    usernameInput.style.width =
        "100%";

    usernameInput.style.boxSizing =
        "border-box";

    usernameInput.style.padding =
        "10px";

    usernameInput.style.marginTop =
        "6px";

    book.appendChild(
        usernameInput
    );


    // --------------------------------------------------
    // Mensaje
    // --------------------------------------------------

    const messageLabel =
        document.createElement("label");

    messageLabel.textContent =
        "Mensaje";

    messageLabel.style.display =
        "block";

    messageLabel.style.marginTop =
        "20px";

    book.appendChild(
        messageLabel
    );


    const messageInput =
        document.createElement("textarea");

    messageInput.maxLength =
        150;

    messageInput.rows =
        5;

    messageInput.placeholder =
        "Deja unas palabras para los próximos visitantes...";

    messageInput.style.width =
        "100%";

    messageInput.style.boxSizing =
        "border-box";

    messageInput.style.padding =
        "10px";

    messageInput.style.marginTop =
        "6px";

    messageInput.style.resize =
        "vertical";

    book.appendChild(
        messageInput
    );


    // --------------------------------------------------
    // Botones
    // --------------------------------------------------

    const buttons =
        document.createElement("div");

    buttons.style.display =
        "flex";

    buttons.style.justifyContent =
        "center";

    buttons.style.gap =
        "15px";

    buttons.style.marginTop =
        "25px";


    // --------------------------------------------------
    // Firmar
    // --------------------------------------------------

    const signButton =
        document.createElement("button");

    signButton.textContent =
        "FIRMAR";

    signButton.style.padding =
        "10px 25px";

    signButton.style.cursor =
        "pointer";


    // --------------------------------------------------
    // Cancelar
    // --------------------------------------------------

    const cancelButton =
        document.createElement("button");

    cancelButton.textContent =
        "CANCELAR";

    cancelButton.style.padding =
        "10px 25px";

    cancelButton.style.cursor =
        "pointer";


    buttons.appendChild(
        signButton
    );

    buttons.appendChild(
        cancelButton
    );

    book.appendChild(
        buttons
    );

    overlay.appendChild(
        book
    );

    document.body.appendChild(
        overlay
    );


    // --------------------------------------------------
    // Enfocar nombre
    // --------------------------------------------------

    usernameInput.focus();


    // --------------------------------------------------
    // Cancelar
    // --------------------------------------------------

    cancelButton.addEventListener(

        "click",

        () => {

            overlay.remove();

        }

    );


    // --------------------------------------------------
    // Firmar
    // --------------------------------------------------

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

                alert(
                    "Escribe tu nombre de Geocaching."
                );

                usernameInput.focus();

                return;

            }


            if(!message){

                alert(
                    "Escribe un mensaje."
                );

                messageInput.focus();

                return;

            }


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
                // Cerrar formulario
                // --------------------------------------

                overlay.remove();


                // --------------------------------------
                // Mostrar libro actualizado
                // --------------------------------------

                await showLogbookEntries();


            }catch(error){

                console.error(

                    "Error al guardar logbook:",

                    error

                );

                alert(

                    "No se ha podido guardar la firma."

                );


                signButton.disabled =
                    false;

                signButton.textContent =
                    "FIRMAR";

            }

        }

    );

}


// ======================================================
// MOSTRAR ENTRADAS DEL LOGBOOK
// ======================================================

async function showLogbookEntries(){

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
        // Overlay
        // --------------------------------------------------

        const overlay =
            document.createElement("div");

        overlay.id =
            "logbookEntriesOverlay";

        overlay.style.position =
            "fixed";

        overlay.style.left =
            "0";

        overlay.style.top =
            "0";

        overlay.style.width =
            "100%";

        overlay.style.height =
            "100%";

        overlay.style.background =
            "rgba(0,0,0,0.85)";

        overlay.style.zIndex =
            "10000";

        overlay.style.display =
            "flex";

        overlay.style.alignItems =
            "center";

        overlay.style.justifyContent =
            "center";


        // --------------------------------------------------
        // Libro
        // --------------------------------------------------

        const book =
            document.createElement("div");

        book.style.width =
            "min(90vw, 700px)";

        book.style.maxHeight =
            "90vh";

        book.style.overflowY =
            "auto";

        book.style.padding =
            "30px";

        book.style.boxSizing =
            "border-box";

        book.style.background =
            "#d8c39b";

        book.style.color =
            "#241b12";

        book.style.border =
            "4px solid #4b351f";

        book.style.boxShadow =
            "0 0 30px rgba(0,0,0,0.8)";

        book.style.fontFamily =
            "Georgia, serif";


        // --------------------------------------------------
        // Título
        // --------------------------------------------------

        const title =
            document.createElement("h2");

        title.textContent =
            "LIBRO DE VISITAS";

        title.style.textAlign =
            "center";

        title.style.marginTop =
            "0";

        book.appendChild(
            title
        );


        // --------------------------------------------------
        // Entradas
        // --------------------------------------------------

        if(
            !data ||
            data.length === 0
        ){

            const empty =
                document.createElement("p");

            empty.textContent =
                "Todavía no hay ninguna firma.";

            empty.style.textAlign =
                "center";

            book.appendChild(
                empty
            );

        }else{

            data.forEach(

                entry => {

                    const entryDiv =
                        document.createElement("div");

                    entryDiv.style.borderBottom =
                        "1px solid rgba(60,40,20,0.35)";

                    entryDiv.style.padding =
                        "12px 0";


                    // ----------------------------------
                    // Usuario
                    // ----------------------------------

                    const username =
                        document.createElement("strong");

                    username.textContent =
                        entry.username;


                    // ----------------------------------
                    // Fecha
                    // ----------------------------------

                    const date =
                        document.createElement("span");

                    const dateObject =
                        new Date(
                            entry.signed_at
                        );

                    date.textContent =
                        " — " +
                        dateObject.toLocaleDateString(
                            "es-ES"
                        );


                    // ----------------------------------
                    // Mensaje
                    // ----------------------------------

                    const message =
                        document.createElement("p");

                    message.textContent =
                        entry.message || "";

                    message.style.margin =
                        "6px 0 0 0";


                    entryDiv.appendChild(
                        username
                    );

                    entryDiv.appendChild(
                        date
                    );

                    entryDiv.appendChild(
                        message
                    );


                    book.appendChild(
                        entryDiv
                    );

                }

            );

        }


        // --------------------------------------------------
        // Cerrar
        // --------------------------------------------------

        const closeButton =
            document.createElement("button");

        closeButton.textContent =
            "CERRAR";

        closeButton.style.display =
            "block";

        closeButton.style.margin =
            "25px auto 0";

        closeButton.style.padding =
            "10px 25px";

        closeButton.style.cursor =
            "pointer";


        closeButton.addEventListener(

            "click",

            () => {

                overlay.remove();

            }

        );


        book.appendChild(
            closeButton
        );

        overlay.appendChild(
            book
        );

        document.body.appendChild(
            overlay
        );


    }catch(error){

        console.error(

            "Error leyendo logbook:",

            error

        );

        alert(

            "No se ha podido cargar el libro."

        );

    }

}
