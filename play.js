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
