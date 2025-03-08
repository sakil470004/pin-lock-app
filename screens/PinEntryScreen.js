// screens/PinEntryScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PinInput from '../components/PinInput';
import { validatePin } from '../utils/secureStorage';

const PinEntryScreen = ({ navigation }) => {
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 5;

  const handlePinComplete = async (pin) => {
    const isValid = await validatePin(pin);
    
    if (isValid) {
      // PIN is correct, navigate to main app
      setError('');
      navigation.replace('Main');
    } else {
      // Increase attempt counter
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      // Show appropriate error message based on attempts
      if (newAttempts >= MAX_ATTEMPTS) {
        setError(`Too many incorrect attempts (${newAttempts}/${MAX_ATTEMPTS})`);
        // In a real app, you might want to lock the app for some time
      } else {
        setError(`Incorrect PIN. Attempts: ${newAttempts}/${MAX_ATTEMPTS}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter PIN</Text>
      <Text style={styles.subtitle}>
        Enter your PIN to unlock the app
      </Text>
      
      <PinInput 
        onComplete={handlePinComplete} 
        error={error} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default PinEntryScreen;