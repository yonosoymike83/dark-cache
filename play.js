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

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

const intro = document.getElementById("intro");
const scene = document.getElementById("scene");

async function enterGameMode(){

    // Pantalla completa
    if(document.documentElement.requestFullscreen){

        try{
            await document.documentElement.requestFullscreen();
        }catch(e){
            console.log("Fullscreen no disponible");
        }

    }

    // Bloquear orientación
    if(screen.orientation && screen.orientation.lock){

        try{
            await screen.orientation.lock("landscape");
        }catch(e){
            console.log("No se pudo bloquear la orientación");
        }

    }

}

function startGame(){

    startScreen.style.display = "none";

    intro.style.display = "block";

    startIntro(

        introTexts,

        "CAPÍTULO I",

        "La Tienda del Viejo Bug",

        function(){

            intro.style.display = "none";

            scene.style.opacity = "0";

            scene.style.backgroundImage =
                "url('assets/images/escena01.png')";

            scene.style.display = "block";

            requestAnimationFrame(function(){

                scene.style.opacity = "1";

            });

        }

    );

}

function showStartScreen(){

    passwordScreen.style.display = "none";

    startScreen.style.display = "flex";

}

async function beginAdventure(){

    await enterGameMode();

    startGame();

}

const savedPassword = localStorage.getItem("darkcache_password");

if(savedPassword === PASSWORD){

    showStartScreen();

}else{

    input.focus();

    function checkPassword(){

        if(input.value === PASSWORD){

            localStorage.setItem(
                "darkcache_password",
                PASSWORD
            );

            showStartScreen();

        }else{

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

        if(e.key === "Enter"){

            e.preventDefault();

            checkPassword();

        }

    });

}

startButton.addEventListener("click", function(){

    beginAdventure();

});
