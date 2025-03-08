// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import PinSetupScreen from './screens/PinSetupScreen';
import PinEntryScreen from './screens/PinEntryScreen';
import MainScreen from './screens/MainScreen';
import { isPinSet } from './utils/secureStorage';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [pinHasBeenSet, setPinHasBeenSet] = useState(false);

  useEffect(() => {
    // Check if PIN has been set
    const checkPinStatus = async () => {
      const hasPinSet = await isPinSet();
      setPinHasBeenSet(hasPinSet);
      setIsLoading(false);
    };

    checkPinStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {pinHasBeenSet ? (
          // PIN is set, show PIN entry screen
          <>
            <Stack.Screen name="PinEntry" component={PinEntryScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
          </>
        ) : (
          // PIN is not set, show PIN setup screen
          <>
            <Stack.Screen name="PinSetup" component={PinSetupScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});