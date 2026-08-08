class DialogManager {

    constructor() {

        this.box = document.getElementById("dialogBox");
        this.speaker = document.getElementById("dialogSpeaker");
        this.text = document.getElementById("dialogText");

        this.dialog = [];
        this.index = 0;
        this.onFinish = null;

        this.isTyping = false;
        this.typingTimer = null;
        this.hideTimer = null;
        this.fullText = "";

        // Velocidad (ms por letra)
        this.speed = 28;

        this.box.addEventListener("click", () => {

            this.next();

        });

    }

    show(dialog, onFinish = null) {

        clearTimeout(this.hideTimer);
        
        this.removeChoices();
        
        this.dialog = dialog;
        this.index = 0;
        this.onFinish = onFinish;

        this.box.style.display = "block";

        requestAnimationFrame(() => {

            this.box.style.opacity = "1";

        });

        this.render();

    }

    render() {

        const line = this.dialog[this.index];

        if (line.speaker) {

            this.speaker.style.display = "block";
            this.speaker.textContent = line.speaker;

        } else {

            this.speaker.style.display = "none";

        }

        this.typeText(line.text || "");

    }

    typeText(text) {

        clearInterval(this.typingTimer);

        this.fullText = text;
        this.text.textContent = "";

        this.isTyping = true;

        let i = 0;

        this.typingTimer = setInterval(() => {

            this.text.textContent = text.substring(0, i + 1) + "▋";

            i++;

            if (i >= text.length) {

                clearInterval(this.typingTimer);

                this.text.textContent = text;

                this.isTyping = false;

            }

        }, this.speed);

    }

    next() {

        // Si todavía está escribiendo,
        // mostrar la frase completa.

        if (this.isTyping) {

            clearInterval(this.typingTimer);

            this.text.textContent = this.fullText;

            this.isTyping = false;

            return;

        }

        this.index++;

        if (this.index >= this.dialog.length) {

            this.hide();

            if (this.onFinish) {

                this.onFinish();

            }

            return;

        }

        this.render();

    }

    showChoice(question, yesText, noText, onYes, onNo){
    
        clearTimeout(this.hideTimer);
        clearInterval(this.typingTimer);
    
        this.isTyping = false;
    
        // Eliminar cualquier elección anterior
        this.removeChoices();
    
        this.box.style.display = "block";
    
        requestAnimationFrame(() => {
    
            this.box.style.opacity = "1";
    
        });
    
        this.speaker.style.display = "none";
    
        this.text.textContent = question;
    
        // Contenedor de las opciones
        const choices = document.createElement("div");
    
        choices.id = "dialogChoices";
    
        choices.style.marginTop = "18px";
        choices.style.textAlign = "center";
    
        // Opción SÍ
        const yes = document.createElement("span");
    
        yes.textContent = yesText;
    
        // Opción NO
        const no = document.createElement("span");
    
        no.textContent = noText;
    
        // Estilo común
        [yes, no].forEach(option => {
    
            option.style.margin = "0 18px";
            option.style.cursor = "pointer";
            option.style.fontFamily = "inherit";
            option.style.fontSize = "inherit";
    
        });
    
        // Pequeño efecto al pasar el ratón
        yes.addEventListener("mouseenter", () => {
    
            yes.style.textDecoration = "underline";
    
        });
    
        yes.addEventListener("mouseleave", () => {
    
            yes.style.textDecoration = "none";
    
        });
    
        no.addEventListener("mouseenter", () => {
    
            no.style.textDecoration = "underline";
    
        });
    
        no.addEventListener("mouseleave", () => {
    
            no.style.textDecoration = "none";
    
        });
    
        // SÍ
        yes.addEventListener("click", (event) => {
    
            event.stopPropagation();
    
            this.removeChoices();
    
            this.hide();
    
            if(onYes){
    
                onYes();
    
            }
    
        });
    
        // NO
        no.addEventListener("click", (event) => {
    
            event.stopPropagation();
    
            this.removeChoices();
    
            this.hide();
    
            if(onNo){
    
                onNo();
    
            }
    
        });
    
        choices.appendChild(yes);
        choices.appendChild(no);
    
        this.box.appendChild(choices);
    
    }

    removeChoices(){

        const choices =
            document.getElementById("dialogChoices");
    
        if(choices){
    
            choices.remove();
    
        }
    
    }
    
    hide() {
    
        clearInterval(this.typingTimer);
    
        this.isTyping = false;
    
        this.removeChoices();
    
        this.box.style.opacity = "0";
    
        clearTimeout(this.hideTimer);
    
        this.hideTimer = setTimeout(() => {
    
            this.box.style.display = "none";
    
        }, 300);
    
    }

}
