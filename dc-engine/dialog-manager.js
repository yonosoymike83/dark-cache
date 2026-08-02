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
        this.fullText = "";

        // Velocidad (ms por letra)
        this.speed = 28;

        this.box.addEventListener("click", () => {

            this.next();

        });

    }

    show(dialog, onFinish = null) {

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

    hide() {

        clearInterval(this.typingTimer);

        this.isTyping = false;

        this.box.style.opacity = "0";

        setTimeout(() => {

            this.box.style.display = "none";

        }, 300);

    }

}
