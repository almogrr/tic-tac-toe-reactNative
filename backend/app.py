from flask import Flask, jsonify, request
from flask_cors import CORS
import copy
import random
import csv
import pygame

app = Flask(__name__)
CORS(app)



# Tic Tac Toe game state
game_state = {
    "board": [["", "", ""], ["", "", ""], ["", "", ""]],
    "turn": "X",
    "winner": None,
    "game_over": False,
    "difficulty": ""
}
initial_game_state = {
    "board": [["", "", ""], ["", "", ""], ["", "", ""]],
    "turn": "X",
    "winner": None,
    "game_over": False,
    "difficulty": ""
}

# Function to check if there's a winner
def check_winner(board):
    for row in board:
        if row[0] == row[1] == row[2] != "":
            return row[0]

    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] != "":
            return board[0][col]

    if board[0][0] == board[1][1] == board[2][2] != "":
        return board[0][0]

    if board[0][2] == board[1][1] == board[2][0] != "":
        return board[0][2]

    return None

# Function to handle player moves
def make_move(row, col):
    if not game_state["game_over"] and game_state["board"][row][col] == "":
        game_state["board"][row][col] = game_state["turn"]
        winner = check_winner(game_state["board"])
        if winner:
            game_state["winner"] = winner
            game_state["game_over"] = True
        elif all(all(cell != "" for cell in row) for row in game_state["board"]):
            game_state["game_over"] = True
        else:
            game_state["turn"] = "O" if game_state["turn"] == "X" else "X"
            if game_state["turn"] == "O":  # Computer's turn
                if game_state["difficulty"] == "Easy":
                    computer_ez()
                elif game_state["difficulty"] == "Medium":
                    computer_mid()
                elif game_state["difficulty"] == "Hard":
                    computer_hard()
                elif game_state["difficulty"] == "Player":
                    pass
        return True
    return False


def computer_ez():
    empty_cells = [(i, j) for i in range(3) for j in range(3) if game_state["board"][i][j] == ""]
    if empty_cells:
        row, col = random.choice(empty_cells)
        game_state["board"][row][col] = "O"
        winner = check_winner(game_state["board"])
        if winner:
            game_state["winner"] = winner
            game_state["game_over"] = True
        elif all(all(cell != "" for cell in row) for row in game_state["board"]):
            game_state["game_over"] = True
        else:
            game_state["turn"] = "X"

def computer_mid():
    empty_cells = [(i, j) for i in range(3) for j in range(3) if game_state["board"][i][j] == ""]
    
    # First, check if the computer can win in the next move
    for row, col in empty_cells:
        temp_board = [row[:] for row in game_state["board"]]
        temp_board[row][col] = "O"
        if check_winner(temp_board) == "O":
            game_state["board"][row][col] = "O"
            game_state["winner"] = "O"
            game_state["game_over"] = True
            game_state["turn"] = "X"  # Update turn after the computer's move
            return
    
    # Next, check if the opponent can win in the next move and block them
    for row, col in empty_cells:
        temp_board = [row[:] for row in game_state["board"]]
        temp_board[row][col] = "X"
        if check_winner(temp_board) == "X":
            game_state["board"][row][col] = "O"
            game_state["turn"] = "X"  # Update turn after the computer's move
            return
    
    # If no immediate win or block, choose a random empty cell
    if empty_cells:
        row, col = random.choice(empty_cells)
        game_state["board"][row][col] = "O"
        game_state["turn"] = "X"  # Update turn after the computer's move

def minimax(board, depth, maximizing_player):
    # Base case: if the game is over or the maximum depth is reached
    winner = check_winner(board)
    if winner == "O":
        return 10
    elif winner == "X":
        return -10
    elif all(all(cell != "" for cell in row) for row in board) or depth == 0:
        return 0

    if maximizing_player:
        max_eval = float('-inf')
        for i in range(3):
            for j in range(3):
                if board[i][j] == "":
                    board[i][j] = "O"
                    eval = minimax(board, depth - 1, False)
                    board[i][j] = ""
                    max_eval = max(max_eval, eval)
        return max_eval
    else:
        min_eval = float('inf')
        for i in range(3):
            for j in range(3):
                if board[i][j] == "":
                    board[i][j] = "X"
                    eval = minimax(board, depth - 1, True)
                    board[i][j] = ""
                    min_eval = min(min_eval, eval)
        return min_eval

def computer_hard():
    if not game_state["game_over"]:
        best_move = None
        best_eval = float('-inf')
        temp_board = [row[:] for row in game_state["board"]]  # Make a copy of the board
        for i in range(3):
            for j in range(3):
                if temp_board[i][j] == "":
                    temp_board[i][j] = "O"
                    eval = minimax(temp_board, 5, False)  # Adjust depth as needed
                    temp_board[i][j] = ""
                    if eval > best_eval:
                        best_eval = eval
                        best_move = (i, j)
        if best_move:
            row, col = best_move
            game_state["board"][row][col] = "O"
            winner = check_winner(game_state["board"])
            game_state["turn"] = "X"
            if winner:
                game_state["winner"] = winner
                game_state["game_over"] = True


# Route to get the current game state
@app.route('/game_state', methods=['GET'])
def get_game_state():
    return jsonify(game_state)

@app.route('/set_difficulty', methods=['POST'])
def set_difficulty():
    data = request.json
    difficulty = data.get('difficulty')
    if difficulty in ['Easy', 'Medium', 'Hard','Player']:

        game_state['difficulty'] = difficulty
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid difficulty level"})


# Route to make a move
@app.route('/make_move', methods=['POST'])
def handle_move():
    data = request.json
    row, col = data['row'], data['col']
    if make_move(row, col):
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid move"})


# Route to reset the game state
@app.route('/reset', methods=['POST'])
def reset_game():
    global game_state
    difficulty = game_state['difficulty']  # Preserve the difficulty level
    game_state = copy.deepcopy(initial_game_state)
    game_state['difficulty'] = difficulty  # Restore the difficulty level
    return jsonify({"success": True})


if __name__ == '__main__':
    app.run(debug=True)
