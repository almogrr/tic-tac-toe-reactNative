  import {React,useState} from 'react';
  import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
  import axios from 'axios';




  export default function TicTacToeMenu({ navigation }) {
    const [musicStarted, setMusicStarted] = useState(false);
    const handleButtonClick = () => {
      const sound = new Audio('../sounds/Click.wav');
      sound.volume = 0.2;
      sound.play().catch(error => console.error('Error playing sound:', error));
      if (!musicStarted){
      const sounds = new Audio('../sounds/Music.wav');
      sounds.volume = 0.15;
      sounds.play().catch(error => console.error('Error playing sound:', error));
      }
    };



    const resetGame = async () => {
      try {
        await axios.post('http://127.0.0.1:5000/reset');
      } catch (error) {
        console.error('Error resetting game:', error);
      }
    };

    const handleDifficulty = (difficulty) => {
      handleButtonClick();
      resetGame();
      setMusicStarted(true) // Play click sound
      if (difficulty === 'Easy') {
        navigation.navigate('PvCEZ', { difficulty: 'Easy' });
      } else if (difficulty === 'Medium') {
        navigation.navigate('PvCMid', { difficulty: 'Medium' });
      } else if (difficulty === 'Hard') {
        navigation.navigate('PvCHard', { difficulty: 'Hard' });
      } else if (difficulty === 'Player') {
        navigation.navigate('PvPScreen', { difficulty: 'Player' });
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tic Tac Toe</Text>
        <TouchableOpacity style={[styles.button, styles.pvpButton, styles.blueBackground]} onPress={() => { handleButtonClick(); handleDifficulty('Player'); }}>
          <Text style={styles.buttonText}>PvP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.difficultyButton, styles.greenBackground]} onPress={() => { handleButtonClick(); handleDifficulty('Easy'); }}>
          <Text style={styles.buttonText}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.difficultyButton, styles.orangeBackground]} onPress={() => { handleButtonClick(); handleDifficulty('Medium'); }}>
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.difficultyButton, styles.redBackground]} onPress={() => { handleButtonClick(); handleDifficulty('Hard'); }}>
          <Text style={styles.buttonText}>Hard</Text>
        </TouchableOpacity>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 5,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      animationKeyframes: 'fadeInUp',
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
    },
    pvpButton: {
      width: 200,
    },
    difficultyButton: {
      width: 200,
    },
    blueBackground: {
      backgroundColor: '#007bff',
    },
    greenBackground: {
      backgroundColor: '#28a745',
    },
    orangeBackground: {
      backgroundColor: '#fd7e14',
    },
    redBackground: {
      backgroundColor: '#dc3545',
    },
  });
