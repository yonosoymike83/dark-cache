function startIntro(texts, onFinish){

    const intro = document.getElementById("intro");

    let index = 0;

    function show(){

        intro.style.opacity = 0;

        setTimeout(()=>{

            intro.textContent = texts[index];
            intro.style.opacity = 1;

        },500);

    }

    show();

    document.body.onclick = ()=>{

        intro.style.opacity = 0;

        setTimeout(()=>{

            index++;

            if(index >= texts.length){

                document.body.onclick = null;

                if(onFinish){
                    onFinish();
                }

                return;
            }

            intro.textContent = texts[index];
            intro.style.opacity = 1;

        },500);

    };

}
