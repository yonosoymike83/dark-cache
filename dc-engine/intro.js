function startIntro(texts, onFinish) {

    const intro = document.getElementById("intro");

    let current = 0;
    let locked = false;

    function showText() {

        intro.style.opacity = 0;

        setTimeout(() => {

            intro.textContent = texts[current];
            intro.style.opacity = 1;

            locked = false;

        }, 800);

    }

    showText();

    document.body.onclick = () => {

        if (locked) return;

        locked = true;

        intro.style.opacity = 0;

        setTimeout(() => {

            current++;

            if (current >= texts.length) {

                document.body.onclick = null;

                // Un segundo de pantalla negra
                setTimeout(() => {

                    if (onFinish) {
                        onFinish();
                    }

                }, 1000);

                return;
            }

            intro.textContent = texts[current];
            intro.style.opacity = 1;

            locked = false;

        }, 800);

    };

}

function showChapterTitle(title, subtitle, onFinish) {

    const intro = document.getElementById("intro");

    intro.style.opacity = 0;

    setTimeout(() => {

        intro.innerHTML = `
            <div class="chapter-title">${title}</div>
            <div class="chapter-subtitle">«${subtitle}»</div>
        `;

        intro.style.opacity = 1;

        // El título permanece 6 segundos
        setTimeout(() => {

            intro.style.opacity = 0;

            // Fundido a negro
            setTimeout(() => {

                if (onFinish) {
                    onFinish();
                }

            }, 1000);

        }, 6000);

    }, 1000);

}
