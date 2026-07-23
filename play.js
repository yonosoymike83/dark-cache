const PASSWORD = "negro_oscuro";

const introTexts = [

    "Dicen que algunos geocachés son imposibles de encontrar.",

    "Otros...",

    "que nunca debieron ocultarse.",

    "Durante años pensé que solo eran historias.",

    "Hasta aquella noche.",

    "Alguien pronunció un nombre en voz baja.",

    "El Caché Oscuro.",

    "Nadie quiso hablar demasiado.",

    "Solo me dijeron una cosa...",

    "Busca al viejo tendero."

];

const passwordScreen = document.getElementById("passwordScreen");
const input = document.getElementById("passwordInput");
const button = document.getElementById("passwordButton");
const error = document.getElementById("passwordError");
const intro = document.getElementById("intro");

function startGame() {

    passwordScreen.style.display = "none";
    intro.style.display = "block";

    startIntro(

        introTexts,

        "CAPÍTULO I",

        "El viejo tendero",

        () => {

            intro.innerHTML = "ESCENA 1";
            intro.style.opacity = 1;

        }

    );

}

const savedPassword = localStorage.getItem("darkcache_password");

if (savedPassword === PASSWORD) {

    startGame();

} else {

    input.focus();

    function checkPassword() {

        if (input.value === PASSWORD) {

            localStorage.setItem("darkcache_password", PASSWORD);

            // Esperamos un instante para que termine el clic del botón
            setTimeout(() => {

                startGame();

            }, 200);

        } else {

            error.textContent = "Contraseña incorrecta";
            input.value = "";
            input.focus();

        }

    }

    button.addEventListener("click", function(e){

        e.preventDefault();
        e.stopPropagation();

        checkPassword();

    });

    input.addEventListener("keydown", function(e) {

        if (e.key === "Enter") {

            e.preventDefault();

            checkPassword();

        }

    });

}
