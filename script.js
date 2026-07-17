let won = 0;
let lost = 0;
let draw = 0;

const selectionScreen = document.getElementById('selectionScreen');
const matchScreen = document.getElementById('matchScreen');
const playerHand = document.getElementById('playerHand');
const computerHand = document.getElementById('computerHand');
const statusText = document.getElementById('statusText');
const playAgainBtn = document.getElementById('playAgainBtn');

const emojis = { rock: '✊', paper: '✋', scissors: '✌️' };

function playGame(userChoice) {
    // 1. UI changes to shaking arena
    selectionScreen.classList.add('hidden');
    matchScreen.classList.remove('hidden');
    playAgainBtn.classList.add('hidden');
    
    playerHand.textContent = '✊';
    computerHand.textContent = '✊';
    statusText.textContent = 'Wait for it...';

    playerHand.classList.add('shakePlayer');
    computerHand.classList.add('shakeComputer');

    // 2. BACKEND INTEGRATION: Asking Python game.py for the result
    fetch('http://127.0.0.1:5000/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: userChoice })
    })
    .then(response => response.json())
    .then(data => {
        // Wait for shaking animation to complete (1 second) before showing Python's result
        setTimeout(() => {
            playerHand.classList.remove('shakePlayer');
            computerHand.classList.remove('shakeComputer');

            // Using the choice Python sent back
            playerHand.textContent = emojis[data.userChoice];
            
            if(data.computerChoice === 'scissors') {
                computerHand.textContent = '✌️'; 
            } else {
                computerHand.textContent = emojis[data.computerChoice];
            }

            // Update UI scores based on Python's logic decision
            statusText.textContent = data.message;
            
            if (data.result === 'win') {
                won++;
                document.getElementById('winCount').textContent = won;
            } else if (data.result === 'lose') {
                lost++;
                document.getElementById('loseCount').textContent = lost;
            } else {
                draw++;
                document.getElementById('drawCount').textContent = draw;
            }

            playAgainBtn.classList.remove('hidden');
        }, 1000);
    })
    .catch(error => {
        console.error('Error connecting to Python backend:', error);
        statusText.textContent = "Error: Is your Python server running?";
    });
}

playAgainBtn.addEventListener('click', () => {
    matchScreen.classList.add('hidden');
    selectionScreen.classList.remove('hidden');
});

document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));