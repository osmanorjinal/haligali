// ===========================
// HALI GALI
// script.js
// ===========================

const startBtn = document.getElementById("startBtn");
const flipBtn = document.getElementById("flipBtn");
const bell = document.getElementById("bell");

const menu = document.getElementById("menu");
const game = document.getElementById("game");

const difficultySelect = document.getElementById("difficulty");

const playerPlayed = document.getElementById("playerPlayed");
const cpuPlayed = document.getElementById("cpuPlayed");

const playerCardsText = document.getElementById("playerCards");
const cpuCardsText = document.getElementById("cpuCards");

const message = document.getElementById("message");

let difficulty = "medium";

let playerDeck = [];
let cpuDeck = [];

let playerTable = [];
let cpuTable = [];

let currentFruit = {};

let playerTurn = true;
let gameStarted = false;
let bellEnabled = false;
let waitingAI = false;

const fruits = [
    "🍎",
    "🍌",
    "🍇",
    "🍋",
    "🍓"
];

function setDifficulty(){

    difficulty = difficultySelect.value;

}

difficultySelect.addEventListener("change",setDifficulty);

startBtn.onclick = () => {

    menu.style.display="none";
    game.style.display="flex";

    gameStarted=true;

    createDeck();

    updateCounters();

    message.innerText="Kart aç.";

};

flipBtn.onclick=()=>{

    if(!gameStarted) return;

    if(waitingAI) return;

    flipRound();

};

bell.onclick=()=>{

    if(!gameStarted) return;

    pressBell();

};

function updateCounters(){

    playerCardsText.innerText=playerDeck.length;
    cpuCardsText.innerText=cpuDeck.length;

}

function randomCard(){

    return{

        fruit:fruits[Math.floor(Math.random()*fruits.length)],

        amount:Math.floor(Math.random()*5)+1

    };

}

function createDeck(){

    playerDeck=[];
    cpuDeck=[];

    for(let i=0;i<28;i++){

        playerDeck.push(randomCard());
        cpuDeck.push(randomCard());

    }

}

function showCard(element,card){

    element.innerHTML=
    `
    <div style="font-size:80px">${card.fruit}</div>
    <div style="font-size:35px;font-weight:bold">${card.amount}</div>
    `;

    element.classList.remove("flip");

    void element.offsetWidth;

    element.classList.add("flip");

}

function flipRound(){

    if(playerDeck.length===0 || cpuDeck.length===0){

        finishGame();

        return;

    }

    const p = playerDeck.shift();
    const c = cpuDeck.shift();

    playerTable.push(p);
    cpuTable.push(c);

    showCard(playerPlayed,p);
    showCard(cpuPlayed,c);

    updateCounters();

    checkBell();

}

function finishGame(){

    if(playerDeck.length>cpuDeck.length){

        alert("Kazandın!");

    }else if(cpuDeck.length>playerDeck.length){

        alert("Bilgisayar Kazandı!");

    }else{

        alert("Berabere");

    }

    location.reload();

}
