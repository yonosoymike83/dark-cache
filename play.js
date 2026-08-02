const passwordScreen = document.getElementById("passwordScreen");
const input = document.getElementById("passwordInput");
const button = document.getElementById("passwordButton");
const error = document.getElementById("passwordError");

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

const intro = document.getElementById("intro");

const scene = document.getElementById("scene");
const sceneImage = document.getElementById("sceneImage");
const hotspotLayer = document.getElementById("hotspotLayer");

// -------------------- MOTORES --------------------

const hotspots = new HotspotManager(
    scene,
    sceneImage,
    hotspotLayer
);

const audioManager = new AudioManager();

const dialog = new DialogManager();

const sceneManager = new SceneManager(
    scene,
    sceneImage,
    hotspots,
    audioManager
);

// -------------------- FUNCIONES --------------------

async function enterGameMode() {

    if (document.documentElement.requestFullscreen) {

        try {

            await document.documentElement.requestFullscreen();

        } catch (e) {

            console.log("Fullscreen no disponible");

        }

    }

    if (screen.orientation && screen.orientation.lock) {

        try {

            await screen.orientation.lock("landscape");

        } catch (e) {

            console.log("No se pudo bloquear la orientación");

        }

    }

}

function startGame() {

    startScreen.style.display = "none";

    intro.style.display = "block";

    startIntro(

        Chapter01.intro,

        Chapter01.title,

        Chapter01.subtitle,

        async function () {

            intro.style.display = "none";

            await sceneManager.load(
                Chapter01.startScene
            );

        }

    );

}

function showStartScreen() {

    passwordScreen.style.display = "none";

    startScreen.style.display = "flex";

}

async function beginAdventure() {

    await enterGameMode();

    // Iniciar sonido ambiente durante la intro
    await audioManager.playAmbientOnly(
        Chapter01.startScene.ambient,
        0.65
    );

    startGame();

}

// -------------------- CONTRASEÑA --------------------

const savedPassword = localStorage.getItem("darkcache_password");

if (savedPassword === Chapter01.password) {

    showStartScreen();

} else {

    input.focus();

    function checkPassword() {

        if (input.value === Chapter01.password) {

            localStorage.setItem(
                "darkcache_password",
                Chapter01.password
            );

            showStartScreen();

        } else {

            error.textContent = "Contraseña incorrecta";

            input.value = "";

            input.focus();

        }

    }

    button.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        checkPassword();

    });

    input.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            e.preventDefault();

            checkPassword();

        }

    });

}

// -------------------- INICIO --------------------

startButton.addEventListener("click", function () {

    beginAdventure();

});
