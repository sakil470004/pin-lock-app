import React from 'react';

import PinSetupScreen from './screens/PinSetupScreen';
import PinEntryScreen from './screens/PinEntryScreen';
import MainContentScreen from './screens/MainContentScreen'; // Create this screen later
import { createStackNavigator } from 'react-navigation-stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PinEntry">
        <Stack.Screen name="PinSetup" component={PinSetupScreen} />
        <Stack.Screen name="PinEntry" component={PinEntryScreen} />
        <Stack.Screen name="MainContent" component={MainContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
