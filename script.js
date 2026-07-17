let won = 0;
let lost = 0;
let draw = 0;
let roundCount = 0; // Tournament round tracker

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

    // 2. Python backend se result fetch karo
    // Fetch call ko local IP se hata kar relative path kar diya hai
    fetch('/api/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: userChoice })
    })
        
    .then(response => response.json())
    .then(data => {
        // Shaking animation khatam hone ka wait karo (1 second)
        setTimeout(() => {
            playerHand.classList.remove('shakePlayer');
            computerHand.classList.remove('shakeComputer');

            // Hand change karo according to choices
            playerHand.textContent = emojis[data.userChoice];
            if(data.computerChoice === 'scissors') {
                computerHand.textContent = '✌️'; 
            } else {
                computerHand.textContent = emojis[data.computerChoice];
            }

            // Scores update karo based on round result
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

            roundCount++; // Match count badhao

            // 3. BEST OF 5 EVALUATION
            if (roundCount === 5) {
                let tournamentMessage = "";
                
                // Winner decide karo
                if (won > lost) {
                    tournamentMessage = "🏆 TOURNAMENT OVER: YOU ARE THE CHAMPION! 🎉";
                } else if (lost > won) {
                    tournamentMessage = "💀 TOURNAMENT OVER: COMPUTER WINS THE SERIES! 😢";
                } else {
                    tournamentMessage = "🤝 TOURNAMENT OVER: IT'S A TIE SERIES! 🤝";
                }

                // Bada announcement text
                statusText.innerHTML = `<span style="color: #ff007f; font-weight: 800; display:block; margin-bottom:10px; font-size: 20px;">${tournamentMessage}</span>Final Score: ${won} - ${lost}`;
                playAgainBtn.textContent = "🔄 Start New Series";
                
                // Backend scores variables reset kar do par UI par agle click par reset hoga taaki user final score dekh sake
                won = 0;
                lost = 0;
                draw = 0;
                roundCount = 0;
            } else {
                // Agar 5 match nahi hue hain, toh normal next round ka instruction dikhao
                statusText.textContent = data.message;
                playAgainBtn.textContent = "🔄 Next Round";
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
    // Agar naya tournament shuru ho raha hai, toh scoreboard UI ko zero kar do
    if (roundCount === 0 && won === 0 && lost === 0) {
        document.getElementById('winCount').textContent = 0;
        document.getElementById('loseCount').textContent = 0;
        document.getElementById('drawCount').textContent = 0;
    }
    matchScreen.classList.add('hidden');
    selectionScreen.classList.remove('hidden');
});

document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));