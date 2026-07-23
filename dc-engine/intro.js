function startIntro(texts, title, subtitle, onFinish) {

    const intro = document.getElementById("intro");

    let current = 0;
    let locked = false;

    function show(text) {

        intro.style.opacity = 0;

        setTimeout(() => {

            intro.innerHTML = text;
            intro.style.opacity = 1;
            locked = false;

        }, 800);

    }

    // Primera frase
    show(texts[0]);

    document.body.onclick = next;

    function next() {

        if (locked) return;

        locked = true;

        current++;

        // Quedan frases
        if (current < texts.length) {

            show(texts[current]);
            return;

        }

        // Ya no quedan frases
        document.body.onclick = null;

        intro.style.opacity = 0;

        // Pantalla negra durante 1 segundo
        setTimeout(() => {

            intro.innerHTML = `
                <div class="chapter-title">${title}</div>
                <div class="chapter-subtitle">«${subtitle}»</div>
            `;

            intro.style.opacity = 1;

            // Esperar a que el jugador pulse
            document.body.onclick = () => {

                document.body.onclick = null;

                intro.style.opacity = 0;

                setTimeout(() => {

                    if (onFinish) {
                        onFinish();
                    }

                }, 1000);

            };

        }, 1000);

    }

}
