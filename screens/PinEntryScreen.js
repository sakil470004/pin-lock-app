import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const PinEntryScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');
  const [storedPin, setStoredPin] = useState('');

  useEffect(() => {
    const fetchStoredPin = async () => {
      const stored = await SecureStore.getItemAsync('userPin');
      setStoredPin(stored);
    };
    fetchStoredPin();
  }, []);

  const handlePinEntry = async () => {
    if (pin === storedPin) {
      navigation.navigate('MainContent'); // Redirect to main content if pin matches
    } else {
      Alert.alert('Error', 'Incorrect Pin');
    }
  };

  return (
    <View>
      <Text>Enter your 4-digit Pin</Text>
      <TextInput
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        maxLength={4}
        placeholder="Enter Pin"
      />
      <Button title="Submit" onPress={handlePinEntry} />
    </View>
  );
};

export default PinEntryScreen;
