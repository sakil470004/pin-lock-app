// screens/PinSetupScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PinInput from '../components/PinInput';
import { savePin } from '../utils/secureStorage';

const PinSetupScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [firstPin, setFirstPin] = useState('');
  const [error, setError] = useState('');

  const handleFirstPinComplete = async (pin) => {
    setFirstPin(pin);
    setError('');
    // Short delay to allow visual feedback before moving to confirmation
    setTimeout(() => setStep(2), 300);
  };

  const handleConfirmPinComplete = async (pin) => {
    if (pin === firstPin) {
      const success = await savePin(pin);
      if (success) {
        navigation.replace('Main');
      } else {
        setError('Error saving PIN. Please try again.');
        setStep(1);
      }
    } else {
      setError('PINs do not match. Please try again.');
      // Reset to first step after a small delay
      setTimeout(() => {
        setStep(1);
        setFirstPin('');
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Up PIN</Text>
      <Text style={styles.subtitle}>
        {step === 1 
          ? 'Enter a 4-digit PIN to secure your app' 
          : 'Confirm your PIN'}
      </Text>
      
      {step === 1 ? (
        <PinInput 
          onComplete={handleFirstPinComplete} 
          error={error && step === 1 ? error : ''} 
        />
      ) : (
        <PinInput 
          onComplete={handleConfirmPinComplete} 
          error={error && step === 2 ? error : ''} 
        />
      )}
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

export default PinSetupScreen;