import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TicTacToeMenu from './components/TicTacToeMenu';
import PvPScreen from './components/PvPScreen';
import PvCEZ from './components/PvCEZ';
import PvCMid from './components/PvCMid';
import PvCHard from './components/PvCHard';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={TicTacToeMenu} options={{ title: 'Tic Tac Toe' }} />
        <Stack.Screen name="PvPScreen" component={PvPScreen} />
        <Stack.Screen name="PvCEZ" component={PvCEZ} />
        <Stack.Screen name="PvCMid" component={PvCMid} />
        <Stack.Screen name="PvCHard" component={PvCHard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
