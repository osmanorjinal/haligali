// ===============================
// sound.js
// Web Audio API
// ===============================

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function tone(freq,time,type="sine",vol=0.08){

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    gain.gain.value = vol;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime + time
    );

    osc.stop(audioCtx.currentTime + time);

}

// ----------------------
// Kart Aç
// ----------------------

function playFlip(){

    tone(450,.03,"square");
    setTimeout(()=>tone(700,.05,"square"),30);

}

// ----------------------
// Zil
// ----------------------

function playBell(){

    tone(900,.08,"triangle");
    setTimeout(()=>tone(1400,.18,"triangle"),60);

}

// ----------------------
// Kazanma
// ----------------------

function playWin(){

    const notes=[523,659,784,1046];

    notes.forEach((n,i)=>{

        setTimeout(()=>{

            tone(n,.22,"triangle");

        },i*150);

    });

}

// ----------------------
// Kaybetme
// ----------------------

function playLose(){

    const notes=[650,500,380,250];

    notes.forEach((n,i)=>{

        setTimeout(()=>{

            tone(n,.18,"sawtooth");

        },i*120);

    });

}

// ----------------------
// Hata
// ----------------------

function playWrong(){

    tone(180,.18,"square");

}

// ----------------------
// Kart Kazanma
// ----------------------

function playCollect(){

    tone(650,.05);
    setTimeout(()=>tone(850,.05),50);
    setTimeout(()=>tone(1100,.08),100);

}

// ----------------------
// Tıklama
// ----------------------

function clickSound(){

    tone(500,.02,"square");

}

// ----------------------
// Hover
// ----------------------

function hoverSound(){

    tone(700,.01);

}

// ----------------------
// Oyun Bitti
// ----------------------

function finishSound(win=true){

    if(win){

        playWin();

        setTimeout(()=>tone(1300,.4),700);

    }else{

        playLose();

    }

}

// ----------------------
// Kullanım
// ----------------------

flipBtn.addEventListener("click",playFlip);

bell.addEventListener("click",()=>{

    playBell();

});

startBtn.addEventListener("click",()=>{

    if(audioCtx.state==="suspended")
        audioCtx.resume();

    clickSound();

});
