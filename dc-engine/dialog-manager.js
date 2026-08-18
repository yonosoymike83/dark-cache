class DialogManager {

    constructor() {

        this.box =
            document.getElementById("dialogBox");

        this.speaker =
            document.getElementById("dialogSpeaker");

        this.text =
            document.getElementById("dialogText");


        this.dialog = [];

        this.index = 0;

        this.onFinish = null;


        this.isTyping = false;

        this.typingTimer = null;

        this.hideTimer = null;

        this.fullText = "";


        // Velocidad de escritura

        this.speed = 28;


        // ==================================================
        // CLIC EN EL CUADRO DE DIÁLOGO
        // ==================================================

        this.box.addEventListener(

            "click",

            () => {

                this.next();

            }

        );

    }


    // ======================================================
    // MOSTRAR DIÁLOGO
    // ======================================================

    show(dialog, onFinish = null) {

        clearTimeout(
            this.hideTimer
        );

        this.hideTimer = null;


        clearInterval(
            this.typingTimer
        );

        this.typingTimer = null;

        this.isTyping = false;


        this.removeChoices();


        this.dialog = dialog;

        this.index = 0;

        this.onFinish = onFinish;


        this.box.style.display =
            "block";


        requestAnimationFrame(() => {

            this.box.style.opacity =
                "1";

        });


        this.render();

    }


    // ======================================================
    // RENDER
    // ======================================================

    render() {

        const line =
            this.dialog[this.index];


        if(!line){

            return;

        }


        if(line.speaker){

            this.speaker.style.display =
                "block";

            this.speaker.textContent =
                line.speaker;

        }else{

            this.speaker.style.display =
                "none";

        }


        this.typeText(
            line.text || ""
        );

    }


    // ======================================================
    // ESCRIBIR TEXTO
    // ======================================================

    typeText(text) {

        clearInterval(
            this.typingTimer
        );


        this.fullText =
            text;

        this.text.textContent =
            "";


        this.isTyping =
            true;


        let i = 0;


        this.typingTimer =
            setInterval(() => {

                this.text.textContent =
                    text.substring(
                        0,
                        i + 1
                    ) + "▋";

                i++;


                if(i >= text.length){

                    clearInterval(
                        this.typingTimer
                    );

                    this.typingTimer =
                        null;

                    this.text.textContent =
                        text;

                    this.isTyping =
                        false;

                }

            }, this.speed);

    }


    // ======================================================
    // SIGUIENTE FRASE
    // ======================================================

    next() {

        if(this.isTyping){

            clearInterval(
                this.typingTimer
            );

            this.typingTimer =
                null;

            this.text.textContent =
                this.fullText;

            this.isTyping =
                false;

            return;

        }


        this.index++;


        if(
            this.index >=
            this.dialog.length
        ){

            this.hide();


            if(this.onFinish){

                const callback =
                    this.onFinish;

                this.onFinish =
                    null;

                callback();

            }

            return;

        }


        this.render();

    }


    // ======================================================
    // MOSTRAR ELECCIÓN
    // ======================================================

    showChoice(
        question,
        yesText,
        noText,
        onYes,
        onNo
    ){

        clearTimeout(
            this.hideTimer
        );

        this.hideTimer =
            null;


        clearInterval(
            this.typingTimer
        );

        this.typingTimer =
            null;

        this.isTyping =
            false;


        this.removeChoices();


        this.box.style.display =
            "block";


        requestAnimationFrame(() => {

            this.box.style.opacity =
                "1";

        });


        this.speaker.style.display =
            "none";


        this.text.textContent =
            question;


        // ==================================================
        // CONTENEDOR
        // ==================================================

        const choices =
            document.createElement(
                "div"
            );

        choices.id =
            "dialogChoices";


        choices.style.marginTop =
            "18px";

        choices.style.textAlign =
            "center";


        // ==================================================
        // SÍ
        // ==================================================

        const yes =
            document.createElement(
                "span"
            );

        yes.textContent =
            yesText;


        // ==================================================
        // NO
        // ==================================================

        const no =
            document.createElement(
                "span"
            );

        no.textContent =
            noText;


        // ==================================================
        // ESTILO
        // ==================================================

        [yes, no].forEach(option => {

            option.style.margin =
                "0 18px";

            option.style.cursor =
                "pointer";

            option.style.fontFamily =
                "inherit";

            option.style.fontSize =
                "inherit";

        });


        // ==================================================
        // EFECTOS
        // ==================================================

        yes.addEventListener(

            "mouseenter",

            () => {

                yes.style.textDecoration =
                    "underline";

            }

        );


        yes.addEventListener(

            "mouseleave",

            () => {

                yes.style.textDecoration =
                    "none";

            }

        );


        no.addEventListener(

            "mouseenter",

            () => {

                no.style.textDecoration =
                    "underline";

            }

        );


        no.addEventListener(

            "mouseleave",

            () => {

                no.style.textDecoration =
                    "none";

            }

        );


        // ==================================================
        // SÍ
        // ==================================================

        yes.addEventListener(

            "click",

            (event) => {

                event.stopPropagation();


                this.removeChoices();


                this.hide();


                if(onYes){

                    onYes();

                }

            }

        );


        // ==================================================
        // NO
        // ==================================================

        no.addEventListener(

            "click",

            (event) => {

                event.stopPropagation();


                this.removeChoices();


                this.hide();


                if(onNo){

                    onNo();

                }

            }

        );


        // ==================================================
        // AÑADIR BOTONES
        // ==================================================

        choices.appendChild(
            yes
        );

        choices.appendChild(
            no
        );


        this.box.appendChild(
            choices
        );

    }


    // ======================================================
    // ELIMINAR ELECCIONES
    // ======================================================

    removeChoices(){

        const choices =
            document.getElementById(
                "dialogChoices"
            );


        if(choices){

            choices.remove();

        }

    }


    // ======================================================
    // OCULTAR
    // ======================================================

    hide(){

        clearInterval(
            this.typingTimer
        );

        this.typingTimer =
            null;

        this.isTyping =
            false;


        this.removeChoices();


        this.box.style.opacity =
            "0";


        clearTimeout(
            this.hideTimer
        );


        this.hideTimer =
            setTimeout(() => {

                this.box.style.display =
                    "none";

                this.hideTimer =
                    null;

            }, 300);

    }

}
