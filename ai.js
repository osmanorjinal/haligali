// ===============================
// ai.js
// ===============================

let aiTimeout = null;

const AI = {
    easy: {
        min: 900,
        max: 1400,
        mistake: 0.30
    },
    medium: {
        min: 450,
        max: 800,
        mistake: 0.12
    },
    hard: {
        min: 180,
        max: 350,
        mistake: 0.03
    }
};

function random(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function startComputer(){

    clearTimeout(aiTimeout);

    const level = AI[difficulty];

    const reaction = random(level.min,level.max);

    aiTimeout = setTimeout(()=>{

        if(!bellEnabled) return;

        computerBell();

    },reaction);

}

function stopComputer(){

    clearTimeout(aiTimeout);

}

function computerWrongBell(){

    const level = AI[difficulty];

    if(bellEnabled) return;

    if(Math.random()>level.mistake) return;

    cpuDeck.push(...playerTable);
    cpuDeck.push(...cpuTable);

    playerTable=[];
    cpuTable=[];

    clearCards();

    updateCounters();

    message.innerText="💥 Bilgisayar yanlış zile bastı.";

}

setInterval(()=>{

    if(!gameStarted) return;

    if(waitingAI) return;

    computerWrongBell();

},2000);
