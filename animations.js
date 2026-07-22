// ===============================
// animations.js
// ===============================

const table = document.getElementById("table");

function animateFlip(card){

    card.classList.remove("flip");
    void card.offsetWidth;
    card.classList.add("flip");

}

function animateBell(){

    bell.classList.remove("hit");
    void bell.offsetWidth;
    bell.classList.add("hit");

}

function flashScreen(color="#ffe600"){

    const flash=document.createElement("div");

    flash.style.position="fixed";
    flash.style.left="0";
    flash.style.top="0";
    flash.style.width="100%";
    flash.style.height="100%";
    flash.style.background=color;
    flash.style.opacity=".45";
    flash.style.pointerEvents="none";
    flash.style.zIndex="99999";
    flash.style.transition=".35s";

    document.body.appendChild(flash);

    setTimeout(()=>{
        flash.style.opacity="0";
    },50);

    setTimeout(()=>{
        flash.remove();
    },400);

}

function shakeScreen(){

    document.body.classList.remove("shake");
    void document.body.offsetWidth;
    document.body.classList.add("shake");

}

function animateWin(){

    playerPlayed.classList.add("win");
    cpuPlayed.classList.add("win");

    setTimeout(()=>{

        playerPlayed.classList.remove("win");
        cpuPlayed.classList.remove("win");

    },700);

}

function popCard(card){

    card.animate([
        {
            transform:"scale(.7)"
        },
        {
            transform:"scale(1.1)"
        },
        {
            transform:"scale(1)"
        }
    ],{

        duration:250

    });

}

function throwCardsToPlayer(){

    playerPlayed.animate([

        {transform:"translateY(0px) rotate(0deg)"},
        {transform:"translateY(150px) rotate(-15deg) scale(.8)"}

    ],{

        duration:500,
        fill:"forwards"

    });

    cpuPlayed.animate([

        {transform:"translateY(0px) rotate(0deg)"},
        {transform:"translateY(150px) rotate(15deg) scale(.8)"}

    ],{

        duration:500,
        fill:"forwards"

    });

}

function throwCardsToCPU(){

    playerPlayed.animate([

        {transform:"translateY(0px)"},
        {transform:"translateY(-150px) rotate(20deg) scale(.8)"}

    ],{

        duration:500,
        fill:"forwards"

    });

    cpuPlayed.animate([

        {transform:"translateY(0px)"},
        {transform:"translateY(-150px) rotate(-20deg) scale(.8)"}

    ],{

        duration:500,
        fill:"forwards"

    });

}

function rainConfetti(){

    for(let i=0;i<80;i++){

        const c=document.createElement("div");

        c.innerHTML=["🎉","✨","⭐","🎊"][Math.floor(Math.random()*4)];

        c.style.position="fixed";
        c.style.left=Math.random()*100+"vw";
        c.style.top="-50px";
        c.style.fontSize=(20+Math.random()*20)+"px";
        c.style.zIndex="99999";
        c.style.pointerEvents="none";

        document.body.appendChild(c);

        c.animate([

            {
                transform:"translateY(0) rotate(0deg)"
            },
            {
                transform:`translateY(${window.innerHeight+100}px) rotate(${Math.random()*720}deg)`
            }

        ],{

            duration:2500+Math.random()*2000,
            easing:"linear"

        });

        setTimeout(()=>{

            c.remove();

        },5000);

    }

}

function playerBellAnimation(){

    animateBell();
    flashScreen("#fff176");
    shakeScreen();
    animateWin();
    throwCardsToPlayer();

}

function cpuBellAnimation(){

    animateBell();
    flashScreen("#ff7676");
    shakeScreen();
    throwCardsToCPU();

}

function celebrateVictory(){

    rainConfetti();

    flashScreen("#66ff66");

}

function celebrateLose(){

    flashScreen("#ff4444");

}
