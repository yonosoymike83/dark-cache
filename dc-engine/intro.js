function startIntro(texts, onFinish){

    const intro = document.getElementById("intro");

    let index = 0;
    let locked = false;

    function show(){

        intro.style.opacity = 0;

        setTimeout(()=>{

            intro.textContent = texts[index];
            intro.style.opacity = 1;

            locked = false;

        },700);

    }

    show();

    document.body.onclick = ()=>{

        if(locked) return;

        locked = true;

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

            locked = false;

        },700);

    };

}
