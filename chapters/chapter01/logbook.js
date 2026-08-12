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

        clearInterval(
            dialog.typingTimer
        );

        dialog.isTyping = false;

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
// CREAR ESTRUCTURA DEL LIBRO
// ======================================================

function createLogbookBook(){

    const book =
        document.createElement("div");

    book.className =
        "logbookBook";

    return book;

}


// ======================================================
// CREAR PÁGINA
// ======================================================

function createLogbookPage(
    className = ""
){

    const page =
        document.createElement("div");

    page.className =
        "logbookPage " + className;

    return page;

}


// ======================================================
// TÍTULO
// ======================================================

function createLogbookHeader(
    page,
    subtitle = ""
){

    const title =
        document.createElement("h2");

    title.className =
        "logbookTitle";

    title.textContent =
        "Libro de visitas";

    page.appendChild(
        title
    );


    if(subtitle){

        const sub =
            document.createElement("div");

        sub.className =
            "logbookSubtitle";

        sub.textContent =
            subtitle;

        page.appendChild(
            sub
        );

    }


    const ornament =
        document.createElement("div");

    ornament.className =
        "logbookOrnament";

    ornament.textContent =
        "· · ·";

    page.appendChild(
        ornament
    );

}


// ======================================================
// FORMULARIO
// ======================================================

