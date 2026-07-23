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

            intro.innerHTML = "
