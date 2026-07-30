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

const sceneManager = new SceneManager(
    scene,
    sceneImage,
    hotspots
);

// -------------------- AUDIO --------------------

const rain = new Audio("assets/sounds/rain.ogg");
rain.loop = true;
rain.volume = 0.65;

const music = new Audio();
music.loop = true;
music.volume = 0;

// -------------------- FUNCIONES --------------------

function fadeVolume(audio, targetVolume, duration){

    const startVolume = audio.volume;
    const steps = 40;
    const stepTime = duration / steps;
    const delta = (targetVolume - startVolume) / steps;

    let currentStep = 0;

    const interval = setInterval(function(){

        currentStep++;

        audio.volume += delta;

        if(currentStep >= steps){

            audio.volume = targetVolume;

            clearInterval(interval);

        }

    }, stepTime);

}

async function enterGameMode(){

    if(document.documentElement.requestFullscreen){

        try{

            await document.documentElement.requestFullscreen();

        }catch(e){

            console.log("Fullscreen no disponible");

        }

    }

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

        Chapter01.intro,

        Chapter01.title,

        Chapter01.subtitle,

        function(){

            intro.style.display = "none";

            sceneManager.load(Chapter01.startScene).then(function(){

                music.src = Chapter01.startScene.music;

                music.play();

                fadeVolume(rain,0.35,2000);

                fadeVolume(music,0.25,4000);

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

    try{

        await rain.play();

    }catch(e){

        console.log("No se pudo reproducir la lluvia");

    }

    startGame();

}

// -------------------- CONTRASEÑA --------------------

const savedPassword = localStorage.getItem("darkcache_password");

if(savedPassword === Chapter01.password){

    showStartScreen();

}else{

    input.focus();

    function checkPassword(){

        if(input.value === Chapter01.password){

            localStorage.setItem(

                "darkcache_password",

                Chapter01.password

            );

            showStartScreen();

        }else{

            error.textContent = "Contraseña incorrecta";

            input.value = "";

            input.focus();

        }

    }

    button.addEventListener("click",function(e){

        e.preventDefault();

        e.stopPropagation();

        checkPassword();

    });

    input.addEventListener("keydown",function(e){

        if(e.key==="Enter"){

            e.preventDefault();

            checkPassword();

        }

    });

}

// -------------------- INICIO --------------------

startButton.addEventListener("click",function(){

    beginAdventure();

});
