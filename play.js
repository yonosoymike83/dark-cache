const introTexts = [

    "Dicen que algunos geocachés son imposibles de encontrar.",

    "Otros...",

    "que nunca debieron ocultarse.",

    "Hasta que una conversación cambió mi vida.",

    "Aquella noche escuché un nombre...",

    "El Caché Oscuro."

];

startIntro(introTexts, ()=>{

    const intro = document.getElementById("intro");

    intro.innerHTML = "<h1>CAPÍTULO I</h1><h2>El viejo tendero</h2>";

});
