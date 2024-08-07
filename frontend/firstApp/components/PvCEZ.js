import React, { useEffect } from 'react';
import TicTacToeGame from './TicTacToeGame'; // Import the TicTacToeGame component
import axios from 'axios';

export default function PvCEZ() {
  useEffect(() => {
    // Set the game difficulty to "Easy" when the component mounts
    setGameDifficulty("Easy");
  }, []);

  const setGameDifficulty = async (difficulty) => {
    try {
      await axios.post('http://127.0.0.1:5000/set_difficulty', { difficulty });
    } catch (error) {
      console.error('Error setting game difficulty:', error);
    }
  };

  return (
    <TicTacToeGame mode="pvc" />
    
  );
}
