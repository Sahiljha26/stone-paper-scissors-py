import random
from flask import Flask, request, jsonify

app = Flask(__name__)

# Core Game Logic inside Python
def get_computer_choice():
    return random.choice(["rock", "paper", "scissors"])

@app.route('/play', methods=['POST'])
def play_game():
    data = request.get_json()
    user_choice = data.get('choice')
    comp_choice = get_computer_choice()
    
    # Logic verification
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
        
    # Sending decision back to JavaScript/Browser
    return jsonify({
        'userChoice': user_choice,
        'computerChoice': comp_choice,
        'result': result,
        'message': message
    })

# Setting up a simple rule for HTML connection (CORS workaround)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    