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

    function next() {

        if (locked) return;

        locked = true;

        current++;

        if (current < texts.length) {

            show(texts[current]);
            return;

        }

        // Ya no quedan frases
        document.removeEventListener("click", next);

        intro.style.opacity = 0;

        setTimeout(() => {

            intro.innerHTML = `
                <div class="chapter-title">${title}</div>
                <div class="chapter-subtitle">«${subtitle}»</div>
            `;

            intro.style.opacity = 1;

            // Esperar a que el jugador pulse
            setTimeout(() => {

                document.addEventListener("click", startScene, {
                    once: true
                });

            }, 200);

        }, 1000);

    }

    function startScene() {

        intro.style.opacity = 0;

        setTimeout(() => {

            if (onFinish) {

                onFinish();

            }

        }, 1000);

    }

    // Mostrar la primera frase
    show(texts[0]);

    // Esperar un poco antes de permitir avanzar
    setTimeout(() => {

        document.addEventListener("click", next);

    }, 300);

}
