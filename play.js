const intro = document.getElementById("intro");

const texts = [
    "Dicen que algunos geocachés son imposibles de encontrar.",
    "Otros...",
    "que nunca debieron ocultarse."
];

let current = 0;

function showText() {

    intro.style.opacity = 0;

    setTimeout(() => {

        intro.textContent = texts[current];
        intro.style.opacity = 1;

    }, 700);

}

showText();

document.body.addEventListener("click", () => {

    current++;

    if (current >= texts.length) {

        intro.style.opacity = 0;

        setTimeout(() => {

            intro.textContent = "CAPÍTULO I\n\nEl viejo tendero";
            intro.style.whiteSpace = "pre-line";
            intro.style.opacity = 1;

        }, 700);

        return;
    }

    showText();

});