function showLogbookForm(){

    const overlay =
        document.createElement("div");

    overlay.id =
        "logbookOverlay";


    const book =
        createLogbookBook();


    // --------------------------------------------------
    // Página izquierda
    // --------------------------------------------------

    const leftPage =
        createLogbookPage(
            "logbookPageLeft"
        );

    createLogbookHeader(
        leftPage,
        "La Tienda del Viejo Bug"
    );


    const intro =
        document.createElement("p");

    intro.className =
        "logbookEmpty";

    intro.textContent =
        "Si has llegado hasta aquí, deja constancia de tu visita.";

    leftPage.appendChild(
        intro
    );


    book.appendChild(
        leftPage
    );


    // --------------------------------------------------
    // Página derecha
    // --------------------------------------------------

    const rightPage =
        createLogbookPage(
            "logbookPageRight"
        );


    const title =
        document.createElement("h2");

    title.className =
        "logbookFormTitle";

    title.textContent =
        "Deja tu firma";

    rightPage.appendChild(
        title
    );


    // --------------------------------------------------
    // Usuario
    // --------------------------------------------------

    const usernameField =
        document.createElement("div");

    usernameField.className =
        "logbookField";


    const usernameLabel =
        document.createElement("label");

    usernameLabel.textContent =
        "Nombre de Geocaching";


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

    usernameInput.placeholder =
        "Tu nombre de Geocaching";


    usernameField.appendChild(
        usernameLabel
    );

    usernameField.appendChild(
        usernameInput
    );

    rightPage.appendChild(
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
        "Mensaje";


    const messageInput =
        document.createElement("textarea");

    messageInput.className =
        "logbookTextarea";

    messageInput.maxLength =
        150;

    messageInput.placeholder =
        "Deja unas palabras para los próximos visitantes...";


    messageField.appendChild(
        messageLabel
    );

    messageField.appendChild(
        messageInput
    );

    rightPage.appendChild(
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
        "logbookButton";

    signButton.textContent =
        "FIRMAR";


    const cancelButton =
        document.createElement("button");

    cancelButton.className =
        "logbookButton secondary";

    cancelButton.textContent =
        "CANCELAR";


    buttons.appendChild(
        signButton
    );

    buttons.appendChild(
        cancelButton
    );

    rightPage.appendChild(
        buttons );


    book.appendChild(
        rightPage
    );


    overlay.appendChild(
        book
    );

    document.body.appendChild(
        overlay
    );


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


                overlay.remove();


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
// MOSTRAR ENTRADAS
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


        const overlay =
            document.createElement("div");

        overlay.id =
            "logbookEntriesOverlay";


        const book =
            createLogbookBook();


        // ==================================================
        // DIVIDIR EN DOS PÁGINAS
        // ==================================================

        const entries =
            data || [];

        const middle =
            Math.ceil(
                entries.length / 2
            );


        const leftEntries =
            entries.slice(
                0,
                middle
            );

        const rightEntries =
            entries.slice(
                middle
            );


        // ==================================================
        // PÁGINA IZQUIERDA
        // ==================================================

        const leftPage =
            createLogbookPage(
                "logbookPageLeft"
            );

        createLogbookHeader(
            leftPage,
            "La Tienda del Viejo Bug"
        );


        appendEntries(
            leftPage,
            leftEntries
        );


        book.appendChild(
            leftPage
        );


        // ==================================================
        // PÁGINA DERECHA
        // ==================================================

        const rightPage =
            createLogbookPage(
                "logbookPageRight"
            );


        const rightTitle =
            document.createElement("h2");

        rightTitle.className =
            "logbookTitle";

        rightTitle.textContent =
            "Visitantes";


        rightPage.appendChild(
            rightTitle
        );


        const rightSubtitle =
            document.createElement("div");

        rightSubtitle.className =
            "logbookSubtitle";

        rightSubtitle.textContent =
            "Los que dejaron huella";


        rightPage.appendChild(
            rightSubtitle
        );


        appendEntries(
            rightPage,
            rightEntries
        );


        // --------------------------------------------------
        // Navegación / cerrar
        // --------------------------------------------------

        const navigation =
            document.createElement("div");

        navigation.className =
            "logbookNavigation";


        const closeButton =
            document.createElement("button");

        closeButton.className =
            "logbookButton secondary";

        closeButton.textContent =
            "CERRAR";


        closeButton.addEventListener(

            "click",

            () => {

                overlay.remove();

            }

        );


        navigation.appendChild(
            closeButton
        );

        rightPage.appendChild(
            navigation
        );


        book.appendChild(
            rightPage
        );


        // ==================================================
        // SI NO HAY ENTRADAS
        // ==================================================

        if(entries.length === 0){

            leftPage.innerHTML = "";

            createLogbookHeader(
                leftPage,
                "La Tienda del Viejo Bug"
            );


            const empty =
                document.createElement("div");

            empty.className =
                "logbookEmpty";

            empty.textContent =
                "Este libro todavía espera su primera historia.";

            leftPage.appendChild(
                empty
            );


            rightPage.innerHTML = "";

            createLogbookHeader(
                rightPage,
                "Libro de visitas"
            );


            const emptyRight =
                document.createElement("div");

            emptyRight.className =
                "logbookEmpty";

            emptyRight.textContent =
                "Quizá seas tú quien la escriba.";

            rightPage.appendChild(
                emptyRight
            );


            const close =
                document.createElement("div");

            close.className =
                "logbookButtons";


            const closeEmpty =
                document.createElement("button");

            closeEmpty.className =
                "logbookButton secondary";

            closeEmpty.textContent =
                "CERRAR";


            closeEmpty.addEventListener(
                "click",
                () => overlay.remove()
            );


            close.appendChild(
                closeEmpty
            );

            rightPage.appendChild(
                close
            );

        }


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


// ======================================================
// AÑADIR ENTRADAS A UNA PÁGINA
// ======================================================

function appendEntries(
    page,
    entries
){

    entries.forEach(

        entry => {

            const entryDiv =
                document.createElement("div");

            entryDiv.className =
                "logbookEntry";


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
                "— " +
                dateObject.toLocaleDateString(
                    "es-ES"
                );


            const message =
                document.createElement("p");

            message.className =
                "logbookMessage";

            message.textContent =
                entry.message || "";


            entryDiv.appendChild(
                username
            );

            entryDiv.appendChild(
                date
            );

            entryDiv.appendChild(
                message
            );


            page.appendChild(
                entryDiv
            );

        }

    );

}
