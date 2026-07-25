const PASSWORD = "negro_oscuro";

const introTexts = [

    "Dicen que algunos cachés son imposibles de encontrar.",

    "Otros...",

    "que nunca debieron haberse ocultado.",

    "Durante años pensé que solo eran historias.",

    "Hasta aquella noche.",

    "Alguien pronunció un nombre en voz baja...",

    "El Caché Oscuro.",

    "Y se hizo el silencio, nadie quiso seguir hablando...",

    "Pero yo insistí, aunque solo para oír:",

    "La Tienda del Viejo Bug."

];

const passwordScreen = document.getElementById("passwordScreen");
const input = document.getElementById("passwordInput");
const button = document.getElementById("passwordButton");
const error = document.getElementById("passwordError");
const intro = document.getElementById("intro");
const scene = document.getElementById("scene");

function startGame() {

    passwordScreen.style.display = "none";
    intro.style.display = "block";

    startIntro(

        introTexts,

        "CAPÍTULO I",

        "La Tienda del Viejo Bug",

        function(){

            intro.style.display = "none";

            scene.style.display = "block";

            scene.style.backgroundImage = "url('assets/images/escena01.png')";

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

    input.addEventListener("keydown", function(e){

        if (e.key === "Enter") {

            e.preventDefault();

            checkPassword();

        }

    });

}
