class DialogManager {

    constructor() {

        this.box = document.getElementById("dialogBox");
        this.speaker = document.getElementById("dialogSpeaker");
        this.text = document.getElementById("dialogText");

        this.dialog = [];
        this.index = 0;
        this.onFinish = null;

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

        this.speaker.textContent = line.speaker || "";

        this.text.textContent = line.text || "";

    }

    next() {

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

        this.box.style.opacity = "0";

        setTimeout(() => {

            this.box.style.display = "none";

        }, 300);

    }

}
