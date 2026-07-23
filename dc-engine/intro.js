function startIntro(texts,title,subtitle,onFinish){

    const intro=document.getElementById("intro");

    let current=0;

    let locked=false;

    function show(text){

        intro.style.opacity=0;

        setTimeout(()=>{

            intro.innerHTML=text;

            intro.style.opacity=1;

            locked=false;

        },800);

    }

    show(texts[0]);

    document.body.onclick=next;

    function next(){

        if(locked)return;

        locked=true;

        current++;

        if(current<texts.length){

            show(texts[current]);

            return;

        }

        document.body.onclick=null;

        intro.style.opacity=0;

        setTimeout(()=>{

            intro.innerHTML=`
            <div class="chapter-title">${title}</div>

            <div class="chapter-subtitle">«${subtitle}»</div>

            <div class="continue">
                Pulsa para continuar...
            </div>
            `;

            intro.style.opacity=1;

            document.body.onclick=()=>{

                document.body.onclick=null;

                intro.style.opacity=0;

                setTimeout(()=>{

                    if(onFinish)onFinish();

                },1000);

            };

        },1000);

    }

}
