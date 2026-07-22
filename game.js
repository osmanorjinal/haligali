// ===============================
// game.js
// ===============================

const fruitCounter = {
    "🍎":0,
    "🍌":0,
    "🍇":0,
    "🍋":0,
    "🍓":0
};

function resetCounter(){

    fruitCounter["🍎"]=0;
    fruitCounter["🍌"]=0;
    fruitCounter["🍇"]=0;
    fruitCounter["🍋"]=0;
    fruitCounter["🍓"]=0;

}

function countTable(){

    resetCounter();

    playerTable.forEach(card=>{
        fruitCounter[card.fruit]+=card.amount;
    });

    cpuTable.forEach(card=>{
        fruitCounter[card.fruit]+=card.amount;
    });

}

function checkBell(){

    countTable();

    bellEnabled=false;

    for(const fruit in fruitCounter){

        if(fruitCounter[fruit]===5){

            bellEnabled=true;
            break;

        }

    }

    if(bellEnabled){

        bell.classList.add("active");
        message.innerText="🔔 ZİLE BAS!";

        waitingAI=true;

        startComputer();

    }else{

        bell.classList.remove("active");
        message.innerText="Devam et.";

    }

}

function pressBell(){

    if(!bellEnabled){

        cpuDeck.push(...playerTable);
        cpuDeck.push(...cpuTable);

        playerTable=[];
        cpuTable=[];

        playerPlayed.innerHTML="?";
        cpuPlayed.innerHTML="?";

        updateCounters();

        message.innerText="Yanlış bastın.";

        bell.classList.remove("active");

        return;

    }

    playerDeck.push(...playerTable);
    playerDeck.push(...cpuTable);

    playerTable=[];
    cpuTable=[];

    playerPlayed.innerHTML="?";
    cpuPlayed.innerHTML="?";

    bell.classList.remove("active");

    bellEnabled=false;
    waitingAI=false;

    updateCounters();

    message.innerText="Kartları kazandın!";

    checkWinner();

}

function computerBell(){

    if(!bellEnabled) return;

    cpuDeck.push(...playerTable);
    cpuDeck.push(...cpuTable);

    playerTable=[];
    cpuTable=[];

    playerPlayed.innerHTML="?";
    cpuPlayed.innerHTML="?";

    bell.classList.remove("active");

    bellEnabled=false;
    waitingAI=false;

    updateCounters();

    message.innerText="💻 Bilgisayar daha hızlı bastı.";

    checkWinner();

}

function shuffle(deck){

    for(let i=deck.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [deck[i],deck[j]]=[deck[j],deck[i]];

    }

}

function collectPlayer(){

    playerDeck.push(...playerTable);
    playerDeck.push(...cpuTable);

    shuffle(playerDeck);

    playerTable=[];
    cpuTable=[];

}

function collectCPU(){

    cpuDeck.push(...playerTable);
    cpuDeck.push(...cpuTable);

    shuffle(cpuDeck);

    playerTable=[];
    cpuTable=[];

}

function clearCards(){

    playerPlayed.innerHTML="?";
    cpuPlayed.innerHTML="?";

}

function checkWinner(){

    if(playerDeck.length===0){

        setTimeout(()=>{

            alert("💻 Bilgisayar Kazandı");

            location.reload();

        },500);

        return;

    }

    if(cpuDeck.length===0){

        setTimeout(()=>{

            alert("🏆 Tebrikler Kazandın!");

            location.reload();

        },500);

    }

}
