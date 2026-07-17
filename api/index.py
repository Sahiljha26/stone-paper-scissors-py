import random
from flask import Flask, request, jsonify

app = Flask(__name__)

def get_computer_choice():
    return random.choice(["rock", "paper", "scissors"])

@app.route('/api/play', methods=['POST'])
def play_game():
    data = request.get_json()
    user_choice = data.get('choice')
    comp_choice = get_computer_choice()
    
    if user_choice == comp_choice:
        result = "draw"
        message = "Oops! It's a Draw 🤝"
    elif (
        (user_choice == "rock" and comp_choice == "scissors") or
        (user_choice == "paper" and comp_choice == "rock") or
        (user_choice == "scissors" and comp_choice == "paper")
    ):
        result = "win"
        message = "Congrats, You Won! 🎉"
    else:
        result = "lose"
        message = "Oh no, You Lost! 😢"
        
    return jsonify({
        'userChoice': user_choice,
        'computerChoice': comp_choice,
        'result': result,
        'message': message
    })