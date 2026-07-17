let won = 0;
let lost = 0;
let draw = 0;

const winCountEl = document.getElementById('winCount');
const loseCountEl = document.getElementById('loseCount');
const drawCountEl = document.getElementById('drawCount');
const statusTextEl = document.getElementById('statusText');

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    const emojis = { rock: '✊', paper: '✋', scissors: '✌️' };
    
    if (userChoice === computerChoice) {
        draw++;
        drawCountEl.textContent = draw;
        statusTextEl.textContent = `It's a draw! Both chose ${emojis[userChoice]}`;
    } 
    else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        won++;
        winCountEl.textContent = won;
        statusTextEl.textContent = `You Win! ${emojis[userChoice]} beats ${emojis[computerChoice]}`;
    } 
    else {
        lost++;
        loseCountEl.textContent = lost;
        statusTextEl.textContent = `You Lose! ${emojis[computerChoice]} beats ${emojis[userChoice]}`;
    }
}

document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));