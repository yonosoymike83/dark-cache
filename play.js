const PASSWORD = "negro_oscuro";

const saved = localStorage.getItem("darkcache_password");

const passwordScreen = document.getElementById("passwordScreen");
const input = document.getElementById("passwordInput");
const button = document.getElementById("passwordButton");
const error = document.getElementById("passwordError");

function startGame(){

    passwordScreen.style.display="none";

    startIntro(

        introTexts,

        "CAPÍTULO I",

        "El viejo tendero",

        ()=>{

            document.getElementById("intro").innerHTML="ESCENA 1";
            document.getElementById("intro").style.opacity=1;

        }

    );

}

if(saved===PASSWORD){

    startGame();

}else{

    input.focus();

    function checkPassword(){

        if(input.value===PASSWORD){

            localStorage.setItem("darkcache_password",PASSWORD);

            startGame();

        }else{

            error.textContent="Contraseña incorrecta";

            input.value="";
        }

    }

    button.onclick=checkPassword;

    input.addEventListener("keydown",e=>{

        if(e.key==="Enter"){

            checkPassword();

        }

    });

}
const introTexts=[

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

startIntro(

introTexts,

"CAPÍTULO I",

"El viejo tendero",

()=>{

    document.getElementById("intro").innerHTML="ESCENA 1";

    document.getElementById("intro").style.opacity=1;

}

);
