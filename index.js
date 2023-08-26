import './index.css';
const cross =document.querySelector('.cross');
const rules =document.querySelector('.rules');
const ruling =document.querySelector('.ruling');
const endouter=document.querySelector('.end-outer');
const endoutersmall=document.querySelector('.end-outer-small');
const gamestatusnew=document.querySelector('.game-status-new');






cross.addEventListener('click', function(){
    rules.classList.add('opacity-0');
    rules.classList.add('invisible');
    rules.classList.add('pointer-events-none');
    ruling.classList.add('scale-0');

});


let currentPlayer;
let playerOneScore;
let playerTwoScore;

const positionProfitOrLoss =new Map();
positionProfitOrLoss.set(4, 14);
positionProfitOrLoss.set(9, 31);
positionProfitOrLoss.set(17, 7);
positionProfitOrLoss.set(20, 38);
positionProfitOrLoss.set(28, 84);
positionProfitOrLoss.set(40, 59);
positionProfitOrLoss.set(54, 34);
positionProfitOrLoss.set(62, 18);
positionProfitOrLoss.set(64, 60);
positionProfitOrLoss.set(71, 91);
positionProfitOrLoss.set(87, 24);
positionProfitOrLoss.set(93, 73);
positionProfitOrLoss.set(95, 75);
positionProfitOrLoss.set(99, 78);

const newGameButton = document.querySelector('.new-game-button');
const gameStatus = document.querySelector('.game-status');
const boxes = document.querySelectorAll('.boxes');
const die = document.querySelector('.die');
const rollDieButton = document.querySelector('.roll-die-button');

function init(){
    currentPlayer = '1';
    playerOneScore = 0;
    playerTwoScore = 0;
    gameStatus.innerText = `Current Player - 🧡`;
    rollDieButton.classList.remove('pointer-events-none');
    endouter.classList.add('opacity-0');
    endouter.classList.add('invisible');
    endouter.classList.add('pointer-events-none');
    endoutersmall.classList.add('scale-0');
    

    die.innerText=``;

}

window.addEventListener('load', init);
newGameButton.addEventListener('click',init);

function changePlayer(){
    if(currentPlayer === '1'){
        gameStatus.innerText = `Current Player -💜 `;
        currentPlayer = '2';
    }else{
        currentPlayer = '1';
        gameStatus.innerText = `Current Player -🧡 `;
    }
    
}

function checkGameOver(){
    if(playerOneScore === 100 || playerTwoScore === 100){
        if(playerOneScore === 100){
            gamestatusnew.innerText='Winner - 🧡'
        }
        if(playerTwoScore === 100){
            gamestatusnew.innerText = `Winner - 💜` ;
        }
        rollDieButton.classList.add('pointer-events-none');
        boxes[playerOneScore-1].innerText=playerOneScore;
        boxes[playerTwoScore-1].innerText=playerTwoScore;
        endouter.classList.remove('opacity-0');
        endouter.classList.remove('invisible');
        endouter.classList.remove('pointer-events-none');
        endoutersmall.classList.remove('scale-0');
    }else{
        changePlayer();
    }
}


function randomIntGenerator(){
    return Math.floor(Math.random() * (7 - 1)) + 1;
}

rollDieButton.addEventListener('click', function(){
    const randomInt = randomIntGenerator();
    die.innerText = randomInt;
    if((currentPlayer === '1' && playerOneScore === 0 && randomInt !== 6) || (currentPlayer === '2' && playerTwoScore === 0 && randomInt !== 6) || (currentPlayer === '1' && playerOneScore + randomInt > 100) || (currentPlayer === '2' && playerTwoScore + randomInt > 100)){
        changePlayer();
        return;
    }
    if(currentPlayer === '1'){
        if(playerOneScore !== 0){
            boxes[playerOneScore-1].innerText = playerOneScore;
        }
        playerOneScore += randomInt;
        boxes[playerOneScore-1].innerText = `🧡` ;
        if(positionProfitOrLoss.has(playerOneScore)){
            boxes[playerOneScore-1].innerText = playerOneScore;
            playerOneScore = positionProfitOrLoss.get(playerOneScore);
            boxes[playerOneScore-1].innerText = `🧡`;
        }
    }
    if(currentPlayer === '2'){
        if(playerTwoScore !== 0){
            boxes[playerTwoScore-1].innerText = playerTwoScore;
        }
        playerTwoScore += randomInt;
        boxes[playerTwoScore-1].innerText = `💜`;
        if(positionProfitOrLoss.has(playerTwoScore)){
            boxes[playerTwoScore-1].innerText = playerTwoScore;
            playerTwoScore = positionProfitOrLoss.get(playerTwoScore);
            boxes[playerTwoScore-1].innerText = `💜`;
        }
    }
    checkGameOver();
});







