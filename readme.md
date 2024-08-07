# Tic Tac Toe Game

This is a Tic Tac Toe game implemented with a Flask backend and a React Native frontend. The game includes various difficulty levels for playing against the computer as well as a player vs player mode.

## Features

- **Player vs Player (PvP)**: Two players can play against each other.
- **Player vs Computer (PvC)**: Play against the computer with different difficulty levels.
  - Easy
  - Medium
  - Hard
- **Sound Effects**: Button click and background music.

## Technologies Used

- **Backend**: Flask, Python
- **Frontend**: React Native
- **Styling**: CSS-in-JS
- **API Requests**: Axios
- **Sound**: HTML5 Audio

## Setup Instructions

### Backend

1. Clone the repository: `git clone <your-repo-url>`
2. Navigate to the repository directory: `cd <your-repo-folder>`
3. Create a virtual environment and activate it: `python -m venv venv` (on Windows, use `venv\Scripts\activate`)
4. Install the required packages: `pip install flask flask-cors`
5. Run the Flask server: `python app.py`

### Frontend

1. Navigate to the frontend directory: `cd frontend`
2. Install the dependencies: `npm install`
3. Run the React Native application: `npm start`

## Usage

1. Selecting Difficulty Level: Navigate to the difficulty level you want to play. Options include PvP, Easy, Medium, and Hard.
2. Making a Move: Tap on the cell where you want to place your mark (X or O). The game will automatically switch turns between the player and the computer.
3. Resetting the Game: To reset the game, navigate to the main menu and select a difficulty level again.

## API Endpoints

### Get Game State
URL: `/game_state`
Method: GET
Description: Retrieves the current state of the game.

### Set Difficulty
URL: `/set_difficulty`
Method: POST
Description: Sets the difficulty level for the game.
Payload:
```json
{
  "difficulty": "Easy" | "Medium" | "Hard" | "Player"
}