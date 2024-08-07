import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import axios from 'axios';
import styles from './styles'; // Import the translated styles

export default function TicTacToeGame({ mode }) {
  const initialBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchGameState();
  }, []);

  const fetchGameState = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/game_state');
      const gameState = response.data;
      setBoard(gameState.board);
      setTurn(gameState.turn);
      setWinner(gameState.winner);
      setGameOver(gameState.game_over);
    } catch (error) {
      console.error('Error fetching game state:', error);
    }
  };

  const ResetSound = () => {
    const sound = new Audio('../sounds/Reset.wav');
    sound.play().catch(error => console.error('Error playing sound:', error));
  };

  const TurnSound = () => {
    const sound = new Audio('../sounds/Turn.wav');
    sound.play().catch(error => console.error('Error playing sound:', error));
  };

  const WinSound = () => {
    const sound = new Audio('../sounds/Win.wav');
    sound.volume = 0.2;
    sound.play().catch(error => console.error('Error playing sound:', error));
  };

  const DrawSound = () => {
    const sound = new Audio('../sounds/Draw.wav');
    sound.volume = 0.2;
    sound.play().catch(error => console.error('Error playing sound:', error));
  };

  const makeMove = async (row, col) => {
    if (!gameOver && board[row][col] === "") {
      try {
        await axios.post('http://127.0.0.1:5000/make_move', { row, col });
        TurnSound()
        fetchGameState();
      } catch (error) {
        console.error('Error making move:', error);
      }
    }
  };

  const resetGame = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/reset');
      ResetSound()
      fetchGameState();
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  const renderSquare = (row, col) => {
    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => makeMove(row, col)}
      >
        <Text style={styles.squareText}>{board[row][col]}</Text>
      </TouchableOpacity>
    );
  };

  const renderBoard = () => {
    return (
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.boardRow}>
            {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
          </View>
        ))}
      </View>
    );
  };

  const getStatus = () => {
    if (winner) {
      WinSound()
      return `Winner: ${winner}`;
    } else if (gameOver) {
      DrawSound()
      return 'It\'s a draw!';
    } else {
      return `Next player: ${turn}`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{getStatus()}</Text>
      {renderBoard()}
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
}
